import React from "react";
import useDocumentTitle from "@rehooks/document-title";
import { dollarify } from "./Calculator";

function AppTitle(props) {
  const { amount, duration, interestRate } = props;
  const title = "Open Source Loan Calculator";
  const subtitle = `${dollarify(
    amount
  )}  @ ${interestRate}% for ${duration} Months`;
  useDocumentTitle(`${subtitle} | ${title}`);
  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
}

export default AppTitle;
