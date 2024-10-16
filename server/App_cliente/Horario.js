// Script para tabs
    document.querySelectorAll('.tab-link').forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');

            // Eliminar la clase activa de todos los tabs
            document.querySelectorAll('.tab-link').forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            // Ocultar todos los contenedores de horario
            document.querySelectorAll('.schedule-container').forEach(container => container.classList.remove('active'));

            // Mostrar el contenedor correspondiente
            document.getElementById(target).classList.add('active');

            // Asegurar que la opción seleccionada sigue mostrando el horario correcto
            const selectedOption = document.querySelector('input[name="schedule-option"]:checked').value;
            if (target === 'fulltime') {
                document.getElementById(`fulltime-option-${selectedOption.toLowerCase()}`).style.display = 'grid';
            } else {
                document.getElementById(`parttime-option-${selectedOption.toLowerCase()}`).style.display = 'grid';
            }
        });
    });

    // Script para cambiar entre Opción A y Opción B
    document.querySelectorAll('.option-radio').forEach(option => {
        option.addEventListener('change', function() {
            const value = this.value;

            // Ocultar todas las opciones de Full Time y Part Time
            document.querySelectorAll('.schedule-grid').forEach(grid => grid.style.display = 'none');

            if (document.querySelector('.tab-link.active').getAttribute('data-tab') === 'fulltime') {
                document.getElementById(`fulltime-option-${value.toLowerCase()}`).style.display = 'grid';
            } else {
                document.getElementById(`parttime-option-${value.toLowerCase()}`).style.display = 'grid';
            }
        });
    });

    // Mostrar el horario correcto cuando la página carga
    document.addEventListener('DOMContentLoaded', function() {
        const selectedOption = document.querySelector('input[name="schedule-option"]:checked').value;
        document.getElementById(`fulltime-option-${selectedOption.toLowerCase()}`).style.display = 'grid';
    });