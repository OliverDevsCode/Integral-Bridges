import React, { useState, useEffect } from 'react';
import materials_json from '../../level_data/materials.json'
import { all, sort } from 'mathjs';


const AnswerBox = ({ setAnswerSubmitted,correctArea,groundIntegral,bridgeIntegral,userInputs,levelData }) => {

  const [userMaterial,setUserMaterial] = useState('');
  const [userArea,setUserArea] = useState('');
  const [userCost,setUserCost] = useState('');

  const [areaIsCorrect,setAreaIsCorrect] = useState(false); //used for validating if points are met
  const [costIsCorrect,setCostIsCorrect] = useState(false);
  const [inStrength,setInStrength] = useState(false);
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

    //compare with user inputs
    if(material_name == possible_materials[0].name){
      console.log("Best option picked")
      //best option picked
      if((parseFloat(area)).toPrecision(3) === correctArea){
        //area is correct
        setAreaIsCorrect(true)
        console.log("Area Correct")
      }
      if((parseFloat(cost)).toPrecision(3) === (possible_materials[0].cost * correctArea).toPrecision(3)){
        //correct area
        setCostIsCorrect(true)
        console.log("Cost Correct")
      }
      setInStrength(true)
    }else{
      console.log("checking possible other materials")
      for(let i=1; i < possible_materials.length;i++){
        if(material_name == possible_materials[i].name){
        console.log("inferer option picked")
        //best option picked
        if((parseFloat(area)).toPrecision(3) === correctArea){
        //area is correct
        setAreaIsCorrect(true)
        console.log("Area Correct")
        }
        if((parseFloat(cost)).toPrecision(3) === (possible_materials[i].cost * correctArea).toPrecision(3)){
        //correct area
        setCostIsCorrect(true)
        console.log("Cost Correct")
        }
        setInStrength(true)
      }
      }
    }

    if(area === correctArea){
      setAreaIsCorrect(true)
    }

    //answer checked
    setCheckedAnswer(true)
  }

  if(checkedAnswer == false){
    
  }

  return (
    <div>
      <p>Answer Box</p>
      <button onClick={goBack}>Go Back</button>
    </div>
  )
}

export default AnswerBox