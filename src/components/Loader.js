import React from "react";
import styled from 'styled-components';

const StyledDots = styled.div`
  width: 0.5rem;
  margin: 0 auto;

  .dot-flashing {
    position: relative;
    width: 6px;
    height: 6px;
    margin: 4px 0;
    border-radius: 5px;
    background-color: #000;
    color: #000;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: .5s;
  }

  .dot-flashing::before, .dot-flashing::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }

  .dot-flashing::before {
    left: -8px;
    width: 6px;
    height: 6px;
    border-radius: 5px;
    background-color: #000;
    color: #000;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }

  .dot-flashing::after {
    left: 8px;
    width: 6px;
    height: 6px;
    border-radius: 5px;
    background-color: #000;
    color: #000;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dotFlashing {
    0% { background-color: #000; }
    50%, 100% {
      background-color: #fff;
      opacity: .2;
    }
  }
`;

const Loader = () => {
  return (
    <StyledDots>
      <div className="snippet" data-title=".dot-flashing">
        <div className="stage">
          <div className="dot-flashing"></div>
        </div>
      </div>
    </StyledDots>
  );
};

export default Loader;
