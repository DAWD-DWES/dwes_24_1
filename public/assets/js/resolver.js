// Descomenta esta sección si vas a programar con JQuery

// Inicio Sección JQuery

// Definición del manejador de eventos para el botón de resolver (JQuery) 
$(document).ready(function () {
    $("#botonresolverpartida").click(resolverPartida);
});
// Función para iniciar el proceso AJAX de resolución de partida y recoger los resultados y mostrarlos en la página (JQuery) 
function resolverPartida(e) {

}
;
// Función que muestra un texto en el elemento cuyo identificador es id (Jquery)
function muestraTexto(id, texto) {
    $("#${id}").text(texto);
}


// Función que deshabilita un botón dado su id (Jquery)
function deshabilitaBoton(idBoton) {
    $("#${idBoton}").prop('disabled', true);
}

// Fin sección JQuery

// Descomenta esta sección si vas a programar con JavaScript puro

// Inicio Sección JavaScript puro

// Definición del manejador de eventos para el botón de resolver (JavaScript puro) 
document.addEventListener("DOMContentLoaded", function () {
    const botonresolverpartida = document.getElementById('botonresolverpartida');
    botonresolverpartida.addEventListener("click", resolverPartida);
});

// Función para iniciar el proceso AJAX de resolución de partida y recoger los resultados y mostrarlos en la página (JavaScript puro) 
function resolverPartida(e) {

}

// Función que muestra el mensaje después de comprobar la palabra usada para resolver (JavaScript puro)
function muestraTexto(id, texto) {
    const element = document.getElementById(id);
    element.innerText = texto;
}


// Función que deshabilita un botón dado su id (Javascript puro)
function deshabilitaBoton(idBoton) {
    document.getElementById(idBoton).disabled = true;
}

// Fin sección JavaScript puro