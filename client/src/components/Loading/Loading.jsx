import loading from "../../images/loading1.gif";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.image}>
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
