import calculateAnswer from './integrationFunctions';
import materials_json from '../level_data/materials.json' //for materials
import { evaluate} from 'mathjs';


const nerdamer = require('nerdamer/all');



export function generateLevel(levelData) {
  console.log(`recieved`,levelData)
  const k1 = randomInt(2,4)
  let k2 = randomInt(1,3)
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

// // Pick material group based on result value
// if (result <= 10) {
//   selectedMaterialGroup = [materials_json[0], materials_json[1], materials_json[2]];
// } else if (result <= 50) {
//   selectedMaterialGroup = [materials_json[3], materials_json[4], materials_json[5]];
// } else {
//   selectedMaterialGroup = [materials_json[6], materials_json[7], materials_json[8]];
// }

  selectedMaterialGroup = [materials_json[6], materials_json[7], materials_json[8]]; //hard coding


// Select a random material for cost/strength calculation
const randomSelect = randomInt(0, 2);
materialObj = selectedMaterialGroup[randomSelect];

// Compute budget and strength targets
budgetTarget = Math.floor(materialObj.cost * result * 1.25);
strengthTarget = materialObj.strength * result * 0.75;

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
  return [levelData,true]

}

function randomInt(min,max){
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num
}