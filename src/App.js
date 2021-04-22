import React from "react";
import "./index.css";
import { GlobalStyles } from "./GlobalStyles";

import Header from "./components/Header/Header";
import Main from "./components/Main";
import LoginForm from "./components/LoginForm";

import scheduleService from "./services/scheduledTime";
import useLocalStorageState from "./components/hooks/useLocalStorageState";

const StyledApp = ({ children, theme }) => {
  return (
    <>
      <GlobalStyles theme={theme} />
      {children}
    </>
  );
};

const App = () => {
  const [theme, setTheme] = useLocalStorageState("theme", "dark");
  const [user, setUser] = useLocalStorageState("loggedUser", null);

  function switchTheme(passedTheme) {
    return setTheme(passedTheme);
  }

  function loginTeam(team) {
    scheduleService.setToken(team.token);
    return setUser(team);
  }

  return (
    <StyledApp theme={theme}>
      {user === null ? (
        <LoginForm loginTeam={loginTeam} />
      ) : (
        <>
          <Header switchTheme={switchTheme} setUser={setUser} />
          <Main />
        </>
      )}
    </StyledApp>
  );
};
export default App;
