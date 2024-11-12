document.addEventListener("DOMContentLoaded", function() {
    // Selecciona los enlaces de "home", "Mis Estadísticas", "Contacto", "Video" y "Beca"
    var homeLink = document.getElementById('toggle-main');
    var statsLink = document.getElementById('toggle-stats');
    var contactLink = document.getElementById('toggle-contact'); // Enlace de contacto
    var videoLink = document.getElementById('toggle-video'); // Enlace de video
    var becaLink = document.getElementById('toggle-beca'); // Enlace de beca

    // Selecciona los contenedores que se van a mostrar/ocultar
    var mainContent = document.querySelector('.main-content'); // Contenedor principal
    var statsContent = document.querySelector('.MisEstadisticas');
    var userContent = document.getElementById('Descripcion');
    var contactContent = document.getElementById('contact'); // Contenedor de la sección de contacto
    var videoContent = document.getElementById('Video_Seccioin'); // Contenedor de la sección de video
    var becaContent = document.querySelector('.SeccionBeca'); // Contenedor de la sección de beca

    // Muestra el contenedor principal al cargar la página y oculta las otras secciones
    if (mainContent) mainContent.style.display = 'block'; // Mostrar mainContent al cargar
    if (statsContent) statsContent.style.display = 'none';
    if (userContent) userContent.style.display = 'none';
    if (contactContent) contactContent.style.display = 'none';
    if (videoContent) videoContent.style.display = 'none';
    if (becaContent) becaContent.style.display = 'none';

    // Función para ocultar todas las secciones
    function hideAllSections() {
        if (mainContent) mainContent.style.display = 'none';
        if (statsContent) statsContent.style.display = 'none';
        if (userContent) userContent.style.display = 'none';
        if (contactContent) contactContent.style.display = 'none';
        if (videoContent) videoContent.style.display = 'none';
        if (becaContent) becaContent.style.display = 'none';
    }

    // Evento para mostrar el contenido principal y ocultar los demás
    if (homeLink) {
        homeLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            if (mainContent) mainContent.style.display = 'block'; // Mostrar contenido principal

            // Actualizar el estado de los botones activos
            homeLink.classList.add('active');
            if (statsLink) statsLink.classList.remove('active');
            if (contactLink) contactLink.classList.remove('active');
            if (videoLink) videoLink.classList.remove('active');
            if (becaLink) becaLink.classList.remove('active');
        });
    }

    // Evento para mostrar las estadísticas y ocultar los demás
    if (statsLink) {
        statsLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            if (statsContent) statsContent.style.display = 'block'; // Mostrar estadísticas

            // Actualizar el estado de los botones activos
            statsLink.classList.add('active');
            if (homeLink) homeLink.classList.remove('active');
            if (contactLink) contactLink.classList.remove('active');
            if (videoLink) videoLink.classList.remove('active');
            if (becaLink) becaLink.classList.remove('active');
        });
    }

    // Evento para mostrar la sección de contacto y ocultar los demás
    if (contactLink) {
        contactLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            if (contactContent) contactContent.style.display = 'block'; // Mostrar contacto

            // Actualizar el estado de los botones activos
            contactLink.classList.add('active');
            if (homeLink) homeLink.classList.remove('active');
            if (statsLink) statsLink.classList.remove('active');
            if (videoLink) videoLink.classList.remove('active');
            if (becaLink) becaLink.classList.remove('active');
        });
    }

    // Evento para mostrar la sección de video y ocultar los demás
    if (videoLink) {
        videoLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            if (videoContent) videoContent.style.display = 'block'; // Mostrar video

            // Actualizar el estado de los botones activos
            videoLink.classList.add('active');
            if (homeLink) homeLink.classList.remove('active');
            if (statsLink) statsLink.classList.remove('active');
            if (contactLink) contactLink.classList.remove('active');
            if (becaLink) becaLink.classList.remove('active');
        });
    }

    // Evento para mostrar la sección de beca y ocultar los demás
    if (becaLink) {
        becaLink.addEventListener('click', function(event) {
            event.preventDefault();
            console.log("Sección Beca activada"); // Mensaje de depuración
            hideAllSections();
            if (becaContent) {
                becaContent.style.display = 'block'; // Mostrar sección de beca
                console.log("Sección Beca visible"); // Confirmación de visibilidad
            } else {
                console.error("Elemento 'SeccionBeca' no encontrado en el DOM"); // Mensaje de error si no existe
            }

            // Actualizar el estado de los botones activos
            becaLink.classList.add('active');
            if (homeLink) homeLink.classList.remove('active');
            if (statsLink) statsLink.classList.remove('active');
            if (contactLink) contactLink.classList.remove('active');
            if (videoLink) videoLink.classList.remove('active');
        });
    }
});
