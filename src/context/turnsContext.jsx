import React, { useReducer } from "react"

const reducer = (state, action) => {
    switch (action.type) {
    case "IS_EDITABLE":
        return {
            ...state,
            isEditable: true,
        }
    case "IS_NOT_EDITABLE":
        return {
            ...state,
            isEditable: false,
        }
    case "SET_TURNS":
        return {
            ...state,
            turns: action.payload
        }
    // ... you can image other cases
    default:
        return state
    }
}

const initialState = {
    isEditable: false,
    turns: [],
    notification: null
}

export const ComponentContext = React.createContext(initialState)

export const TurnsProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <ComponentContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ComponentContext.Provider>
    )
}
