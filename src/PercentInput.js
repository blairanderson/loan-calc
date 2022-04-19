import React from "react";

function PercentInput(props) {
  function onChange(e) {
    props.onChange(
      props.type === "float"
        ? parseFloat(e.target.value)
        : parseInt(e.target.value, 10)
    );
  }

  const [focus, setFocus] = React.useState(false);
  const step = props.type === "float" ? "0.01" : "1";

  return (
    <div>
      <div>
        <div>
          <label className="f6 b db mb2">
            {props.label || "MISSING LABEL"}
          </label>
        </div>
        <div>
          {focus ? (
            <input
              type="number"
              step={step}
              value={props.value}
              className={props.className}
              onChange={onChange}
              onBlur={(e) => {
                setFocus(false);
              }}
            />
          ) : (
            <input
              type="text"
              className={props.className}
              defaultValue={`${props.value}%`}
              readOnly={true}
              onFocus={(e) => {
                setFocus(true);
              }}
            />
          )}
        </div>
      </div>
      {false && (
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
            step={step}
            min={props.min}
            max={props.max}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
}

export default PercentInput;
