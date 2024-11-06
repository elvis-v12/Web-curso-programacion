document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener los valores del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validar usuario y contraseña
    if (email === 'admin@gmail.com' && password === 'admin') {
        // Redirigir a la página de administración (index.html)
        window.location.href = '/cliente/administrador/index.html';
    } else {
        alert('Credenciales incorrectas. Inténtelo de nuevo.');
    }
});



//conexion a base datos