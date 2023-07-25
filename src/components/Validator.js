import React from "react";
import styled from 'styled-components';
import classnames from 'classnames';

import { alphaTrim } from "../utils/general";

import {
  requiredRules,
  optionalRules,
} from '../utils/rules';

export const StyledPasswordValidator = styled.div`
  box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 95%;
  top: 37%;
  background-color: #2a2a2f;
  padding: 16px 20px;
  border-radius: 12px;
  z-index: 20;
  transition: all 0.35s ease;
  visibility: hidden;
  opacity: 0;

  &.is-visible {
    visibility: visible;
    opacity: 1;
  }

  .password-rules-header {
    font-size: 16px;
    font-weight: 500;
    opacity: 0.5;
    color: white;
    white-space: nowrap;
  }

  .password-rule {
    white-space: nowrap;
    color: white;
    font-size: 14px;
    margin: 8px 0;
    color: #ff5c79;
    transition: all 0.5s ease;
    opacity: 0.8;

    &.is-valid {
      color: #62b762;
      opacity: 1;
    }
  }

  .password-match {
    margin-top: 24px;
    font-size: 18px;
    font-weight: bold;
    color: #ff5c79;
    transition: all 0.5s ease;
    opacity: 0.8;

    &.is-valid {
      color: #62b762;
      opacity: 1;
    }
  }
`;

const Validator = ({
  isVisible,
  passwordInput,
  passwordConfirmInput,
}) => {
  return (
    <StyledPasswordValidator className={classnames({
      'is-visible': isVisible
    })}>
      <div className="password-rules-header">
        Password rules
      </div>
      {requiredRules.map((requiredRule) => {
        return (
          <div key={`key_rule_${alphaTrim(requiredRule.label)}`} className={classnames("password-rule", {
            "is-valid": requiredRule.validator(passwordInput),
          })}>{requiredRule.label}</div>
        );
      })}

      <div className="password-rules-header">
        and contains 3 of the following...
      </div>
      {optionalRules.map((optionalRule) => {
        return (
          <div key={`key_rule_${alphaTrim(optionalRule.label)}`} className={classnames("password-rule", {
            "is-valid": optionalRule.validator(passwordInput),
          })}>{optionalRule.label}</div>
        );
      })}

      <div className={classnames("password-match", {
        "is-valid": (passwordInput && passwordConfirmInput && passwordInput === passwordConfirmInput),
      })}>Passwords Match</div>
    </StyledPasswordValidator>
  );
};

export default Validator;
