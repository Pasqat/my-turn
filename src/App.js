import React from "react";
import "./index.css";
import { GlobalStyles } from './GlobalStyles'

import Header from "./components/Header";
import Main from './components/Main';

const StyledApp = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
};

const App = () => {
  return (
    <StyledApp>
      <Header />
      <Main />
    </StyledApp>
  );
};

export default App;
