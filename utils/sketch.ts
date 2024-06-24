import { type Sketch } from "@p5-wrapper/react";
import {
  P5CanvasInstance,
  ReactP5Wrapper,
  SketchProps
} from "@p5-wrapper/react";
import React, { useEffect, useState } from "react";

type MySketchProps = SketchProps & {
  rotation: number;
};

export const sketch3: Sketch = (p5: P5CanvasInstance<MySketchProps>) => {
  let rotation = 0;

  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.updateWithProps = props => {
    if (props.rotation) {
      rotation = (props.rotation * Math.PI) / 180;
    }
  };

  p5.draw = () => {
    p5.background(100);
    p5.normalMaterial();
    p5.noStroke();
    p5.push();
    p5.rotateY(rotation);
    p5.box(100);
    p5.pop();
  };
};


type MySketch1Props = SketchProps & {
  data: object;
  render: object;
};


export const sketch1: Sketch = (p5: P5CanvasInstance<MySketch1Props>) => {
  // let data = getData()
  // console.log("data in sketch", data)
  console.log("props in sketch", p5)
  p5.props = {}

  p5.onSetAppState = () => { }

  let data = {}

  let i = 0;
 
  let n = 0;
  let n2 = 0;
  let n3 = 0;
  let n4 = 0;
  let n5 = 0;

  let x =0;
  let y =0;
  let x2 = 0; 
  let y2 = 0; 
  let rad = 0;
  let rad2 =0;

  let dist =0;
  let dist2 = 0;
  let x3 = 0;
  let y3 =0;
 
  let x4 =0;
  let y4 =0;
  let rad3 =0;
  let rad4 =0;
  let dist3 = 0;
  let dist4= 0;
 
  let x5 =0;
  let y5 =0;
  let rad5 =0;
  let dist5 =0;
 
  let yIn =0;
  let rotateBy =0;
  let ang =0;
  let incr = 1;
  let deg = 0;

  let width = 400 //localStorage.canvasWidth
  let height = 400//localStorage.canvasWidth
  let framec;

  let render = true
  let gammaL = 100
  let betaL = 100
  let alphaL = 100
  let thetaL = 100
  let deltaL = 100

  // let renderAlpha = false
  // let renderBeta = false
  // let renderGamma = false
  // let renderDelta = false
  // let renderTheta = false

  p5.setup = () => {
      // console.log("props in sketch setup", p5.props.data)
      // p5.createCanvas(width, height)
      // console.log("width: ", width)
      // console.log("localstorage width: ",localStorage.canvasWidth)
      p5.createCanvas(width, height) //p5.WEBGL)

      p5.colorMode("hsb", 360, 100, 100,1)
      p5.background(255, 0, 0)
      
      i = 0;
     
      rad = -20;
      rad2 = -20;
      rad3 = -20;
      rad4 = -20;
      rad5 = -20;

      dist = 300;
      dist2 = 350;
      dist3 = 400;
      dist4 = 450;
      dist5 = 500;
      
      n = 20;
      n2 = 100;
      n3 = 20;
      n4 = 100;
      n5 = 20;
      framec = 0
  }
  
  p5.updateWithProps = function (props) {
    console.log("props are: ", props)
      if (props.data) {
          console.log("data is:", props.data.data)
          data = props.data.data
          render = true
      }
      // if(props.render){
      //   console.log("props.render:", props.render)
      //     props.render.renderGamma ? gammaL = 100 : gammaL = 0
      //     props.render.renderBeta ? betaL = 100 : betaL = 0
      //     props.render.renderAlpha ? alphaL = 100 : alphaL = 0
      //     props.render.renderTheta ? thetaL = 100 : thetaL = 0
      //     props.render.renderDelta ? deltaL = 100 : deltaL = 0
      // }
  };


  // p5.updateWithProps = props => {
  //   if (props.data) {
  //     // console.log("data is:", props.data.data)
  //     // rotation = (props.rotation * Math.PI) / 180;
  //   }
  // };

  p5.draw = () => {
      
          if (p5.frameCount % 60 === 1) {
              p5.onSetAppState({ frameRate: p5.frameRate().toFixed(1) })
          }

          p5.noStroke()
          
          // console.log(!!data)
          // console.log('data is: ', data)
          // if (render) {
              framec = p5.frameCount / 60
              console.log("framec is: ", framec)
              i = parseInt(framec % data.delta.length) * 10;
              console.log("i is: ", i)

              console.log("data.delta[i] is: ", data.delta[i])

              rad = data.delta[i].scaled_rad;
              rad2 = data.theta[i].scaled_rad;
              rad3 = data.alpha[i].scaled_rad;
              rad4 = data.beta[i].scaled_rad;
              rad5 = data.gamma[i].scaled_rad;

              dist = data.delta[i].scaled_dist;
              dist2 = data.theta[i].scaled_dist;
              dist3 = data.alpha[i].scaled_dist;
              dist4 = data.beta[i].scaled_dist;
              dist5 = data.gamma[i].scaled_dist;

              n = 20//data.delta[i].scaled_noise;
              n2 = 20//data.theta[i].scaled_noise;
              n3 = 20//data.alpha[i].scaled_noise;
              n4 = 20//data.beta[i].scaled_noise;
              n5 = 20//data.gamma[i].scaled_noise;           
          // }

          console.log("rad is: ", rad)

          console.log("dist is: ", dist)

          console.log("n is: ", n)
        
          p5.fill(0,0,0, 0.1)
          p5.rect(0, 0, width, height);
          rotateBy += .003;
          p5.push();

          p5.translate(width / 2, height / 2);
          p5.rotate(rotateBy);

      while (deg <= 360) {
          deg += incr;
          // console.log("deg is: ", deg)
          ang = p5.radians(deg);
          // console.log("ang is: ", ang)

          if(deltaL === 100){
              p5.fill(280, 100, 100);
              x = p5.cos(ang) * (rad + (dist * p5.noise(y / n, yIn)));
              y = p5.sin(ang) * (rad + (dist * p5.noise(x / n, yIn)));
              p5.ellipse(x, y, 1.5, 1.5);
          }
          if (thetaL === 100) {
              p5.fill(240, 100, thetaL);
              x2 = p5.cos(ang) * (rad2 + (dist2 * p5.noise(y2 / n2, yIn)));
              y2 = p5.sin(ang) * (rad2 + (dist2 * p5.noise(y2 / n2, yIn)));
              p5.ellipse(x2, y2, 1.5, 1.5);
          }
          if (alphaL === 100) {
              p5.fill(100, 100, alphaL);
              x3 = p5.cos(ang) * (rad3 + (dist3 * p5.noise(y3 / n3, yIn)));
              y3 = p5.sin(ang) * (rad3 + (dist3 * p5.noise(x3 / n3, yIn)));
              p5.ellipse(x3, y3, 1.5, 1.5);
          }
          if (betaL === 100) {
              p5.fill(50, 100, betaL);
              x4 = p5.cos(ang) * (rad4 + (dist4 * p5.noise(y4 / n4, yIn)));
              y4 = p5.sin(ang) * (rad4 + (dist4 * p5.noise(y4 / n4, yIn)));
              p5.ellipse(x4, y4, 1.5, 1.5);
          }
          if (gammaL === 100) {
              p5.fill(0, 100, gammaL);
              x5 = p5.cos(ang) * (rad5 + (dist5 * p5.noise(y5 / n5, yIn)));
              y5 = p5.sin(ang) * (rad5 + (dist5 * p5.noise(y5 / n5, yIn)));
              p5.ellipse(x5, y5, 1.5, 1.5);
           }
      }
      deg = 0;
      yIn += .005;
      p5.pop();
  }

}

export const sketch2: Sketch = (p5) => {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
};
