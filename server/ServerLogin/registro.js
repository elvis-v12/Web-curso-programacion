document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

    // Capturar los valores de los inputs
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    // Crear un objeto con los datos
    const data = {
        nombres: nombres,
        apellidos: apellidos,
        fechaNacimiento: fechaNacimiento,
        email: email,
        contraseña: contraseña
    };

    // Enviar los datos al servidor
    fetch('/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Registro exitoso');
        } else {
            alert('Error en el registro: ' + result.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
