// import React from 'react';
import { Amplify, Analytics, Auth, I18n } from 'aws-amplify';
import {
  ThemeProvider,
  ColorMode,
  defaultDarkModeOverride,
  Theme,
  Authenticator,
  CheckboxField,
} from '@aws-amplify/ui-react';
import awsConfig from './aws-exports';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import Home from './pages/Home';
import CreateTodo from './pages/CreateTodo';
import Todo from './pages/Todo';
import { css } from '@emotion/css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import { darkThemeBgColor } from './util/constants';
import Button from './components/Button';

Amplify.configure(awsConfig);

// I18n.putVocabulariesForLanguage('en', {
//   'Sign In': 'Login', // Tab header
//   'Sign in': 'Log in', // Button label
//   'Sign in to your account': 'Welcome back!',
//   Username: 'Enter your username',
//   Password: 'Enter your password',
//   'Forgot your password?': 'Reset password!',
// });

const theme: Theme = {
  name: '57b todo theme',
  overrides: [defaultDarkModeOverride],
};

const defaultColorMode = 'light';

function App() {
  const [themeColorMode, setThemeColorMode]: [ColorMode, Function] = useState(defaultColorMode);
  const [signedInUser, setSignedInUser] = useState({});

  useEffect(() => {
    Analytics.autoTrack('session', {
      enabled: true,
      attributes: () => ({
        ...signedInUser
      }),
      provider: 'AWSPinpoint'
    });
    Analytics.autoTrack('pageView', {
      enable: true,
      attributes: () => ({
        ...signedInUser,
      }),
      type: 'SPA',
      provider: 'AWSPinpoint',
      getUrl: () => `${window.location.origin}${window.location.pathname}`,
    });
    Analytics.autoTrack('event', {
      enable: true,
      events: ['click'],
      selectorPrefix: 'analytics-',
      provider: 'AWSPinpoint',
      attributes: () => ({
        ...signedInUser
      })
    });
  }, []);

  useEffect(() => {
    Analytics.record({
      name: 'signedInUserChange',
      attributes: {
        ...signedInUser
      }
    });
  }, [signedInUser]);


  const customSignout = async () => {
    try {
      await Auth.signOut();
    }
    catch (ex) {
      console.log('error', ex);
    }
  };

  const authComponents = {
    Header: () => (
      <div className={headerDivStyle}>
        <h1 className={headerH1Style}>57B Todo app</h1>
        <p className={headerPStyle}>Please authenticate to continue</p>
      </div>
    ),
    Footer: () => (
      <div>
        <div
          style={themeColorMode === defaultColorMode ? {} : { backgroundColor: darkThemeBgColor }}
          className={checkboxContainerStyle}
        >
          <CheckboxField
            className={checkboxContainerStyle}
            value={themeColorMode}
            label="Dark mode"
            name='themeCheckboxSelector'
            checked={themeColorMode !== defaultColorMode}
            onClick={() => {
              const newColorMode = themeColorMode === defaultColorMode ? 'dark' : 'light';
              setThemeColorMode(newColorMode);
            }}
            analytics-on='click'
            analytics-name="dark-theme-checkbox"
            analytics-attrs={`value:${themeColorMode},checked:${themeColorMode !== defaultColorMode}`}
          />
        </div>
        <p>All rights reserved</p>
      </div>
    ),
  };

  return (
    <ThemeProvider theme={theme} colorMode={themeColorMode}>
      <Authenticator components={authComponents} variation='default'>
        {({ user, signOut }: any) => {
          setSignedInUser(user);
          // Analytics.record({
          //   name: 'user_signed_in',
          //   attributes: { sub: user.sub }
          // });
          return (
            <HashRouter>
              <Header />
              <div className={parentContainerStyle}>
                <div>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-todo" element={<CreateTodo />} />
                    <Route path='/todo/:id' element={<Todo />} />
                  </Routes>
                </div>
              </div>
              <div className={btnContainerStyle}>
                <Button onClick={signOut} text="Sign out" />
                <Button onClick={customSignout} text="Custom Sign out" />
              </div>
            </HashRouter>
          );
        }}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;

const headerDivStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px'
});

const headerH1Style = css({
  padding: 0,
  margin: 0,
});

const headerPStyle = css({
  padding: 0,
  margin: 0,
});

const checkboxContainerStyle = css({
  padding: '10px',
  borderRadius: '2px',
});

const parentContainerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const btnContainerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
