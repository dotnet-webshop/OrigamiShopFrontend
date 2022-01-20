
export const onLogin = (token) => {
    return {
        type: "onLogin",
        payload: token
    }
}

export const onLogOut = () => {
    return {
        type: "onLogOut",
        payload:null
    }
}

export const updateLoginState = () => {
    return{
        type: "updateLoginState"
    }
} 