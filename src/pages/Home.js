import './Home.css';

const CATEGORIES = [
    { name: 'Music', slug: 'music' },
    { name: 'Movies', slug: 'movies' },
    { name: 'Art (Museums)', slug: 'art' },
    { name: 'Songs of the Month', slug: 'songs' },
    { name: 'Literature', slug: 'literature' },
    { name: 'Television', slug: 'tv' },
]

function Category({name, slug}, index) {
    return (
        <h2 key={index}>
            <a 
                href={`./${slug}`}
                className={"category" + ((slug === 'songs') ? ' ul_gray' : '')}
            >
                {name}
            </a>
        </h2>
    )
}

function Home() {
    let items = CATEGORIES.map(Category)

    return (
        <div id='menu-home'>
            <h1 id='title'>The Cult</h1>
            {items}
        </div>
    )
}

export default Home