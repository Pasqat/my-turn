import { createGlobalStyle, css } from "styled-components";

// GlobalStyle Component
// to attach CSS-variables
// to html
export const GlobalStyles = createGlobalStyle`
${(props) => {
  if (props.theme === "light") {
    return css`
      html {
        --color-text: #595e77;
        --colol-text-light: #c6c9df;
        --gradient-background: linear-gradient(to bottom, #fff, #eae4ff);
        --background-main: rgba(0, 0, 0, 0);
        --color-header-background: #E8EDFF;
        --color-primary: #4bbced;
        --color-secondary: #fcd173;
        --color-terziary: #eb7b52;
        --color-border: 1px solid #c6c9df;
        --color-selected: #E8EDFF
      }
    `;
  }
  return css`
    html {
      --color-text: #595e77;
      --colol-text-light: #3e4157;
      --gradient-background: linear-gradient(to bottom, #292b3f, #332639);
      --background-main: rgba(71, 70, 91, 0.25);
      --color-header-background: #1d1d31;
      --color-primary: #1099a2;
      --color-secondary: #b19053;
      --color-terziary: #b16550;
      --color-border: 1px solid rgba(0, 0, 0, 0.2);
      --color-selected: #3A3A51;
    }
  `;
}}
  body {
    height: 100%;
    background: var(--gradient-background);
    background-repeat: no-repeat;
    color: var(--color-text);
    overflow-x: hidden;
  }
`;
