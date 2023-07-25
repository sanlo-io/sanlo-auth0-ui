export const parseConfig = (auth0config = {}) => {
  // Yank a bunch of weird stuff from the config...
  const {
    callbackURL = "",
    internalOptions = {},
  } = auth0config;

  try {
    const leeway = internalOptions?.leeway;
    if (leeway) {
      const convertedLeeway = parseInt(leeway);
      if (!isNaN(convertedLeeway)) {
        internalOptions.leeway = convertedLeeway;
      }
    }
  } catch (e) {
    console.log('Something with the leeway');
    console.log(e);
  }

  // Which is mainly used to be blended into the internal
  // options object that what?
  const auth0params = Object.assign({
    overrides: {
      __tenant: auth0config?.auth0Tenant,
      __token_issuer: auth0config?.authorizationServer?.issuer
    },
    domain: auth0config?.auth0Domain,
    clientID: auth0config?.clientID,
    redirectUri: auth0config?.callbackURL,
    responseType: 'code',
  }, internalOptions);

  // Parse the callbackURL query parms
  // eslint-disable-next-line
  const [base_url, url_params] = callbackURL.split('?');
  const queryParams = {};
  if (url_params) {
    const split_params = url_params.split('&');
    split_params.forEach((param) => {
      const [p_key, p_val] = param.split('=');
      queryParams[p_key] = p_val;
    });
  }

  let webAuth = null;
  try {
    // auth0 won't be defined locally
    // eslint-disable-next-line
    webAuth = new auth0.WebAuth(auth0params);
    // console.log(webAuth);
  } catch (e) {
    // console.log(e);
  }

  return {
    auth0config,
    auth0params,
    queryParams,
    webAuth,
  };
};
