import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import GradientBG from './components/GradientBG';
import Loader from './components/Loader';
import GoogleButton from './components/GoogleButton';

import { parseConfig } from './utils/config';
import { parseError } from './utils/error';

const TEXT = {
  login: {
    title: "Welcome to Sanlo",
    subtitle: "Don't have an account?",
    cta: "Sign Up",
    submit: "Log In",
  },
  signup: {
    title: "Let's get started",
    subtitle: "Already have an account",
    cta: "Log in here",
    submit: "Sign Up",
  },
};

const StyledApp = styled.div`
  position: absolute;
  height: 100%;
  overflow: hidden;
  margin: 0;
  width: 100%;
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s ease;

  #signup-box {
    display: none;
  }

  .box {
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
  }

  .header {
    margin-bottom: 24px;
  }

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

  .error-message {
    display: none;
    background-color: rgba(255, 92, 121, 0.1);
    color: #ff5c79;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.01em;
    border-radius: 10px;
    margin: 24px 0;
  }

  .form-group {
    margin-bottom: 24px;
  }

  input, label {
    display: block;
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

  .form-buttons {
    text-align: center;
  }

  .form-button {
    width: 100%;
    border-radius: 10px;
    margin: 16px 0;
    padding: 12px 16px;
    border: none;
    box-shadow: none;
    cursor: pointer;
    text-align: -webkit-center;
  }

  .form-button:hover {
    box-shadow: 0 0 28px 0 rgba(0,0,0,0.3)
  }

  .form-button > span {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.01em;
  }

  .form-button.google-button {
    padding: 10px 16px;
  }

  .form-button > img {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }

  .primary {
    background-color: #ff5c79;
    color: #020202;
  }

  .primary:hover {
    background-color: #ff4264;
  }

  .primary:disabled {
    opacity: 0.4;
    cursor: auto;
  }

  .google-button {
    background-color: #25252a;
    color: #faf8f8;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .or-btn-divider {
    color: #c5c5c5;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.01em;
    text-align: center;
  }

  hr {
    margin: 24px 0;
    border: 1px solid #2a2a2f;
  }

  .forgot-password-label {
    color: #c5c5c5;
    font-size: 14px;
    line-height: 16px;
    text-decoration: none;
  }

  .forgot-password-button {
    color: #ff5c79;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
    text-decoration: none;
  }

  .forgot-password-button:hover {
    text-decoration: underline;
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

  .error-p {
    margin: 10px 0;
  }

  .error-icon {
    margin-right: 8px;
  }

  .form-button {
    text-align: center;
  }
`;

const StyledModal = styled.div`
`;

const App = () => {
  const config = parseConfig();
  const { webAuth } = config;

  const [authType, setAuthType] = useState('login'); // login | signup

  const mainContainerRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [captcha, setCaptcha] = useState()
  const captchaRef = useRef();

  useEffect(() => {
    const {
      queryParams
    } = config;
    const {
      sanlo_flow,
      fromPartnerSite = false,
    } = queryParams;

    if (fromPartnerSite === 'true' || sanlo_flow === 'signup') {
      setAuthType('signup');
    }

    if (webAuth) {
      setCaptcha(webAuth.renderCaptcha(captchaRef.current));
    }

    setTimeout(() => {
      mainContainerRef.current.style.visibility = 'visible';
      mainContainerRef.current.style.opacity = 1;
    }, 0);
  }, []);

  useEffect(() => {
    if (captcha) captcha.reload();
    if (errorMessage === 'user_exists') setAuthType('login');
  }, [errorMessage]);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);

    if (authType === "login") {
      webAuth.login({
        realm: 'Username-Password-Authentication',
        username: emailInput,
        password: passwordInput,
        captcha: captcha.getValue(),
      }, (err) => {
        setErrorMessage(parseError(err));
        setIsDisabled(false);
      });
    }
    if (authType === "signup") {
      webAuth.redirect.signupAndLogin({
        connection: 'Username-Password-Authentication',
        email: emailInput,
        password: passwordInput,
        captcha: captcha.getValue(),
      }, (err) => {
        setErrorMessage(parseError(err));
        setIsDisabled(false);
      });
    }
  };

  const checkValid = () => {
    setIsDisabled(!(Boolean(emailInput) && Boolean(passwordInput)));
  }

  return (
    <StyledApp ref={mainContainerRef}>
      <Header config={config} />
      <GradientBG isError={Boolean(errorMessage)} />

      <StyledModal>
        <div className="box">
          <div className="header">
            <h3 className="title">{TEXT[authType].title}</h3>
            <h5 className="subtitle">
              {TEXT[authType].subtitle}{" "}
              <span className="subtitle-label" onClick={() => {
                setAuthType(authType === "login" ? "signup" : "login");
              }}>{TEXT[authType].cta}</span>
            </h5>
          </div>

          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}

          <form onSubmit={() => { return false; }} method="post">
            <div className="form-group">
              <label htmlFor="name">Email</label>
              <input
                ref={emailInputRef}
                className="email-input"
                type="email"
                placeholder="Enter your work email address"
                onKeyDown={(e) => {
                  setEmailInput(e.currentTarget.value);
                  checkValid(e);
                }}
                onBlur={checkValid}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Password (min 8 characters)</label>
              <input
                ref={passwordInputRef}
                className="password-input"
                type="password"
                placeholder="Enter your password"
                onKeyDown={(e) => {
                  setPasswordInput(e.currentTarget.value);
                  checkValid(e);
                }}
                onBlur={checkValid}
              />
            </div>

            <div
              ref={captchaRef}
              className="captcha-container form-group"
            />

            <div className="form-buttons">
              <button
                type="submit"
                className={`form-button primary gtm-sanlo-button-${authType}-submit`}
                disabled
                onClick={onSubmit}
              >
                {isDisabled && <Loader/>}
                {!isDisabled && <span>{TEXT[authType].submit}</span>}
              </button>

              <span className="or-btn-divider">OR</span>

              <GoogleButton
                config={config}
                authType={authType}
                setErrorMessage={setErrorMessage}
              />
            </div>

            {(authType === "login") && (
              <>
                <hr />
                <span className="forgot-password-label">Forgot your password?{" "}</span>
                <a href="https://app.sanlo.io/change-password" className="forgot-password-button">Click Here</a>
              </>
            )}
          </form>

          <div className="provider-label">Powered by{" "}
            <img className="auth0-logo" src="https://cdn.auth0.com/website/bob/press/logo-light.png" />
          </div>
        </div>
      </StyledModal>
    </StyledApp>
  );
};

export default App;
