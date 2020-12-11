import React from 'react'
import {useRoutes} from './routes'
import {BrowserRouter as Router} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import {Empty} from './components/Empty'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from "./context/AuthContext"
import 'materialize-css'
import {Loader} from "./components/Loader";

function App() {
    const {token, userId, userName, role, login, logout, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, userName, role, isAuthenticated
        }}>
            <Router>
                {window.location.pathname === '/' ? <Empty /> : <Navbar />}
                {routes}
            </Router>
        </AuthContext.Provider>

    )
}

export default App;
