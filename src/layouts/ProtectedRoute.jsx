//COMPONENETE QUE PROTEGE LAS RUTAS QUE ENVUELVE EN EL APP.JSX 
import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"; //hook propio para extraer informacion del context
import { Header, SideBar } from "../index"



export default function ProtectedRoute() {

    const { auth, cargando } = useAuth() //Extrae lo que esta en el return en el context , el objeto tiene una propiedad llamada auth 


    return (
        <>
            {/* Validamos por id la propiedad extraída; si existe está autenticado, de lo contrario redirige al login */}
            {auth?._id ? (
                <div className="min-h-screen flex">
                    {/* Aside */}
                    <aside className="w-1/4  text-white p-4">
                        <SideBar />
                    </aside>

                    {/* Main Content */}
                    <main className="w-3/4 bg-gray-100 p-6">
                        <Outlet />
                    </main>
                </div>
            ) : (
                <Navigate to="/" />
            )}
        </>
    )
}
