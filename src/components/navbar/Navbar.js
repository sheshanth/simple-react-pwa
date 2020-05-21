import React from 'react'
import { NavLink } from 'react-router-dom'

import './navbar.scss';

export default function Navbar() {
  return (
    <div className="NavbarComponent">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/github" activeClassName="active">GitHub</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/sync" activeClassName="active">Sync</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
