import React from "react";
import "./index.css";
import { GlobalStyles } from "./GlobalStyles";

import Header from "./components/Header/Header";
import Main from "./components/Main";
import LoginForm from "./components/LoginForm";

// import scheduleService from "./services/scheduledTime";
import storage from "./utils/storage";
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

  // TODO useEffect ???
  // React.useEffect(() => {
  //   const user = storage.loadUser();
  //   setUser(user);
  // }, []);

  function switchTheme(passedTheme) {
    return setTheme(passedTheme);
  }

  return (
    <StyledApp theme={theme}>
      {user === null ? (
        <LoginForm setUser={setUser} />
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
