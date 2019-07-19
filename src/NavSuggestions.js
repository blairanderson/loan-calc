import React from "react";
import queryString from "query-string";
// updateUrl({ amount, duration, interestRate });
const MENU = [
  {
    name: "Mortgage Calculator",
    params: { amount: 450000, duration: 360, interestRate: 3.5 }
  },
  {
    name: "Car Loan Calculator",
    params: { amount: 25000, duration: 36, interestRate: 5.5 }
  }
];

const linkClass = "f6 fw6 b dib mr3 mb3 pb1 link hover-blue black-70 ttc";

function abbreviateDollars(number) {
  const str = parseInt(number, 10).toString();
  const thousands = str.length > 3 && str.length < 7;
  const millions = str.length > 6 && str.length < 10;
  if (thousands) {
    return `$${str.slice(0, -3)}K`;
  }

  if (millions) {
    return `$${str.slice(0, -6)}M`;
  }

  return str;
}

function NavSuggestions(props) {
  return (
    <header className="ph3 ph5-ns pt3 bb bt b--black-10 mb3">
      <div className="mw9 center">
        {MENU.map(function({ name, params }) {
          return (
            <a
              title={`Open Source ${name}`}
              onClick={props.onClick}
              className={linkClass}
              href={`?${queryString.stringify(params)}`}
            >
              {name}
              <br />
              {abbreviateDollars(params.amount)} @ {params.interestRate}%
            </a>
          );
        })}
      </div>
    </header>
  );
}

export default NavSuggestions;
