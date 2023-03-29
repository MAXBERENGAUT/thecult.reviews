import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explorer from "./pages/Explorer/Explorer";
import Songs from "./pages/Songs/Songs";
import Lists from "./pages/Lists/Lists";
import People from "./pages/People/People";
import MuseumExplorer from "./pages/Museums/MuseumExplorer";
import Museum from "./pages/Museums/Museum";
// import Exhibit from './pages/Museums/Exhibit'
import Review from "./pages/Explorer/Review";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="songs" element={<Songs />} />
      <Route path="lists" element={<Lists />} />
      <Route path="people" element={<People />} />
      <Route path="museums" element={<MuseumExplorer />} />
      <Route path="museums/:museum" element={<Museum />} />
      {/* <Route path='museums/:museum/:exhibit' element={<Exhibit />} /> */}
      <Route path=":category" element={<Explorer />} />
      <Route path=":category/:slug" element={<Review />} />
    </Routes>
  );
}

export default App;
