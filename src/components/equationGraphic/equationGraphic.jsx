import React, { useEffect, useState} from 'react';
import { MathJax } from 'better-react-mathjax';
import './equationGraphic.css'

const EquationGraphic = ({levelData}) => {

  const [GroundEquation, setGroundEquation] = useState('')
  const [BridgeEquation, setBridgeEquation] = useState('')

  useEffect(() => {
    setBridgeEquation(levelData.bridgeFormatted)
    setGroundEquation(levelData.groundFormatted)
  }, []); 

  return (
    <div className='equation-card-row'>
      <div className='equation-single' id='bridge'>
        <MathJax>
          {`\\[ ${BridgeEquation} \\]`}
        </MathJax>
        <p>Equation of Bridge</p>
      </div>
      <div className='equation-single' id='ground'>
        <MathJax>
          {`\\[ ${GroundEquation} \\]`}
        </MathJax>
        <p>Equation of Ground</p>
      </div>
    </div>
  )
}

export default EquationGraphic