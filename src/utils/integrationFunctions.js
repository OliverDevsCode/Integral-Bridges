import Algebrite from 'algebrite';
import { evaluate} from 'mathjs';

export default function calculateAnswer(bridge,ground,length){
  const bridge_integral = Algebrite.integral(bridge).toString();
  console.log("bridge integration",bridge_integral)
  let scope = {
                x: length
  }
  const bridge_result = evaluate(bridge_integral, scope); 
  console.log(`Definite Integration: ${bridge_result}`)

  console.log(`Attemping to integrate ${ground}`)

  const ground_integral = Algebrite.integral(ground).toString();
  console.log("ground integration",ground_integral)

  scope = {
                x: length
  }
  const ground_result = evaluate(ground_integral, scope); 
  console.log(`Definite Integration: ${ground_result}`)

  const answer = (bridge_result-ground_result).toPrecision(3);

  console.log(`Area Below: ${answer}`)
  return [bridge_integral,ground_integral,answer]
}