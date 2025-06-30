//react components
import React , {useState }from 'react'
import { useSearchParams } from 'react-router-dom';
import { getLevelDataById } from './utils/levelData';
import { useNavigate } from 'react-router-dom';

//first column
import Button from './components/Button/Button';
import LevelDisplay from './components/LevelDisplay/LevelDisplay';


//middle column
import P5Sketch from './components/BridgeRender/p5-sketch';
import EquationGraphic from './components/equationGraphic/equationGraphic';
import ObjectivesCard from './components/ObjectivesCard/ObjectivesCard';

//right column
import Shop from './components/Shop/Shop';
import InputBox from './components/InputBox/InputBox';

import './gameWindow.css'


const GameWindow = () => {

  const navigate = useNavigate(); //for back button

  const [material, setMaterial] = useState(''); //for sharing material selected

  const [results, setResults] = useState([]); //share results to different components
  

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  console.log(`Receiving level ${id} `)
  const levelData = getLevelDataById(id);
  console.log(`Level Data:`,levelData)
  
  return (
    <div className="game-window-container">
      <div className='left-column'>
        <Button text="Go Back" textcolor="white" buttoncolor ="red" onClick={() => navigate(`/levels`)} />
        <LevelDisplay levelData={levelData}/>
        </div>
        
      <div className='middle-column'>
        <EquationGraphic levelData={levelData}/>
        <P5Sketch levelData={levelData}/>
        <ObjectivesCard results={results} levelData={levelData}/>
      </div>

      <div className='right-column'>
        <Shop levelData={levelData} setMaterial={setMaterial}/>
        <InputBox levelData={levelData} material={material} setResults={setResults}/>
      </div>
      
    </div>
    
  )
}

export default GameWindow