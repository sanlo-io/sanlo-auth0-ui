import React from "react";
import styled from 'styled-components';
import TEXT from "../utils/text";

const StyledHeader = styled.div`
  margin-bottom: 24px;

  .title {
    font-family: Roober, 'Inter', sans-serif;
    margin: 0 0 8px 0;
    color: #faf8f8;
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 0.01em;
    line-height: 32px;
    font-style: normal;
  }

  .subtitle {
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    margin: 0;
    letter-spacing: 0.01em;
    color: #c5c5c5;
  }

  .subtitle-label {
    cursor: pointer;
    color: #ff5c79;
  }

  .subtitle-label:hover {
    text-decoration: underline;
  }
`;

const Header = ({ page, setPage }) => {
  return (
    <StyledHeader>
      <h3 className="title">{TEXT[page].title}</h3>
      <h5 className="subtitle">
        {TEXT[page].subtitle}{" "}
        <span className="subtitle-label" onClick={() => {
          setPage({
            "login": "signup",
            "signup": "login",
            "reset": "login",
          }[page]);
        }}>{TEXT[page].subtitle_cta}</span>
      </h5>
    </StyledHeader>
  );
};

export default Header;
