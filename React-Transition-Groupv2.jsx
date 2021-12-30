import React, { useState, useRef } from 'react';
import { Transition } from 'react-transition-group';

const duration = 500;
const collapseStyles = {
  exited: {
    background: 'blue',
    display: 'none',
  },
  exiting: {
    background: 'gray',
    height: 0,
    overflow: 'hidden',
    transition: 'height 0.35s ease',
  },
  entering: {
    background: 'gray',
    height: 0,
    overflow: 'hidden',
    transition: 'height 0.35s ease',
  },
  entered: {
    background: 'red',
    display: 'block',
  },
};

function Collapse() {
  const [open, setOpen] = useState(false);
  const nodeRef = useRef();

  const handleButtonClick = () => {
    setOpen(!open);
  };

  /* -- Expanding -- */
  const handleEnter = () => {
    console.log('enter');
    nodeRef.current.style.height = '0';
  };

  const handleEntering = () => {
    console.log('entering');
    nodeRef.current.style.height = `${nodeRef.current.scrollHeight}px`;
  };

  const handleEntered = () => {
    console.log('entered');
    nodeRef.current.style.height = null;
  };

  /* -- Collapsing -- */
  const handleExit = () => {
    console.log('exit');
    nodeRef.current.style.height = `${nodeRef.current.scrollHeight}px`;
    nodeRef.current.offsetHeight; // eslint-disable-line no-unused-expressions
  };

  const handleExiting = () => {
    console.log('exiting');
    nodeRef.current.style.height = '0';
  };

  const handleExited = () => {
    console.log('exited');
  };

  return (
    <>
      <button onClick={handleButtonClick}>Toggle</button>
      <Transition
        in={open}
        timeout={duration}
        nodeRef={nodeRef}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        onExit={handleExit}
        onExiting={handleExiting}
        onExited={handleExited}
      >
        {(state) => (
          <>
            <div>hello</div>
            <div css={collapseStyles[state]} ref={nodeRef}>
              <h1 style={{ padding: 0, margin: 0 }}>Hello</h1>
            </div>
          </>
        )}
      </Transition>
    </>
  );
}

export default Collapse;
