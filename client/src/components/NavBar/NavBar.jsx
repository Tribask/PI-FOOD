import { Link } from "react-router-dom";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={styles.container}>
    
    <div className={styles.nav}>
      <div>
        <Link className={styles.home} to="/home">HOME</Link>
      </div>
      <div>
        <Link className={styles.create} to="/recipe">CREATE RECIPE 🧾</Link>
      </div>
      <div>
        <SearchBar />
      </div>
    </div>

    <div className={styles.filters}>
      <Filters />
    </div>

    </div>
  );
};

export default NavBar;
