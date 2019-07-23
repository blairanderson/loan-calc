import React from "react";
import useDocumentTitle from "@rehooks/document-title";
import { dollarify } from "./utils/dollarify";

function AppTitle(props) {
  const { amount, duration, interestRate } = props;
  const title = "Open Source Loan Calculator";
  const subtitle = `${dollarify(
    amount,
    true
  )} Loan @ ${interestRate}%`;

  useDocumentTitle(`${subtitle} | ${title}`);

  return (
    <div>
      <h1>{title}</h1>
      <h2 className="nowrap">
        {subtitle}
        <br />
        Amortized Over {duration}-Months
      </h2>
    </div>
  );
}

export default AppTitle;
