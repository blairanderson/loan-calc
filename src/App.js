import React from "react";
import "./styles.css";
import "tachyons";
import AppTitle from "./AppTitle";
import NumberInput from "./NumberInput";
import DurationInput from "./DurationInput";
import PercentInput from "./PercentInput";
import ReadOnlyNumberInput from "./ReadOnlyNumberInput";
import Calculator from "./Calculator";
import { dollarify } from "./utils/dollarify";
import queryString from "query-string";
import Sharing from "./Components/Sharing";
import ZillowNav from "./Components/ZillowNav";
import Footer from "./Components/Footer";
import Amortization from "./Components/Amortization";

const inputClass = "input-reset tc ba b--black-20 pa2 mb2 db w-100";

function App() {
  const parsed = queryString.parse(window.location.search);

  const [amount, setAmount] = React.useState(
    parseFloat(parsed.amount || 1200000)
  );

  const [duration, setDuration] = React.useState(
    parseInt(parsed.duration || 360, 10)
  );

  const [interestRate, setInterestRate] = React.useState(
    parseFloat(parsed.interestRate || 6.975)
  );

  const [showAmortization, setShowAmortization] = React.useState(false);

  const { payments, total, monthlyRate, interest, excel } = Calculator({
    amount,
    duration,
    interestRate,
  });

  const handleAmortizationVisibility = () => {
    setShowAmortization(!showAmortization);
    console.log(showAmortization);
  };

  function NavClick(event, params) {
    event.preventDefault();
    setAmount(params.amount);
    setDuration(params.duration);
    setInterestRate(params.interestRate);
  }

  return (
    <div className="mw8 tc center w-100 system-sans-serif">
      <AppTitle {...{ amount, duration, interestRate }} />
      <ZillowNav onClick={NavClick} {...{ amount, duration, interestRate }} />
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

      <Sharing {...{ amount, duration, interestRate }} />
      <button onClick={() => handleAmortizationVisibility()}>
        {showAmortization ? "Hide" : "Show"} amortization schedule{" "}
      </button>
      {showAmortization ? (
        <Amortization
          payments={payments}
          excel={excel}
          inputClass={inputClass}
          dollarify={dollarify}
        />
      ) : null}
      <Footer />
    </div>
  );
}

export default App;
