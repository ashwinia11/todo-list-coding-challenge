import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./MainNavigation.module.css";
import Notification from "../ui/Notification";

const MainNavigation = () => {
  const notification = useSelector((state) => state.ui.notification);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>To-Do App</div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">All To-Dos</Link>
          </li>
          <li>
            <Link href="/new-todo">Add New To-Do</Link>
          </li>
        </ul>
      </nav>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </header>
  );
};

export default MainNavigation;
