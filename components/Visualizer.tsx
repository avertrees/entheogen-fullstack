// processed EEG JSON https://firebasestorage.googleapis.com/v0/b/entheogen-a76f2.appspot.com/o/eeg%2F1d4df6b8-90ea-4437-8bea-fddb5b2802ba.json?alt=media&token=09a53f76-5b1f-450c-bf3c-dae19fe321d7
// raw EEG JSON https://firebasestorage.googleapis.com/v0/b/entheogen-a76f2.appspot.com/o/muse%2F020164cc-7d0b-4b61-8c37-4b38be8e52a5.json?alt=media&token=d4d4a9aa-c512-43d5-8b86-f4acd16c0426
"use client"
import P5 from "./P5Wrapper"
export const Visualizer = () => {
  return (
    <div>
      Viz
      <P5/>
      {/* <Button.Group widths='6' floated="right" compact >
        <Button id="gamma" onClick={this.handleGamma} color='red'>Gamma</Button>
        <Button id="beta" onClick={this.handleBeta} color='yellow' >Beta</Button>
        <Button id="alpha" onClick={this.handleAlpha} color='green'>Alpha</Button>
        
        <Button id="theta" onClick={this.handleTheta} color='blue'>Theta</Button>
        <Button id="delta" onClick={this.handleDelta} color='purple'>Delta</Button>
        
        <Button id="all" onClick={this.handleAll} >All</Button>
     </Button.Group> */}
    {/* {this.props.renderViz ? <P5Wrapper sketch={this.state.sketch} data={this.props.data}/> : null} */}
    {/* <P5Wrapper sketch={sketch} data={this.props.data} render={this.state} /> */}
    </div>
  )
}