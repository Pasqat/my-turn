import styled from 'styled-components'

export const ContainerLogin = styled.div`
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: var(--color-header-background);
`

export const WrapLogin = styled.div`
  width: 500px;
  background: var(--color-background);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.3);
  -o-box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.3);
  -ms-box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.3);
  padding: 50px 55px 60px;
`

export const FormLogin = styled.form`
  width: 100%;
`

export const FormTitle = styled.span`
  display: block;
  font-size: 30px;
  color: var(--color-text);
  line-height: 1.2;
  text-align: center;
  padding-bottom: 33px;
`

export const WrapInput = styled.div`
  width: 100%;
  position: relative;
  background-color: var(--color-background);
`

export const Input = styled.input`
  height: 68px;
  padding: 0 25px;
  display: block;
  width: 100%;
  background: 0 0;
  font-size: 18px;
  color: var(--color-text);
  line-height: 1.2;
  outline: none;
  border: var(--color-border);
`

export const WrapButton = styled.div`
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`

export const Button = styled.button`
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 60px;
  background-color: var(--color-primary);
  font-size: 14px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
  outline: none;
  border: none;
`

export const TextCenter = styled.div`
  text-align: center;
`

export const Link = styled.a`
  font-size: 15px;
  line-height: 1.4;
  color: var(--color-primary);
  cursor: pointer;
`
