import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
// import React from "react";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import {sketch1, sketch2, sketch3} from "@/utils/sketch";
import { Download } from "@/utils/firebase";
import {eeg, getData } from "@/utils/eeg"
import { NextResponse, NextRequest } from "next/server";
// import {getData} from "@/utils/"
// processed EEG JSON https://firebasestorage.googleapis.com/v0/b/entheogen-a76f2.appspot.com/o/eeg%2F1d4df6b8-90ea-4437-8bea-fddb5b2802ba.json?alt=media&token=09a53f76-5b1f-450c-bf3c-dae19fe321d7
import React, { useState, useEffect } from "react"
import data from "@/data/eeg/1d4df6b8-90ea-4437-8bea-fddb5b2802ba.json"
// const [results, setResults] = useState('')
// const [loading, setLoading] = useState(false)
// const getData = async () => {
//   setLoading(true)
//   // "1d4df6b8-90ea-4437-8bea-fddb5b2802ba" - eeg/
//   // 020164cc-7d0b-4b61-8c37-4b38be8e52a5 - muse/ await Download("020164cc-7d0b-4b61-8c37-4b38be8e52a5")
//   const res =  await fetch("https://firebasestorage.googleapis.com/v0/b/entheogen-a76f2.appspot.com/o/eeg%2F1d4df6b8-90ea-4437-8bea-fddb5b2802ba.json?alt=media&token=09a53f76-5b1f-450c-bf3c-dae19fe321d7") //
//   setResults(res)
//   setLoading(false)
//   console.log("res in getData before is: ", res.json())
//   const { data } = res.json()

//   // const contents = await res.download();
//   // console.log("contents are: ", contents);
//   // const parsedContents = JSON.parse(res);
//   // console.log("parsedContents :",parsedContents )
//   const eegData = await eeg(data.data)
//   // console.log("res in getData after is: ", res)
//   return res
// }

// const eegData = async () => {
//   const data = await getData()
//   return data
// }

export default function P5() {
  const [rotation, setRotation] = useState(0);
  const [render, setRender] = useState({
    renderAlpha: true,
    renderBeta: true,
    renderGamma: true,
    renderDelta: true,
    renderTheta: true
  })
  // localStorage.canvasWidth = width
  useEffect(() => {
    const interval = setInterval(
      () => setRotation(rotation => rotation + 100),
      100
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  // console.log("data in P5", data)
  return <NextReactP5Wrapper sketch={sketch1} data={data} render={render} />;

  // return <ReactP5Wrapper sketch={sketch3} rotation={rotation} />;
  // return <NextReactP5Wrapper sketch={sketch3}/>;

}