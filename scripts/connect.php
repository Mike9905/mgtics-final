<?php
// 🔹 Habilitar CORS (Solo si es necesario)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Especificar que es JSON
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "mgtics";

// Conexión con la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// 🔹 Manejo de solicitudes OPTIONS (Necesario para CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Obtener los datos enviados desde el frontend
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que los datos fueron recibidos
if ($data) {
    // Extraer y sanitizar los valores
    $nombre = $conn->real_escape_string($data['nombre']);
    $tipo = $conn->real_escape_string($data['tipo']);
    $nivel = $conn->real_escape_string($data['nivel']);
    $descripcion = $conn->real_escape_string($data['descripcion']);

    // Registrar en un log lo que llega del frontend
    error_log("Datos recibidos: " . json_encode($data));

    // Validar que los campos no estén vacíos
    if (!empty($nombre) && !empty($tipo) && !empty($nivel) && !empty($descripcion)) {
        // Consulta SQL
        $sql = "INSERT INTO ticket (nombre, tipo, nivel, descripcion) VALUES ('$nombre', '$tipo', '$nivel', '$descripcion')";

        // Registrar en un log la consulta SQL
        error_log("Consulta SQL: " . $sql);

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Ticket registrado correctamente."]);
        } else {
            echo json_encode(["error" => "Error SQL: " . $conn->error]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Datos inválidos. Asegúrate de completar todos los campos."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "No se recibieron datos."]);
}

// Cerrar conexión
$conn->close();
?>
