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
    var resp = data.default;
    var samples = data.default.samples;

    var last = samples[samples.length - 1];

    var totalAPR = 0;
    var totalRATE = 0;
    for (var i = 0; i < samples.length; i++) {
      totalAPR += samples[i].apr;
      totalRATE += samples[i].rate;
    }
    var averageAPR = (totalAPR / samples.length).toFixed(3);
    var averageRATE = (totalRATE / samples.length).toFixed(3);

    resp['rates'] = [
      { text: "Current Rate", rate: last.rate, apr: last.apr },
      {
        text: `${samples.length - 1} Day Average`,
        rate: averageRATE,
        apr: averageAPR
      }
    ];

    resp['chart'] = samples.reduce(function(acc, { time, rate }, ind, src) {
      acc[time] = rate;
      return acc;
    }, {});

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
