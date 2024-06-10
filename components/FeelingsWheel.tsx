// import React, { useState } from 'react';
// import '@/styles/FeelingsWheel.css';

// const feelingsData = [
//   { name: 'Joy', color: 'yellow', angle: 0 },
//   { name: 'Trust', color: 'green', angle: 45 },
//   { name: 'Fear', color: 'blue', angle: 90 },
//   { name: 'Surprise', color: 'lightblue', angle: 135 },
//   { name: 'Sadness', color: 'purple', angle: 180 },
//   { name: 'Disgust', color: 'green', angle: 225 },
//   { name: 'Anger', color: 'red', angle: 270 },
//   { name: 'Anticipation', color: 'orange', angle: 315 },
// ];

// const emotions = {
//   "primary_emotions": [
//     {"name": "Joy", "color": "#FFFF00"},
//     {"name": "Trust", "color": "#00FF00"},
//     {"name": "Fear", "color": "#008000"},
//     {"name": "Surprise", "color": "#00FFFF"},
//     {"name": "Sadness", "color": "#0000FF"},
//     {"name": "Disgust", "color": "#800080"},
//     {"name": "Anger", "color": "#FF0000"},
//     {"name": "Anticipation", "color": "#FFA500"}
//   ],
//   "secondary_emotions": [
//     {"name": "Love", "color": "#ADFF2F"},
//     {"name": "Submission", "color": "#5F9EA0"},
//     {"name": "Awe", "color": "#4682B4"},
//     {"name": "Disapproval", "color": "#9370DB"},
//     {"name": "Remorse", "color": "#8B4513"},
//     {"name": "Contempt", "color": "#A52A2A"},
//     {"name": "Aggressiveness", "color": "#FF4500"},
//     {"name": "Optimism", "color": "#FFD700"}
//   ],
//   "tertiary_emotions": [
//     {"name": "Serenity", "color": "#FFFFE0"},
//     {"name": "Acceptance", "color": "#98FB98"},
//     {"name": "Apprehension", "color": "#90EE90"},
//     {"name": "Distraction", "color": "#E0FFFF"},
//     {"name": "Pensiveness", "color": "#E6E6FA"},
//     {"name": "Boredom", "color": "#D3D3D3"},
//     {"name": "Annoyance", "color": "#FFB6C1"},
//     {"name": "Interest", "color": "#FFE4B5"}
//   ]
// }
// const Feeling = ({ feeling, onClick }) => (
//   <div
//     className="feeling-segment"
//     style={{
//       backgroundColor: feeling.color,
//       transform: `rotate(${feeling.angle}deg) skewY(-60deg)`,
//     }}
//     onClick={() => onClick(feeling.name)}
//   >
//     <div className="feeling-label" style={{ transform: `skewY(60deg) rotate(${feeling.angle * -1}deg)` }}>
//       {feeling.name}
//     </div>
//   </div>
// );

// const FeelingsWheel = () => {
//   const [selectedFeeling, setSelectedFeeling] = useState(null);

//   const handleClick = (feeling) => {
//     setSelectedFeeling(feeling);
//     alert(`You clicked on ${feeling}`);
//   };

//   return (
//     <div className="wheel-container">
//       {feelingsData.map((feeling) => (
//         <Feeling key={feeling.name} feeling={feeling} onClick={handleClick} />
//       ))}
//       {selectedFeeling && (
//         <div className="selected-feeling">
//           <h3>{`You selected: ${selectedFeeling}`}</h3>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeelingsWheel;

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const emotionsData = {
  primary: [
    { name: 'Joy', color: '#FFFF00' },
    { name: 'Trust', color: '#00FF00' },
    { name: 'Fear', color: '#008000' },
    { name: 'Surprise', color: '#00FFFF' },
    { name: 'Sadness', color: '#0000FF' },
    { name: 'Disgust', color: '#800080' },
    { name: 'Anger', color: '#FF0000' },
    { name: 'Anticipation', color: '#FFA500' }
  ],
  secondary: [
    { name: 'Love', color: '#ADFF2F' },
    { name: 'Submission', color: '#5F9EA0' },
    { name: 'Awe', color: '#4682B4' },
    { name: 'Disapproval', color: '#9370DB' },
    { name: 'Remorse', color: '#8B4513' },
    { name: 'Contempt', color: '#A52A2A' },
    { name: 'Aggressiveness', color: '#FF4500' },
    { name: 'Optimism', color: '#FFD700' }
  ],
  tertiary: [
    { name: 'Serenity', color: '#FFFFE0' },
    { name: 'Acceptance', color: '#98FB98' },
    { name: 'Apprehension', color: '#90EE90' },
    { name: 'Distraction', color: '#E0FFFF' },
    { name: 'Pensiveness', color: '#E6E6FA' },
    { name: 'Boredom', color: '#D3D3D3' },
    { name: 'Annoyance', color: '#FFB6C1' },
    { name: 'Interest', color: '#FFE4B5' }
  ]
};

const PieChart = () => {
  const ref = useRef();
  const [hoveredEmotion, setHoveredEmotion] = useState(null);

  useEffect(() => {
    drawChart();
  }, []);

  const drawChart = () => {
    const width = 500;
    const height = 500;
    const margin = 50;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arc = d3.arc()
      .innerRadius((d, i) => i * (radius / 3))
      .outerRadius((d, i) => (i + 1) * (radius / 3));

    const pie = d3.pie()
      .value(1)
      .sort(null);

    const layers = [emotionsData.primary, emotionsData.secondary, emotionsData.tertiary];

    layers.forEach((layer, layerIndex) => {
      const arcs = svg.selectAll(`.arc-${layerIndex}`)
        .data(pie(layer))
        .enter()
        .append('g')
        .attr('class', `arc arc-${layerIndex}`);

      arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => d.data.color)
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .on('mouseover', function(event, d) {
          setHoveredEmotion(d.data.name);
          d3.select(this).attr('stroke', '#000').attr('stroke-width', 2);
        })
        .on('mouseout', function(event, d) {
          setHoveredEmotion(null);
          d3.select(this).attr('stroke', 'white').attr('stroke-width', 1);
        });

      arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .text(d => d.data.name)
        .style('font-size', '10px')
        .style('fill', '#000');
    });
  };

  return (
    <div>
      <svg ref={ref}></svg>
      {hoveredEmotion && <div className="tooltip">{hoveredEmotion}</div>}
    </div>
  );
};

export default PieChart;