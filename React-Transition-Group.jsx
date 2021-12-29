//https://stackoverflow.com/questions/35111090/text-in-a-flex-container-doesnt-wrap-in-ie11

import React, { useState, useRef } from 'react';
import { Transition } from 'react-transition-group';

const duration = 1000;
const defaultStyle = {
  background: 'gray',
  transition: `height ${duration}ms ease-in-out`,
  overflowY: 'hidden',
  height: '0',
};

const transitionStyles = {
  entering: { height: '' },
  entered: { height: 'auto', overflowY: 'visible', background: 'red' },
  exiting: { height: '' },
  exited: { height: '0', overflowY: 'hidden', background: 'blue' },
};

function Fade() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const getTargetHeight = () => {
    const value = (ref.current.offsetHeight || 0).toString() + 'px';
    console.log('getTargetHeight → value: ', value);
    return value;
  };

  const handleButtonClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <button onClick={handleButtonClick}>Toggle</button>
      <Transition
        in={open}
        timeout={{ enter: duration, exit: 0 }}
        nodeRef={ref}
        // unmountOnExit={true}
        onEnter={() => {
          console.log('onEnter');
          transitionStyles.entering.height = getTargetHeight();
        }}
        onEntering={() => {
          console.log('onEntering');
        }}
        onEntered={() => {
          console.log('onEntered');
        }}
        onExit={() => {
          console.log('onExit');
          transitionStyles.exiting.height = getTargetHeight();
        }}
        onExiting={() => {
          console.log('onExiting');
        }}
        onExited={() => {
          console.log('onExited');
          // transitionStyles.exited.display = 'none';
        }}
      >
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <h1 ref={ref} style={{ padding: 0, margin: 0 }}>
              Hello
            </h1>
          </div>
        )}
      </Transition>
    </>
  );
}

export default Fade;
