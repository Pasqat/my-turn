import React, { useReducer } from "react"

const reducer = (state, action) => {
    switch (action.type) {
    case "TOGGLE_EDITABLE":
        return {
            ...state,
            isEditable: !state.isEditable,
        }
    case "IS_NOT_EDITABLE":
        return {
            ...state,
            isEditable: false,
        }
    case "SET_TURNS":
        return {
            ...state,
            turns: action.payload,
        }
    case "ADD_NEW_MEMBER":
        return {
            ...state,
            turns: [...state.turns, action.payload],
        }
    case "GET_SHIFT":
        return {
            ...state,
            acceptedShift: action.payload,
        }
    case "UPDATE_SHIFT":
        return {
            ...state,
            acceptedShift: [...action.payload]
        }
    default:
        return state
    }
}

const initialState = {
    isEditable: false,
    turns: [],
    acceptedShift: [],
    notification: null,
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
