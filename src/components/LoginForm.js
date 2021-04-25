import React from "react";
import loginService from "../services/login";
import teamService from "../services/teams";
import storage from "../utils/storage";
import styled from "styled-components";

const ContainerLogin = styled.div`
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
`;

const WrapLogin = styled.div`
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
`;

const FormLogin = styled.form`
  width: 100%;
`;

const FormTitle = styled.span`
  display: block;
  font-size: 30px;
  color: var(--color-text);
  line-height: 1.2;
  text-align: center;
  padding-bottom: 33px;
`;

const WrapInput = styled.div`
  width: 100%;
  position: relative;
  background-color: var(--color-background);
`;

const Input = styled.input`
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
`;

const WrapButton = styled.div`
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const Button = styled.button`
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
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
`;

const TextCenter = styled.div`
  text-align: center;
`;

const Link = styled.a`
  font-size: 15px;
  line-height: 1.4;
  color: var(--color-primary);
  cursor: pointer;
`;

const LoginForm = ({ setUser }) => {
  const [teamName, setTeamName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState({
    teamName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState();
  const [isLogin, setIsLogin] = React.useState(true);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const team = await loginService.login({ teamName, password });
      setUser(team);
      storage.saveUser(team);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      await teamService.register({ teamName, email, password });
      const team = await loginService.login({ teamName, password });
      storage.saveUser(team);
      setUser(team);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (!isLogin) {
    return (
      <ContainerLogin>
        <WrapLogin>
          <FormLogin onSubmit={handleRegister}>
            <FormTitle>Creat New Account</FormTitle>
            <div
              style={{
                color: "red",
                textAlign: "center",
                paddingBottom: "10px",
              }}
            >
              {errorMessage}
            </div>
            <WrapInput>
              <Input
                type="text"
                placeholder="team name"
                value={teamName}
                name="teamName"
                onChange={({ target }) => setTeamName(target.value)}
              />
            </WrapInput>
            <WrapInput>
              <Input
                style={{ borderTop: "none" }}
                type="email"
                placeholder="email"
                value={email}
                name="email"
                onChange={({ target }) => setEmail(target.value)}
              />
            </WrapInput>
            <WrapInput>
              <Input
                style={{ borderTop: "none" }}
                type="password"
                value={password}
                name="password"
                placeholder="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </WrapInput>
            <WrapButton>
              <Button type="submit">Register</Button>
            </WrapButton>
            <TextCenter style={{ paddingTop: "45px" }}>
              Whant to log-in?{" "}
              <Link onClick={() => setIsLogin(!isLogin)}>Login</Link>
            </TextCenter>
          </FormLogin>
        </WrapLogin>
      </ContainerLogin>
    );
  }
  return (
    <ContainerLogin>
      <WrapLogin>
        <FormLogin onSubmit={handleLogin}>
          <FormTitle>Account Login</FormTitle>
          <div
            style={{ color: "red", textAlign: "center", paddingBottom: "10px" }}
          >
            {errorMessage}
          </div>
          <WrapInput>
            <Input
              type="text"
              placeholder="team name"
              value={teamName}
              name="teamName"
              onChange={({ target }) => setTeamName(target.value)}
            />
          </WrapInput>
          <WrapInput>
            <Input
              style={{ borderTop: "none" }}
              type="password"
              value={password}
              name="password"
              placeholder="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </WrapInput>
          <WrapButton>
            <Button type="submit">login</Button>
          </WrapButton>
          <TextCenter style={{ paddingTop: "45px" }}>
            Not Register yet?{" "}
            <Link onClick={() => setIsLogin(!isLogin)}>Register</Link>
          </TextCenter>
        </FormLogin>
      </WrapLogin>
    </ContainerLogin>
  );
};

export default LoginForm;
