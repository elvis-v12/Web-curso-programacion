document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('search-input');
    const placeholderText = "atrapa tu curso";
    let index = 0;
  
    // Función para mostrar las letras una por una
    function typeText() {
      if (index < placeholderText.length) {
        input.placeholder += placeholderText[index];
        index++;
        setTimeout(typeText, 150); // Controla la velocidad de escritura
      }
    }
  
    // Iniciar el efecto de tipeo
    typeText();
  
    // Evento para limpiar el placeholder cuando se haga clic en el botón o se presione Enter
    const searchBtn = document.getElementById('search-btn');
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        input.placeholder = '';
      }
    });
  
    searchBtn.addEventListener('click', () => {
      input.placeholder = '';
    });
  });

  
  document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('#school-list li');
    const toggleButton = document.getElementById('toggleButton');
    const showItems = 8; // Mostrar solo los primeros 6 elementos
    let areItemsVisible = false; // Estado inicial

    // Ocultar los elementos que exceden el número inicial (a partir del séptimo)
    items.forEach((item, index) => {
        if (index >= showItems) {
            item.style.display = 'none'; // Aplicar display: none
        }
    });

    // Funcionalidad del botón "Ver más"
    toggleButton.addEventListener("click", function () {
        if (!areItemsVisible) {
            // Mostrar los elementos ocultos
            items.forEach((item, index) => {
                if (index >= showItems) {
                    item.style.display = 'block'; // Mostrar elementos
                }
            });
            toggleButton.textContent = "Ver menos";
        } else {
            // Ocultar los elementos nuevamente
            items.forEach((item, index) => {
                if (index >= showItems) {
                    item.style.display = 'none'; // Ocultar elementos
                }
            });
            toggleButton.textContent = "Ver todas las escuelas" ;
        }
        
        // Cambiar el estado
        areItemsVisible = !areItemsVisible;
    });
});
