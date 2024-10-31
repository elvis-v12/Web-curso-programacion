document.addEventListener("DOMContentLoaded", function() {
    // Selecciona los enlaces de "home", "Mis Estadísticas", "Usuario", "Contacto" y "Video"
    var homeLink = document.getElementById('toggle-main');
    var statsLink = document.getElementById('toggle-stats');
    var userLink = document.getElementById('toggle-user');
    var contactLink = document.getElementById('toggle-contact'); // Enlace de contacto
    var videoLink = document.getElementById('toggle-video'); // Enlace de video

    // Selecciona los contenedores que se van a mostrar/ocultar
    var mainContent = document.querySelector('.main-content');
    var statsContent = document.querySelector('.MisEstadisticas');
    var userContent = document.getElementById('Descripcion');
    var contactContent = document.getElementById('contact'); // Contenedor de la sección de contacto
    var videoContent = document.getElementById('Video_Seccioin'); // Contenedor de la sección de video

    // Ocultar inicialmente todas las secciones
    statsContent.style.display = 'none';
    userContent.style.display = 'none';
    contactContent.style.display = 'none';
    videoContent.style.display = 'none'; // Ocultar la sección de video inicialmente

    // Función para ocultar todas las secciones
    function hideAllSections() {
        mainContent.style.display = 'none';
        statsContent.style.display = 'none';
        userContent.style.display = 'none';
        contactContent.style.display = 'none';
        videoContent.style.display = 'none'; // Ocultar también la sección de video
    }

    // Evento para mostrar el contenido principal y ocultar los demás
    homeLink.addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections();
        mainContent.style.display = 'block'; // Mostrar contenido principal

        // Actualizar el estado de los botones activos
        homeLink.classList.add('active');
        statsLink.classList.remove('active');
        userLink.classList.remove('active');
        contactLink.classList.remove('active');
        videoLink.classList.remove('active');
    });

    // Evento para mostrar las estadísticas y ocultar los demás
    statsLink.addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections();
        statsContent.style.display = 'block'; // Mostrar estadísticas

        // Actualizar el estado de los botones activos
        statsLink.classList.add('active');
        homeLink.classList.remove('active');
        userLink.classList.remove('active');
        contactLink.classList.remove('active');
        videoLink.classList.remove('active');
    });

    // Evento para mostrar la descripción del usuario y ocultar los demás
    userLink.addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections();
        userContent.style.display = 'block'; // Mostrar descripción del usuario

        // Actualizar el estado de los botones activos
        userLink.classList.add('active');
        homeLink.classList.remove('active');
        statsLink.classList.remove('active');
        contactLink.classList.remove('active');
        videoLink.classList.remove('active');
    });

    // Evento para mostrar la sección de contacto y ocultar los demás
    contactLink.addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections();
        contactContent.style.display = 'block'; // Mostrar contacto

        // Actualizar el estado de los botones activos
        contactLink.classList.add('active');
        homeLink.classList.remove('active');
        statsLink.classList.remove('active');
        userLink.classList.remove('active');
        videoLink.classList.remove('active');
    });

    // Evento para mostrar la sección de video y ocultar los demás
    videoLink.addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections();
        videoContent.style.display = 'block'; // Mostrar video

        // Actualizar el estado de los botones activos
        videoLink.classList.add('active');
        homeLink.classList.remove('active');
        statsLink.classList.remove('active');
        userLink.classList.remove('active');
        contactLink.classList.remove('active');
    });
});
