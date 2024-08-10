
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayScreen from "./page/play";
import Home from "./page/home";

function App() {


  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<Home />} />
        <Route path="/play-screen/:number" element={<PlayScreen />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
