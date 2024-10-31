document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario tradicional

    // Capturar los valores de los inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Crear un objeto con los datos
    const data = {
        email: email,
        password: password
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

            // Redirigir a la página principal (AppCliente)
            window.location.href = '/AppCliente';
        } else {
            alert('Error en el login: ' + result.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
