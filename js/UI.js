class UI {
    constructor() {
        //Instanciar la api
        this.api = new API();
        //crear los markers con layerGroup
        this.markers = new L.LayerGroup();
        //variables para iniciar mapa
        const latitud = 19.390519;
        const longitud = -99.3739778;
        const zoom = 6;
         // Iniciar el mapa
         this.mapa = this.inicializarMapa(latitud, longitud, zoom);
        
    }

    inicializarMapa(lat, lon, zoom) {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([lat, lon], zoom);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;
    };

    mostrarEstablecimientos(){
        this.api.obtenerDatos()
            .then(datos => {
                const resultado = datos.results;
                //ejecutar la funcion para mostrar los pines
                this.mostrarPines(resultado);
            })
    };

    mostrarPines(datos){
        //limpiar los markers
        this.markers.clearLayers();
        //recorrer los establecimientos
        datos.forEach(dato => {
            //destructuring
            const {latitude, longitude, calle, regular, premium} = dato;
            //crear Popup
            const opcionesPopup = L.popup()
                .setContent(`
                            <p>Calle: ${calle}</p>
                            <p><b>Regular: </b>${regular}</p>
                            <p><b>Premium: </b>${premium}</p>
                            `);

            //agregar el pin
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopup);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);
    };

    //buscador
    obtenerSugerencias(busqueda){
        this.api.obtenerDatos()
            .then(datos => {
                //obtener los datos
                const resultados = datos.results;

                //enviar el JSON y la busqueda pare el filtrado
                this.filtrarSugerencias(resultados, busqueda);
            });
    };

    //filtra las sugerencias en base al input
    filtrarSugerencias(resultados, busqueda){
        //filtrar con .filter
        const datosFiltrados = resultados.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
        //console.log(datosFiltrados)
        //mstrar los pines
        this.mostrarPines(datosFiltrados);
    };
}