import { CursosView } from "./course.js";
import { ScholarshipsView } from "./scholarships.js";
import { PagoView } from "./pagos.js";

document.addEventListener('DOMContentLoaded', (e) => {
    new AdministradorView();
});

class AdministradorView {
    constructor() {
        // Definir las vistas
        this.views = {
            course: CursosView,
            scholarships: ScholarshipsView,
            pagos: PagoView
        };
        // Inicialización
        this.init();
    }

    init() {
        // Selecciona los elementos del DOM
        this.tabsHTML = document.querySelector('.tabs');
        this.tabsListHTML = document.querySelectorAll('.tabs__list_item');
        this.bodyHTML = document.querySelector('.body');
        this.tabsMenuHTML = document.querySelector('.tabs-menu');
        this.tabsMenuContentHTML = document.querySelector('.tabs-menu__content');
        this.tabsMenuLineHTML = document.querySelectorAll(".tabs-menu__line");
        this.contentHTML = document.querySelector('.body__content');
        this.footerHTML = document.querySelector('.footer');
        this.usuariosContainer = document.querySelector('.container_usuario'); // Contenedor de usuarios
        this.allSections = document.querySelectorAll('.container_usuario, .other-section-class'); // Selecciona todas las secciones

        // Añadir eventos
        this.tabsMenuHTML.addEventListener('click', this.clickMenuTabs);
        this.tabsListHTML.forEach(tabHTML => {
            tabHTML.addEventListener('click', (e) => {
                this.clickTab(tabHTML);
            });
        });

        // Inicializa la primera pestaña
        if (this.tabsListHTML.length > 0) {
            this.clickTab(this.tabsListHTML[0]);
        }
    }

    // Función para mostrar/ocultar el menú lateral
    clickMenuTabs = () => {
        if (this.tabsMenuHTML.classList.contains('tabs-menu__active')) {
            this.tabsMenuHTML.classList.remove('tabs-menu__active');
            this.tabsHTML.style.display = 'none';
            this.tabsHTML.removeAttribute('open');
        } else {
            this.tabsMenuHTML.classList.add('tabs-menu__active');
            this.tabsHTML.style.display = 'flex';
            this.tabsHTML.setAttribute('open', '');
        }
    }

    // Función para manejar el cambio de pestañas
    clickTab = async (targetElement) => {
        try {
            // Ocultar todas las secciones
            this.hideAllSections();

            if (targetElement.id === 'Usuarios') {
                // Mostrar la sección de usuarios
                this.usuariosContainer.style.display = 'block';
                return; // No realiza fetch ya que es contenido dinámico
            }

            // Para otras pestañas, realiza el fetch
            const response = await fetch(`${targetElement.id}/${targetElement.id}.html`);
            if (!response.ok) {
                console.warn(`No se pudo cargar el archivo: ${targetElement.id}.html`);
                return;
            }

            // Establece el contenido HTML del contenedor principal
            this.contentHTML.innerHTML = await response.text();

            // Comprueba si hay una vista personalizada para la pestaña
            if (this.views.hasOwnProperty(targetElement.id)) {
                new this.views[targetElement.id]();
            }
        } catch (error) {
            console.error('Error al cambiar de pestaña:', error);
        }
    }

    // Función para ocultar todas las secciones
    hideAllSections() {
        this.allSections.forEach(section => {
            section.style.display = 'none';
        });
    }
}

