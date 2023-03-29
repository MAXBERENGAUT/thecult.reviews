import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Explorer from './pages/Explorer'
import Songs from './pages/Songs'
import Museums from './pages/Museums/Museums'
import Lists from './pages/Lists'
import Review from './pages/Review'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='songs' element={<Songs />} />
            <Route path='lists' element={<Lists />} />
            <Route path='museums/:slug' element={<Museums />} />
            <Route path='museums/:slug/:exhibit' element={<Review />} />
            <Route path=':category' element={<Explorer />} />
            <Route path=':category/:slug' element={<Review />} />
        </Routes>
    )
}

export default App;
