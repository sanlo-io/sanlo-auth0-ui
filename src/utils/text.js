import React from 'react';
import styled from 'styled-components';

const StyledDescription = styled.h5`
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  margin: 0;
  letter-spacing: 0.01em;
  color: #c5c5c5;
`;

const TEXT = {
  login: {
    title: "Welcome to Sanlo",
    subtitle: "Don't have an account?",
    subtitle_cta: "Sign Up",
    submit: "Log In",
    email_label: "Email",
    password_label: "Password",
  },
  signup: {
    title: "Let's get started",
    subtitle: "Already have an account?",
    subtitle_cta: "Log in",
    submit: "Sign Up",
    email_label: "Email",
    password_label: "Password (min 8 characters)",
  },
  reset: {
    title: "Reset your password",
    subtitle: "Already have an account?",
    subtitle_cta: "Log in",
    submit: "Send Recovery Link",
    email_label: "Email",
  },
  reset_sent: {
    title: "Reset your password",
    description: (email) => (
      <StyledDescription>{`We've sent a password reset link to `}<strong>{email}</strong>{` if there is a Sanlo account under this email address. Please check your inbox and spam folder.`}</StyledDescription>
    ),
  },
  reset_resent: {
    title: "Reset your password",
    description: (email) => (
      <StyledDescription>{`We've re-sent a password reset link to `}<strong>{email}</strong>{` if there is a Sanlo account under this email address. Please check your inbox and spam folder.`}</StyledDescription>
    ),
  },
};

export default TEXT;
