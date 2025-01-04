//ARCHIVO CON LA CONFIGURACION PARA LAS PETICIONES CON AXIOS
import axios from "axios";
//crate crea la configuracion
console.log("Base URL:", import.meta.env.VITE_BACKEND_TRAVELBUS);
console.log("Base URL:", import.meta.env);

const clienteAxios = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_TRAVELBUS}/` //url tomada del .env y añadiendo /
})

export default clienteAxios;
