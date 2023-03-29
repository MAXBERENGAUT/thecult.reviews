import React, { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { CollectionLoader } from "utils/CollectionLoader";
import Arrow from "components/Arrow";
import styles from "./Explorer.module.css";

const TITLES = {
  music: "Music",
  movies: "Movies",
  art: "Art (Museums)",
  songs: "Songs of the Month",
  literature: "Literature",
  tv: "Television",
};

function Review(review, index) {
  const [fade, setFade] = useState("");

  return (
    <div
      className={styles.review}
      key={index}
      onMouseLeave={() => setFade("fade-out")}
    >
      <div className={styles.title + " " + fade}>
        <div className={styles.upper}>
          {review.artist ||
            review.director ||
            review.writer ||
            review.origin ||
            "Unknown"}
        </div>
        <div className={styles.lower}>{review.title}</div>
      </div>
      <img
        className={styles.image}
        src={review.images[0]}
        alt={review.title}
        onMouseEnter={() => setFade("fade-in")}
        onMouseOver={() => setFade("fade-in")}
        onTouchStart={() =>
          setFade(fade === "fade-in" ? "fade-out" : "fade-in")
        }
      />
      <Link
        className={styles.score + " " + fade}
        to={review.slug}
        reloadDocument
        style={{ cursor: fade === "fade-in" ? "pointer" : "default" }}
      >
        {review.score}
      </Link>
      <div className={styles.line + " " + fade} />
    </div>
  );
}

function choose(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function Title(category) {
  let style = useRef({});
  if (!("top" in style.current)) {
    style.current["top"] = `${Math.random() * 90}vh`;
    style.current["textAlign"] = choose(["left", "right", "center"]);
    style.current[choose(["left", "right"])] = "0";
  }

  return (
    <div id={styles.title} style={style.current}>
      {TITLES[category]}
    </div>
  );
}

function Explorer() {
  const category = useParams().category;
  const reviews = CollectionLoader[category]();
  const items = reviews.map(Review);

  return (
    <main>
      <Arrow />
      {Title(category)}
      <div id={styles.list}>{items}</div>
    </main>
  );
}

export default Explorer;
