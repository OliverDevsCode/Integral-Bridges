import levels from '../../level_data/levels.json';
import React, { useEffect} from 'react';
import LevelCard from '../LevelCard/LevelCard';
import Button from '../Button/Button';
import '../../utils/levelData'
import { useNavigate } from 'react-router-dom';

import './Levels.css'

const Levels = () => {

  const navigate = useNavigate(); //for back button

  useEffect(() => {
        for(let i=0; i < levels.length;i++){
          console.log(levels[i])
        }
  },[]);
  
  return (
    <div>
      <div className='back-button'>
      <Button text={"Go Back"} textcolor={"white"} buttoncolor={"red"} onClick={() => navigate(`/`)}/>
      </div>
      {levels.map(level => (
        <LevelCard key = {level.id} id={level.id} name={level.name} stars = {level.stars}/>
      ))}
    </div>
  )
}

export default Levels