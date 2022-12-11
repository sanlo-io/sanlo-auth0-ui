import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const StyledGradients = styled.div`
  .left-grad {
    z-index: 1;
    position: absolute;
    width: 752px;
    height: 752px;
    left: 284px;
    top: 70px;
    background: linear-gradient(291.19deg, rgba(191, 107, 255, 0.5) 10.65%, rgba(255, 92, 121, 0.5) 89.36%);
    filter: blur(143px);
    -webkit-filter: blur(143px);
    transform: translateZ(0);
    border-radius: 50%;
  }

  .right-grad {
    z-index: 2;
    position: absolute;
    width: 752px;
    height: 752px;
    right: 240px;
    top: 326px;
    background: linear-gradient(291.19deg, rgba(45, 249, 176, 0.5) 10.65%, rgba(191, 107, 255, 0.5) 89.36%);
    filter: blur(143px);
    -webkit-filter: blur(143px);
    transform: translateZ(0);
    border-radius: 50%;
  }


  .background-error {
    background: linear-gradient(291.19deg, rgba(255, 66, 100, 0.5) 54.11%, rgba(191, 107, 255, 0.5) 89.36%) !important;
  }
`;

const GradientBG = ({ isError = false }) => {
  const leftGrad = useRef();
  const rightGrad = useRef();

  const interactiveBackground = (e) => {
    const _w = window.innerWidth / 2;
    const _h = window.innerHeight / 2;
    const _mouseX = e.clientX;
    const _mouseY = e.clientY;

    const xL = `${-400 - (_mouseX - _w) * 0.2}px`;
    const yL = `${50 - (_mouseY - _h) * 0.2}px`;
    const xR = `${-200 + (_mouseX - _w) * 0.3}px`;
    const yR = `${300 + (_mouseY - _h) * 0.3}px`;

    if (leftGrad.current) {
      leftGrad.current.style.top = yL;
      leftGrad.current.style.left = xL;
    }

    if (rightGrad.current) {
      rightGrad.current.style.top = yR;
      rightGrad.current.style.right = xR;
    }
  };

  useEffect(() => {
    // Set events for the interactive background
    window.addEventListener("mousemove", interactiveBackground);
    return function cleanup() {
      window.removeEventListener("mousemove", interactiveBackground);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StyledGradients>
      <div ref={leftGrad} className={classnames('left-grad', {
        'background-error': isError,
      })}/>
      <div ref={rightGrad} className={classnames('right-grad', {
        'background-error': isError,
      })}/>
    </StyledGradients>
  );
};

export default GradientBG;
