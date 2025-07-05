import calculateAnswer from './integrationFunctions';
import materials_json from '../level_data/materials.json' //for materials
import { evaluate} from 'mathjs';


const nerdamer = require('nerdamer/all');



export function generateLevel(levelData) {
  console.log(`recieved`,levelData)
  const k1 = randomInt(4,8)
  let k2 = randomInt(2,6)
  const a = randomInt(1,10)
  const b = randomInt(-5,-1)
  while(k2 >= k1){
    k2 -= 1
  }
  console.log(`K1:${k1}, K2:${k2}`)

  const customBridge = `(-1/${a})*x*(x${b})+${k1}`; //for json
  // const customTerrain = "sin(" + k2 + "*x)"  //for json
  const customTerrain = `1/${k2} * sin(x) + ${k2}`;//for json

  console.log("Bridge",customBridge)
  console.log("Terrain",customTerrain)

  const bridgeRoot = customBridge + "=" + k1;
  const bridgeLength = (nerdamer.solveEquations(bridgeRoot))[1] //for json

  //derive for max height
  const bridgeDeriv = nerdamer.diff(customBridge,"x").toString()
  console.log("Deriv of bridge",bridgeDeriv)
  const turningPoint = JSON.parse(nerdamer.solve(bridgeDeriv, "x").text());  // solve derivative == 0
  console.log("turning point",turningPoint)


  // Substitute x with and then evaluate
  let scope = {
                x: turningPoint
  }
  const turningY = Math.round(evaluate(customBridge, scope));
  console.log("turningY",turningY)
  const bridgeHeight = turningY * 2

  // const bridgeHeight = bridgeLength * 1.25
  console.log(`Bridge Length ${bridgeLength}`)

  //random bridge length

  const customBridgeFormatted = `y=-\\frac{1}{${a}}x\\left(x${b}\\right)+${k1}`; //for json
  const customTerrainFormatted = `y=\\frac{1}{${k2}}\\sin\\left(x\\right)+${k2}` //for json

  //calculate area for materials selection

  const result = parseFloat(calculateAnswer(customBridge,customTerrain,parseFloat(bridgeLength))[2])

  let strengthTarget;
let budgetTarget;

let selectedMaterialGroup = [];
let materialNames = [];
let materialObj = null;

let materialsIds;

// Pick material group based on result value
if (result <= 10) {
  selectedMaterialGroup = [materials_json[0], materials_json[1], materials_json[2]];
  materialsIds = '012'
} else if (result <= 20) {
  selectedMaterialGroup = [materials_json[3], materials_json[4], materials_json[5]];
  materialsIds = '345'

} else {
  selectedMaterialGroup = [materials_json[6], materials_json[7], materials_json[8]];
  materialsIds = '678'

}

  // selectedMaterialGroup = [materials_json[6], materials_json[7], materials_json[8]]; //hard coding


// Select a random material for cost/strength calculation
const randomSelect = randomInt(0, 2);
materialObj = selectedMaterialGroup[randomSelect];

// Compute budget and strength targets
budgetTarget = Math.floor(materialObj.cost * result * 1.25);
strengthTarget = Math.floor(materialObj.strength * result * 0.75);

// Get string names for the allowed materials
const materialsAllowed = selectedMaterialGroup.map(m => m.name);

  levelData.terrainEquation = customTerrain;
  levelData.bridgeEquation = customBridge;
  levelData.bridgeFormatted = customBridgeFormatted;
  levelData.groundFormatted = customTerrainFormatted;
  levelData.materialOptions = materialsAllowed;
  levelData.budget = budgetTarget;
  levelData.strength = strengthTarget;
  levelData.bridgeLength = parseFloat(bridgeLength);
  levelData.bridgeHeight = parseFloat(bridgeHeight);

  //when done return true
  console.log("|||||Generation Done!||||||||")
  console.log("Created:",levelData)

  //create seed for level
  const seed = `K${k1}K${k2}A${a}B${-b}b${budgetTarget}S${strengthTarget}M${materialsIds}L${bridgeLength}H${bridgeHeight}E` //E For end

  return [levelData,true,seed]

}

export function generateLevelFromSeed(levelData,seed){
  let k1;
  let k2;
  let a;
  let b;
  let bridgeLength;
  let bridgeHeight;
  let materialIds = [];
  let budgetTarget;
  let strengthTarget;

  let index = 1;

  let val = '';
  while(seed[index] !== 'K'){
    console.log("Current character",seed[index])
    val += seed[index]
    index ++
  }
  console.log("Val K1",val)
  k1 = parseInt(val)

  val = '';
  index ++ // skip closing K
  while(seed[index] !== 'A'){
    console.log("Current character",seed[index])
    val += seed[index]
    index ++
  }
  console.log("Val K2",val)
  k2 = parseInt(val)

  val = '';
  index ++ // skip closing A
  while(seed[index] !== 'B'){
    console.log("Current character",seed[index])
    val += seed[index]
    index ++
  }
  console.log("Val a",val)
  a = parseInt(val)

  val = '-';
  index ++ // skip closing B
  while(seed[index] !== 'b'){
    console.log("Current character",seed[index])
    val += seed[index]
    index ++
  }
  console.log("Val b",val)
  b = parseInt(val)

  val = '';
  index ++ // skip closing b
  while(seed[index] !== 'S'){
    console.log("Current character",seed[index])
    val += seed[index]
    index ++
  }
  console.log("Val budget",val)
  budgetTarget = parseInt(val)

  val = '';
  index ++ // skip closing S
  while(seed[index] !== 'M'){
    console.log("Current character",seed[index])
    val += seed[index]
    index ++
  }
  console.log("Val strength",val)
  strengthTarget = parseInt(val)

  val = [];
  index ++ // skip closing M
  while(seed[index] !== 'L'){
    console.log("Current character",seed[index])
    val.push(seed[index])
    index ++
  }
  console.log("Val material ids",val)
  materialIds = val

  val = '';
  index ++ // skip closing L
  while(seed[index] !== 'H'){
    console.log("Current character",seed[index])
    val += seed[index]
    index ++
  }
  console.log("Val length",val)
  bridgeLength = parseInt(val)

  val = '';
  index ++ // skip closing H
  while(seed[index] !== 'E'){
    console.log("Current character",seed[index])
    val += seed[index]
    index ++
  }
  console.log("Val height",val)
  bridgeHeight = parseInt(val)

  const selectedMaterialGroup = [materials_json[materialIds[0]], materials_json[materialIds[1]], materials_json[materialIds[2]]];
  console.log("selectedMaterialsGroup",selectedMaterialGroup)

  

  const materialsAllowed = selectedMaterialGroup.map(m => m.name);

  const customBridge = `(-1/${a})*x*(x${b})+${k1}`; //for json
  const customTerrain = `1/${k2} * sin(x) + ${k2}`;//for json

  const customBridgeFormatted = `y=-\\frac{1}{${a}}x\\left(x${b}\\right)+${k1}`; //for json
  const customTerrainFormatted = `y=\\frac{1}{${k2}}\\sin\\left(x\\right)+${k2}` //for json


  levelData.terrainEquation = customTerrain;
  levelData.bridgeEquation = customBridge;
  levelData.bridgeFormatted = customBridgeFormatted;
  levelData.groundFormatted = customTerrainFormatted;
  levelData.materialOptions = materialsAllowed;
  levelData.budget = budgetTarget;
  levelData.strength = strengthTarget;
  levelData.bridgeLength = parseFloat(bridgeLength);
  levelData.bridgeHeight = parseFloat(bridgeHeight);

  //when done return true
  console.log("|||||Generation Done!||||||||")
  console.log("Created:",levelData)

  return [levelData,true,seed]


  
  
}

function randomInt(min,max){
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num
}