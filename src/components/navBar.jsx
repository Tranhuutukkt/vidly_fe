import React from "react";
import {Link, NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Vidly</Link>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-link active" aria-current="page" to="/movies">Movies</NavLink>
                        <NavLink className="nav-link" to="/customers">Customers</NavLink>
                        <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;