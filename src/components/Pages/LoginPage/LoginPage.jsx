import { useState, useContext } from "react";
import { SupabaseContext } from "../../Context/SupabaseContext";
import { useNavigate } from "react-router-dom";

import TextField from "../../Shared/Form/TextField/TextField";
import Submit from "../../Shared/Form/Submit/Submit";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const supabase = useContext(SupabaseContext);

  const login = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (error) console.error(`Status: ${error.status}, ${error.message}`);
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
