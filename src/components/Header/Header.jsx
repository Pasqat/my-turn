import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { Sun, Moon } from "./ThemeModeIcon";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: var(--color-header-background);
  padding: 0px 2rem;
  color: var(--color-primary);
  font-family: "Raleway", sans-serif;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 2rem;
`;

const Link = styled.a`
  font-size: 1.5rem;
  text-decoration: none;
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

const Header = ({ switchTheme }) => {
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    switchTheme(theme);
    console.log("header theme", theme);
  }, [switchTheme, theme]);

  return (
    <StyledHeader>
      <H2>Firstname</H2>
      <Button onClick={() => setTheme(!theme)}>
        {theme ? <Moon /> : <Sun />}
      </Button>
      <Link href="#">log-out</Link>
    </StyledHeader>
  );
};

export default Header;
