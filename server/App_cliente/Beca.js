document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".beca-nav ul li a");
    const sections = document.querySelectorAll(".SeccionBeca .beca-seccion");

    function hideAllSections() {
        sections.forEach(section => {
            section.style.display = "none";
        });
    }

    function showSection(sectionId) {
        hideAllSections(); // Oculta todas las secciones
        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.style.display = "block"; // Muestra la sección específica
        }
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Previene el comportamiento predeterminado del enlace
            const targetId = this.getAttribute("href").substring(1); // Obtiene el ID de la sección (sin el #)
            showSection(targetId); // Muestra la sección correspondiente
        });
    });

    // Opcional: Muestra la primera sección por defecto al cargar
    if (sections.length > 0) {
        showSection(sections[0].id); // Muestra la primera sección automáticamente
    }
});
