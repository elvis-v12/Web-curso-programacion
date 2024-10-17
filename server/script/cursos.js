import { CursosService } from "../script/service/CursosService.js";

document.addEventListener('DOMContentLoaded', (e) => {
        new Curso();
});

class Curso {
        constructor() {
                this.cursoService = new CursosService();
                this.init();
        }

        async init() {
                this.coursesListHTML = document.querySelector('.courses__list');
                this.searchInputTxt = document.querySelector('.search__input_txt');
                this.btnSearchCourse = document.querySelector('#btnSearchCourse');
                this.searchForm = document.querySelector(".search__form");
                this.coursesTitle = document.querySelector(".courses__title");
                await this.renderCourses();
                this.searchForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        this.handleSearch()
                });
                this.btnSearchCourse.addEventListener('click', (e) => {
                        this.handleSearch()
                });
        }

        async renderCourses(cursos = null) {
                const cursosNovedades = cursos || await this.cursoService.findCoursesNovedades();
                try {
                        if (Array.isArray(cursosNovedades)) {

                                this.coursesListHTML.innerHTML = cursosNovedades.map(curso => `
                                <a href="${curso.url}?code=${curso.id}">
                                        <article class="courses__item">
                                                <img src="${curso.portada}" alt="${curso.name}">
                                                <h3 class="courses__item_title">${curso.name}</h3>
                                                <div class="courses__item_data">
                                                        <p>Autor: ${curso.author}</p>
                                                        <p>Precio: ${curso.price} Precio anterior: ${curso.pricePrevious}</p>
                                                        <p>Idioma: ${curso.language}</p>
                                                </div>
                                        </article>
                                </a>
                                `).join('');
                        } else {
                                console.error("El resultado no es un array", cursosNovedades);
                        }
                } catch (error) {
                        console.error("Error al cargar los cursos destacados:", error);
                }
        }

        async handleSearch() {
                const searchTerm = this.searchInputTxt.value.trim().toLowerCase();

                if (searchTerm === "") {
                        this.renderCourses();
                        this.coursesTitle.innerHTML = "Cursos Recomendados"
                        return;
                }
                this.coursesTitle.innerHTML = "Búsqueda:"
                try {
                        const filteredCourses = await CursosService.searchCourses(searchTerm);

                        if (filteredCourses.length > 0) {
                                this.renderCourses(filteredCourses);
                        } else {
                                this.coursesListHTML.innerHTML = "<p>No se encontraron cursos.</p>";
                        }
                } catch (error) {
                        console.error("Error durante la búsqueda de cursos:", error);
                }
        }
}
