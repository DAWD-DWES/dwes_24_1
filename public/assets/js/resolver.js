/*
// Definición del manejador de eventos para el botón de resolver (JQuery) 
$(document).ready(function () {
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
            muestraMensaje(mensaje);
            muestraPalabra(response.palabra);
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
// Función que muestra el mensaje después de comprobar la palabra usada para resolver (Jquery)
function muestraMensaje(mensaje) {
    $("#mensaje").text(mensaje);
}


// Función que muestra el mensaje después de comprobar la palabra usada para resolver (Jquery)
function muestraPalabra(palabra) {
    $("#palabra").text(palabra.split('').join(' '));
}


// Función que deshabilita un botón dado su id (Jquery)
function deshabilitaBoton(boton) {
    $("#${boton}").prop('disabled', true);
}

*/



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
    objXMLHttpRequest.onreadystatechange = function () {
        if (objXMLHttpRequest.readyState === 4) {
            if (objXMLHttpRequest.status === 200) {
                const response = objXMLHttpRequest.response;
                mensaje = (response.resultado) ? "Enhorabuena!" : "Has perdido!";
                muestraMensaje(mensaje);
                muestraPalabra(response.palabra);
                $('#botonenviarjugada').prop('disabled', true);
                $('#botonresolverpartida').prop('disabled', true);
            }
        }
    };
    objXMLHttpRequest.open('POST', 'juego.php');
    objXMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    objXMLHttpRequest.send(data);
}

// Función que muestra el mensaje después de comprobar la palabra usada para resolver (JavaScript puro)
function muestraMensaje(mensaje) {
    const elementMensaje = document.getElementById('mensaje');
    elementMensaje.innerText = mensaje;
}

// Función que muestra la palabra secreta después de resolver el juego (JavaScript puro)
function muestraPalabra(palabra) {
    const elementPalabra = document.getElementById('palabra');
    elementPalabra.innerText = palabra;
}

// Función que deshabilita un botón dado su id (Javascript puro)
function deshabilitaBoton(boton) {
    document.getElementById(boton).disabled = true;
}