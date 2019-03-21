import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import "tachyons";
import NumberInput from "./NumberInput";
import DurationInput from "./DurationInput";
import PercentInput from "./PercentInput";
import ReadOnlyNumberInput from "./ReadOnlyNumberInput";
import Calculator, { dollarify } from "./Calculator";

function App() {
  const [amount, setAmount] = React.useState(100000);
  const [duration, setDuration] = React.useState(120);
  const [interestRate, setInterestRate] = React.useState(4.75);
  const { payments, total, monthlyRate, interest, excel } = Calculator({
    amount,
    duration,
    interestRate
  });
  const inputClass = "input-reset tc ba b--black-20 pa2 mb2 db w-100";
  return (
    <div className="mw8 tc center w-100 system-sans-serif">
      <h1>{document.title}</h1>
      <div className="cf ">
        <div className="fl w-50">
          <NumberInput
            label="Amount"
            type="float"
            value={amount}
            className={inputClass}
            onChange={setAmount}
          />
          <DurationInput
            label="Duration"
            type="integer"
            max={360}
            value={duration}
            className={inputClass}
            onChange={setDuration}
          />
          <PercentInput
            label="Interest Rate"
            type="float"
            min={0}
            max={15}
            value={interestRate}
            className={inputClass}
            onChange={setInterestRate}
          />
        </div>
        <div className="fl w-50">
          <ReadOnlyNumberInput
            className={inputClass}
            value={dollarify(total)}
            label="Total"
          />
          <ReadOnlyNumberInput
            className={inputClass}
            value={dollarify(monthlyRate)}
            label="Monthly Rate"
          />
          <ReadOnlyNumberInput
            className={inputClass}
            value={dollarify(interest)}
            label="Total Interest"
          />
        </div>
      </div>
      <div>
        <div>Excel Function</div>
        <input
          readOnly={true}
          style={{ userSelect: "all" }}
          type="text"
          value={excel}
          className={inputClass}
        />
      </div>
      {payments.length > 0 && (
        <table className="table w-100 table-hover tr collapse">
          <thead>
            <tr>
              <th className="w-10 tl">#</th>
              <th className="w-20">Payment</th>
              <th className="w-20">Principal</th>
              <th className="w-20">Interest</th>
              <th className="w-30">Remaining Debt</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(function({
              index,
              amount,
              principal,
              interest,
              remainingAmount
            }) {
              return (
                <tr className="striped--near-white">
                  <td className="tl bb b--black-50">{index}</td>
                  <td className="bb b--black-50">{dollarify(amount)}</td>
                  <td className="bb b--black-50">{dollarify(principal)}</td>
                  <td className="bb b--black-50">{dollarify(interest)}</td>
                  <td className="bb b--black-50">
                    {dollarify(remainingAmount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
