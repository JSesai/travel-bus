import React from 'react'
import useAuth from "../hooks/useAuth"; //fn hook propio que nos permite acceder a nuestro context de autenticacion AuthContext
import NavBar from '../components/NavBar';


export default function PageMain() {
    const { auth, showAlert, navigate } = useAuth();

    console.log(auth._id);


    return (
        <div className="bg-gray-100">
            <NavBar />
            <div className="md:flex md:min-h-screen">
                <SideBar />
                <main className="p-4 flex-1">
                    
                </main>
            </div>
        </div>
    )
}
