import React from "react";
import { Link } from "react-router-dom";
import styles from "./Arrow.module.css";

export default function Arrow() {
  return (
    <Link to="./.." id={styles.arrow} reloadDocument>
      ↩
    </Link>
  );
}
