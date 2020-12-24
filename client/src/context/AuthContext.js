import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    userName: null,
    userCountry: null,
    role: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    country: null,
    local: null,
    selectCountry: noop,
    selectLocal: noop
})