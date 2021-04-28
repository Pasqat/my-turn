import React from "react"
import "./index.css"
import { GlobalStyles } from "./GlobalStyles"

import Header from "./components/Header/Header"
import Main from "./components/Main"
import LoginForm from "./components/loginForm/LoginForm"
import Notification from "./components/notification/Notification"
import useNotification from "./components/hooks/useNotification"

import useLocalStorageState from "./components/hooks/useLocalStorageState"

const StyledApp = ({ children, theme }) => {
  return (
    <>
      <GlobalStyles theme={theme} />
      {children}
    </>
  )
}

const App = () => {
  const [theme, setTheme] = useLocalStorageState("theme", "dark")
  const [user, setUser] = useLocalStorageState("loggedUser", null)
  const [notification, setNotification] = useNotification()

  function switchTheme(passedTheme) {
    return setTheme(passedTheme)
  }

  React.useEffect(() => {
    setNotification({ type: "error", message: "ciaone" })
  }, [])

  return (
    <StyledApp theme={theme}>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <>
          <Header switchTheme={switchTheme} setUser={setUser} />
          <Main />
        </>
      )}
    </StyledApp>
  )
}
export default App
