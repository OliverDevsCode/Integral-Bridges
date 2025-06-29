import React from 'react'
import { MathJax } from 'better-react-mathjax';
import './ShopItem.css'
import Button from '../Button/Button';


const ShopItem = ({name,cost,strength}) => {
  return (
    <div className='item'>
      <p>{name}</p>
      <MathJax>
                {`\\[ Cost: £\\,${cost} \\text{ per m}^2\\: below \\]`}
      </MathJax>
      <MathJax>
                {`\\[ Strength:\\,${strength} \\]`}
      </MathJax>
      <div className='button'>
        <Button text="SELECT" textcolor="white" buttoncolor ="green" onClick={() => console.log("Added")} />
      </div>
    </div>
  )
}

export default ShopItem