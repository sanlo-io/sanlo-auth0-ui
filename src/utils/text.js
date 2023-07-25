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
    description: (email) => `We've sent a password reset link to ${email} if there is a Sanlo account under this email address. Please check your inbox and spam folder.`,
  },
  reset_resent: {
    title: "Reset your password",
    description: (email) => `We've re-sent a password reset link to ${email} if there is a Sanlo account under this email address. Please check your inbox and spam folder.`,
  },
};

export default TEXT;
