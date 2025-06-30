import React from 'react'
import './HomeScreen.css'
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {

  const navigate = useNavigate();

  return (
    <div className='HomeScreen'>
      <div>
        <img src="/logo-no-bg.png" alt="Game-Logo"/>
      </div>
      <div className='title'>
        <h1>Welcome to Integral Bridges</h1>
        <h2>Calculus. Construct. Conquer.</h2>
      </div>
      <div className='options'>
        <button  onClick={() => navigate('/levels')} id='levels'>Levels</button>
        <button id='load'>Load Progress (Coming Soon)</button>
      </div>
    </div>
  )
}

export default HomeScreen