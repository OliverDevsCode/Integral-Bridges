import React from 'react'
import './LevelCard.css'
import { useNavigate } from 'react-router-dom';


const LevelCard = ({id,name,stars}) => {
  const navigate = useNavigate();
  return (
    <div className='card'>
        <h1>Level {id}</h1>
        <h2>{name}</h2>
        <p>Difficulty Stars: {stars}</p>
        <button onClick={() => navigate(`/play?id=${id}`)} >PLAY</button>
    </div>
  )
}

export default LevelCard