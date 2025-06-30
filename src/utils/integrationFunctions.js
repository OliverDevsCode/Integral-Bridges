import Algebrite from 'algebrite';
import { evaluate} from 'mathjs';
const nerdamer = require('nerdamer/all');

export default function calculateAnswer(bridge,ground,length){
  console.log("attemping to integrate",bridge)
  const bridge_integral = nerdamer.integrate(bridge).toString();
  console.log("bridge integration",bridge_integral)
  let scope = {
                x: length
  }
  const bridge_result_upper = evaluate(bridge_integral, scope); 

  scope = {
                x: 0
  }
  const bridge_result_lower = evaluate(bridge_integral, scope); 

  const bridge_area = bridge_result_upper-bridge_result_lower

  console.log(`Attemping to integrate ${ground}`)

  const ground_integral = Algebrite.integral(ground).toString();
  console.log("ground integration",ground_integral)

  scope = {
                x: length
  }
  const ground_result_upper = evaluate(ground_integral, scope); 

  scope = {
                x: 0
  }
  const ground_result_lower = evaluate(ground_integral, scope);

  const ground_area = ground_result_upper - ground_result_lower
  console.log(`Definite Integration: ${ground_area}`)


  const answer = (bridge_area-ground_area).toPrecision(3);

  console.log(`Area Below: ${answer}`)
  return [bridge_integral,ground_integral,answer]
}