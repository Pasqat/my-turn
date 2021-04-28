import { createGlobalStyle, css } from "styled-components"

// GlobalStyle Component
// to attach CSS-variables
// to html
export const GlobalStyles = createGlobalStyle`
${(props) => {
  if (props.theme === "light") {
    return css`
      html {
        --color-text: #595e77;
        --color-text-light: #c6c9df;
        --color-background: #fff;
        --gradient-background: linear-gradient(to bottom, #fff, #eae4ff);
        --background-main: rgba(0, 0, 0, 0);
        --color-header-background: #e8edff;
        --color-primary: #4bbced;
        --color-secondary: #fcd173;
        --color-terziary: #eb7b52;
        --color-green: #43b34f;
        --color-border: 2px solid rgb(240, 246, 247);
        --color-selected: #e8edff;
      }
    `
  } else if (props.theme === "dark") {
    return css`
      html {
        --color-text: #595e77;
        --color-text-light: #3e4157;
        --color-background: #292b3f;
        --gradient-background: linear-gradient(to bottom, #292b3f, #332639);
        --background-main: rgba(71, 70, 91, 0.25);
        --color-header-background: #1d1d31;
        --color-primary: #1099a2;
        --color-secondary: #b19053;
        --color-terziary: #b16550;
        --color-green: #3c973f;
        --color-border: 2px solid #37394e;
        --color-selected: #3a3a51;
      }
    `
  }
}}

body {
    height: 100%;
    background: var(--color-background);
    background-repeat: no-repeat;
    color: var(--color-text);
    overflow-x: hidden;
    margin: 0;
  font-family: 'Lato', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }

 * {
     margin: 0;
     box-sizing: border-box;}
`
