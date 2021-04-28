import styled, { css } from "styled-components"

export const NotificationStyled = styled.div`
  position: absolute;
  z-index: 999;
  top: 40px;
  border-radius: 5px;
  padding: 10px 20px;
  background: var(--color-background);
  box-shadow: 0 3px 20px 2px rgba(0, 0, 0, 0.6);
  ${(props) => {
    switch (props.type) {
      case "succes":
        return css`
          color: var(--color-green);
          border: 1px solid var(--color-green);
        `
      case "error":
        return css`
          color: var(--color-terziary);
          border: 1px solid var(--color-terziary);
        `
    }
  }}
`
