import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <h1 className={styles.welcome}>WELCOME TO THE BEST FOOD SITE</h1>
      <h3 className={styles.sentence}> "Count the Memories, not the CALORIES"</h3>
      <Link to="/home">
        <button className={styles.button}>Let's Start 👨‍🍳</button>
      </Link>
    </div>
  );
};

export default Landing;
