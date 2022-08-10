import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Explorer from './pages/Explorer'
import Songs from './pages/Songs'
import Review from './pages/Review'

function App() {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/songs' element={<Songs />} />
            <Route path=':category' element={<Explorer />} />
            <Route path=':category/:slug' element={<Review />} />
        </Routes>
    )
}

export default App;
