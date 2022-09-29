import "./InputText.css";
export function InputText(props) {
  function handleValueChanged(e) {
    props.onChange(e.target.value);
  }

  const autoComplete = props.autoComplete === "on" ? "on" : "off";
  let inputClassName = props.err
    ? "inputInvalid"
    : props.value.toString() !== props.orgValue.toString()
    ? "inputChanged"
    : "";
  return (
    <div className="inputTextGroup">
      <label>{props.label}</label>
      <div className="tooltipBase">
        {props.err && <div className="tooltipPopup">{props.err}</div>}
        <input
          className={inputClassName}
          id={props.id}
          name={props.name}
          type="text"
          autoComplete={autoComplete}
          value={props.value}
          onChange={handleValueChanged}
        />
      </div>
    </div>
  );
}
