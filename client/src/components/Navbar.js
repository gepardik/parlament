import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext"
import logo from '../img/logo.svg'
import homeIcon from '../icons/home.svg'
import userIcon from '../icons/user.svg'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/home')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <a className="navbar-brand" href="/">
                <img src={logo} alt="" height="85rem"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav mr-6">
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link pl-4 with-icon" to="/home" style={{background: `url("${homeIcon}")`}}>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink to='/current' className="nav-link">Current</NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink to='/past' className="nav-link">Past</NavLink>
                    </li>
                    <li className="nav-item dropdown mr-4">
                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Initiatives
                        </span>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <NavLink className="dropdown-item" to="/top_initiatives">Top Initiative</NavLink>
                            <div className="dropdown-divider"></div>
                            {
                                auth.isAuthenticated
                                ?
                                    <>
                                        <NavLink className="dropdown-item" to="/my_initiatives">My Initiative</NavLink>
                                        <div className="dropdown-divider"></div>
                                        <NavLink className="dropdown-item" to="/create">Create Initiative</NavLink>
                                    </>
                                : ''
                            }

                        </div>
                    </li>
                    <li className="nav-item dropdown mr-4">
                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Local
                        </span>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <span className="dropdown-item">Counties of Ireland</span>
                            <div className="dropdown-divider"></div>
                            <span className="dropdown-item">Cork</span>
                            <span className="dropdown-item">Galway</span>
                            <span className="dropdown-item">Mayo</span>
                        </div>
                    </li>
                    <li className="nav-item dropdown mr-4">
                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={userIcon} alt=""/>
                            { auth.userName ? <span className="ml-2 text-success">{ auth.userName }</span> : ''}

                        </span>

                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {
                                !(auth.token)
                                ?
                                    <>
                                        <a className="dropdown-item" href="/register">Register</a>
                                        <a className="dropdown-item" href="/login">Login</a>
                                    </>
                                :
                                    <>
                                        {auth.role === 'admin' && <NavLink

                                            className={'dropdown-item'}
                                            to="/admin"
                                        >
                                            Admin
                                        </NavLink>}

                                            <a
                                                className={'dropdown-item'}
                                                href="/"
                                                onClick={logoutHandler}
                                            >
                                                Log out
                                            </a>
                                    </>
                            }


                        </div>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>

    )
}