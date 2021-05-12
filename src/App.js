import React from "react"
import "./index.css"
import { GlobalStyles } from "./GlobalStyles"

import Header from "./components/header/header"
import Main from "./components/Main"
import LoginForm from "./components/loginForm/loginForm"
import { TurnsProvider } from "./context/turnsContext"

import useLocalStorageState from "./hooks/useLocalStorageState"

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

    function switchTheme(passedTheme) {
        return setTheme(passedTheme)
    }

    return (
        <StyledApp theme={theme}>
            {user === null ? (
                <LoginForm setUser={setUser} />
            ) : (
                <>
                    <Header switchTheme={switchTheme} setUser={setUser} />
                    <TurnsProvider>
                        <Main />
                    </TurnsProvider>
                </>
            )}
        </StyledApp>
    )
}
export default App
