import find from "../../images/busqueda.png"
import styles from "./Error.module.css"

const Error=()=>{
    return(
        <div className={styles.errors}>
            <img src={find} alt="Not Found" />
            <h1>Recipe not found</h1>
        </div>
    )
}

export default Error;