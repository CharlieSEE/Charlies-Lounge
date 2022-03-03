import styles from "./Button.module.css";

const Button = ({ primary, label, onClick }) => {
  return (
    <button
      className={primary ? styles.primary : styles.secondary}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
Button.defaultProps = {
  primary: false,
  label: "Text",
};

export default Button;
