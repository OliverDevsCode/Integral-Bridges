import './App.css';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Levels from './components/Levels/Levels';
import GameWindow from './gameWindow';
import GameTutorial from './components/Tutorial/GameTutorial';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/levels" element={<Levels />} />
      <Route path="/play" element={<GameWindow />} />
      <Route path="/tutorial" element={<GameTutorial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
