import { useState, useContext } from "react";
import { SupabaseContext } from "../../Context/SupabaseContext";
import { useNavigate } from "react-router-dom";

import TextField from "../../Shared/Form/TextField/TextField";
import Submit from "../../Shared/Form/Submit/Submit";

import {
  validateEmail,
  validatePassword,
} from "../../../utils/helpers/validators";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();
  const supabase = useContext(SupabaseContext);

  const login = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }
    if (!validatePassword(password)) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (error) {
      setEmailError(true);
      setPasswordError(true);
      return;
    }
    if (user) navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form className={styles.formContainer} onSubmit={login}>
        <TextField
          type="text"
          placeholder="Email"
          value={email}
          error={emailError}
          errorMessage="Wrong email"
          label="Email"
          htmlFor="login-email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <TextField
          type="password"
          placeholder="Password"
          value={password}
          error={passwordError}
          errorMessage="Wrong password"
          label="Password"
          htmlFor="login-password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <Submit value="Login" />
      </form>
    </div>
  );
};

export default LoginPage;
