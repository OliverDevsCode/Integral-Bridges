import React from 'react'
import './LibraryCard.css'
import { useNavigate } from 'react-router-dom';


const LibraryCard = ({title,seed,author}) => {
  const navigate = useNavigate();

  return (
    <div className='seed-card'>
      <h3>{title}</h3>
      <p className='seed-text'>Seed: {seed}</p>
      <p>Author: {author}</p>
      <button onClick={() => navigate(`/play?id=6&seed=${seed}`)} id='play-seed'>Click To Load Seed</button>
    </div>
  )
}

export default LibraryCard