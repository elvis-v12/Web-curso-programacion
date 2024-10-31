function createAccount() {
    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    // Validaciones simples (puedes agregar más lógica según tus necesidades)
    if (!nombre || !apellido || !email || !contraseña) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Simular una creación de cuenta (puedes enviar estos datos a un servidor aquí)
    console.log('Cuenta creada:', { nombre, apellido, email, contraseña });

    // Redirigir a otra página
    window.location.href = '/cliente/Exmen_ingreso/examen_beca.html'; // Cambia 'dashboard.html' por la URL de la página a la que quieras redirigir
}
