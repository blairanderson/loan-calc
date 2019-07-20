import React from "react";
import useDocumentTitle from "@rehooks/document-title";
import { dollarify } from "./Calculator";

function AppTitle(props) {
  const { amount, duration, interestRate } = props;
  const title = "Open Source Loan Calculator";
  const subtitle = `${dollarify(
    amount,
    true
  )} Loan Amortization @ ${interestRate}%`;

  useDocumentTitle(`${subtitle} | ${title}`);

  return (
    <div>
      <h1>{title}</h1>
      <h2 className="nowrap">
        {subtitle}
        <br />
        Over {duration}-Month Duration
      </h2>
    </div>
  );
}

export default AppTitle;
