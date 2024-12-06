//ARCHIVO QUE CONTIENE EL CONTEXTO GLOBAL CON INFORMACION PARA PODER HACERLA ACCESIBLE EN TODA LA APP
import { useState, useEffect, createContext } from "react";
import AlertMessage from "../components/Alerta"
import clienteAxios from "../config/clienteAxios";
import { useNavigate, useParams, useLocation } from "react-router-dom"


const AuthContext = createContext(); //creamos el contexto 

//creamos el provider con la fn AuthProvider que rode a la App por eso recibe children
const AuthProvider = ({ children }) => {
    // informacion que sera disponible
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(false); //arranca en true y cambia hasta que finalice la peticion
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuSystemRole, setMenuSystemRole] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    //comprobar si existe un token en el LS para autenticarlo en caso de que exista
    useEffect(() => {
        //fn que autentica al usuario
        const authUser = async () => {
            //extraemos el token de LS
            const token = tokenExists()
            if (!token) return

            setCargando(true);
            //cabeceras para el envio de la peticion (objeto con la config)
            const config = {
                headers: {
                    "Content-Type": "application/json", //tipo de contenido
                    Authorization: `Bearer ${token}`, //enviamos el tipo de autenticacion que es Bearer y el JWT que es nuestro token
                }
            }

            //si hay token se intenta autenticar al usuario con JWT
            try {
                //extraemos la respuesta de nuestar peticion lo hacemos con await para que se detenga la ejecucion hasta obtener la respuesta de lo contrario sigue ejecutando y data se llena con valor de undefind
                const { data: { user: userReceived } } = await clienteAxios('users/profile', config);
                const user = {
                    _id: userReceived.id,
                    name: userReceived.nombre,
                    email: userReceived.email,
                    rolUser: userReceived?.rolUser ? userReceived.rolUser : null
                }
                console.log(user);
                setAuth(user);
                navigate('/MainHub')

            } catch (error) {
                console.log(error);
                setAuth({});
                localStorage.clear()
            } finally {
                setCargando(false);
            }

        }

        // if(location)
        authUser();
        
    }, [])


    //valida que exista un token
    const tokenExists = () => {
        const token = localStorage.getItem('token');

        //si no existe el token lo regresamos al login
        if (!token) {
            console.log("No existe token");
            return navigate("./")
        }

        return token
    }

    //fn para cerrar la sesion de la autenticacion
    const cerrarSesionAuth = () => {
        //seteamos los estates a vacios para 
        localStorage.clear()
        setAuth({})
        navigate("./")
    }

    //muestra alerta en base al objeto recibido
    const showAlert = (infoAlert) => {
        AlertMessage(infoAlert)
    };

    //maneja el estado del menu mobil
    const toggleMenu = () => {
        console.log('cambiando estado de menu mobile');        
        setIsMenuOpen(!isMenuOpen);
    };
    //validacion de datos ingresados por el usuario
    const checkUserRegistrationInput = ({ nombre, email, password, repetirPassword }) => {

        try {
            //metemos en un array los estates para poder usar el metodo includes y evaluar que ninguno incluya valor vacio
            if ([nombre, email, password, repetirPassword].includes('')) {
                throw new Error('Todos los campos son obligatorios');
            }

            //comprueba si password y repetir password no son iguales 
            if (password !== repetirPassword) {
                throw new Error('Los passwords ingresados no son iguales');
            }

            //comprueba si la password es menor a 6 caracteres
            if (password.length < 6) {
                throw new Error('El password es muy corto, Debe ser  mayor a 6 caracteres');
            }

        } catch (error) {

            throw { messageCustom: error.message }
        }

    }

    //obtiene el rol del sistema
    const getMenuSystemRole = async () => {
        const token = tokenExists()
        if (!token) return

        setCargando(true);
        //cabeceras para el envio de la peticion (objeto con la config)
        const config = {
            headers: {
                "Content-Type": "application/json", //tipo de contenido
                Authorization: `Bearer ${token}`, //enviamos el tipo de autenticacion que es Bearer y el JWT que es nuestro token
            }
        }

        //si hay token se intenta autenticar al usuario con JWT
        try {
            //extraemos la respuesta de nuestar peticion lo hacemos con await para que se detenga la ejecucion hasta obtener la respuesta de lo contrario sigue ejecutando y data se llena con valor de undefind
            const { data: { user: userReceived } } = await clienteAxios('users/profile', config);
            const user = {
                _id: userReceived.id,
                name: userReceived.nombre,
                email: userReceived.email,
                rolUser: userReceived?.rolUser ? userReceived.rolUser : null
            }
            console.log(user);
            setAuth(user);
            navigate('/MainHub')

        } catch (error) {
            console.log(error);
            setAuth({});
            localStorage.clear()
        } finally {
            setCargando(false);
        }
    }

    if (cargando) {
        showAlert({ typeAlert: 'loading' })
    }
    if (!cargando) {
        showAlert({ typeAlert: 'closeAlert' })
    }

    //retornamos el context
    return (
        <AuthContext.Provider
            value={{ //prop que devuelve informacion  en un objeto que es la que esta disponible para los componentes
                setAuth,
                auth,
                cargando,
                setCargando,
                cerrarSesionAuth,
                showAlert,
                navigate,
                params,
                location,
                tokenExists,
                checkUserRegistrationInput,
                isMenuOpen,
                toggleMenu,
                getMenuSystemRole,
                menuSystemRole

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext;