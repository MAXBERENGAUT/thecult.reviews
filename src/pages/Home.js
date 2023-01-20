import './Home.css';

const CATEGORIES = [
    { name: 'Music', slug: 'music' },
    { name: 'Movies', slug: 'movies' },
    { name: 'Art (Museums)', slug: 'art' },
    { name: 'Songs of the Month', slug: 'songs' },
    { name: 'Literature', slug: 'literature' },
    { name: 'Television', slug: 'tv' },
    { name: 'Lists', slug: '' },
    { name: 'Memes', slug: '' },
    { name: 'People', slug: '' },
    { name: 'Write for Us', slug: '' },
]

function Category({name, slug}, index) {
    return (
        <h2 key={index}>
            <a 
                href={`./${slug}`}
                id={slug}
                className={"category"}
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