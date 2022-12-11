import React from "react";

import { parseError } from "../utils/error";

const TEXT = {
  login: {
    label: "Log In with Google",
  },
  signup: {
    label: "Sign Up with Google",
  },
}

const GoogleButton = ({
  config = {},
  authType = "login",
  setErrorMessage = () => {},
}) => {
  const { webAuth } = config;
  const gtmClass = `gtm-sanlo-button-${authType}-google`;

  const onGoogleLogin = (e) => {
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
      setErrorMessage(parseError(err));
    });
  };

  return (
    <button
      type="button"
      id="btn-google"
      className={`form-button google-button ${gtmClass}`}
      onClick={onGoogleLogin}
    >
      <img src="https://pngimg.com/uploads/google/google_PNG19635.png" alt="" />
      <span>{TEXT[authType].label}</span>
    </button>
  )
};

export default GoogleButton;
