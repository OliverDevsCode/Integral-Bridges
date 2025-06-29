import { useState } from 'react';
import Sketch from 'react-p5';
import { evaluate} from 'mathjs';
import './p5-sketch.css'

function P5Sketch({levelData}) {
    const [BridgePoints, setBridgePoints] = useState([])
    const [GroundPoints, setGroundPoints] = useState([])


    console.log(`Level Data:`,levelData)

    

    const bridge_equation = levelData.bridgeEquation;
    const ground_equation = levelData.terrainEquation;

    const screenH = window.innerHeight
    const screenW = window.innerWidth

    console.log(`Screen RES`,screenH,screenW)

    const canvasW = screenW*0.65
    const canvasH = screenH*0.6
    
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvasW, canvasH).parent(canvasParentRef);
        calculateBridge()
        calculateGround()
    }

    const draw = (p5) => {
        p5.background('#87CEEB')
        if (BridgePoints.length > 0) {
        drawBridge(p5); 
        }
        if (GroundPoints.length > 0) {
        drawGround(p5);
        }
    }

    const calculateBridge = (p5) => {
        let points = []
        const scale_factor = canvasW/10

        // provide a scope
        for(let i=0; i<10;i+=(10/(canvasW))){
        let scope = {
                x: i
        }
        const result = evaluate(bridge_equation, scope); 
        const correctedValue = canvasH-(result*scale_factor)
        points.push([i*scale_factor,correctedValue])
        }

        // console.log("Points:",points)
        setBridgePoints(points)
    };

    const calculateGround = (p5) => {
        let points = []
        const scale_factor = canvasW/10

        // provide a scope
        for(let i=0; i<10;i+=(10/(canvasW))){
        let scope = {
                x: i
        }
        const result = evaluate(ground_equation, scope); 
        const correctedValue = canvasH-(result*scale_factor)
        points.push([i*scale_factor,correctedValue])
        }

        // console.log("Points:",points)
        setGroundPoints(points)
    };


    const drawBridge = (p5) =>{
        p5.stroke('#000');
        p5.strokeWeight(4)
        p5.fill('#FFF');  
        const lastPoint = BridgePoints[BridgePoints.length-1]
        BridgePoints.forEach((point)=>{
            p5.point(point[0],point[1])
            if(point[0]===0){
                p5.push()
                p5.strokeWeight(8)
                p5.line(point[0],point[1]-20,0,canvasH)
                p5.pop()
            }
            if(point===lastPoint){
                p5.push()
                p5.strokeWeight(8)
                p5.line(point[0],point[1]-20,canvasW,canvasH)
                p5.pop()
            }
        })
    }

    const drawGround = (p5) =>{
        p5.stroke('#4F7942');
        p5.strokeWeight(4)
        GroundPoints.forEach((point)=>{
            p5.point(point[0],point[1])
            p5.line(point[0],point[1],point[0],canvasH)
        })
    }

    return (
    <div className="p5-wrapper">
        <Sketch setup={setup} draw={draw} />
    </div>
)
}

export default P5Sketch;