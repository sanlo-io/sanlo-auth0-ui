import React from 'react';
import ReactDOM from 'react-dom/client';

import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";

import App from './App';

(async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_SIDE_ID,
  });

  root.render(
    <LDProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </LDProvider>
  );
})();
