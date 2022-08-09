import './Home.css';


const CATEGORIES = [
    'Music',
    'Movies',
    'Art (Museums)',
    'Songs of the Month',
    'Literature',
    'Television'
]

function Category(name, index) {
    return (
        <h2 key={index}>
            <a 
                href={(name === 'Songs of the Month') ? './songs' : './explorer'}
                className={"category" + ((name === 'Songs of the Month') ? ' ul_gray' : '')}
            >
                {name}
            </a>
        </h2>
    )
}

function Home() {
    let items = CATEGORIES.map(Category)

    function handleLogIn () {
        netlifyIdentity.open()
    }

    return (
        <div id='menu-home'>
            <h1 id='title'>The Cult</h1>
            {items}
        </div>
    )
}

export default Home