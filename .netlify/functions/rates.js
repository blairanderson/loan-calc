Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var axios = require("axios");

var ZILLOW_KEY = process.env.ZILLOW_KEY;

var URL = "https://mortgageapi.zillow.com/getRates?partnerId=".concat(
  ZILLOW_KEY
);

async function handler(event, context) {
  try {
    var response = await axios.get(URL, {
      headers: {
        Accept: "application/json"
      }
    });

    console.log("fetched " + URL);
    console.log(response.data);

    var data = response.data.rates;
    var samples = data.default.samples;
    var resp = {};
    var length = samples.length;
    var last = samples[length - 1];
    var lastTime = last.time.toString().split("T")[0];
    var lastChartData = {};
    lastChartData[lastTime] = last.rate;

    var totalAPR = 0;
    var totalRATE = 0;
    for (var i = 0; i < samples.length; i++) {
      totalAPR += samples[i].apr;
      totalRATE += samples[i].rate;
    }
    var averageAPR = (totalAPR / samples.length).toFixed(3);
    var averageRATE = (totalRATE / samples.length).toFixed(3);

    resp["rates"] = [
      { text: "Current Rate", rate: last.rate, apr: last.apr },
      {
        text: `${samples.length - 1} Day Average`,
        rate: averageRATE,
        apr: averageAPR
      }
    ];

    var historical = samples.reduce(function(acc, { time, rate }, ind, src) {
      acc[time.split("T")[0]] = rate;
      return acc;
    }, {});

    resp["chart"] = [];

    try {
      var forecast = await axios({
        url: "https://trendapi.org/forecast",
        method: "post",
        headers: { Accept: "application/json" },
        data: { series: historical, count: 7 }
      });
      console.log("fetched " + "https://trendapi.org/forecast");
      console.log(forecast.data);
      resp.chart.push({ name: "7-Day Forecast", data: forecast.data.forecast });
    } catch (err) {
      console.error(err);
    }

    // wait until afer the forecast to separate this current date
    delete historical[lastTime];

    resp["chart"].unshift({
      name: "Current Rate",
      data: lastChartData
    });

    resp["chart"].unshift({
      name: `Past ${samples.length - 1}-Day Rates`,
      data: historical
    });

    var allValuesForMaxMin = resp["chart"].reduce(function(acc, obj) {
      return acc.concat(Object.values(obj.data));
    }, []);

    var diff = standardDeviation(allValuesForMaxMin);

    resp["maximum"] = Math.max.apply(null, allValuesForMaxMin) + diff;
    resp["minimum"] = Math.min.apply(null, allValuesForMaxMin) - diff;

    ["maximum", "minimum"].forEach(function(attr) {
      resp[attr] = resp[attr].toFixed(2);
    });

    return {
      statusCode: 200,
      body: JSON.stringify(resp)
    };
  } catch (err) {
    console.log(err); // output to netlify function log

    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: err.message
      }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}

function standardDeviation(values) {
  var avg = average(values);

  var squareDiffs = values.map(function(value) {
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data) {
  var sum = data.reduce(function(sum, value) {
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}
