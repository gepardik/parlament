import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)
    const [role, setRole] = useState(null)
    const [userCountry, setUserCountry] = useState(null)
    const [userLocal, setUserLocal] = useState(null)

    const login = useCallback((jwtToken, id, username, role, userCountry, userLocal) => {
        setToken(jwtToken)
        setUserId(id)
        setUserName(username)
        setRole(role)
        setUserCountry(userCountry)
        setUserLocal(userLocal)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, userName: username, role, userCountry, userLocal
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserName(null)
        setRole(null)
        setUserCountry(null)
        setUserLocal(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.userName, data.role, data.userCountry, data.userLocal)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, userName, role, userCountry, userLocal, ready }
}
