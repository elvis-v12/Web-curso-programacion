document.addEventListener('DOMContentLoaded', function () {
    const userName = localStorage.getItem('userName');
    const userNameElement = document.getElementById('userName');

    if (userName && userNameElement) {
        userNameElement.textContent = userName;
        console.log('Nombre de usuario asignado:', userName);
    } else {
        console.error('No se encontró el nombre de usuario o el elemento con id "userName".');
    }
});
