<?php
// Habilitar la visualización de errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "stylegenie";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Conexión fallida: " . $conn->connect_error]));
}

// Verificar si se recibieron los datos correctamente
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre_titular = $_POST['name'] ?? null;
    $numero_tarjeta = $_POST['card'] ?? null;
    $codigo_cvc = $_POST['cvc'] ?? null;
    $fecha_expiracion = ($_POST['exp_month'] ?? null) . '/' . ($_POST['exp_year'] ?? null);
    $correo_electronico = $_POST['email'] ?? null;
    $descripcion = $_POST['description'] ?? null;
    $monto = $_POST['total'] ?? null;

    // Preparar y vincular
    $stmt = $conn->prepare("INSERT INTO pagos (nombre_titular, numero_tarjeta, codigo_cvc, fecha_expiracion, correo_electronico, descripcion, monto) VALUES (?, ?, ?, ?, ?, ?, ?)");
    if ($stmt === false) {
        die(json_encode(["status" => "error", "message" => "Error en la preparación de la consulta: " . $conn->error]));
    }

    $stmt->bind_param("ssssssd", $nombre_titular, $numero_tarjeta, $codigo_cvc, $fecha_expiracion, $correo_electronico, $descripcion, $monto);

    if ($stmt->execute()) {
        echo "<script>alert('Pago completado exitosamente'); window.location.href = '/Sistema_tienda/vista/V_V_Catalogo/V_Principal/Catalogo_Productos.html';</script>";
    } else {
        echo "<script>alert('Error al guardar los datos: " . $stmt->error . "'); window.history.back();</script>";
    }

    $stmt->close();
} else {
    echo "<script>alert('No se recibieron datos por POST.'); window.history.back();</script>";
}

$conn->close();
?>
