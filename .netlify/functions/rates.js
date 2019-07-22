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
    
    var data = response.rates;

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: data.default
      })
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
