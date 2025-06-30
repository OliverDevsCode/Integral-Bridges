import React ,{useEffect} from 'react'
import './ObjectivesCard.css'

const ObjectivesCard = ({results,levelData}) => {

  useEffect(()=>{
    console.log("recieved",levelData)
  },[])

  console.log(results)

  return (
    <div className='container'>
      <p>Objectives</p>
      <div className='objectives-row'>
          <div className='objective-1'>
        <p className={String(results[3])}>Strength: {levelData.strength}</p>
      </div>
      <div className='objective-2'>
        <p className={String(results[2])}>Budget: £{levelData.budget}</p>
      </div>
      <div className='objective-3'>
        <p className={String(results[1])}>Correct Area</p>
      </div>

      </div>
      <div className='tip'>
        <p>Tip: {levelData.instructions}</p>
      </div>
    </div>
  )
}

export default ObjectivesCard