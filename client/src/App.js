import React from 'react'
import {useRoutes} from './routes'
import {BrowserRouter as Router} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from "./context/AuthContext"
import {Loader} from "./components/Loader"
import 'materialize-css'
import {CountryLocalContextProvider} from "./context/CountryLocalContext";

function App() {
    const {token, userId, userName, userCountry, userLocal, role, login, logout, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader />
    }

    return (
        <CountryLocalContextProvider>
            <AuthContext.Provider value={{
                token, login, logout, userId, userName, userCountry, userLocal, role, isAuthenticated
            }}>
                <Router>
                    {window.location.pathname === '/' ? '' : <Navbar />}
                    {routes}
                </Router>
            </AuthContext.Provider>
        </CountryLocalContextProvider>
    )
}

export default App;
