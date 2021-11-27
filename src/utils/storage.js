const storageKey = "loggedUser"

const saveUser = (user) =>
    localStorage.setItem(storageKey, JSON.stringify(user))

const loadUser = () => JSON.parse(localStorage.getItem(storageKey))

const logoutUser = () => localStorage.removeItem(storageKey)

const getAxiosConfig = () => {
    return {
        headers: { Authorization: `bearer ${loadUser().token}` }
    }
}

export default {
    saveUser,
    loadUser,
    logoutUser,
    getAxiosConfig
}
