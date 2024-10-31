// archivo signup.js
const signupForm = document.querySelector('#signupForm');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Recuperar los usuarios guardados
    const Users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el usuario ya está registrado
    const isUserRegistered = Users.find(user => user.email === email);
    if (isUserRegistered) {
        return alert('El usuario ya está registrado!');
    }

    // Agregar nuevo usuario al array
    Users.push({ name, email, password });
    
    // Guardar los usuarios actualizados en localStorage
    localStorage.setItem('users', JSON.stringify(Users));

    alert('Registro Exitoso!');
    window.location.href = '/cliente/autentificacion/login.html'; // Redirigir a la página de login
});

