import React from 'react';
import Sketch from 'react-p5';
import { useSearchParams } from 'react-router-dom';
import { getLevelDataById } from './levelData';

function P5Sketch() {
    //params will be level number
    //use helper function to gather equation of bridge and terrain line
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    console.log(`Receiving level ${id} `)
    const levelData = getLevelDataById(id);
    console.log(`Level Data:`,levelData)

  
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(500, 300).parent(canvasParentRef);
    }

    const draw = (p5) => {
        p5.background(255, 120, 20);
    }

    return (
        <Sketch setup={setup} draw={draw} />
    )
}

export default P5Sketch;