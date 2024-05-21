import React, { useState } from 'react';

const feelingsData = [
  { name: 'Joy', color: 'yellow' },
  { name: 'Trust', color: 'green' },
  { name: 'Fear', color: 'blue' },
  { name: 'Surprise', color: 'lightblue' },
  { name: 'Sadness', color: 'purple' },
  { name: 'Disgust', color: 'green' },
  { name: 'Anger', color: 'red' },
  { name: 'Anticipation', color: 'orange' },
];

const Feeling = ({ feeling, onClick }) => (
  <div
    style={{
      backgroundColor: feeling.color,
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100px',
      cursor: 'pointer'
    }}
    onClick={() => onClick(feeling.name)}
  >
    {feeling.name}
  </div>
);

const FeelingsWheel = () => {
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  const handleClick = (feeling) => {
    setSelectedFeeling(feeling);
    alert(`You clicked on ${feeling}`);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: 'auto' }}>
      {feelingsData.map((feeling) => (
        <Feeling key={feeling.name} feeling={feeling} onClick={handleClick} />
      ))}
      {selectedFeeling && (
        <div style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
          <h3>{`You selected: ${selectedFeeling}`}</h3>
        </div>
      )}
    </div>
  );
};

export default FeelingsWheel;
