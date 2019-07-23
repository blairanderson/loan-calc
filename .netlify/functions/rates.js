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
    console.log(response);

    var data = response.data.rates;
    var samples = data.default.samples;
    var resp = {};
    var length = samples.length;
    var last = samples[length - 1];
    var lastChartData = {};
    lastChartData[last.time] = last.rate;

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
      acc[time] = rate;
      return acc;
    }, {});

    resp["chart"] = [
      {
        name: `Past ${samples.length - 1}-Day Rates`,
        data: historical
      },
      {
        name: "Current Rate",
        data: lastChartData
      }
    ];

    try {
      var forecast = await axios({
        url: "https://trendapi.org/forecast",
        method: "post",
        headers: { Accept: "application/json" },
        data: { series: historical, count: 7 }
      });
      resp.chart.push({ name: "7-Day Forecast", data: forecast.data.forecast });
    } catch (e) {
      console.log(e);
    }

    // wait until afer the forecast to separate this current date
    delete historical[last.time];

    var allValuesForMaxMin = resp["chart"].reduce(function(
      accum,
      { name, data }
    ) {
      accum.concat(Object.values(data));
      return accum;
    },
    []);

    var diff = 0.2;
    resp["maximum"] = Math.max.apply(null, allValuesForMaxMin) + diff;
    resp["minimum"] = Math.min.apply(null, allValuesForMaxMin) - diff;

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
