import jwtDecode from "jwt-decode";

const getDecodedToken = (token) => {

    try {
        const jwt = jwtDecode(token)
        const user = {
            Token: token,
            Email: null,
            isLoggedIn:true, 
            Id: jwt.id, 
            Role: jwt.role, 
            Name: jwt.sub
        }
        return user
    }
    catch (err)
    {
        return initialState
    }
}

const isLoggedIn = () => {
    const token = localStorage.getItem("token")
    if(token === undefined)
    {
        return false
    }
    const user = getDecodedToken(token)
    return user.isLoggedIn
}

const initialState = {
    Token:null,
    Name: null,
    Id: null,
    Email: null,
    Role: null,
    isLoggedIn: false
}
const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case "updateLoginState":
            let updatedUser = {...initialState}
            const decodedToken = getDecodedToken(localStorage.getItem('token'))
            const loggedIn = isLoggedIn()
            updatedUser = {...decodedToken , isLoggedIn: loggedIn}
            return {...updatedUser}
        case "onLogin":
            localStorage.setItem("token", action.payload)
            const user = getDecodedToken(action.payload)
            return {...user}
        case "onLogOut":
            localStorage.removeItem("token")
            return {
                token: null,
                isLoggedIn: false,
                Id: null,
                Role: null,
                Name: null,
                Email: null,
            }
        default:
            return state
    }
}

export default userReducer;