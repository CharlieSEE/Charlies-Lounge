import PropTypes from "prop-types";
import styles from "./TextField.module.css";

const TextField = ({
  type,
  placeholder,
  required,
  maxLength,
  value,
  onChange,
  label,
  htmlFor,
  error,
  errorMessage,
  autoComplete,
  ...rest
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputContainer}>
        <input
          id={htmlFor}
          className={styles.input}
          type={type}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          {...rest}
        />
        <div className={styles.icon}>IC</div>
      </div>
      {error ? <div className={styles.errorMessage}>{errorMessage}</div> : null}
    </div>
  );
};

TextField.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "number",
    "password",
    "date",
    "email",
    "tel",
    "url",
    "search",
  ]).isRequired,
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

TextField.defaultProps = {
  type: "text",
  placeholder: "",
  error: false,
};

export default TextField;
