import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Explorer from './pages/Explorer'
import Songs from './pages/Songs'
import Review from './pages/Review'

function App() {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/explorer' element={<Explorer />} />
            {/* <Route exact path='/review' element={<Review />} /> */}
            <Route exact path='/songs' element={<Songs />} />
        </Routes>
    )
}

export default App;
