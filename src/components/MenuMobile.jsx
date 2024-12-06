import React from 'react'
import { NavLink } from "react-router-dom";


export default function MenuMobile({toggleMenu}) {
    return (
        <ul className="bg-red-500 text-white w-full shadow-md md:hidden">
            <li className="p-4">
                <NavLink to="/" onClick={() => toggleMenu(false)}>
                Inicio
                </NavLink>
            </li>
            <li className="p-4">
                <NavLink to="/promociones" onClick={() => toggleMenu(false)}>
                Promociones
                </NavLink>
            </li>
            <li className="p-4">
                <NavLink to="/terminales" onClick={() => toggleMenu(false)}>
                Terminales
                </NavLink>
            </li>
            <li className="p-4">
                <NavLink to="/mis-viajes" onClick={() => toggleMenu(false)}>
                Mis viajes
                </NavLink>
            </li>
        </ul>
    )
}
