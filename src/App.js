import './App.css';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Levels from './components/Levels/Levels';
import GameWindow from './gameWindow';
import ProceduralMenu from './components/ProceduralMenu/ProceduralMenu';
import GameTutorial from './components/Tutorial/GameTutorial';
import SeedLibrary from './components/SeedLibrary/SeedLibrary';
import Contribute from './components/Contribute/Contribute';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Analytics } from "@vercel/analytics/react"



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/levels" element={<Levels />} />
      <Route path="/play" element={<GameWindow />} />
      <Route path="/tutorial" element={<GameTutorial />} />
      <Route path="/procedural" element={<ProceduralMenu />} />
      <Route path="/seedLibrary" element={<SeedLibrary />} />
      <Route path="/contribute" element={<Contribute />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
