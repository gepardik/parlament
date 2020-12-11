import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)
    const [role, setRole] = useState(null)

    const login = useCallback((jwtToken, id, username, role) => {
        setToken(jwtToken)
        setUserId(id)
        setUserName(username)
        setRole(role)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, userName: username, role
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserName(null)
        setRole(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.userName, data.role)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, userName, role, ready }
}