document.addEventListener("DOMContentLoaded", function() {
    // Selección de los elementos del menú lateral
    var descriptionLink = document.querySelector('[data-cy="CAREER_DESCRIPTION"] a');
    var certificateLink = document.querySelector('[data-cy="CAREER_CONTENT"] a');
    var modulesLink = document.querySelector('[data-cy="CAREER_SCHEDULE"] a');
    var admissionLink = document.querySelector('[data-cy="CAREER_ADMISSION_PROCESS"] a');

    // Selección de los contenedores que se mostrarán en el contenido principal
    var descriptionContent = document.getElementById('description-section');
    var certificateContent = document.getElementById('certificate-section');
    var modulesContent = document.getElementById('modules-section');
    var admissionContent = document.getElementById('admission-section');

    // Oculta todas las secciones inicialmente
    function hideAllSections() {
        descriptionContent.style.display = 'none';
        certificateContent.style.display = 'none';
        modulesContent.style.display = 'none';
        admissionContent.style.display = 'none';
    }

    // Inicialmente oculta todas las secciones
    hideAllSections();

    // Muestra la sección de descripción
    if (descriptionLink) {
        descriptionLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections(); // Oculta todas las secciones
            descriptionContent.style.display = 'block'; // Muestra la sección de descripción
        });
    }

    // Muestra la sección de certificado
    if (certificateLink) {
        certificateLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections(); // Oculta todas las secciones
            certificateContent.style.display = 'block'; // Muestra la sección de certificado
        });
    }

    // Muestra la sección de módulos
    if (modulesLink) {
        modulesLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections(); // Oculta todas las secciones
            modulesContent.style.display = 'block'; // Muestra la sección de módulos
        });
    }

    // Muestra la sección de proceso de admisión
    if (admissionLink) {
        admissionLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections(); // Oculta todas las secciones
            admissionContent.style.display = 'block'; // Muestra la sección de proceso de admisión
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    // Selección de los elementos del menú lateral
    var descriptionLink = document.querySelector('[data-cy="CAREER_DESCRIPTION"] a');
    var certificateLink = document.querySelector('[data-cy="CAREER_CONTENT"] a');
    var modulesLink = document.querySelector('[data-cy="CAREER_SCHEDULE"] a');
    var admissionLink = document.querySelector('[data-cy="CAREER_ADMISSION_PROCESS"] a');
    var scheduleLink = document.querySelector('[data-cy="CAREER_HORARIO"] a'); // Agrega la referencia para Horario

    // Selección de los contenedores que se mostrarán en el contenido principal
    var descriptionContent = document.getElementById('description-section');
    var certificateContent = document.getElementById('certificate-section');
    var modulesContent = document.getElementById('modules-section');
    var admissionContent = document.getElementById('admission-section');
    var scheduleContent = document.getElementById('schedule-section'); // Agrega la referencia para la sección Horario

    // Oculta todas las secciones inicialmente
    function hideAllSections() {
        descriptionContent.style.display = 'none';
        certificateContent.style.display = 'none';
        modulesContent.style.display = 'none';
        admissionContent.style.display = 'none';
        scheduleContent.style.display = 'none'; // Oculta la sección Horario
    }

    // Muestra la sección de descripción
    descriptionLink.addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections(); // Oculta todas las secciones
        descriptionContent.style.display = 'block'; // Muestra la sección de descripción
    });

    // Muestra la sección de certificado
    certificateLink.addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections(); // Oculta todas las secciones
        certificateContent.style.display = 'block'; // Muestra la sección de certificado
    });

    // Muestra la sección de módulos
    modulesLink.addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections(); // Oculta todas las secciones
        modulesContent.style.display = 'block'; // Muestra la sección de módulos
    });

    // Muestra la sección de proceso de admisión
    admissionLink.addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections(); // Oculta todas las secciones
        admissionContent.style.display = 'block'; // Muestra la sección de proceso de admisión
    });

    // Muestra la sección de Horario
    scheduleLink.addEventListener('click', function(event) {
        event.preventDefault();
        hideAllSections(); // Oculta todas las secciones
        scheduleContent.style.display = 'block'; // Muestra la sección de Horario
    });
});
