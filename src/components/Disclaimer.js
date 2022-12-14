import React from "react";
import classnames from 'classnames';
import styled from 'styled-components';

const PRIVACY_POLICY_LINK = "https://www.sanlo.io/privacy-policy";
const TERMS_OF_USE_LINK = "https://www.sanlo.io/terms-of-use";

const StyledDisclaimer = styled.div`
  z-index: 9;
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.01em;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  max-width: 30rem;
  transition: all 0.5s ease;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 1);
  color: rgb(180, 180, 180);
  opacity: 0;
  visibility: hidden;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  a {
    color: #FF5C79;
    cursor: pointer;

    &:first-child {
      text-decoration: none;
    }

    &:first-child {
      text-decoration: underline;
    }
  }
`;

const Disclaimer = ({ authType }) => {
  return (
    <StyledDisclaimer className={classnames({
      show: authType === 'signup',
    })}>
      By creating an account, you confirm you have read, understand and accept Sanlo's{" "}
      <a href={PRIVACY_POLICY_LINK} target="_blank" rel="noreferrer">Privacy Policy</a>{" "}and{" "}
      <a href={TERMS_OF_USE_LINK} target="_blank" rel="noreferrer">Terms of Use</a>.
    </StyledDisclaimer>
  )
};

export default Disclaimer;
