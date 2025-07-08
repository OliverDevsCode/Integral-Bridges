import React, { useState, useEffect } from 'react';
import './InputBox.css';
import calculateAnswer from '../../utils/integrationFunctions'

import AnswerBox from '../AnswerBox/AnswerBox';

const InputBox = ({ levelData ,material,setResults}) => {

  const [correctArea,setCorrectArea] = useState(0)
  const [groundIntegral,setGroundIntegral] = useState('')
  const [bridgeIntegral,setBridgeIntegral] = useState('')
  const [answerSubmitted,setAnswerSubmitted] = useState(false)

  const [userArea,setUserArea] = useState([]);
  const [userCost,setUserCost] = useState([]);

  
  useEffect(()=>{
    //calculate correct answer
    const correctAnswer = calculateAnswer(levelData.bridgeEquation,levelData.terrainEquation,levelData.bridgeLength,levelData.substitution); 
    setBridgeIntegral(correctAnswer[0]);
    setGroundIntegral(correctAnswer[1]);
    setCorrectArea(correctAnswer[2])
  },[])

  const handleAreaChange = (event) => {
    setUserArea(event.target.value); // gets value from input
    console.log("New Area Input",userArea)
  };

  const handleCostChange = (event) => {
    setUserCost(event.target.value); // gets value from input
    console.log("New Cost Input",userCost)
  };

  function checkAnswer(){
    console.log("Checking Answer")
    setAnswerSubmitted(true)
  }

  if(answerSubmitted === true && material!==''){
    const userInputs = [material,userCost,userArea]
    return (
    <div>
      <AnswerBox setAnswerSubmitted={setAnswerSubmitted} correctArea={correctArea} groundIntegral={groundIntegral} bridgeIntegral={bridgeIntegral} userInputs ={userInputs} levelData={levelData} setResults={setResults} />
    </div>
    )
  }else if(answerSubmitted === true && material===''){
    alert("Please Select A Material")
    setAnswerSubmitted(false)
  }
  else{
    return (
      <div className='input-box'>
        <p className='title'>Input Box</p>
        <div inputMode='material-selection'>
          <p>Material Selected: {material}</p>
        </div>
        <div className='cost-input'>
          <p>Cost of Bridge (3.sf)</p>
          <input placeholder='cost'
          value={userCost}
          onChange={handleCostChange}
          ></input>
        </div>
        <div className='area-input'>
          <p>Area below m<sup>2</sup> (3.sf)</p>
          <input placeholder='area'
          value={userArea}
          onChange={handleAreaChange} 
        ></input>
        </div>
        <div className='submit'>
          <button onClick={checkAnswer}>Submit Answer</button>
        </div>
      </div>
    );
  }  
};

export default InputBox;
