import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeItem from "./Pages/AnimeItem.jsx";
import Gallery from "./Pages/Gallery.jsx";
import Homepage from "./Pages/Homepage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;