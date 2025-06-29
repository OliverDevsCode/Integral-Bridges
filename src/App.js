import './App.css';
import P5Sketch from './components/p5-sketch';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Levels from './components/Levels/Levels';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/levels" element={<Levels />} />
      <Route path="/play" element={<P5Sketch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
