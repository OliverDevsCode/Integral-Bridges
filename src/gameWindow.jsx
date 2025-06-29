import React from 'react'
import P5Sketch from './components/BridgeRender/p5-sketch';
import EquationGraphic from './components/equationGraphic/equationGraphic';
import { useSearchParams } from 'react-router-dom';
import { getLevelDataById } from './utils/levelData';

import './gameWindow.css'


const GameWindow = () => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  console.log(`Receiving level ${id} `)
  const levelData = getLevelDataById(id);
  console.log(`Level Data:`,levelData)
  
  return (
    <div className="game-window-container">
      <EquationGraphic levelData={levelData}/>
      <P5Sketch levelData={levelData}/>
    </div>
    
  )
}

export default GameWindow