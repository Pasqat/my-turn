import React from "react";
import loginService from "../services/login";
import teamService from "../services/teams";

const LoginForm = ({ loginTeam }) => {
  const [teamName, setTeamName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(
    "try TestUser and password"
  );

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const team = await loginService.login({ teamName, password });
      loginTeam(team);
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
      loginTeam(team);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div style={{marginRight: "40px"}}>
        Login
        <form onSubmit={handleLogin} style={{ margin: "auto" }}>
          <div
            style={{ color: "red", textAlign: "cente", paddingBottom: "10px" }}
          >
            {errorMessage}
          </div>
          <div>
            team name
            <input
              type="text"
              value={teamName}
              name="teamName"
              onChange={({ target }) => setTeamName(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>

      <div>
        Register
        <form onSubmit={handleRegister} style={{ margin: "auto" }}>
          <div
            style={{ color: "red", textAlign: "cente", paddingBottom: "10px" }}
          >
            {errorMessage}
          </div>
          <div>
            team name
            <input
              type="text"
              value={teamName}
              name="teamName"
              onChange={({ target }) => setTeamName(target.value)}
            />
          </div>
          <div>
                email
            <input
              type="email"
              value={email}
              name="email"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">register</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
