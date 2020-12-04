import React from 'react'
import {NavLink} from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <span className="brand-logo">Initiatives</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/">Initiatives</NavLink></li>
                    <li><NavLink to="/create">Create</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}