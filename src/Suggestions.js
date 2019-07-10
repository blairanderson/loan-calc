import React from "react";
import queryString from "query-string";
// updateUrl({ amount, duration, interestRate });
const MENU = [
  {
    name: "Mortgage Calculator",
    params: { amount: 300000, duration: 360, interestRate: 3.5 }
  },
  {
    name: "Car Loan Calculator",
    params: { amount: 15000, duration: 36, interestRate: 5.5 }
  }
];

function NavSuggestions() {
  return (
    <header className="ph3 ph5-ns pt3 bb bt b--black-10 mb3">
      <div className="mw9 center">
        {MENU.map(function({ name, params }) {
          return (
            <a
              className="f6 fw6 b dib mr3 mb3 pb1 link hover-blue black-70 ttc"
              href={`?${queryString.stringify(params)}`}
            >
              {name}
            </a>
          );
        })}
      </div>
    </header>
  );
}

export default NavSuggestions;
