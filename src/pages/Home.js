import './Home.css';

const CATEGORIES = [
    'Music',
    'Movies',
    'Art (Museums)',
    'Songs of the Month',
    'Literature',
    'Television'
]

function Home() {
    let rows = CATEGORIES.map((category, index) => (
        <h2 key={index}>
            {category}
        </h2>
    ))

    return (
        <div>
            {rows}
        </div>
    )
}

export default Home