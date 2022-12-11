const parseMultipleErrors = (errors) => {
  const errorsArray = errors.split('\n');
  const div = document.createElement('div');
  errorsArray.forEach((error) => {
    error.trim();
    const p = document.createElement('p');
    p.classList.add('error-p');
    p.innerHTML = error
    div.appendChild(p);
  });
  return div.innerHTML;
};

const parseErrorDescription = (error) => {
  switch (error.code) {
    case 'invalid_user_password':
      return 'Please check your login credentials.';
    case 'user_exists':
      return 'Looks like you already have a Sanlo account. Please log in or click the “Forgot your password?” link to reset your password.'
    case 'invalid_password':
      return parseMultipleErrors(error.policy).innerHTML;
    default:
      return error.description;
  }
};

export const parseError = (err) => {
  const { code = '' } = err;
  switch (code) {
    case 'invalid_password':
      return parseMultipleErrors(err);
    case 'user_exists':
      return code;
    default:
      return parseErrorDescription(err);
  }
}
