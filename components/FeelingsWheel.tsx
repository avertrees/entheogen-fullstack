import React, { useState } from 'react';
import '@/styles/FeelingsWheel.css';

const feelingsData = [
  { name: 'Joy', color: 'yellow', angle: 0 },
  { name: 'Trust', color: 'green', angle: 45 },
  { name: 'Fear', color: 'blue', angle: 90 },
  { name: 'Surprise', color: 'lightblue', angle: 135 },
  { name: 'Sadness', color: 'purple', angle: 180 },
  { name: 'Disgust', color: 'green', angle: 225 },
  { name: 'Anger', color: 'red', angle: 270 },
  { name: 'Anticipation', color: 'orange', angle: 315 },
];

const Feeling = ({ feeling, onClick }) => (
  <div
    className="feeling-segment"
    style={{
      backgroundColor: feeling.color,
      transform: `rotate(${feeling.angle}deg) skewY(-60deg)`,
    }}
    onClick={() => onClick(feeling.name)}
  >
    <div className="feeling-label" style={{ transform: `skewY(60deg) rotate(${feeling.angle * -1}deg)` }}>
      {feeling.name}
    </div>
  </div>
);

const FeelingsWheel = () => {
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  const handleClick = (feeling) => {
    setSelectedFeeling(feeling);
    alert(`You clicked on ${feeling}`);
  };

  return (
    <div className="wheel-container">
      {feelingsData.map((feeling) => (
        <Feeling key={feeling.name} feeling={feeling} onClick={handleClick} />
      ))}
      {selectedFeeling && (
        <div className="selected-feeling">
          <h3>{`You selected: ${selectedFeeling}`}</h3>
        </div>
      )}
    </div>
  );
};

export default FeelingsWheel;
