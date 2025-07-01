import React from 'react'
import './HomeScreen.css'
import { useNavigate } from 'react-router-dom';
import levels from '../../level_data/levels.json'
import { sort } from 'mathjs';

const HomeScreen = () => {

  const navigate = useNavigate();

  function loadProgress(){
      const incorrectProgress = JSON.parse("[" + (localStorage.getItem("progress-incorrect")) + "]");
      console.log('incorrectProgress',incorrectProgress)
      console.log('incorrectProgress length',incorrectProgress.length)
      if(incorrectProgress[0] !== null && incorrectProgress.length !== 0){
        console.log("Loading Incorrect Game",incorrectProgress)
        navigate(`/play?id=${incorrectProgress[0]}`) 
      }
      const correctProgress = JSON.parse("[" + (localStorage.getItem("progress-correct")) + "]");
      console.log('correctProgress',correctProgress)
      if(correctProgress[0] !== null){
        (correctProgress).sort((a, b) => a-b)
        console.log("Next Game from",correctProgress)
        //calculate if all are finished
        const max_level = levels.length;
        if(correctProgress.length === max_level){
          console.log("all levels complete")
          alert("Congratulations you have completed all levels!")
        }else{
          //find which level to go to
          let redirected = false

          let previous = correctProgress[0]
          for(let i=1;i<correctProgress.length;i++){
            let current = correctProgress[i]
            console.log(`Previous ${previous}, Current:${current}`)
            if((current-previous) !== 1){
              navigate(`/play?id=${previous+1}`) 
              redirected = true
            }
            previous = correctProgress[i]
          }

          if(!redirected){
          (correctProgress).sort((a, b) => b-a)
          navigate(`/play?id=${parseInt(correctProgress[0])+1}`) 
          }
          
        }
      }

  }

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
        <button id='load' onClick={loadProgress}>Load Progress (New Feature)</button>
      </div>
    </div>
  )
}

export default HomeScreen