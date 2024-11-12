document.getElementById('logoutButton').addEventListener('click', async (event) => {
    event.preventDefault(); // Evitar la acción por defecto del enlace

    try {
        // Llamar a la ruta del servidor para cerrar sesión
        const response = await fetch('/logout', { method: 'POST' });

        if (response.ok) {
            // Redirigir al login después de cerrar sesión
            window.location.href = '/Login';
        } else {
            console.error('Error al cerrar sesión');
            alert('Hubo un error al cerrar sesión. Intenta de nuevo.');
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Hubo un error al cerrar sesión. Intenta de nuevo.');
    }
});
