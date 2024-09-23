const user = JSON.parse(localStorage.getItem('login_success')) || false;
if (!user) {
    window.location.href = '/View/principal/Inicio.html';
}

const logout = document.querySelector('#logout');

logout.addEventListener('click', (event) => {
    event.preventDefault();  // Evita cualquier comportamiento predeterminado
    alert('Hasta pronto!');
    localStorage.removeItem('login_success');
    window.location.href = '/View/principal/Inicio.html';
});
