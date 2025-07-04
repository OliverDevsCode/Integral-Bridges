import React from 'react'
import './LevelDisplay.css'

const LevelDisplay = ({levelData,seed}) => {

  console.log("seed",seed)

  if(seed === undefined){
    return (
        <div className='level-details'>
          <p className='level'>Level {levelData.id}</p>
          <p className='stars'>Stars {levelData.stars}</p>
        </div>
      )
  }else{
    return (
    <div className='level-details'>
          <p className='level'>Level {levelData.id}</p>
          <p className='stars'>Stars {levelData.stars}</p>
          <p>Seed: {seed}</p>
        </div>
    )
        
  }

  
}

export default LevelDisplay