// const parsePasswordPolicy = (policy = "") => {
//   const errorsArray = policy.split('\n');
//   const div = document.createElement('div');
//   errorsArray.forEach((error) => {
//     error.trim();
//     const p = document.createElement('p');
//     p.classList.add('error-p');
//     p.innerHTML = error
//     div.appendChild(p);
//   });
//   return div.innerHTML;
// };

export const parseError = (err = {}) => {
  const {
    code = "",
    description = ""
  } = err;
  let message = "";

  switch (code) {
    case 'invalid_password': {
      // {
      //   "name": "PasswordStrengthError",
      //   "message": "Password is too weak",
      //   "code": "invalid_password",
      //   "description": "...",
      //   "policy": "* At least 8 characters in length\n* Contain at least 3 of the following 4 types of characters:\n * lower case letters (a-z)\n * upper case letters (A-Z)\n * numbers (i.e. 0-9)\n * special characters (e.g. !@#$%^&*)",
      //   "statusCode": 400
      // }
      // message = parsePasswordPolicy(err.policy);
      message = err.policy.split('\n');
      break;
    }

    case 'invalid_user_password': {
      // {
      //   "name": "ValidationError",
      //   "code": "invalid_user_password",
      //   "description": "Wrong email or password.",
      //   "statusCode": 400
      // }
      message = 'Please check your login credentials.';
      break;
    }

    case 'user_exists': {
      // {
      //   "name": "BadRequestError",
      //   "code": "user_exists",
      //   "description": "The user already exists.",
      //   "statusCode": 400
      // }
      message = 'Looks like you already have a Sanlo account. Please log in or click the “Forgot your password?” link to reset your password.';
      break;
    }

    default: {
      message = description;
      break;
    }
  }

  return {
    ...err,
    message,
  };
}
