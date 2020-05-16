import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { auth } from './../firebase';
import { withRouter } from 'react-router-dom';

const Navbar = (props) => {

    console.log('Props: ', props);

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => props.history.push('/login'))
            .catch((error) => console.log(error))
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">React Admin</Link>
                <div>
                    <div className="d-flex">
                        <NavLink
                            className="btn btn-dark mr-2"
                            to="/"
                            exact
                        >
                            Inicio
                        </NavLink>
                        {
                            !props.firebaseUser ? (
                                <NavLink
                                    className="btn btn-dark"
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                            ) : (
                                <>
                                    <NavLink
                                        className="btn btn-dark mr-2"
                                        to="/admin"
                                    >
                                        Admin
                                    </NavLink>
                                    <button
                                        className="btn btn-dark"
                                        onClick={ () => cerrarSesion() }>
                                        Cerrar Sesión
                                    </button>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)