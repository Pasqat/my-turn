import React from "react";
import styled from 'styled-components'

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: var(--color-header-background);
  padding: 0px 2rem;
  color: var(--color-primary);
  font-family: "Raleway", sans-serif
`

const H2 = styled.h2`
  font-weight: 400;
  font-size: 2rem;
`

const Link = styled.a`
  font-size: 1.5rem;
  text-decoration: none;
  color: var(--color-primary);
`

const Header = () => {
  return (
    <StyledHeader>
      <H2>Firstname</H2>
      <Link href='#' onClick={() => alert('Are you sure?')}>log-out</Link>
    </StyledHeader>
  );
};

export default Header;
