import React from "react";
import "./index.css";
import { GlobalStyles } from './GlobalStyles'

import Header from "./components/Header";
import Main from './components/Main';

const StyledApp = ({ children }) => {
  return (
    <>
      <GlobalStyles theme='light'/>
      {children}
    </>
  );
};

const App = () => {
  return (
    <StyledApp theme='light'>
      <Header />
      <Main />
    </StyledApp>
  );
};

export default App;
