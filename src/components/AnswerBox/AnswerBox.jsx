import React, { useState, useEffect } from 'react';
import materials_json from '../../level_data/materials.json'
import { all, sort } from 'mathjs';
import { MoonLoader } from 'react-spinners';

import './AnswerBox.css'


const AnswerBox = ({ setAnswerSubmitted,correctArea,groundIntegral,bridgeIntegral,userInputs,levelData,setResults }) => {

  const [userMaterial,setUserMaterial] = useState('');
  const [userArea,setUserArea] = useState('');
  const [userCost,setUserCost] = useState('');

  const [areaIsCorrect,setAreaIsCorrect] = useState(false); //used for validating if points are met
  const [costIsCorrect,setCostIsCorrect] = useState(false);
  const [inStrength,setInStrength] = useState(false);
  const [mostEfficient,setMostEfficient] = useState(false)
  const [checkedAnswer,setCheckedAnswer] = useState(false)

  useEffect(()=>{
    console.log("Recieved User Inputs",userInputs)
    setUserMaterial(userInputs[0])
    setUserCost(userInputs[1])
    setUserArea(userInputs[2])
    markAnswer(userInputs[0],userInputs[1],userInputs[2])
  },[])

  function goBack(){
    setAnswerSubmitted(false)
  }

  function markAnswer(material_name,cost,area){
    console.log("Materials allowed",levelData.materialOptions)
    const allowed = []
    for(let i=0;i < levelData.materialOptions.length; i++){
        for(let j= 0; j < materials_json.length; j++){
        if(materials_json[j].name === levelData.materialOptions[i]){
            allowed.push(materials_json[j])
        }
      }
    }
    console.log(allowed)

    let possible_materials = []

    const required_strength = levelData.strength
    const required_budget = levelData.budget

    console.log("Requirements",required_strength,required_budget)

    //find material that works and it fits cost
    for(let i=0 ; i<allowed.length;i++){
      const temp_strength = allowed[i].strength * correctArea
      const temp_price = allowed[i].cost * correctArea
      console.log("Temp Material Stats",temp_strength,temp_price)
      if(temp_strength >= required_strength && temp_price <= required_budget){
        possible_materials.push(allowed[i])
      }
    }

    console.log("Possible Materials",possible_materials)

    //compare and sort for lowest cost
    possible_materials.sort((a, b) => a.cost - b.cost);

    //set this as correct answer
    console.log("Sorted Materials by cost",possible_materials)

    console.log("User Inputs",material_name,area,cost)

    //local for passing
    let local_efficient = false;
    let local_area = false;
    let local_cost = false;
    let local_strength = false;

    //compare with user inputs
    if(material_name == possible_materials[0].name){
      console.log("Best option picked")
      setMostEfficient(true)
      local_efficient = true
      //best option picked
      if((parseFloat(area)).toPrecision(3) === correctArea){
        //area is correct
        setAreaIsCorrect(true)
        local_area = true
        console.log("Area Correct")
      }
      if((parseFloat(cost)).toPrecision(3) === (possible_materials[0].cost * correctArea).toPrecision(3)){
        //correct area
        setCostIsCorrect(true)
        local_cost = true
        console.log("Cost Correct")
      }
      setInStrength(true)
      local_strength = true
    }else{
      console.log("checking possible other materials")
      for(let i=1; i < possible_materials.length;i++){
        if(material_name == possible_materials[i].name){
        console.log("inferer option picked")
        //best option picked
        if((parseFloat(area)).toPrecision(3) === correctArea){
        //area is correct
        setAreaIsCorrect(true)
        local_area = true
        console.log("Area Correct")
        }
        if((parseFloat(cost)).toPrecision(3) === (possible_materials[i].cost * correctArea).toPrecision(3)){
        //correct area
        setCostIsCorrect(true)
        local_cost = true
        console.log("Cost Correct")
        }
        setInStrength(true)
        local_strength = true
      }
      }
    }
    
    //check if area is correct with incorrect material
    if((parseFloat(area)).toPrecision(3) === correctArea){
      setAreaIsCorrect(true)
      local_area = true
    }

    //answer checked
    setCheckedAnswer(true)
    setResults([local_efficient,local_area,local_cost,local_strength])

    //save results to allow users to continue 
    if(local_efficient===true && local_area ===true && local_cost === true && local_strength === true){
      console.log("Level Completed")
      const existing = localStorage.getItem("progress-correct")
      console.log("existing progress-correct",existing)
      if(existing === null){
        localStorage.setItem("progress-correct",[levelData.id])
      }else{
        if(existing.includes(levelData.id) === false){
          console.log("existing is ",existing)
          localStorage.setItem("progress-correct",[existing,levelData.id])
          //remove from incorrect
          const incorrectProgress = JSON.parse("[" + (localStorage.getItem("progress-incorrect")) + "]");
          let newList = []
          incorrectProgress.sort((a,b)=>(a-b));
          for(let i=0;i<incorrectProgress;i++){
            if(incorrectProgress[i] !== levelData.id){
              newList.push(incorrectProgress[i])
            }
          }
          localStorage.setItem("progress-incorrect",newList)
        }
      }
    }else{
      console.log("Level Incorrect")
      const existing = localStorage.getItem("progress-incorrect")
      console.log("existing progress-incorrect",existing)
      if(existing === null){
        localStorage.setItem("progress-incorrect",[levelData.id])
      }else{
        if(existing.includes(levelData.id) === false){
          console.log("existing is ",existing)
          const incorrectProgress = JSON.parse("[" + (localStorage.getItem("progress-incorrect")) + "]");
          localStorage.setItem("progress-incorrect",incorrectProgress.push(levelData.id))
        }
      }
    }
  }

  if(checkedAnswer === false){
    return (
      <div>
        <p>Answer Box</p>
        <MoonLoader />
      </div>
    )
  }else{
    return (
    <div className='answer-box'>
      <p className='title'>Answer Box</p>
      <div className='results'>
        <div className='results'>
          <p className={String(mostEfficient)}>Most Efficient Material: {String(mostEfficient)}</p>
          <p className={String(areaIsCorrect)}>Correct Area: {String(areaIsCorrect)}</p>
          <p className={String(costIsCorrect)}>Correct Cost: {String(costIsCorrect)}</p>
          <p className={String(inStrength)}>Correct Strength: {String(inStrength)}</p>
      </div>
      </div>
      <button onClick={goBack}>Go Back</button>
    </div>
  )
  }

  
}

export default AnswerBox