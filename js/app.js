const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarEstablecimientos();
});

//habilitar busqueda de establecimiento
const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {
    //console.log(buscador.value.length);
    if(buscador.value.length > 5){
        //buscar en la api
        ui.obtenerSugerencias(buscador.value);
    } else {
        ui.mostrarEstablecimientos();
    }
});