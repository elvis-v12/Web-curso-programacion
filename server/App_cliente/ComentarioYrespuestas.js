// Obtener los elementos de abrir y cerrar el modal
const openModalButtons = document.querySelectorAll('.openModalButton'); // Cambiado a selector de clase
const closeModalButton = document.getElementById('closeModalButton');
const modal = document.getElementById('routeModal');
const modalBackground = document.createElement('div');
modalBackground.classList.add('ModalBackground');

// Añadir fondo oscuro al body
document.body.appendChild(modalBackground);

// Función para abrir el modal
function openModal() {
    modal.classList.add('active');
    modalBackground.classList.add('active');
    modal.style.display = 'block'; // Mostrar el modal
}

// Función para cerrar el modal
function closeModal() {
    modal.classList.remove('active');
    modalBackground.classList.remove('active');
    modal.style.display = 'none'; // Ocultar el modal
}

// Añadir eventos a los botones de abrir modal
openModalButtons.forEach(button => {
    button.addEventListener('click', openModal);
});

// Evento para cerrar el modal
closeModalButton.addEventListener('click', closeModal);

// Cerrar modal al hacer clic fuera del modal
modalBackground.addEventListener('click', closeModal);

document.addEventListener('DOMContentLoaded', () => {
    const pathNameInput = document.getElementById('pathNameInput');
    const charCounter = document.getElementById('charCounter');
    const savePathButton = document.getElementById('savePathButton');
    const learningPathsContainer = document.querySelector('.LearningPathsContainer');
    const emptyLearningPaths = document.querySelector('.EmptyLearningPaths');
    const deleteModal = document.getElementById('deleteModal');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const routeNameToDelete = document.getElementById('routeNameToDelete');

    let itemToDelete; // Elemento que se va a eliminar

    // Actualizar contador de caracteres
    pathNameInput.addEventListener('input', () => {
        const currentLength = pathNameInput.value.length;
        charCounter.textContent = `${currentLength}/50`;
    });

    // Función para mostrar el modal de confirmación de eliminación
    function showDeleteModal(routeElement) {
        itemToDelete = routeElement;
        const routeName = routeElement.querySelector('.LearningPathsListItem-content-title').textContent;
        routeNameToDelete.textContent = `“${routeName}”`;
        deleteModal.classList.remove('hidden');
        deleteModal.style.display = 'block';
    }

    // Función para cerrar el modal de confirmación de eliminación
    function closeDeleteModal() {
        deleteModal.classList.add('hidden');
        deleteModal.style.display = 'none';
        itemToDelete = null; // Restablecer el elemento a eliminar
    }

    // Evento para cancelar la eliminación
    cancelDeleteButton.addEventListener('click', closeDeleteModal);

    // Evento para confirmar la eliminación
    confirmDeleteButton.addEventListener('click', () => {
        if (itemToDelete) {
            itemToDelete.remove();

            // Verificar si no quedan rutas y mostrar el mensaje de "No tienes rutas"
            if (learningPathsContainer.children.length === 0) {
                emptyLearningPaths.classList.remove('hidden');
            }
        }
        closeDeleteModal();
    });

    // Añadir funcionalidad al botón de eliminar de las rutas existentes
    function addDeleteEventToButton(button) {
        button.addEventListener('click', () => {
            const routeElement = button.closest('.LearningPathsListItem');
            if (routeElement) {
                showDeleteModal(routeElement);
            }
        });
    }

    // Función para guardar la nueva ruta y mostrarla
    savePathButton.addEventListener('click', () => {
        const routeName = pathNameInput.value.trim();
        if (routeName) {
            // Clonar el HTML existente para la nueva ruta
            const template = document.querySelector('.LearningPathsListItem.hidden'); 
            if (template) {
                const newRoute = template.cloneNode(true);
                newRoute.classList.remove('hidden');

                // Ajustar el contenido del nuevo elemento clonado
                newRoute.querySelector('.LearningPathsListItem-content-title').textContent = routeName;
                newRoute.querySelector('.LearningPathsListItem-container img').alt = routeName;

                // Añadir funcionalidad al botón de eliminar de la nueva ruta
                const deleteButton = newRoute.querySelector('.ButtonLayout-module_ButtonLayout__eaqR3');
                addDeleteEventToButton(deleteButton);

                // Añadir la nueva ruta al contenedor de rutas
                learningPathsContainer.appendChild(newRoute);
                learningPathsContainer.classList.remove('hidden');
                emptyLearningPaths.classList.add('hidden'); // Ocultar el mensaje de "No tienes rutas"
                closeModal(); // Cerrar el modal después de guardar
            } else {
                console.error("La plantilla de la ruta no se encontró.");
            }
        }
    });

    // Asignar eventos de eliminación a los botones existentes en el HTML al cargar la página
    const existingDeleteButtons = document.querySelectorAll('.ButtonLayout-module_ButtonLayout__eaqR3');
    existingDeleteButtons.forEach(addDeleteEventToButton);
});
