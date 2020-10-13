import React from "react";
import { useState } from "react";
import "./index.css";
import { GlobalStyles } from "./GlobalStyles";

import Header from "./components/Header/Header";
import Main from "./components/Main";

// TODO useLocalStorage from EpicReact to store theme pref

function switchTheme(isLight) {
  return isLight ? "light" : "";
}

const StyledApp = ({ children, theme }) => {
  return (
    <>
      <GlobalStyles theme={theme} />
      {children}
    </>
  );
};

const App = () => {
  const [theme, setTheme] = useState("");
  console.log("app theme", theme);

  function switchTheme(passedTheme) {
    return passedTheme ? setTheme("light") : setTheme("");
  }

  return (
    <StyledApp theme={theme}>
      <Header switchTheme={switchTheme} />
      <Main />
    </StyledApp>
  );
};

export default App;
