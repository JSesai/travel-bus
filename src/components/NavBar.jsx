import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth"; //fn hook propio que nos permite acceder a nuestro context de autenticacion AuthContext
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";



export default function Navbar() {
    // data de context AuthProvider
    const { location, auth, navigate, cerrarSesionAuth, isMenuOpen, toggleMenu } = useAuth();

    return (
        <nav className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl font-bold">
                    <Link to="/">
                        <img
                            src="/path-to-logo.png"
                            alt="Company Logo"
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>

                {/* Menu */}
                <Menu />

                {/* User Icon */}
                {location.pathname !== "/usuarios/ingresar" && location.pathname !== "/usuarios/registro" && (
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => auth?.id ? cerrarSesionAuth() : navigate("/usuarios/ingresar")}
                            className={`flex items-center space-x-1 text-sm ${auth?.id ? "text-green-500" : "text-gray-400"
                                }`}
                        >
                            <FaUserCircle size={20} />
                            <span>{auth?.id ? "Cerrar sesión" : "Iniciar sesión"}</span>
                        </button>
                    </div>
                )
                }


                {/* Mobile Menu  */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => {
                        // toggle mobile menu
                        toggleMenu()
                    }}
                >
                    ☰
                </button>
                {isMenuOpen && <MenuMobile toggleMenu={toggleMenu} />}
            </div>
        </nav>
    );
}
