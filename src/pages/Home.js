import netlifyIdentity from 'netlify-identity-widget'
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

function Form() {
    return (
      <form name="contact" method="post">
        <input type="hidden" name="test" value="contact" />
        <p>
          <label htmlFor="name">Name</label> <br />
          <input type="text" id="name" name="name" required />
        </p>
        <p>
          <label htmlFor="email">Email</label> <br />
          <input type="email" id="email" name="email" required />
        </p>
        <p>
          <label htmlFor="message">Message</label> <br />
          <textarea id="message" name="message" required></textarea>
        </p>
        <p>
          <input type="submit" value="Submit message" />
        </p>
      </form>
    );
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

            {/* TEST CODE */}
            <button onClick={handleLogIn} >Log in with Netlify</button>
            <Form />
            {/* TEST CODE */}
        </div>
    )
}

export default Home