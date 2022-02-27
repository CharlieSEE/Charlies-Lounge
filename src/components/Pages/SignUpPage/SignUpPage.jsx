import { useState, useContext } from "react";
import { SupabaseContext } from "../../Context/SupabaseContext";
import { useNavigate } from "react-router-dom";

import TextField from "../../Shared/Form/TextField/TextField";
import Submit from "../../Shared/Form/Submit/Submit";

import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState("");

  const supabase = useContext(SupabaseContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userPassword === userPasswordConfirmation) {
      console.log("ZŁE HASŁO");
      return;
    }
    const { user, session, error } = await supabase.auth.signUp(
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
    if (error) console.error(error);
    if (session) console.log(session);
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
          htmlFor="signup-username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <TextField
          id="signup-email"
          type="email"
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
