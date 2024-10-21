import useFormOptions from "../../hooks/useFormOptions";
import backIcon from "../../assets/back-icon.png";

const FormMode = ({ mode, options, back, handleSubmit }) => {
  const [formOptions, handleChange] = useFormOptions(options);

  const activateChange = (option) => {
    document.getElementById(option).click();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, formOptions)}>
      <div className="form-title">
        <img className="back" src={backIcon} alt="back" onClick={back} />
        <div>{`Select ${mode}`}</div>
      </div>
      
      <div className="option-selection">
        {options.map((option) => {
          return (
            <div key={option} onClick={() => activateChange(option)}>
              <input
                type="checkbox"
                id={option}
                value={option}
                onChange={handleChange}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          );
        })}
      </div>
      <input type="submit" />
    </form>
  );
};

export default FormMode;
