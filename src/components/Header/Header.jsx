import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import useLocalStorageState from '../hooks/useLocalStorageState';
import { Sun, Moon } from './ThemeModeIcon';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px;
  padding: 10px 2rem;
  color: var(--color-primary);
  font-family: 'Raleway', sans-serif;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 2rem;
  margin: 0;
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

const Header = ({ switchTheme, user }) => {
  const [theme, setTheme] = useLocalStorageState('theme', 'dark');

  useEffect(() => {
    switchTheme(theme);
  }, [switchTheme, theme]);

  return (
    <StyledHeader>
      <H2>{user.teamName}</H2>
      <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'light' ? <Moon /> : <Sun />}
      </Button>
      <Link href="#">log-out</Link>
    </StyledHeader>
  );
};

export default Header;
