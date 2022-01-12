import React, { useState, useRef } from 'react';
import { Transition } from 'react-transition-group';

const timing = 350;
const timingFn = 'ease-out';
const commonStyle = {
  background: 'gray',
  height: 0,
  overflow: 'hidden',
  transition: `height ${timing}ms ${timingFn}`,
};

const collapseStyles = {
  exited: {
    background: 'blue',
    display: 'none',
  },
  exiting: commonStyle,
  entering: commonStyle,
  entered: {
    background: 'red',
    display: 'block',
  },
};

function ExpandPanel(props) {
  const [open, setOpen] = useState(false);
  const nodeRef = useRef();
  const { children, ...rest } = props;

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
        timeout={timing}
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
            <div
              css={collapseStyles[state]}
              ref={nodeRef}
              {...rest}
              style={{ width: '200px', height: '200px' }}
            >
              {children}
            </div>
          </>
        )}
      </Transition>
    </>
  );
}

export default ExpandPanel;
