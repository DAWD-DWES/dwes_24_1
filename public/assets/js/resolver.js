/* Definición del manejador de eventos para el botón de resolver con JQuery */
$(document).ready(function () {
    $("#botonresolverpartida").click(resolverPartida);
});



/* Definición del manejador de eventos para el botón de resolver con vanilla JavaScript
 document.addEventListener("DOMContentLoaded", function () {
 const botonpista = document.getElementById('botonresolver');
 botonpista.addEventListener("click", resolverPartida);
 });
 */



/* Función para iniciar el proceso AJAX de resolución de partida y recoger los resultados y mostrarlos en la página */

function resolverPartida(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $.ajax({
        type: "POST",
        url: "juego.php",
        dataType: "json",
        data: {botonresolverpartida: true,
                palabra: $('#letra').val()},
        success: function (response)
        {
            mensaje = (response.resultado) ? "Enhorabuena!" : "Has perdido!";
            muestraMensaje(mensaje);
            muestraPalabra(response.palabra);
            $('#botonenviarjugada').prop('disabled', true);
            $('#botonresolverpartida').prop('disabled', true);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
};

function muestraMensaje(mensaje) {
    $("#mensaje").text(mensaje);
}

function muestraPalabra(palabra) {
    $("#palabra").text(palabra.split('').join(' '));
}