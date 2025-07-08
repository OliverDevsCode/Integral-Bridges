import Algebrite from 'algebrite';
import { evaluate} from 'mathjs';
const nerdamer = require('nerdamer/all');

export default function calculateAnswer(bridge,ground,length,substitutionData){

  console.log("substitution",substitutionData[0])

  console.log("attemping to integrate",bridge)
  const bridge_integral = nerdamer.integrate(bridge).toString();
  console.log("bridge integration",bridge_integral)

  let bridge_result_upper;
  let bridge_result_lower;


  
  //check is subsitution
  if(substitutionData[0]===true){
    let scope = {
                x: evaluate(substitutionData[1],{x:length})
    }
    bridge_result_upper = evaluate(bridge_integral, scope); 
    console.log("bridge_result_upper, using sub",bridge_result_upper)

    scope = {
                x: evaluate(substitutionData[1],{x:0})
    }
    bridge_result_lower = evaluate(bridge_integral, scope); 
  }else{
    let scope = {
                x: length
    }
    bridge_result_upper = evaluate(bridge_integral, scope); 
    console.log("bridge_result_upper, normal",bridge_result_upper)

    scope = {
                x: 0
    }
    bridge_result_lower = evaluate(bridge_integral, scope); 
  }
  
  const bridge_area = bridge_result_upper-bridge_result_lower

  console.log(`Attemping to integrate ${ground}`)

  const ground_integral = Algebrite.integral(ground).toString();
  console.log("ground integration",ground_integral)
  
  //ground is never an integration by substitution 

  let scope = {
                x: length
  }
  const ground_result_upper = evaluate(ground_integral, scope); 

  scope = {
                x: 0
  }
  const ground_result_lower = evaluate(ground_integral, scope);

  const ground_area = ground_result_upper - ground_result_lower
  console.log(`Definite Integration: ${ground_area}`)


  const answer = (bridge_area-ground_area); //removed precision as it messed up future calcs

  console.log(`Area Below: ${answer}`)
  return [bridge_integral,ground_integral,answer]
}