import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/">Charlie's Lounge</Link>
      </header>
      <Outlet />
      <footer className={styles.footer}>2020</footer>
    </div>
  );
};

export default Layout;
