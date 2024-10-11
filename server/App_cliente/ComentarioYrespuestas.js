document.addEventListener('DOMContentLoaded', function() {
    // Cargar comentarios desde localStorage
    cargarComentarios();

    // Configurar botones de "Responder"
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('responder-btn')) {
            const respuestaDiv = event.target.closest('.comentario').querySelector('.respuesta');
            respuestaDiv.style.display = respuestaDiv.style.display === 'none' ? 'block' : 'none';
        }
    });

    // Manejar el envío de nuevos comentarios
    document.querySelector('.formulario-comentarios').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

        const textarea = this.querySelector('textarea');
        const comentarioTexto = textarea.value.trim();

        if (comentarioTexto === '') {
            alert('El comentario no puede estar vacío');
            return;
        }

        // Crear el nuevo comentario
        const nuevoComentario = {
            usuario: "Nuevo Usuario",
            texto: comentarioTexto,
            likes: 0,
            respuestas: []
        };

        agregarComentario(nuevoComentario);
        guardarComentarioEnLocalStorage(nuevoComentario); // Guardar en localStorage
        textarea.value = ''; // Limpiar el textarea después de agregar el comentario
    });

    // Manejar el incremento del contador de "Me gusta"
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('me-gusta-btn')) {
            const contadorLikes = event.target.querySelector('.contador-likes');
            const likesActuales = parseInt(contadorLikes.textContent, 10);
            contadorLikes.textContent = likesActuales + 1; // Incrementar el contador

            // Actualizar los likes en localStorage
            const comentarioDiv = event.target.closest('.comentario');
            const index = comentarioDiv.getAttribute('data-index');
            actualizarLikesComentarioEnLocalStorage(index, likesActuales + 1);
        }
    });

    // Manejar el envío de respuestas
    document.addEventListener('submit', function(event) {
        if (event.target.classList.contains('formulario-respuesta')) {
            event.preventDefault(); // Evitar que el formulario de respuesta se envíe

            const textarea = event.target.querySelector('textarea');
            const respuestaTexto = textarea.value.trim();

            if (respuestaTexto === '') {
                alert('La respuesta no puede estar vacía');
                return;
            }

            // Crear la nueva respuesta dentro de la lista de respuestas del comentario correspondiente
            const comentarioDiv = event.target.closest('.comentario');
            const respuestasLista = comentarioDiv.querySelector('.respuestas-lista');
            const nuevaRespuesta = `<div class="respuesta-texto"><p><strong>Respuesta:</strong> ${respuestaTexto}</p></div>`;
            respuestasLista.insertAdjacentHTML('beforeend', nuevaRespuesta);

            // Guardar la respuesta en localStorage
            const index = comentarioDiv.getAttribute('data-index');
            guardarRespuestaEnLocalStorage(index, respuestaTexto);

            textarea.value = ''; // Limpiar el textarea después de agregar la respuesta
            event.target.closest('.respuesta').style.display = 'none'; // Ocultar el formulario de respuesta después de enviarla
        }
    });
});

// Función para cargar comentarios desde localStorage
function cargarComentarios() {
    const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentariosGuardados.forEach((comentario, index) => {
        agregarComentario(comentario, index);
    });
}

// Función para agregar un comentario al DOM
function agregarComentario(comentario, index = null) {
    const comentariosLista = document.querySelector('.comentarios-lista');
    const nuevoComentarioHTML = `
        <div class="comentario" data-index="${index}">
            <p><strong>${comentario.usuario}:</strong> ${comentario.texto}</p>
            <div class="acciones-comentario">
                <button class="me-gusta-btn">👍 Me gusta <span class="contador-likes">${comentario.likes}</span></button>
                <button class="responder-btn">Responder</button>
            </div>
            <div class="respuesta" style="display: none;">
                <form class="formulario-respuesta">
                    <textarea placeholder="Responde aquí..." rows="2"></textarea>
                    <button type="submit">Responder</button>
                </form>
                <div class="respuestas-lista">
                    ${comentario.respuestas.map(respuesta => `<div class="respuesta-texto"><p><strong>Respuesta:</strong> ${respuesta}</p></div>`).join('')}
                </div>
            </div>
        </div>`;

    comentariosLista.insertAdjacentHTML('beforeend', nuevoComentarioHTML);
}

// Función para guardar un comentario en localStorage
function guardarComentarioEnLocalStorage(comentario) {
    const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentariosGuardados.push(comentario);
    localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));
}

// Función para actualizar los likes de un comentario en localStorage
function actualizarLikesComentarioEnLocalStorage(index, likes) {
    const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
    if (comentariosGuardados[index]) {
        comentariosGuardados[index].likes = likes;
        localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));
    }
}

// Función para guardar una respuesta en localStorage
function guardarRespuestaEnLocalStorage(index, respuestaTexto) {
    const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
    if (comentariosGuardados[index]) {
        comentariosGuardados[index].respuestas.push(respuestaTexto);
        localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));
    }
}


function toggleTexto() {
    const descripcion = document.getElementById('descripcion');
    const verMasBtn = document.querySelector('.ver-mas-btn');
    
    if (descripcion.classList.contains('expanded')) {
        descripcion.textContent = descripcion.getAttribute('data-short-text');
        verMasBtn.textContent = 'Ver más';
        descripcion.classList.remove('expanded');
    } else {
        descripcion.textContent = descripcion.getAttribute('data-full-text');
        verMasBtn.textContent = 'Ver menos';
        descripcion.classList.add('expanded');
    }
}

// Limitar texto al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const descripcion = document.getElementById('descripcion');
    const fullText = descripcion.textContent;
    const shortText = fullText.substring(0, 100) + '...'; // Limitar a los primeros 100 caracteres
    
    descripcion.setAttribute('data-full-text', fullText);
    descripcion.setAttribute('data-short-text', shortText);
    descripcion.textContent = shortText; // Mostrar solo el texto limitado al inicio
});

