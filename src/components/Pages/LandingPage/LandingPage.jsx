import { Link } from "react-router-dom";
import Button from "../../Shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Welcome to Charlie's Lounge!</div>
      <div className={styles.subTitle}>
        Login or create account to start chatting
      </div>
      <FontAwesomeIcon icon={faComments} className={styles.icon} />
      <div className={styles.buttonWrapper}>
        <Link to="/login">
          <Button primary label="Login" />
        </Link>
        <Link to="/signup">
          <Button label="Sign Up" />
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
