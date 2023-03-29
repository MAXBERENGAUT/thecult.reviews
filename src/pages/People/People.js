import { Link } from "react-router-dom";
import styles from "./People.module.css";

import Arrow from "components/Arrow";

function Lists() {
  return (
    <main>
      <Arrow />
      <div id={styles.home}>
        <h1 id={styles.title}>People</h1>
        <Link to="https://maxberengaut.com" reloadDocument className={styles.link}>
          Max Berengaut
        </Link>
        <Link to="https://devines.org" reloadDocument className={styles.link}>
          Joshua Devine
        </Link>
      </div>
    </main>
  );
}

export default Lists;
