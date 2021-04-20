import React from 'react';
import './index.css';
import { GlobalStyles } from './GlobalStyles';

import Header from './components/Header/Header';
import Main from './components/Main';
import LoginForm from './components/LoginForm';

import useLocalStorageState from './components/hooks/useLocalStorageState';

const StyledApp = ({ children, theme }) => {
  return (
    <>
      <GlobalStyles theme={theme} />
      {children}
    </>
  );
};

const LoggedApp = ({ switchTheme, user }) => {
  return (
    <>
      <Header switchTheme={switchTheme} user={user} />
      <Main />
    </>
  );
};

const App = () => {
  const [theme, setTheme] = useLocalStorageState('theme', 'dark');
  const [user, setUser] = React.useState(null);

  function switchTheme(passedTheme) {
    return setTheme(passedTheme);
  }

  function loginTeam(team) {
    return setUser(team);
  }

  return (
    <StyledApp theme={theme}>
      {user === null ? (
        <LoginForm loginTeam={loginTeam} />
      ) : (
        <LoggedApp switchTheme={switchTheme} user={user} />
      )}
    </StyledApp>
  );
};
export default App;
