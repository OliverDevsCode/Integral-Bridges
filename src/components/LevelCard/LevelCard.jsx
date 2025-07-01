import React, {useEffect, useState} from 'react'
import './LevelCard.css'
import { useNavigate } from 'react-router-dom';


const LevelCard = ({id,name,stars}) => {
  const navigate = useNavigate();
  const [completed,setCompleted] = useState('neutral')

  useEffect(()=>{
    //check if in completed list
    const correctLevels = localStorage.getItem("progress-correct")
    if(correctLevels !== null){
      //check if current levelcard
      if(correctLevels.includes(id)){
        setCompleted('correct')
      }
    }
    const incorrectLevels = localStorage.getItem("progress-incorrect")
    if(incorrectLevels !== null){
      //check if current levelcard
      if(incorrectLevels.includes(id)){
        setCompleted('wrong')
      }
    }
  },[])
  

  return (
    <div className='card' id={String(completed)}>
        <h1>Level {id}</h1>
        <h2>{name}</h2>
        <p>Difficulty Stars: {stars}</p>
        <button onClick={() => navigate(`/play?id=${id}`)} >PLAY</button>
    </div>
  )
}

export default LevelCard