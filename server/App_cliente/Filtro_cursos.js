document.addEventListener('DOMContentLoaded', function() {
    const buscarInput = document.getElementById('buscarCursos');
    const autocompleteList = document.getElementById('autocomplete-list');
    const listaCursos = document.getElementById('listaCursos');
    const cursosTarjetas = listaCursos.getElementsByClassName('curso-tarjeta');
    const filtroCategoria = document.getElementById('filtroCategoria'); // Selector de categoría

    // Lista de cursos para autocompletar
    const cursos = [
        "Full Stack Development",
        "Introducción a la Programación",
        "JavaScript Avanzado",
        "Fundamentos de Python",
        "Marketing Digital",
        "Diseño de Interfaces UX/UI",
        "Curso de PHP y MySQL",
        "Python avanzado"
    ];

    // Función para mostrar sugerencias basadas en el texto ingresado
    function mostrarSugerencias() {
        const inputValue = buscarInput.value.toLowerCase();
        autocompleteList.innerHTML = ''; // Limpiar lista previa

        if (!inputValue) {
            autocompleteList.style.display = 'none';
            mostrarTodosLosCursos(); // Mostrar todos los cursos si no hay texto en el input
            return; // Salir si no hay valor
        }

        const sugerenciasFiltradas = cursos.filter(curso => curso.toLowerCase().includes(inputValue));

        sugerenciasFiltradas.forEach(curso => {
            const div = document.createElement('div');
            div.classList.add('autocomplete-item');
            div.textContent = curso;
            div.addEventListener('click', function() {
                buscarInput.value = curso; // Establecer el valor seleccionado
                filtrarCursosPorNombre(curso); // Filtrar los cursos
                autocompleteList.style.display = 'none'; // Ocultar la lista
            });
            autocompleteList.appendChild(div);
        });

        autocompleteList.style.display = sugerenciasFiltradas.length ? 'block' : 'none';
    }

    // Función para filtrar los cursos mostrados por nombre
    function filtrarCursosPorNombre(nombreCurso) {
        for (let i = 0; i < cursosTarjetas.length; i++) {
            const cursoNombre = cursosTarjetas[i].getAttribute('data-nombre').toLowerCase();
            if (cursoNombre.includes(nombreCurso.toLowerCase())) {
                cursosTarjetas[i].style.display = ''; // Mostrar el curso
            } else {
                cursosTarjetas[i].style.display = 'none'; // Ocultar el curso
            }
        }
    }

    // Función para filtrar los cursos mostrados por categoría
    function filtrarCursosPorCategoria() {
        const categoriaSeleccionada = filtroCategoria.value.toLowerCase();
        
        for (let i = 0; i < cursosTarjetas.length; i++) {
            const cursoCategoria = cursosTarjetas[i].getAttribute('data-categoria').toLowerCase();
            
            if (categoriaSeleccionada === 'todos' || cursoCategoria === categoriaSeleccionada) {
                cursosTarjetas[i].style.display = ''; // Mostrar el curso
            } else {
                cursosTarjetas[i].style.display = 'none'; // Ocultar el curso
            }
        }
    }

    // Función para mostrar todos los cursos (al borrar el texto del buscador)
    function mostrarTodosLosCursos() {
        for (let i = 0; i < cursosTarjetas.length; i++) {
            cursosTarjetas[i].style.display = ''; // Mostrar todos los cursos
        }
    }

    // Evento al escribir en el input de búsqueda
    buscarInput.addEventListener('input', mostrarSugerencias);

    // Evento para filtrar los cursos al cambiar la categoría
    filtroCategoria.addEventListener('change', filtrarCursosPorCategoria);

    // Ocultar sugerencias al hacer clic fuera del input o lista
    document.addEventListener('click', function(event) {
        if (!buscarInput.contains(event.target) && !autocompleteList.contains(event.target)) {
            autocompleteList.style.display = 'none';
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var homeLink = document.getElementById('toggle-main');
    var mainContainer = document.getElementById('mainContainer');

    function hideAllSections() {
        if (mainContainer) mainContainer.style.display = 'none';
        // Oculta las demás secciones también...
    }

    if (homeLink) {
        homeLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            if (mainContainer) mainContainer.style.display = 'block'; // Mostrar el contenedor al hacer clic

            // Agrega o remueve clases activas según sea necesario
            homeLink.classList.add('active');
            // Asegúrate de desactivar otras secciones si es necesario
        });
    }
});
