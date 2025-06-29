import './App.css';
import P5Sketch from './components/p5-sketch';
import HomeScreen from './components/HomeScreen';
import Levels from './components/Levels';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/levels" element={<Levels />} />
      <Route path="/game" element={<P5Sketch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
