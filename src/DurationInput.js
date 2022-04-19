import React from "react";

function DurationInput(props) {
  function onChange(e) {
    props.onChange(parseInt(e.target.value.split(" ")[0], 10));
  }
  const durationCadence = "Months";
  const step = "1";

  return (
    <div>
      <div>
        <div>
          <label className="f6 b db mb2">
            {props.label || "MISSING LABEL"}{" "}
            <span className="normal black-60">({durationCadence})</span>
          </label>
        </div>
        <div>
          <input
            type="number"
            step={step}
            className={props.className}
            value={props.value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default DurationInput;

// function Foobar() {
//   const durationCadence = "";
//   function setDurationCadence() {}
//   return (
//     <select
//       value={durationCadence}
//       onChange={e => {
//         setDurationCadence(e.target.value);
//       }}
//     >
//       <option value={"months"}>months</option>
//       <option value={"years"}>yeary</option>
//     </select>
//   );
// }
