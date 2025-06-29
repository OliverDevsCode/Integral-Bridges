import React from 'react';
import Sketch from 'react-p5';

function P5Sketch() {
    //params will be level number
    //use helper function to gather equation of bridge and terrain line

  
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