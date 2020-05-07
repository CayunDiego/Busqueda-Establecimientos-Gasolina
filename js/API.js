class API {

    async obtenerDatos(){
        const total = 500;
        //obtenemos los datos desde la api
        const url =`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`;
        const json = await fetch(url);
        const datos = await json.json();
        return datos;
    }
}