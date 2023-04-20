import React from 'react';

const Clock = (props) => {
  console.log('props: ', props);
  const degrees = (props.count / props.duration) * 360;

  const secondHalf = props.count / props.duration > 0.5 && 'mask2';

  return (
    <div className="clock">
      <div
        className="rotator"
        style={{ transform: `rotate(${degrees}deg)` }}
      ></div>
      <div className={'mask ' + secondHalf}></div>
    </div>
  );
};

export default Clock;
