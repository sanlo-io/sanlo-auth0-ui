import React, { useEffect, useState, useRef } from 'react';
import { useFlags } from "launchdarkly-react-client-sdk";
import TEXT from "./utils/text";

import {
  StyledApp,
  StyledModal,
  StyledFormSection,
  StyledFormButtons,
  StyledFormButton,
  StyledConfirmPassword,
  StyledForgotPassword,
} from './App.styled';

import Header from './components/Header';
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

const App = () => {
  const {
    clientAuth0ShowPasswordVisible = false,
  } = useFlags();

  const [configLoaded, setConfigLoaded] = useState(false);

  const [config, setConfig] = useState({});
  const [webAuth, setWebAuth] = useState(null);

  const [authType, setAuthType] = useState('login'); // login | signup

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
    checkValid(emailInput, passwordInput, "");
    // eslint-disable-next-line
  }, [authType]);

  useEffect(() => {
    checkValid();
    // eslint-disable-next-line
  }, [emailInput, passwordInput, passwordConfirmInput]);

  const onSubmit = (e) => {
    e.preventDefault();

    setIsDisabled(true);
    setIsLoading(true);

    const handleResponse = (err, resp) => {
      console.log(err);
      console.log(resp);
      setError(parseError(err));
      setIsDisabled(false);
      setIsLoading(false);
    }

    const userPayload = { password: passwordInput };
    if (captcha) userPayload.captcha = captcha.getValue();

    if (authType === "login") {
      webAuth.login({
        ...userPayload,
        realm: 'Username-Password-Authentication',
        username: emailInput,
      }, handleResponse);
    } else if (authType === "signup") {
      webAuth.redirect.signupAndLogin({
        ...userPayload,
        connection: 'Username-Password-Authentication',
        email: emailInput,
      }, handleResponse);
    } else if (authType === "reset") {
      console.log("Reset");
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

    // Fix for reset,



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
        <Header page={authType} setPage={setAuthType} />
        <Error error={error} />

        <form onSubmit={() => { return false; }} method="post">
          <StyledFormSection>
            <div className="label-container">
              <label>{TEXT[authType].email_label}</label>
            </div>
            <input
              ref={emailInputRef}
              data-type="email"
              type="email"
              placeholder="Enter your work email address"
              onKeyDown={onInputChange}
              onKeyUp={onInputChange}
              onBlur={onInputChange}
            />
          </StyledFormSection>

          {(authType !== "reset") && (
            <StyledFormSection>
              <div className="label-container">
                <label>{TEXT[authType].password_label}</label>
                {clientAuth0ShowPasswordVisible && (
                  <div
                    className="show-password-toggle"
                    onClick={onShowPasswordToggle}
                  >Show Password</div>
                )}
              </div>
              <input
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
            <StyledFormButton
              type="submit"
              className={`is-primary gtm-sanlo-button-${authType}-submit`}
              disabled={isDisabled}
              onClick={onSubmit}
            >
              {isLoading && <Loader/>}
              {!isLoading && <span>{TEXT[authType].submit}</span>}
            </StyledFormButton>

            {(authType !== "reset") && (
              <>
                <span className="or-btn-divider">OR</span>
                <GoogleButton
                  config={config}
                  authType={authType}
                  setError={setError}
                />
              </>
            )}
          </StyledFormButtons>

          {(authType === "login") && (
            <StyledForgotPassword>
              <hr />
              <span>Forgot your password?{" "}</span>
              <span className="cta" onClick={() => {
                setAuthType("reset");
              }}>Click Here</span>
            </StyledForgotPassword>
          )}
        </form>

        <div className="provider-label">Powered by{" "}
          <img className="auth0-logo" src="https://cdn.auth0.com/website/bob/press/logo-light.png" alt="" />
        </div>
      </StyledModal>

      <Disclaimer authType={authType} />
    </StyledApp>
  );
};

export default App;
