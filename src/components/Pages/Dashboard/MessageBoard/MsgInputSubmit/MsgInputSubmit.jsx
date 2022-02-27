import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import styles from "./MsgInputSubmit.module.css";

const MsgInputSubmit = ({ onClick }) => {
  return (
    <FontAwesomeIcon
      icon={faPaperPlane}
      className={styles.submit}
      onClick={onClick}
    />
  );
};

export default MsgInputSubmit;
