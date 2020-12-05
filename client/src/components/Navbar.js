import React from 'react'
import logo from '../img/logo.png'

export const Navbar = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <a className="navbar-brand" href="/">
                <img src={logo} alt="" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Current</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Future</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Past</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Initiatives
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/initiatives">Top Initiative</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/initiatives">My Initiative</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/create">Create Initiative</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Local
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <span className="dropdown-item">Counties of Ireland</span>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Cork</a>
                            <a className="dropdown-item" href="#">Galway</a>
                            <a className="dropdown-item" href="#">Mayo</a>
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