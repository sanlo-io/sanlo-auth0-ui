import React from 'react';
import ReactDOM from 'react-dom/client';

import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import LogRocket from "logrocket";
import mixpanel from "mixpanel-browser";
import * as Sentry from "@sentry/react";

import App from './App';

import "./assets/index.css";

if (process.env.REACT_APP_MIXPANEL) {
  mixpanel.init(process.env.REACT_APP_MIXPANEL, {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });
}

if (process.env.REACT_APP_SENTRY_URL) {
  Sentry.init({
    ignoreErrors: [
      // Random plugins/extensions
      "top.GLOBALS",
      // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
      "originalCreateNotification",
      "canvas.contentDocument",
      "MyApp_RemoveAllHighlights",
      "http://tt.epicplay.com",
      "Can't find variable: ZiteReader",
      "jigsaw is not defined",
      "ComboSearch is not defined",
      "http://loading.retry.widdit.com/",
      "atomicFindClose",
      // crypto extension
      "Cannot redefine property: ethereum",
      // Facebook borked
      "fb_xd_fragment",
      // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
      // reduce this. (thanks @acdha)
      // See http://stackoverflow.com/questions/4113268
      "bmi_SafeAddOnload",
      "EBCallBackMessageReceived",
      // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
      "conduitPage",
    ],
    denyUrls: [
      // LD events on beforeunload
      /events\.launchdarkly\.com\/events\/bulk/i,
      // Facebook flakiness
      /graph\.facebook\.com/i,
      // Facebook blocked
      /connect\.facebook\.net\/en_US\/all\.js/i,
      // Woopra flakiness
      /eatdifferent\.com\.woopra-ns\.com/i,
      /static\.woopra\.com\/js\/woopra\.js/i,
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
      /^chrome-extension:\/\//i,
      // Other plugins
      /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
      /webappstoolbarba\.texthelp\.com\//i,
      /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
    ],
    dsn: process.env.REACT_APP_SENTRY_URL,
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.2,
    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,
    integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
    environment: process.env.REACT_APP_ENV,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    beforeSend(event) {
      const logRocketSession = LogRocket.sessionURL;
      if (event && event.extra && logRocketSession !== null) {
        event.extra["LogRocketSessionOnError"] = logRocketSession;
        return event;
      } else {
        return event;
      }
    },
  });
}

if (process.env.REACT_APP_LOGROCKET_ID) {
  LogRocket.init(process.env.REACT_APP_LOGROCKET_ID, {
    sendEvents: false,
  });
  LogRocket.getSessionURL((sessionURL) => {
    Sentry.configureScope((scope) => {
      scope.setExtra("LogRocketSessionInit", sessionURL);
    });
  });
}


(async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_SIDE_ID,
    sendEvents: false,
  });

  root.render(
    <LDProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </LDProvider>
  );
})();
