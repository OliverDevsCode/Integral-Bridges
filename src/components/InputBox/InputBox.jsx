import React, { useState, useEffect } from 'react';
import './InputBox.css';

const InputBox = ({ levelData ,material}) => {

  // const correctAnswer = calculateAnswer(levelData.bridgeEquation,levelData.terrainEquation); //no preset answers
  
  useEffect(()=>{
    //do something
  },[])

  function checkAnswer(){
    console.log("Checking Answer")
  }

  return (
    <div className='input-box'>
      <p className='title'>Input Box</p>
      <div inputMode='material-selection'>
        <p>Material Selected: {material}</p>
      </div>
      <div className='cost-input'>
        <p>Cost of Bridge (3.sf)</p>
        <input placeholder='cost'></input>
      </div>
      <div className='submit'>
        <button onClick={checkAnswer}>Submit Answer</button>
      </div>
    </div>
  );
};

export default InputBox;
