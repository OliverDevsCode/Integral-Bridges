import levels from '../../level_data/levels.json';
import React, { useEffect} from 'react';
import LevelCard from '../LevelCard/LevelCard';
import '../../utils/levelData'

const Levels = () => {

  useEffect(() => {
        for(let i=0; i < levels.length;i++){
          console.log(levels[i])
        }
     });
  
  return (
    <div>
      {levels.map(level => (
        <LevelCard key = {level.id} id={level.id} name={level.name} stars = {level.stars}/>
      ))}
    </div>
  )
}

export default Levels