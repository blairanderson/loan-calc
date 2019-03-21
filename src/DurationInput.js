import React from "react";

function DurationInput(props) {
  function onChange(e) {
    props.onChange(parseInt(e.target.value.split(" ")[0]));
  }
  const [focus, setFocus] = React.useState(false);
  const [durationCadence, setDurationCadence] = React.useState("Months");

  const step = "1";
  const duration = `${props.value} ${durationCadence}`;

  return (
    <div>
      <div>
        <div>
          {props.label || "MISSING LABEL"} ({durationCadence})
        </div>
        <div>
          {focus ? (
            <input
              type="number"
              step={step}
              value={props.value}
              onChange={onChange}
              onBlur={e => {
                setFocus(false);
              }}
            />
          ) : (
            <input
              type="text"
              value={duration}
              onFocus={e => {
                setFocus(true);
              }}
            />
          )}
        </div>
      </div>
      <div>
        <input
          type="range"
          style={{
            displa: "block",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto"
          }}
          value={props.value}
          max={props.max}
          step={step}
          onChange={onChange}
        />
      </div>
      <div />
    </div>
  );
}

export default DurationInput;

function Foobar() {
  const durationCadence = "";
  function setDurationCadence() {}
  return (
    <select
      value={durationCadence}
      onChange={e => {
        setDurationCadence(e.target.value);
      }}
    >
      <option value={"months"}>months</option>
      <option value={"years"}>yeary</option>
    </select>
  );
}
