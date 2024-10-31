document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            document.querySelectorAll('.accordion-content').forEach(content => {
                content.style.display = "none"; // Cierra otros módulos
            });
            content.style.display = "block"; // Abre el módulo seleccionado
        }
    });
});
