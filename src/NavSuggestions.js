import React from "react";
import queryString from "query-string";

function MenuLink(props) {
  const { name, onClick, params } = props;
  return (
    <a
      title={`Open Source ${name}`}
      onClick={event => {
        if (typeof onClick === "function") {
          onClick(event, params);
        }
      }}
      className={"f6 fw6 b dib mr3 mb3 pb1 link hover-blue black-70 ttc"}
      href={`?${queryString.stringify(params)}`}
    >
      {name}
      <br />
      {abbreviateDollars(params.amount)} @ {params.interestRate}%
    </a>
  );
}

function NavSuggestions(props) {
  const MENU = [
    {
      name: "Mortgage Estimates",
      params: { amount: 450000, duration: 360, interestRate: 3.5 }
    },
    {
      name: "Car Loan Estimates",
      params: { amount: 25000, duration: 36, interestRate: 5.5 }
    }
  ];

  return (
    <header className="ph3 ph5-ns pt3 bb bt b--black-10 mb3">
      <div className="mw9 center">
        {MENU.map(function({ name, params }) {
          return (
            <MenuLink name={name} params={params} onClick={props.onClick} />
          );
        })}
      </div>
    </header>
  );
}

export default NavSuggestions;

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
