import React from "react"

const actionTypes = {
  error: "error",
  success: "success",
  warning: "warning",
  dismiss: "dismiss",
}

function notificationReducer(state, { type, payload }) {
  switch (type) {
    case actionTypes.error: {
      console.log("error")
      return {
        type: actionTypes.error,
        message: payload,
      }
    }
    case actionTypes.success: {
      return {
        type: actionTypes.success,
        message: payload,
      }
    }
    case actionTypes.warning: {
      return {
        type: actionTypes.warning,
        message: payload,
      }
    }
    case actionTypes.dismiss: {
      return {
        type: "",
        message: "",
      }
    }
    default: {
      console.log(type)
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

const initialState = {
  type: "",
  message: "",
}

function useNotification({ reducer = notificationReducer } = {}) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const { type, message } = state
  console.log("state", state, "dispatch", dispatch)
  dispatch({ type, message })

  return [state, dispatch]
}

export default useNotification
