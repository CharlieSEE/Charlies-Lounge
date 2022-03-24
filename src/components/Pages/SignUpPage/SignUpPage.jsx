import { useState, useContext } from "react";
import { SupabaseContext } from "../../Context/SupabaseContext";
import { useNavigate } from "react-router-dom";

import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../../utils/helpers/validators";

import TextField from "../../Shared/Form/TextField/TextField";
import Submit from "../../Shared/Form/Submit/Submit";

import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] =
    useState("Type proper email");
  const [userPassword, setUserPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);

  const supabase = useContext(SupabaseContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateUsername(userName)) {
      setUserNameError(true);
      return;
    } else {
      setUserNameError(false);
    }

    if (!validateEmail(userEmail)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (!validatePassword(userPassword)) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    if (userPassword !== userPasswordConfirmation) {
      setPasswordConfirmationError(true);
      return;
    } else {
      setPasswordConfirmationError(false);
    }

    const { user, error } = await supabase.auth.signUp(
      {
        email: userEmail,
        password: userPassword,
      },
      {
        data: {
          display_name: userName,
        },
      }
    );
    if (user) navigate("/dashboard");
    if (error) {
      switch (error.status) {
        case 400:
          setEmailError(true);
          setEmailErrorMessage(error.message);
          setPasswordError(false);
          setUserName(false);
          setPasswordConfirmationError(false);
          break;

        default:
          setEmailError(true);
          setPasswordError(true);
          setUserName(true);
          break;
      }
    }
  };
  return (
    <div className={styles.container}>
      <h2>Sign in</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <TextField
          id="signup-username"
          placeholder="Username"
          type="text"
          label="Username"
          error={userNameError}
          errorMessage="Username must be at least 4 characters long"
          maxLength={30}
          htmlFor="signup-username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <TextField
          id="signup-email"
          type="email"
          error={emailError}
          errorMessage={emailErrorMessage}
          placeholder="Email"
          label="Email"
          htmlFor="signup-email"
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          value={userEmail}
        />
        <TextField
          id="signup-password"
          type="password"
          placeholder="Password"
          error={passwordError}
          errorMessage="Password must be at least 6 characters long"
          label="Password"
          htmlFor="signup-password"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
          value={userPassword}
        />
        <TextField
          id="signup-password-confirm"
          type="password"
          placeholder="Retype password"
          label="Retype password"
          error={passwordConfirmationError}
          errorMessage="Passwords don't match"
          htmlFor="signup-password-confirm"
          onChange={(e) => {
            setUserPasswordConfirmation(e.target.value);
          }}
          value={userPasswordConfirmation}
        />
        <Submit value="Register" />
      </form>
    </div>
  );
};

export default SignUpPage;
