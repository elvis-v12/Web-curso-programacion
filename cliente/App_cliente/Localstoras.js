document.addEventListener('DOMContentLoaded', function () {
    const userName = localStorage.getItem('userName');
    console.log('Valor de userName desde localStorage:', userName);

    const userNameElement = document.getElementById('userName');
    console.log('Elemento con id "userName":', userNameElement);

    if (userName && userNameElement) {
        userNameElement.textContent = userName;
        console.log('Nombre de usuario asignado:', userName);
    } else {
        console.error('No se encontró el nombre de usuario o el elemento con id "userName".');
    }
});
