import { Outlet } from "react-router-dom";
import SideNav from "./SideNav/SideNav";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <main className={styles.dashboard}>
      <SideNav />
      <Outlet />
    </main>
  );
};

export default Dashboard;
