import PropTypes from "prop-types";
import styles from "./Submit.module.css";

const Submit = ({ value, ...rest }) => {
  return (
    <input className={styles.submit} type="submit" value={value} {...rest} />
  );
};

Submit.propTypes = {
  value: PropTypes.string.isRequired,
};


export default Submit;
