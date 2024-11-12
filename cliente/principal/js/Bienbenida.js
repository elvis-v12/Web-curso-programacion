// Función para mostrar el mensaje de bienvenida
function mostrarBienvenida() {
    document.getElementById("SeccsiondeVienvenida").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// Función para cerrar el mensaje de bienvenida
function cerrarBienvenida() {
    document.getElementById("SeccsiondeVienvenida").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Función para redirigir al registro de usuario
function redirigirRegistro() {
    window.location.href = "/cliente/autentificacion/signup.html";
}
