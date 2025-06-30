import React from 'react'
import { MathJax } from 'better-react-mathjax';
import './ShopItem.css'
import Button from '../Button/Button';


const ShopItem = ({name,cost,strength,setMaterial}) => {

  function selectMaterial(){
    setMaterial(name)
  }

  return (
    <div className='item'>
      <p>{name}</p>
      <MathJax>
                {`\\[ Cost: £\\,${cost} \\text{ per m}^2\\: below \\]`}
      </MathJax>
      <MathJax>
                {`\\[ Strength:\\,${strength} \\text{ per m}^2\\: below \\]`}
      </MathJax>
      <div className='button'>
        <Button text="SELECT" textcolor="white" buttoncolor ="green" onClick={() => { selectMaterial(); console.log("Added");}} />
      </div>
    </div>
  )
}

export default ShopItem