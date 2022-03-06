import { useState, useContext, useRef } from "react";
import { SupabaseContext } from "../../../Context/SupabaseContext";
import { useNavigate } from "react-router-dom";
import {
  getNewAvatarPublicURL,
  updateNewAvatar,
  updateUserAvatarURL,
  updateUsername,
} from "./Settings.logic.js";

import TextField from "../../../Shared/Form/TextField/TextField";
import Submit from "../../../Shared/Form/Submit/Submit";

import styles from "./Settings.module.css";

const Settings = () => {
  const [newNick, setNewNick] = useState("");
  const [avatarSuccesMessage, setAvatarSuccesMessage] = useState("");
  const supabase = useContext(SupabaseContext);
  const navigate = useNavigate();
  const fileInput = useRef();

  const nickChanged = async (e) => {
    e.preventDefault();
    try {
      updateUsername(supabase, newNick);
      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const updateAvatar = async (e) => {
    e.preventDefault();
    const newAvatarFle = fileInput.current.files[0];
    const currentUser = supabase.auth.currentUser.id;
    const extension = newAvatarFle.type.slice(
      newAvatarFle.type.indexOf("/") + 1
    );

    try {
      updateNewAvatar(supabase, currentUser, extension, newAvatarFle);
      const publicURL = getNewAvatarPublicURL(supabase, currentUser, extension);
      updateUserAvatarURL(supabase, currentUser, publicURL);
      setAvatarSuccesMessage("Avatar update successfully");
    } catch (err) {
      console.log(err);
      setAvatarSuccesMessage("Avatar update failed");
    }
  };

  return (
    <div className={styles.page}>
      <h1>Settings</h1>
      <h2>Nick change</h2>
      <form className={styles.page} onSubmit={nickChanged}>
        <TextField
          label="New Username"
          type="text"
          value={newNick}
          onChange={(e) => {
            setNewNick(e.target.value);
          }}
          placeholder="Nowa nazwa"
        />
        <Submit value="Prześlij" />
      </form>
      <h2>Avatar change</h2>
      <form className={styles.page} onSubmit={updateAvatar}>
        <input
          type="file"
          ref={fileInput}
          required
          accept=".png, .jpg, .jpeg, .webp"
        />
        <Submit value="Prześlij" />
        {avatarSuccesMessage}
      </form>
    </div>
  );
};

export default Settings;
