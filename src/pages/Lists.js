import { Link } from 'react-router-dom'
import styles from './Lists.module.css'

import Arrow from './Arrow';

// const CATEGORIES = [
//     { name: 'Music', slug: 'music' },
//     { name: 'Movies', slug: 'movies' },
//     { name: 'Art (Museums)', slug: 'art' },
//     { name: 'Songs of the Month', slug: 'songs' },
//     { name: 'Literature', slug: 'literature' },
//     { name: 'Television', slug: 'tv' },
//     { name: 'Lists', slug: '' },
//     { name: 'Memes', slug: '' },
//     { name: 'People', slug: '' },
//     { name: 'Write for Us', slug: '' },
// ]

// function Category({name, slug}, index) {
//     return (
//         <h2 key={index}>
//             <Link 
//                 to={slug}
//                 reloadDocument
//                 id={styles[slug]}
//                 className={styles.link}
//             >
//                 {name}
//             </Link>
//         </h2>
//     )
// }

function Lists() {
    // let items = CATEGORIES.map(Category)

    return (
        <main>
            <Arrow />
            <div id={styles.home}>
                <h1 id={styles.title}>Lists</h1>
                <Link to="../songs" reloadDocument className={styles.link}>
                    Songs of the Month
                </Link>
            </div>
        </main>
    )
}

export default Lists