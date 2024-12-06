import React from 'react'
import { Link } from "react-router-dom";



export default function Menu() {
    return (
        <ul className="hidden md:flex space-x-6">
            <li>
                <Link
                    to="/"
                    className="hover:text-blue-300"
                    activeClassName="font-bold"
                >
                    Inicio
                </Link>
            </li>
            <li>
                <Link
                    to="/promociones"
                    className="hover:text-blue-300"
                    activeClassName="font-bold"
                >
                    Promociones
                </Link>
            </li>
            <li>
                <Link
                    to="/terminales"
                    className="hover:text-blue-300"
                    activeClassName="font-bold"
                >
                    Terminales
                </Link>
            </li>
            <li>
                <Link
                    to="/mis-viajes"
                    className="hover:text-blue-300"
                    activeClassName="font-bold"
                >
                    Mis viajes
                </Link>
            </li>
        </ul>
    )
}
