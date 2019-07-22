import axios from "axios";
export async function handler(event, context) {
  try {
    const response = await axios.get(
      "https://mortgageapi.zillow.com/getRates?partnerId=RD-RRVHPYZ",
      { headers: { Accept: "application/json" } }
    );
    const data = response.rates;
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.default })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
