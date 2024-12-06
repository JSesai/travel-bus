import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LayoutPage() {
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main className="container mx-auto mt-2 md:mt-15 p-5 md:flex md:justify-center">


                <div >
                    <Outlet />
                </div>

            </main>
            <footer className="bg-gray-200 text-center p-4">
                <Footer />
            </footer>
        </>
    )
}