import React , {useState,useEffect}from 'react'
import ShopItem from '../ShopItem/ShopItem'
import materials_json from '../../level_data/materials.json'

import './Shop.css'

const Shop = ({levelData}) => {

  const [materials, setMaterials] = useState([])

  console.log("Materials allowed",levelData.materialOptions)
  useEffect(() => {
        const allowed = []
        for(let i=0;i < levelData.materialOptions.length; i++){
          for(let j= 0; j < materials_json.length; j++){
          if(materials_json[j].name == levelData.materialOptions[i]){
            allowed.push(materials_json[j])
          }
        }
        }
        setMaterials(allowed)
        console.log(materials)
  },[]);
  

  return (
    <div className='shop-container'>
      <div className='title'>
        <p>Material Shop</p>
      </div>
      <div className='items'>
        {materials.map(material =>(
          <ShopItem name={material.name} cost={material.cost} strength={material.strength}/>
        ))}
      </div>
      
    </div>
  )
}

export default Shop