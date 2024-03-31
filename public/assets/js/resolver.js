/* Definición del manejador de eventos para el botón de resolver con JQuery
$(document).ready(function () {
    $("#botonresolverpartida").click(resolverPartida);
});
*/


/* Definición del manejador de eventos para el botón de resolver con vanilla JavaScript
document.addEventListener("DOMContentLoaded", function () {
    const botonresolverpartida = document.getElementById('botonresolverpartida');
    botonresolverpartida.addEventListener("click", resolverPartida);
});
*/


/* Función para iniciar el proceso AJAX de resolución de partida y recoger los resultados y mostrarlos en la página

function resolverPartida(e) {};
*/

function muestraMensaje(mensaje) {
    $("#mensaje").text(mensaje);
}

function muestraPalabra(palabra) {
    $("#palabra").text(palabra.split('').join(' '));
}