import { useState } from 'react';
import Sketch from 'react-p5';
import { evaluate, re} from 'mathjs';
import './p5-sketch.css'

function P5Sketch({levelData,results}) {
    const [BridgePoints, setBridgePoints] = useState([])
    const [GroundPoints, setGroundPoints] = useState([])


    console.log(`Level Data:`,levelData)

    

    const bridge_equation = levelData.bridgeEquation;
    const ground_equation = levelData.terrainEquation;
    const bridgeLength = levelData.bridgeLength

    const screenH = window.innerHeight
    const screenW = window.innerWidth

    console.log(`Screen RES`,screenH,screenW)

    const canvasW = screenW*0.65
    const canvasH = screenH*0.6

    let frame = 0;
    let cloudFrame = [0,canvasW/4,canvasW/2,canvasW/1.5];
    let cloudPosY = [20,40,60,20];


    const preload = (p5) => {
        p5.carGraphic = p5.loadImage('carGraphic.png');
        p5.cloud1 = p5.loadImage('/clouds/cloud1.png');
        p5.cloud2 = p5.loadImage('/clouds/cloud2.png');
        p5.cloud3 = p5.loadImage('/clouds/cloud3.png');
        calculateBridge()
        calculateGround()
    };
    
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvasW, canvasH).parent(canvasParentRef);
    }

    const draw = (p5) => {
        p5.background('#87CEEB')

        //clouds first - need to be overlayed
        for(let i=0; i < cloudFrame.length; i++){
            if(cloudFrame[i] >= canvasW){
                cloudFrame[i] = -80
                let change = 50 - Math.random(0,1) * 100
                while((cloudPosY[i]+change)>canvasH/2){
                    change = 50 - Math.random(0,1) * 100
                } 
                cloudPosY[i] = cloudPosY[i] +change
            } 
        }

        p5.image(p5.cloud1,cloudFrame[0],cloudPosY[0],70,50)
        p5.image(p5.cloud2,cloudFrame[1],cloudPosY[1],80,60)
        p5.image(p5.cloud3,cloudFrame[2],cloudPosY[2],70,60)
        p5.image(p5.cloud2,cloudFrame[3],cloudPosY[3],80,60)

        for(let i=0; i < cloudFrame.length; i++){
            cloudFrame[i] += 0.1
        }
        
        if (BridgePoints.length > 0) {
        drawBridge(p5); 
        }
        if (GroundPoints.length > 0) {
        drawGround(p5);
        }

        //draw label
        p5.push()
        p5.stroke('#000');
        p5.textSize(20)
        p5.text(`${bridgeLength}m`,canvasW-50,canvasH-50)
        p5.pop()

        //draw scale lines
        p5.push()
        p5.stroke('#FFF');
        p5.strokeWeight(4)
        p5.drawingContext.setLineDash([20, 10]);
        p5.line(0, canvasH-30, canvasW, canvasH-30);
        p5.pop()

        //car animation
        if(results.length !== 0){
            let lastAngle = 0;
            animateTestRun(p5,results,lastAngle)
        }

        
    }

    const animateTestRun = (p5,results,lastAngle) => {
        //image correct values

        //valid run - drive entire length
        if(results[1] ===true && results[3] === true){

            //loop animation
            if(frame === Math.round(canvasW-2)){
                frame = 0
            }

            const xCorrection = 50
            const yCorrection = 65

            const carPos = [frame,BridgePoints[frame][1]]

            //calculate angle
            const nextPoint = BridgePoints[frame+1][1]

            const deltaX = 1
            const deltaY = nextPoint - carPos[1]

            const angleToRotate = Math.atan2(deltaY, deltaX);
            
            p5.push();
            p5.translate((carPos[0] - xCorrection) + 50, (carPos[1] - yCorrection) + 50);
            p5.angleMode('RADIANS');
            p5.rotate(angleToRotate);
            p5.imageMode(p5.CENTER);
            p5.image(p5.carGraphic, 0, 0, 100, 100);
            p5.pop();
            
            //next frame
            frame++
        }
        if(results[1] ===false || results[3] === false){
            //loop animation
            const breakFrame = Math.round(canvasW*0.2); //break at certain 10% frame
            
            if(frame === Math.round((canvasW-2)*0.65)){
                frame = 0
            }

            const xCorrection = 50
            const yCorrection = 65

            const carPos = [frame,BridgePoints[frame][1]]

            //break at certain 10% frame

            
            if(frame >= breakFrame){
                const fallSpeed = 4;
                const fallFrame = frame-breakFrame
                const fallY = fallFrame * fallSpeed;
                const t = Math.min(fallFrame / 120, 1); 
                const currentAngle = lastAngle * (1 - t) + (Math.PI / 2) * t;

                p5.push();
                p5.translate(carPos[0] - xCorrection + 50, carPos[1] - yCorrection + fallY + 50);
                p5.angleMode('RADIANS');
                p5.rotate(currentAngle);
                p5.imageMode(p5.CENTER);
                p5.image(p5.carGraphic, 0, 0, 100, 100);
                p5.pop();
                p5.push()
                p5.strokeWeight(4)
                p5.line(breakFrame - xCorrection + 50,BridgePoints[breakFrame][1] - yCorrection + (fallY)+65,breakFrame - xCorrection+125,BridgePoints[breakFrame][1] - yCorrection + (fallY)+65)
                p5.pop()
            }else{
                //calculate angle
            const nextPoint = BridgePoints[frame+1][1]

            const deltaX = 1
            const deltaY = nextPoint - carPos[1]

            const angleToRotate = Math.atan2(deltaY, deltaX);
            p5.push();
            p5.translate((carPos[0] - xCorrection) + 50, (carPos[1] - yCorrection) + 50);
            p5.angleMode('RADIANS');
            p5.rotate(angleToRotate);
            p5.imageMode(p5.CENTER);
            p5.image(p5.carGraphic, 0, 0, 100, 100);
            p5.pop();
            lastAngle = angleToRotate
            }
            
            //next frame
            frame++


        }

        
    }

    const calculateBridge = (p5) => {
        let points = []
        const bridgeHeight = levelData.bridgeHeight
        const y_scale_factor = canvasH/bridgeHeight 
        const x_scale_factor = canvasW/bridgeLength 

        // provide a scope
        for(let i=0; i<bridgeLength;i+=(bridgeLength/(canvasW))){
        let scope = {
                x: i
        }
        const result = evaluate(bridge_equation, scope); 
        const correctedValue = canvasH-(result*y_scale_factor)
        points.push([i*x_scale_factor,correctedValue])
        }

        // console.log("Points:",points)
        setBridgePoints(points)
    };

    const calculateGround = (p5) => {
        let points = []
        const bridgeHeight = levelData.bridgeHeight
        const y_scale_factor = canvasH/bridgeHeight //hard coded 25m max bridge height
        const x_scale_factor = canvasW/bridgeLength //hard coded 25m max bridge height

        // provide a scope
        for(let i=0; i<bridgeLength;i+=(bridgeLength/(canvasW))){
        let scope = {
                x: i
        }
        const result = evaluate(ground_equation, scope); 
        const correctedValue = canvasH-(result*y_scale_factor)
        points.push([i*x_scale_factor,correctedValue])
        }

        // console.log("Points:",points)
        setGroundPoints(points)
    };


    const drawBridge = (p5) =>{
        p5.push()
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
        p5.pop()
    }

    const drawGround = (p5) =>{
        p5.push()
        p5.stroke('#4F7942');
        p5.strokeWeight(4)
        GroundPoints.forEach((point)=>{
            p5.point(point[0],point[1])
            p5.line(point[0],point[1],point[0],canvasH)
        })
        p5.pop()
    }

    return (
    <div className="p5-wrapper">
        <Sketch preload = {preload} setup={setup} draw={draw} />
    </div>
)
}

export default P5Sketch;