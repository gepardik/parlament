import React from 'react'
import {useRoutes} from './routes'
import {BrowserRouter as Router} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import 'materialize-css'

function App() {
    const routes = useRoutes()
    return (
        <Router>
            <Navbar />
            <div className='container'>
                {routes}
            </div>
        </Router>
    )
}

export default App;
