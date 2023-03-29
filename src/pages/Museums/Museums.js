import { Link, useParams } from 'react-router-dom'
import styles from './Museums.module.css'
import Arrow from '../Arrow';

function Museums() {
    let { slug } = useParams()
    const museum = require(`/content/museums/${slug}`)
    
    return (
        <main>
            <Arrow />
            <div id={styles.home}>
                <h1 id={styles.title}>{museum.title}</h1>
                { museum.exhibits.map((exhibit) => (
                <Link key={exhibit.exhibit} to={exhibit.exhibit} reloadDocument className={styles.link}>
                  {exhibit.exhibit}
                </Link>
                ))}
            </div>
        </main>
    )
}

export default Museums