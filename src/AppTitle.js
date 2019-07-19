import React from "react";
import useDocumentTitle from "@rehooks/document-title";
import { dollarify } from "./Calculator";

function AppTitle(props) {
  const { amount, duration, interestRate } = props;
  useDocumentTitle(
    `$${amount} Loan for ${duration} Months @ ${interestRate}% | Open Source Loan Calculator`
  );
  return (
    <h1>
      {`${dollarify(amount)} Loan`} <br />
      {`${duration} Months @ ${interestRate}%`} <br />
      {`Open Source Loan Calculator`} <br />{" "}
    </h1>
  );
}

export default AppTitle;