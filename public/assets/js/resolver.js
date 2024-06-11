// Descomenta esta sección si vas a programar con JQuery

// Inicio Sección JQuery

// Definición del manejador de eventos para el botón de resolver (JQuery) 
/* $(document).ready(function () {
    $("#botonresolverpartida").click(resolverPartida);
});
// Función para iniciar el proceso AJAX de resolución de partida y recoger los resultados y mostrarlos en la página (JQuery) 
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
            muestraTexto('mensaje', mensaje);
            muestraTexto('palabra', response.palabra.split('').join(' '));
            deshabilitaBoton('botonenviarjugada');
            deshabilitaBoton('botonresolverpartida');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}
;
*/

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
    e.preventDefault();
    e.stopImmediatePropagation();
    let inputPalabra = document.getElementById('letra');
    var data = 'botonresolverpartida=' + encodeURIComponent(true) + "&palabra=" + encodeURIComponent(inputPalabra.value);
    var objXMLHttpRequest = new XMLHttpRequest();
    objXMLHttpRequest.responseType = 'json';
    objXMLHttpRequest.onload = function () {
        if (objXMLHttpRequest.status === 200) { // Verifica que la petición fue exitosa
            const response = objXMLHttpRequest.response;
            var mensaje = (response.resultado) ? "Enhorabuena!" : "Has perdido!";
            muestraTexto('mensaje', mensaje);
            muestraTexto('palabra', response.palabra.split('').join(' '));
            deshabilitaBoton('botonenviarjugada');
            deshabilitaBoton('botonresolverpartida');
        } else {
            // Manejar otros códigos de estado HTTP, como errores 4xx y 5xx
            console.error('Error en la petición: ', objXMLHttpRequest.status);
        }
    };
    objXMLHttpRequest.open('POST', 'juego.php');
    objXMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    objXMLHttpRequest.send(data);
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