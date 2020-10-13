import { createGlobalStyle } from "styled-components";

// GlobalStyle Component
// to attach CSS-variables
// to root node
export const GlobalStyles = createGlobalStyle`
  html {
    --color-text: #595E77;
    --colol-text-light: #3E4157;
    --gradient-background: linear-gradient(to bottom, #292B3F, #332639);
    --background-main: rgba(71, 70, 91, 0.25);
    --color-header-background: #1d1d31;
    --color-primary: #1099A2;
    --color-secondary:#B19053;
    --color-therziary: #B16550;
    --color-border:1px solid rgba(0, 0, 0, 0.2);
  }
`;
