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
                --gradient-background: linear-gradient(
                    to bottom,
                    rgba(255, 255, 255, 0.15),
                    rgb(234, 228, 255, 0.15)
                );
                --background-main: rgba(0, 0, 0, 0);
                --color-header-background: #e8edff;
                --color-primary: #4bbced;
                --color-secondary: #fcd173;
                --color-blue1: #4bbced;
                --color-blue2: #5a6ff0;
                --color-yellow1: #ffcb48;
                --color-orange1: #ffa948;
                --color-green1: #34b966;
                --color-green2: #078837;
                --color-purple1: #653dae;
                --color-purple2: #be3699;
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
                --gradient-background: linear-gradient(
                    to bottom,
                    rgb(41, 43, 63, 0.15),
                    rgb(51, 38, 57, 0.15)
                );
                --background-main: rgba(71, 70, 91, 0.25);
                --color-header-background: #1d1d31;
                --color-primary: #1099a2;
                --color-secondary: #b19053;
                --color-blue1: #1099a2;
                --color-blue2: #3d5176;
                --color-yellow1: #b19053;
                --color-orange1: #b16550;
                --color-green1: #3c973f;
                --color-green2: #3a7b5c;
                --color-purple1: #593d78;
                --color-purple2: #7b3a73;
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
