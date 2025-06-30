import React from 'react'
import './LevelDisplay.css'

const LevelDisplay = ({levelData}) => {
  return (
    <div className='level-details'>
      <p className='level'>Level {levelData.id}</p>
      <p className='stars'>Stars {levelData.stars}</p>
    </div>
  )
}

export default LevelDisplay