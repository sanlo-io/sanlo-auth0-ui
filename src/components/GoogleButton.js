import React from "react";
import styled from 'styled-components';
import mixpanel from "mixpanel-browser";

import { StyledFormButton } from "../App.styled";
import { parseError } from "../utils/error";

const TEXT = {
  login: {
    label: "Log In with Google",
  },
  signup: {
    label: "Sign Up with Google",
  },
}

const StyledGoogleButton = styled(StyledFormButton)`
  background-color: #25252a;
  color: #faf8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
`;

const GoogleButton = ({
  config = {},
  authType = "login",
  setError = () => {},
}) => {
  const { webAuth } = config;
  const gtmClass = `gtm-sanlo-button-${authType}-google`;

  const onGoogleLogin = (e) => {
    mixpanel.set_config({ api_transport: "sendBeacon" });
    mixpanel.track("Google Login");

    const { queryParams } = config;
    const {
      clientToken,
      partnerAttributionClientId,
    } = queryParams;

    let payload = {
      connection: 'google-oauth2',
    };

    if (clientToken) {
      payload.clientToken = clientToken;
    }
    if (partnerAttributionClientId) {
      payload.partnerAttributionClientId = partnerAttributionClientId;
    }

    webAuth.authorize(payload, (err) => {
      setError(parseError(err));
    });
  };

  return (
    <StyledGoogleButton
      type="button"
      className={`form-button ${gtmClass}`}
      onClick={onGoogleLogin}
    >
      <img src="https://pngimg.com/uploads/google/google_PNG19635.png" alt="" />
      <span>{TEXT[authType].label}</span>
    </StyledGoogleButton>
  )
};

export default GoogleButton;
