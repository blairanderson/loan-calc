import React from "react";
import { LineChart } from "react-chartkick";
import 'chartkick/chart.js';

const className = "f6 fw6 b dib mh3 mb0 pb1 link hover-blue black-70 ttc";
function Rates(props) {
  const { rates, chart, duration, amount } = props;
  const max = parseFloat(props.maximum || 4.25);
  const min = parseFloat(props.minimum || 3.6);
  // const total = Object.assign({}, )
  // const first = chart[0].data;
  // rates.forEach(function({ text, rate, apr }) {
  //   const data = {};
  //   const level = parseFloat(apr);
  //   Object.keys(first).forEach(function(key) {
  //     data[key] = level;
  //   });
  //   chart.push({ name: text, data: data });
  // });
  // https://github.com/ankane/blazer/blob/c4fc09f7720dfa5187fbc1de81b6bcfaebda3c4f/app/views/blazer/queries/run.html.erb#L70

  //https://github.com/ankane/blazer/blob/c4fc09f7720dfa5187fbc1de81b6bcfaebda3c4f/app/views/blazer/queries/run.html.erb#L72
  return (
    <header className="ph0 pt3 bt b--black-10 mb3">
      <div className="mw9 center">
        {rates.map(function ({ text, rate, apr }) {
          const href = `?interestRate=${apr}&duration=${duration}&amount=${amount}`;
          return (
            <a key={href} href={href} className={className}>
              {text}: {rate}%
              <br />({apr}% APR)
            </a>
          );
        })}
      </div>
      <LineChart data={chart} width="100%" height="200px" min={min} max={max} />
      <ZillowShoutOut />
      {chart.length > 2 && <TrendShoutOut />}
    </header>
  );
}

function ZillowNav(props) {
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    const fetchData = async () => {
      fetch(".netlify/functions/rates")
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setData(myJson);
        })
        .catch(function (err) {
          setData({ error: err });
        });
    };

    fetchData();
  }, []);

  const { rates, chart, maximum, minimum } = data;

  return rates && chart ? (
    <Rates {...props} {...{ rates, chart, maximum, minimum }} />
  ) : (
    ""
  );
}

function ZillowShoutOut() {
  return (
    <small className="bg-blue mh3 near-white br2 ph3 pv1 dib">
      See more{" "}
      <a className="white" href="http://www.zillow.com/mortgage-rates/">
        <strong>mortgage rates</strong>
      </a>{" "}
      on Zillow
    </small>
  );
}

function TrendShoutOut() {
  return (
    <small className="bg-green mh3 near-white br2 ph3 pv1 dib">
      TBATS Forecast by{" "}
      <a className="white" href="http://trendapi.org/">
        <strong>TrendApi.org</strong>
      </a>
    </small>
  );
}

export default ZillowNav;

// const TEST = {
//   query: {
//     creditScoreBucket: "VeryHigh",
//     loanAmountBucket: "Conforming",
//     loanToValueBucket: "Normal",
//     loanType: "Conventional",
//     program: "Fixed30Year"
//   },
//   samples: [
//     { apr: 4.147, rate: 4.081, time: "2019-06-22T00:00:00-07:00", volume: 0 },
//     { apr: 4.218, rate: 4.155, time: "2019-06-23T00:00:00-07:00", volume: 0 },
//     { apr: 4.07, rate: 4.006, time: "2019-06-24T00:00:00-07:00", volume: 0 },
//     { apr: 4.077, rate: 4.009, time: "2019-06-25T00:00:00-07:00", volume: 0 },
//     { apr: 4.07, rate: 4.006, time: "2019-06-26T00:00:00-07:00", volume: 0 },
//     { apr: 4.106, rate: 4.041, time: "2019-06-27T00:00:00-07:00", volume: 0 },
//     { apr: 4.089, rate: 4.021, time: "2019-06-28T00:00:00-07:00", volume: 0 },
//     { apr: 4.05, rate: 3.981, time: "2019-06-29T00:00:00-07:00", volume: 0 },
//     { apr: 4.117, rate: 4.048, time: "2019-06-30T00:00:00-07:00", volume: 0 },
//     { apr: 4.085, rate: 4.019, time: "2019-07-01T00:00:00-07:00", volume: 0 },
//     { apr: 4.035, rate: 3.972, time: "2019-07-02T00:00:00-07:00", volume: 0 },
//     { apr: 3.998, rate: 3.935, time: "2019-07-03T00:00:00-07:00", volume: 0 },
//     { apr: 4.031, rate: 3.964, time: "2019-07-04T00:00:00-07:00", volume: 0 },
//     { apr: 4.055, rate: 3.987, time: "2019-07-05T00:00:00-07:00", volume: 0 },
//     { apr: 4.071, rate: 4.001, time: "2019-07-06T00:00:00-07:00", volume: 0 },
//     { apr: 4.138, rate: 4.064, time: "2019-07-07T00:00:00-07:00", volume: 0 },
//     { apr: 4.032, rate: 3.964, time: "2019-07-08T00:00:00-07:00", volume: 0 },
//     { apr: 4.021, rate: 3.952, time: "2019-07-09T00:00:00-07:00", volume: 0 },
//     { apr: 4.007, rate: 3.935, time: "2019-07-10T00:00:00-07:00", volume: 0 },
//     { apr: 4.059, rate: 3.989, time: "2019-07-11T00:00:00-07:00", volume: 0 },
//     { apr: 4.067, rate: 4.001, time: "2019-07-12T00:00:00-07:00", volume: 0 },
//     { apr: 4.049, rate: 3.983, time: "2019-07-13T00:00:00-07:00", volume: 0 },
//     { apr: 4.104, rate: 4.039, time: "2019-07-14T00:00:00-07:00", volume: 0 },
//     { apr: 3.959, rate: 3.894, time: "2019-07-15T00:00:00-07:00", volume: 0 },
//     { apr: 3.952, rate: 3.884, time: "2019-07-16T00:00:00-07:00", volume: 0 },
//     { apr: 3.884, rate: 3.818, time: "2019-07-17T00:00:00-07:00", volume: 0 },
//     { apr: 3.848, rate: 3.783, time: "2019-07-18T00:00:00-07:00", volume: 0 },
//     { apr: 3.834, rate: 3.771, time: "2019-07-19T00:00:00-07:00", volume: 0 },
//     { apr: 3.847, rate: 3.785, time: "2019-07-20T00:00:00-07:00", volume: 0 },
//     { apr: 3.857, rate: 3.795, time: "2019-07-21T00:00:00-07:00", volume: 0 },
//     { apr: 3.81, rate: 3.752, time: "2019-07-22T00:00:00-07:00", volume: 0 }
//   ]
// };
