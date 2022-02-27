import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SupabaseContext } from "../../../Context/SupabaseContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import styles from "./SideNav.module.css";

const SideNav = () => {
  const [userName, setUserName] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const supabase = useContext(SupabaseContext);
  const navigate = useNavigate();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/");
  };

  useEffect(() => {
    const getCurrentUserNameAndAvatar = async () => {
      return await supabase
        .from("user")
        .select("display_name ,avatarURL")
        .match({ id: supabase.auth.currentUser.id });
    };
    getCurrentUserNameAndAvatar()
      .then((res) => {
        setAvatarURL(res.body[0].avatarURL);
        setUserName(res.body[0].display_name);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [supabase]);

  return (
    <nav className={styles.nav}>
      <figure>
        <img
          className={styles.avatar}
          height="240"
          width="240"
          src={avatarURL}
          alt="Avatar"
        />
        <figcaption>{userName}</figcaption>
      </figure>
      <Link to="/dashboard">
        <FontAwesomeIcon icon={faCommentDots} className={styles.sideNavIcon} />
      </Link>
      <Link to="/dashboard/settings">
        <FontAwesomeIcon icon={faGear} className={styles.sideNavIcon} />
      </Link>
      <div className={styles.sideNavIcon}>
        <FontAwesomeIcon icon={faRightFromBracket} onClick={logout} />
      </div>
    </nav>
  );
};

export default SideNav;
