import styles from "./People.module.css";

import Arrow from "components/Arrow";

function Lists() {
  return (
    <main>
      <Arrow />
      <div id={styles.home}>
        <h1 id={styles.title}>People</h1>
        <a href="https://maxberengaut.com" className={styles.link}>
          Max Berengaut
        </a>
        <a href="https://devines.org" className={styles.link}>
          Joshua Devine
        </a>
      </div>
    </main>
  );
}

export default Lists;
