import levels from '../../level data/levels.json';
import React, { useEffect, useState } from 'react';
import LevelCard from '../LevelCard/LevelCard';
import './Levels.css'

const Levels = () => {

  useEffect(() => {
        for(let i=0; i < levels.length;i++){
          console.log(levels[i])
        }
     });
  
  return (
    <div>
      {levels.map(level => (
        <LevelCard id={level.id} name={level.name} stars = {level.stars}/>
      ))}
    </div>
  )
}

export default Levels