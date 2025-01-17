import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider";
import Spinner from "./components/Spinner/Spinner";

const LayoutPage = lazy(() => import("./layouts/LayoutPage"))
const AuthLayout = lazy(() => import("./layouts/AuthLayout"))
const TerminalBus = lazy(() => import("./pages/TerminalBus"))
const Promotions = lazy(() => import("./pages/Promotions"))
const Login = lazy(() => import("./pages/Login"))
const Home = lazy(() => import("./pages/Home"))
const RegisterUser = lazy(() => import("./pages/RegisterUser"))
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"))
const NewPassword = lazy(() => import("./pages/NewPassword"))
const ConfirmAccount = lazy(() => import("./pages/ConfirmAccount"))
const ProtectedRoute = lazy(() => import("./layouts/ProtectedRoute"))
const MainHub = lazy(() => import("./pages/MainHub"))
const NotFound = lazy(() => import("./pages/NotFound"))


function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />} >

        <AuthProvider> {/*AuthProvider es el context, rodea a las rutas para que tengan acceso a la informacion del contexto global */}
          {/* <ProyectosProvider> ProyectosProvider da acceso al context, rodea a las rutas para que tengan acceso a la informacion del contexto global */}

          <Routes>
            {/* rutas de area publica */}
            <Route path="/" element={<LayoutPage />}> {/* Ruta padre contiene a mas rutas hijas */}
              <Route index element={<Home />} />
              <Route path="terminales" element={<TerminalBus />} />
              <Route path="promociones" element={<Promotions />} />             
            </Route>

            <Route path="/usuarios" element={<AuthLayout />}> {/* Ruta padre contiene a mas rutas que en este caso son publicas e hijas  y */}
              <Route path="ingresar" element={<Login />} />
              <Route path="registrar" element={<RegisterUser />} /> {/* Ruta para registrar usuario */}
              <Route path="olvide-password" element={<ForgotPassword />} /> {/* Ruta para cuando olviden su password */}
              <Route path="olvide-password/:token" element={<NewPassword />} /> {/* Ruta dinamica para poder leer el token y definir nueva contraseña */}
              <Route path="confirm-account/:id" element={<ConfirmAccount />} /> {/* Ruta dinamica para poder leer el id y confirmar cuenta */}
            </Route>

            {/* rutas de area protegida envulta por la ruta padre con el componente RutaProtegida que envuelve las rutas hijas*/}
            <Route path="/MainHub" element={<ProtectedRoute />}>
              <Route index element={<MainHub />} />
              <Route path=":id" element={<MainHub />} /> 
              {/* <Route path="crear-proyecto" element={<NuevoProyecto />} /> */}
              {/* <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />} />
              <Route path=":id" element={<Proyecto />} />
              <Route path="editar/:id" element={<EditarProyecto />} /> */}
            </Route>

            <Route path="/*" element={<NotFound />} />


          </Routes>
          {/* </ProyectosProvider> */}
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
