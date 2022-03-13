import styles from "./MsgInputField.module.css";

const MsgInputField = ({
  placeholder,
  required,
  maxLength,
  value,
  onChange,
  spellCheck,
}) => {
  return (
    <textarea
      spellCheck={spellCheck}
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
