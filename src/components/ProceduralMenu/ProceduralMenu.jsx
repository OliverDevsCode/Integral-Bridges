import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';


import './ProceduralMenu.css'

const ProceduralMenu = () => {

  const navigate = useNavigate();

  const [userSeed,setUserSeed] = useState('')

  function handleInput (event){
    setUserSeed(event.target.value);
  }

  function validateInput(){
    if(userSeed.length > 0){
    navigate(`/play?id=6&seed=${userSeed}`)
    }
  }

  return (
    <div className='procedural-menu'>
      <div className='back-button-wrapper'>
      <Button
        text="Go Back"
        textcolor="white"
        buttoncolor="red"
        onClick={() => navigate(-1)}
      />
    </div>
      <h1>Procedural Menu</h1>
      <div className='load-container'>
        <p>Generate From Seed</p>
        <input className='seed-input' placeholder='Enter Seed' onChange={handleInput}></input>
        <button onClick={validateInput}>Generate</button>
      </div>
      <div className='new-container'>
          <p>Generate New Level</p>
          <button onClick={()=>{navigate('/play?id=6')}}>Play</button>
      </div>
      <div className='new-container'>
        <p>Explore Community Submitted Seeds</p>
        <button onClick={() => navigate('/seedLibrary')} >Find</button>
      </div>
    </div>
  )
}

export default ProceduralMenu