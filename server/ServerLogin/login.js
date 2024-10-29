document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

    // Capturar los valores de los inputs
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('password').value;  // Cambiar a 'contraseña'

    // Crear un objeto con los datos
    const data = {
        email: email,
        contraseña: contraseña  // Cambiar a 'contraseña'
    };

    // Enviar los datos al servidor
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // Guardar el nombre de usuario en localStorage
            localStorage.setItem('userName', result.userName);

            // Redireccionar a la página principal
            console.log('Redireccionando a la página principal');
            window.location.href = '/cliente/App_cliente/App_estudiante.html';
            
        } else {
            alert('Error en el login: ' + result.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
