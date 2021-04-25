import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

import useLocalStorageState from "../hooks/useLocalStorageState";
import { Sun, Moon } from "./ThemeModeIcon";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px;
  padding: 10px 2rem;
  color: var(--color-primary);
  font-family: "Raleway", sans-serif;
  width: 100%;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 2rem;
  margin: 0;
`;

const Link = styled.div`
  font-size: 1.5rem;
  text-decoration: none;
  cursor: pointer;
  color: var(--color-primary);
`;

const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: end;
  margin-right: 1em;
  margin-left: auto;
  height: 100%;
`;

const Header = ({ switchTheme, setUser }) => {
  const [theme, setTheme] = useLocalStorageState("theme", "dark");

  useEffect(() => {
    switchTheme(theme);
  }, [switchTheme, theme]);

  const logOut = () => {
    window.localStorage.removeItem("loggedUser");
    return setUser(null);
  };

  return (
    <StyledHeader>
      <H2>My Turn</H2>
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "light" ? <Moon /> : <Sun />}
      </Button>
      <div onClick={logOut}>
        <Link>log-out</Link>
      </div>
    </StyledHeader>
  );
};

export default Header;
