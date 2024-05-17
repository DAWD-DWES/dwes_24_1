<?php

/**
 *  --- Lógica del script --- 
 * 
 * Establece conexión a la base de datos PDO
 * Si el usuario ya está validado
 *   Si se pide jugar con una letra
 *     Leo la letra
 *     Si no hay error en la letra introducida
 *       Solicito a la partida que compruebe la letra
 *     Invoco la vista de juego con los datos obtenidos
 *   Si no si se solicita una nueva partida
 *     Se crea una nueva partida
 *     Invoco la vista del juego para empezar a jugar
 *   Si no si se solicita una nueva partida
 *      Leo la palabra
 *      Compruebo la palabra
 *      Establezco su fecha de fin
 *      Persisto la partida
 *      Retorno el resultado de la comprobación por json
 *   Si no Invoco la vista de juego
 *  Si no (En cualquier otro caso)
 *      Invoco la vista del formulario de login
 */
require "../vendor/autoload.php";

use eftec\bladeone\BladeOne;
use Dotenv\Dotenv;
use App\BD\BD;
use App\Modelo\Partida;
use App\Almacen\AlmacenPalabrasFichero;
use App\DAO\PartidaDAO;

session_start();

define("MAX_NUM_ERRORES", 5);

$dotenv = Dotenv::createImmutable(__DIR__ . "/../");
$dotenv->load();

$views = __DIR__ . '/../vistas';
$cache = __DIR__ . '/../cache';
$blade = new BladeOne($views, $cache, BladeOne::MODE_DEBUG);

// Establece conexión a la base de datos PDO
try {
    $host = $_ENV['DB_HOST'];
    $port = $_ENV['DB_PORT'];
    $database = $_ENV['DB_DATABASE'];
    $usuario = $_ENV['DB_USUARIO'];
    $password = $_ENV['DB_PASSWORD'];
    $bd = BD::getConexion($host, $port, $database, $usuario, $password);
} catch (PDOException $error) {
    echo $blade->run("cnxbderror", compact('error'));
    die;
}

$partidaDAO = new PartidaDAO($bd);

// Si el usuario ya está validado
if (isset($_SESSION['usuario'])) {
    $usuario = $_SESSION['usuario'];
    $partida = $_SESSION['partida'] ?? null;

// Si se pide jugar con una letra
    if (filter_has_var(INPUT_POST, 'botonenviarjugada')) {
// Leo la letra
        $letra = trim(filter_input(INPUT_POST, 'letra', FILTER_UNSAFE_RAW));

// Compruebo si la letra no es válida (carácter no válido o ya introducida)
        $error = !$partida->esLetraValida($letra);
// Si no hay error compruebo la letra
        if (!$error) {
            $partida->compruebaLetra(strtoupper($letra));
        }
        if ($partida->esFin()) {
            $partida->setFin(new DateTime('now'));
            $partidaDAO->modifica($partida);
        }
// Sigo jugando
        echo $blade->run("juego", compact('usuario', 'partida', 'error'));
// Si no si se solicita una nueva partida
    } elseif (filter_has_var(INPUT_GET, 'botonnuevapartida')) { // Se arranca una nueva partida
        if ($partida) {
            $partida->setFin(new DateTime('now'));
            $partidaDAO->modifica($partida);
        }
        $rutaFichero = $_ENV['RUTA_ALMACEN_PALABRAS'];
        $almacenPalabras = new AlmacenPalabrasFichero($rutaFichero);
        $partida = new Partida($almacenPalabras, MAX_NUM_ERRORES);
        $_SESSION['partida'] = $partida;
        $partida->setIdUsuario($usuario->getId());
        $partidaDAO->crea($partida);
// Invoco la vista del juego para empezar a jugar
        echo $blade->run("juego", compact('usuario', 'partida'));
        // Si no si se resuelve la partida con una palabra
    } elseif (filter_has_var(INPUT_POST, 'botonresolverpartida')) {
        $resolverPalabra = trim(filter_input(INPUT_POST, 'palabra', FILTER_UNSAFE_RAW));
        $partida->compruebaPalabra($resolverPalabra); // Comprueba palabra
        $partida->setFin(new DateTime('now'));
        $partidaDAO->modifica($partida);
        $resultado = $partida->esPalabraDescubierta();
        $palabra = $partida->getPalabraSecreta();
        header('Content-type: application/json'); // Envía resultado en json
        echo json_encode(['resultado' => $resultado,
            'palabra' => $palabra]);
        die;
    } else { //En cualquier otro caso
        echo $blade->run("juego", compact('usuario', 'partida'));
    }
    // En otro caso se muestra el formulario de login
} else {
    echo $blade->run("formlogin");
}
