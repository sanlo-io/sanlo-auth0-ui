import styled from 'styled-components';

const NoSelect = styled.div`
  * {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }
`

export const StyledApp = styled.div`
  position: absolute;
  height: 100%;
  overflow: hidden;
  margin: 0;
  width: 100%;
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s ease;

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }

  .provider-label {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF80;
    margin-top:  40px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.01em;
  }

  .auth0-logo {
    margin-left: 8px;
    width: 54.44px;
    height: 16.09px;
    opacity: .5;
  }
`;

export const StyledFormSection = styled.div`
  margin-bottom: 24px;

  .label-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  label {
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
    color: #fff;
    opacity: 0.5;
    letter-spacing: 0.01em;
    margin-bottom: 8px;
  }

  .show-password-toggle {
    color: white;
    font-size: 12px;
    font-weight: bold;
    opacity: 0.3;
    cursor: pointer;
    transition: all 0.5s ease;

    &.enabled {
      opacity: 0.7;
    }
  }

  input {
    width: 100%;
    background-color: #2a2a2f;
    padding: 12px;
    border-radius: 10px;
    outline: none;
    border: 2px solid transparent;
    color: #faf8f8;
  }

  input:hover {
    border: 2px solid #414145;
  }

  input:focus {
    border: 2px solid #ff5c79;
  }

  input::placeholder {
    color: #fff;
    opacity: .5;
    letter-spacing: 0.01em;
    font-family: 'Inter';
    font-weight: 400;
    line-height: 16px;
  }
`;

export const StyledConfirmPassword = styled(StyledFormSection)`
  height: 56px;
`;

export const StyledForgotPassword = styled(NoSelect)`
  height: 56px;

  hr {
    margin: 24px 0;
    border: 1px solid #2a2a2f;
  }

  span {
    color: #c5c5c5;
    font-size: 14px;
    line-height: 16px;
    text-decoration: none;
  }

  a {
    color: #ff5c79;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const StyledFormButtons = styled.div`
  text-align: center;

  .or-btn-divider {
    color: #c5c5c5;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.01em;
    text-align: center;
  }
`;

export const StyledFormButton = styled.button`
  width: 100%;
  border-radius: 10px;
  margin: 16px 0;
  padding: 12px 16px;
  border: none;
  box-shadow: none;
  cursor: pointer;
  text-align: -webkit-center;
  text-align: center;
  background-color: #ff5c79;
  color: #020202;
  transition: all 0.5s ease;

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.01em;
  }

  img {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }

  &:hover {
    box-shadow: 0 0 28px 0 rgba(0,0,0,0.3);
    &.is-primary {
      background-color: #ff4264;
    }
  }

  &:disabled {
    opacity: 0.4;
    cursor: auto;
  }
`;

export const StyledModal = styled.div`
  box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  background-color: #1a1a1f;
  padding: 32px 40px 40px 40px;
  border-radius: 12px;
  z-index: 10;
`;

export const StyledHeader = styled(NoSelect)`
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


export const StyledError = styled.div`
  background-color: rgba(255, 92, 121, 0.1);
  color: #ff5c79;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.01em;
  border-radius: 10px;
  margin: 24px 0;

  .error-p {
    margin: 10px 0;
  }

  .error-icon {
    margin-right: 8px;
  }
`;

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
