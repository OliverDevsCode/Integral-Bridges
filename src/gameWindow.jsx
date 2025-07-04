//react components
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { getLevelDataById } from './utils/levelData';
import { generateLevel, generateLevelFromSeed } from './utils/generateLevel';
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const userSeed = searchParams.get('seed');

  const [levelData, setLevelData] = useState(null); // state to hold final level
  const [readyToDisplay, setReadyToDisplay] = useState(false);
  const [material, setMaterial] = useState('');
  const [results, setResults] = useState([]);

  const [seed,setSeed] = useState('');

  useEffect(() => {
    const baseData = getLevelDataById(id);

    console.log("Recieved User Seed",userSeed);

    if (baseData.prodecural && userSeed === null) {
      console.log("Procedural level... Generating NEW");
      const [generatedLevel, success, seedGenerated] = generateLevel({ ...baseData }); // clone to avoid mutation
      setLevelData(generatedLevel);
      setReadyToDisplay(success);
      setSeed(seedGenerated)
      console.log("Seed Generated:",seedGenerated)
    } else if (baseData.prodecural === true && userSeed !== null){
      console.log("Procedural level... Generating From Seed");
      const [generatedLevel, success, seedGenerated] = generateLevelFromSeed({ ...baseData },userSeed); // clone to avoid mutation
      setLevelData(generatedLevel);
      setReadyToDisplay(success);
      setSeed(seedGenerated)
      console.log("Seed Generated:",seedGenerated)
    } 
    else {
      setLevelData(baseData);
      setReadyToDisplay(true);
    }
  }, [id]); // Only runs once when component mounts or id changes

  if (!readyToDisplay || !levelData) {
    return <div><p>Generating Level</p></div>;
  }

  return (
    <div className="game-window-container">
      <div className='left-column'>
        <Button text="Go Back" textcolor="white" buttoncolor="red" onClick={() => navigate(-1)} />
        <LevelDisplay levelData={levelData} seed={seed} />
      </div>

      <div className='middle-column'>
        <EquationGraphic levelData={levelData} />
        <P5Sketch levelData={levelData} results={results}/>
        <ObjectivesCard results={results} levelData={levelData} />
      </div>

      <div className='right-column'>
        <Shop levelData={levelData} setMaterial={setMaterial} />
        <InputBox levelData={levelData} material={material} setResults={setResults} />
      </div>
    </div>
  );
};

export default GameWindow;