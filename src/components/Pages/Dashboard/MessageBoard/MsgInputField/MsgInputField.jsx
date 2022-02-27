import styles from "./MsgInputField.module.css";

const MsgInputField = ({
  placeholder,
  required,
  maxLength,
  value,
  onChange,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      className={styles.input}
    />
  );
};

MsgInputField.defaultProps = {
  placeholder: "",
};

export default MsgInputField;
