import React from 'react';
// import { useState } from 'react';
import './index.css';
import { GlobalStyles } from './GlobalStyles';

import Header from './components/Header/Header';
import Main from './components/Main';

import useLocalStorageState from './components/hooks/useLocalStorageState';

const StyledApp = ({ children, theme }) => {
  return (
    <>
      <GlobalStyles theme={theme} />
      {children}
    </>
  );
};

const App = () => {
  const [theme, setTheme] = useLocalStorageState('theme', 'dark');

  function switchTheme(passedTheme) {
    return setTheme(passedTheme);
  }

  return (
    <StyledApp theme={theme}>
      <Header switchTheme={switchTheme} />
      <Main />
    </StyledApp>
  );
};

export default App;
