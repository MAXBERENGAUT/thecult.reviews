import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const CATEGORIES = [
  { name: "Music", slug: "music" },
  { name: "Movies", slug: "movies" },
  { name: "Art (Museums)", slug: "art" },
  { name: "Songs of the Month", slug: "songs" },
  { name: "Literature", slug: "literature" },
  { name: "Television", slug: "tv" },
  { name: "Lists", slug: "lists" },
  { name: "Memes", slug: "" },
  { name: "People", slug: "people" },
  { name: "Write for Us", slug: "" },
];

function Category({ name, slug }, index) {
  return (
    <h2 key={index}>
      <Link to={slug} reloadDocument id={styles[slug]} className={styles.link}>
        {name}
      </Link>
    </h2>
  );
}

function Home() {
  let items = CATEGORIES.map(Category);

  return (
    <main id={styles.home}>
      <h1 id={styles.title}>The Cult</h1>
      {items}
    </main>
  );
}

export default Home;
