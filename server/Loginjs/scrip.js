// Función para verificar si el usuario está autenticado
function isAuthenticated() {
    return localStorage.getItem('login_success') !== null;
}

// Función para actualizar el menú de navegación
function updateNavMenu() {
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const dashboardLink = document.getElementById('dashboard-link');
    const logoutLink = document.getElementById('logout-link');

    if (isAuthenticated()) {
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        dashboardLink.style.display = 'block';
        logoutLink.style.display = 'block';
    } else {
        loginLink.style.display = 'block';
        signupLink.style.display = 'block';
        dashboardLink.style.display = 'none';
        logoutLink.style.display = 'none';
    }
}

// Función para mostrar la información del cliente
function showClientInfo() {
    const clientInfo = JSON.parse(localStorage.getItem('login_success'));
    if (clientInfo) {
        document.getElementById('client-name').innerText = `Nombre: ${clientInfo.name}`;
        document.getElementById('client-email').innerText = `Email: ${clientInfo.email}`;
        document.getElementById('client-info').style.display = 'block';
    }
}

// Función para ocultar la información del cliente
function hideClientInfo() {
    document.getElementById('client-info').style.display = 'none';
}

// Función para manejar el cierre de sesión
function logout() {
    localStorage.removeItem('login_success');
    updateNavMenu();
    hideClientInfo();
    window.location.href = '/cliente/principal/inicio.html';
}

// Event listener para mostrar la información del cliente cuando se pasa el mouse sobre "Información del Cliente"
document.getElementById('dashboard-link').addEventListener('mouseover', (e) => {
    showClientInfo();
});

// Event listener para ocultar la información del cliente cuando se quita el mouse de "Información del Cliente"
document.getElementById('dashboard-link').addEventListener('mouseout', (e) => {
    if (!document.getElementById('client-info').matches(':hover')) {
        hideClientInfo();
    }
});

// Event listener para el cuadro de información del cliente para mantenerlo visible cuando el mouse está sobre él
document.getElementById('client-info').addEventListener('mouseover', (e) => {
    showClientInfo();
});

document.getElementById('client-info').addEventListener('mouseout', (e) => {
    if (!document.getElementById('dashboard-link').matches(':hover')) {
        hideClientInfo();
    }
});

// Event listener para el enlace de cierre de sesión
document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    logout();
});

// Actualiza el menú de navegación al cargar la página
document.addEventListener('DOMContentLoaded', updateNavMenu);
