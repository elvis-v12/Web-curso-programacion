
    // Script para activar el comportamiento de acordeón
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', () => {
            const accordionItem = button.parentElement;
            accordionItem.classList.toggle('active');
        });
    });

    // Script para tabs
    document.querySelectorAll('.tab-link').forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');

            // Eliminar la clase activa de todos los tabs
            document.querySelectorAll('.tab-link').forEach(item => item.classList.remove('active'));
            // Añadir la clase activa al tab clicado
            this.classList.add('active');

            // Ocultar todos los contenedores de cohort
            document.querySelectorAll('.cohort-container').forEach(container => container.classList.remove('active'));

            // Mostrar el contenedor correspondiente
            document.getElementById(target).classList.add('active');
        });
    });
