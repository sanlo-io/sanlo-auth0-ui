import React, { useEffect, useState, useRef } from 'react';
// import { useFlags } from "launchdarkly-react-client-sdk";
import styled from 'styled-components';
import mixpanel from "mixpanel-browser";

import TEXT from "./utils/text";

import {
  StyledApp,
  StyledModal,
  StyledFormSection,
  StyledFormButtons,
  StyledFormButton,
  StyledConfirmPassword,
  StyledForgotPassword,
  StyledEye,
} from './App.styled';

import Error from './components/Error';
import Validator from './components/Validator';

import Branding from './components/Branding';
import GradientBG from './components/GradientBG';
import Loader from './components/Loader';
import GoogleButton from './components/GoogleButton';
import Disclaimer from './components/Disclaimer';

import { parseConfig } from './utils/config';
import { parseError } from './utils/error';
import { requiredRules, optionalRules } from './utils/rules';

const LOCAL = process.env.REACT_APP_ENV === "local";

const addToDataLayer = (data) => {
  if (!window || !window.dataLayer) return;
  window.dataLayer.push(data);
};

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

const App = () => {
  const [configLoaded, setConfigLoaded] = useState(false);

  const [config, setConfig] = useState({});
  const [webAuth, setWebAuth] = useState(null);

  const [authType, setAuthType] = useState('login');

  const mainContainerRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  const [passwordInputFocused, setPasswordInputFocused] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const [resetCount, setResetCount] = useState(0);

  const [captcha, setCaptcha] = useState()
  const captchaRef = useRef();

  useEffect(() => {
    let configInterval = null;

    const checkConfig = () => {
      if (window.auth0config) {
        console.log('Auth0 Config Loaded', window.auth0config);
        setConfigLoaded(true);
        window.clearInterval(configInterval);
      }
    }

    checkConfig();
    configInterval = setInterval(() => {
      checkConfig();
    }, 250);
  }, []);

  useEffect(() => {
    if (authType.match(/reset/) && resetCount > 0) {
      setAuthType(resetCount === 1 ? "reset_sent" : "reset_resent");
    }
  }, [resetCount, authType]);

  useEffect(() => {
    if (mainContainerRef.current) {
      setTimeout(() => {
        mainContainerRef.current.style.visibility = 'visible';
        mainContainerRef.current.style.opacity = 1;
      }, 0);
    }
  }, [mainContainerRef]);

  useEffect(() => {
    setConfig(parseConfig(window.auth0config));
  }, [configLoaded]);

  useEffect(() => {
    const { webAuth } = config;
    if (webAuth) setWebAuth(webAuth);

    const {
      queryParams = {}
    } = config;
    const {
      sanlo_flow,
      fromPartnerSite = false,
    } = queryParams;

    if (fromPartnerSite === 'true' || sanlo_flow === 'signup') {
      setAuthType('signup');
    }
  }, [config]);

  useEffect(() => {
    if (webAuth && captchaRef.current) {
      setCaptcha(webAuth.renderCaptcha(captchaRef.current));
    }
  }, [webAuth, captchaRef]);

  useEffect(() => {
    if (captcha) captcha.reload();
    if (error.code === 'user_exists') setAuthType('login');
  }, [captcha, error]);

  useEffect(() => {
    const isExistingUserScenario = (authType === "login" && error.code === "user_exists");
    if (!isExistingUserScenario) setError({});
    setPasswordConfirmInput("");
    if (!authType.match(/reset_/)) {
      // Dont check on the reset password message modals
      checkValid(emailInput, passwordInput, "");
    }
    // eslint-disable-next-line
  }, [authType]);

  useEffect(() => {
    if (!authType.match(/reset_/)) checkValid();
    // eslint-disable-next-line
  }, [emailInput, passwordInput, passwordConfirmInput]);

  const onSubmit = (e) => {
    e.preventDefault();

    setIsDisabled(true);
    setIsLoading(true);

    const handleResponse = (err, resp) => {
      if (err) setError(parseError(err));
      setIsDisabled(false);
      setIsLoading(false);
      // We've just sent you an email to reset your password.
      if (resp && resp.match(/We've just sent/)) {
        setResetCount(resetCount + 1);
      }
    }

    const userPayload = { password: passwordInput };
    if (captcha) userPayload.captcha = captcha.getValue();

    if (authType === "login") {
      addToDataLayer({
        event: "Login Submit",
        email: emailInput,
      });
      mixpanel.identify(emailInput);
      mixpanel.track("Login Submit", {
        email: emailInput,
      });
      if (LOCAL) return handleResponse(null, null);
      webAuth.login({
        ...userPayload,
        realm: 'Username-Password-Authentication',
        username: emailInput,
      }, handleResponse);
    } else if (authType === "signup") {
      addToDataLayer({
        event: "Signup Submit",
        email: emailInput,
      });
      mixpanel.identify(emailInput);
      mixpanel.track("Signup Submit", {
        email: emailInput,
      });
      if (LOCAL) return handleResponse(null, null);
      webAuth.redirect.signupAndLogin({
        ...userPayload,
        connection: 'Username-Password-Authentication',
        email: emailInput,
      }, handleResponse);
      // The gtag_report_conversion function is defined
      // in the global scope in the html file
      if (window.gtag_report_conversion && typeof window.gtag_report_conversion === "function") {
        window.gtag_report_conversion();
      }
    } else if (authType.match(/reset/)) {
      addToDataLayer({
        event: "Password Reset",
        email: emailInput,
      });
      mixpanel.identify(emailInput);
      mixpanel.track("Password Reset", {
        email: emailInput,
      });
      if (LOCAL) return handleResponse(null, "We've just sent you an email to reset your password.");
      webAuth.changePassword({
        connection: 'Username-Password-Authentication',
        email: emailInput,
      }, handleResponse);
    }
  };

  const onInputChange = (e) => {
    const el = e.currentTarget;
    const value = el.value;
    const type = el.getAttribute("data-type");
    if (type === "email") {
      setEmailInput(value);
    } else if (type === "password") {
      setPasswordInput(value);
    } else if (type === "password-confirm") {
      setPasswordConfirmInput(value);
    }
  }

  const checkValid = (email, password, passwordConfirm) => {
    email = email || emailInput;
    password = password || passwordInput;
    passwordConfirm = passwordConfirm || passwordConfirmInput;

    let goodEmail = false;
    if (Boolean(email)) goodEmail = true;

    if (authType === "reset") {
      setIsDisabled(!goodEmail);
      return;
    }

    let goodPassword = false;

    if (Boolean(password)) {
      let requiredCount = 0;
      let requiredMet = false;
      requiredRules.forEach((requiredRule) => {
        const isValid = requiredRule.validator(password);
        if (isValid) requiredCount += 1;
      });

      if (requiredCount === requiredRules.length) {
        requiredMet = true;
      }

      let optionalCount = 0;
      let optionalMet = false;
      optionalRules.forEach((optionalRule) => {
        const isValid = optionalRule.validator(password);
        if (isValid) optionalCount += 1;
      });

      if (optionalCount >= 3) {
        optionalMet = true;
      }

      let confirmMet = false;
      if (authType === "signup" && password && passwordConfirm && password === passwordConfirm) {
        confirmMet = true;
      }
      if (authType === "login") {
        confirmMet = true;
      }

      goodPassword = (requiredMet && optionalMet && confirmMet);
    }

    setIsDisabled(!goodEmail || !goodPassword);
  }

  const onShowPasswordToggle = (e) => {
    const currentType = passwordInputRef.current.type;
    if (currentType === "password") {
      passwordInputRef.current.type = "text";
      if (passwordConfirmInputRef.current) {
        passwordConfirmInputRef.current.type = "text";
      }
      e.currentTarget.classList.add("enabled");
    } else if (currentType === "text") {
      passwordInputRef.current.type = "password";
      if (passwordConfirmInputRef.current) {
        passwordConfirmInputRef.current.type = "password";
      }
      e.currentTarget.classList.remove("enabled");
    }
  }

  return (
    <StyledApp ref={mainContainerRef}>
      <Branding config={config} />
      <GradientBG isError={Boolean(error.code)} />

      <StyledModal>
        <StyledHeader>
          <h3 className="title no-select">{TEXT[authType].title}</h3>
          {TEXT[authType].subtitle && (
            <h5 className="subtitle no-select">
              {TEXT[authType].subtitle}{" "}
              <span
                data-test-id={`${authType}-cta`}
                className="subtitle-label"
                onClick={() => {
                  setAuthType({
                    "login": "signup",
                    "signup": "login",
                    "reset": "login",
                  }[authType]);
                }}
              >{TEXT[authType].subtitle_cta}</span>
            </h5>
          )}
          {TEXT[authType].description && (<>
            {TEXT[authType].description(emailInput)}
          </>)}
        </StyledHeader>
        <Error error={error} />

        <form onSubmit={() => { return false; }} method="post">
          {!authType.match(/reset_/) && (
            <StyledFormSection>
              <div className="label-container">
                <label>{TEXT[authType].email_label}</label>
              </div>
              <input
                data-test-id="email-input"
                ref={emailInputRef}
                data-type="email"
                type="email"
                placeholder="Enter your work email address"
                onKeyDown={onInputChange}
                onKeyUp={onInputChange}
                onBlur={onInputChange}
              />
            </StyledFormSection>
          )}

          {(!authType.match(/reset/)) && (
            <StyledFormSection>
              <div className="label-container">
                <label>{TEXT[authType].password_label}</label>
              </div>
              <div className="input-container">
                <input
                  data-test-id="password-input"
                  ref={passwordInputRef}
                  data-type="password"
                  type="password"
                  placeholder="Enter your password"
                  onKeyDown={onInputChange}
                  onKeyUp={onInputChange}
                  onFocus={(e) => {
                    setPasswordInputFocused(true);
                  }}
                  onBlur={(e) => {
                    onInputChange(e)
                    setPasswordInputFocused(false);
                  }}
                />
                <StyledEye
                  className="icss-eye"
                  onClick={onShowPasswordToggle}
                />
              </div>
            </StyledFormSection>
          )}

          <Validator
            isVisible={(authType === "signup" && (passwordInput || passwordInputFocused))}
            passwordInput={passwordInput}
            passwordConfirmInput={passwordConfirmInput}
          />

          {(authType === "signup") && (
            <StyledConfirmPassword>
              <input
                data-test-id="password-confirm-input"
                ref={passwordConfirmInputRef}
                data-type="password-confirm"
                type="password"
                placeholder="Please confirm your password"
                onKeyDown={onInputChange}
                onKeyUp={onInputChange}
                onFocus={(e) => {
                  setPasswordInputFocused(true);
                }}
                onBlur={(e) => {
                  onInputChange(e)
                  setPasswordInputFocused(false);
                }}
              />
            </StyledConfirmPassword>
          )}

          <div
            ref={captchaRef}
            className="captcha-container form-group"
          />

          <StyledFormButtons>
            {!authType.match(/reset_/) && (
              <StyledFormButton
                data-test-id={`${authType}-submit`}
                type="submit"
                className={`gtm-sanlo-button-${authType}-submit`}
                disabled={isDisabled}
                onClick={onSubmit}
              >
                {isLoading && <Loader/>}
                {!isLoading && TEXT[authType].submit}
              </StyledFormButton>
            )}

            {!authType.match(/reset/) && (
              <>
                <span className="or-btn-divider">OR</span>
                <GoogleButton
                  data-test-id={`${authType}-google`}
                  className={`gtm-sanlo-button-${authType}-google`}
                  config={config}
                  authType={authType}
                  setError={setError}
                />
              </>
            )}
          </StyledFormButtons>

          {authType.match(/reset_/) && (
            <StyledForgotPassword>
              <hr />
              <span>Haven't received it?{" "}</span>
              <span
                data-test-id="email-not-received"
                className="cta"
                onClick={(e) => {
                  onSubmit(e);
                }}
              >Resend Link</span>
            </StyledForgotPassword>
          )}

          {(authType === "login") && (
            <StyledForgotPassword>
              <hr />
              <span>Forgot your password?{" "}</span>
              <span
                data-test-id="forgot-password"
                className="cta"
                  onClick={() => {
                  setAuthType("reset");
                }}
              >Click Here</span>
            </StyledForgotPassword>
          )}
        </form>

        {!authType.match(/reset_/) && (
          <div className="provider-label">Powered by{" "}
            <img className="auth0-logo" src="https://cdn.auth0.com/website/bob/press/logo-light.png" alt="" />
          </div>
        )}
      </StyledModal>

      <Disclaimer authType={authType} />
    </StyledApp>
  );
};

export default App;
