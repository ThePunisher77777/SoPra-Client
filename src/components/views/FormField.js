import 'styles/views/Login.scss';
import PropTypes from "prop-types";

const FormField = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        type={props.type}
        className="login input"
        placeholder={props.placeholder ?? "enter here.."}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default FormField;
