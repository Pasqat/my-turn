import React, { useReducer } from "react"

const reducer = (state, action) => {
    switch (action.type) {
    case "IS_AUTHENTICATED":
        return {
            ...state,
            isAuthenticated: true,
        }
    // ... you can image other cases
    default:
        return state
    }
}

const initialState = {
    isAuthenticated: false,
    // ... imagine so much more!
}

const ComponentContext = React.createContext(initialState)

export const TurnsProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <ComponentContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ComponentContext.Provider>
    )
}
