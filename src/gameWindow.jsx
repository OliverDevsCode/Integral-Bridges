import React from 'react'
import P5Sketch from './components/BridgeRender/p5-sketch';
import EquationGraphic from './components/equationGraphic/equationGraphic';
import { useSearchParams } from 'react-router-dom';
import { getLevelDataById } from './utils/levelData';
import Button from './components/Button/Button';
import { useNavigate } from 'react-router-dom';

import './gameWindow.css'


const GameWindow = () => {

  const navigate = useNavigate(); //for back button
  

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  console.log(`Receiving level ${id} `)
  const levelData = getLevelDataById(id);
  console.log(`Level Data:`,levelData)
  
  return (
    <div className="game-window-container">
      <div className='left-column'>
        <Button text="Go Back" textcolor="white" buttoncolor ="red" onClick={() => navigate(`/levels`)} />

        </div>
        
      <div className='middle-column'>
        <EquationGraphic levelData={levelData}/>
        <P5Sketch levelData={levelData}/>
      </div>

      <div className='right-column'>

      </div>
      
    </div>
    
  )
}

export default GameWindow