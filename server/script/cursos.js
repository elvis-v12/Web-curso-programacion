import { CursosService } from "../script/service/CursosService.js";
import { Carrito } from "../../cliente/carrito.js"
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
            this.searchForm = document.querySelector(".search__form");
            this.coursesTitle = document.querySelector(".courses__title");
            this.categoriasHTML = document.querySelectorAll('.categorias__item');
            this.btnSearchCourse = document.querySelector('#btnSearchCourse');
            this.btnFilterPopular = document.querySelector("#filterPopular")
            this.btnFilterRecent = document.querySelector("#filterRecent")

            await this.renderCourses();
            this.searchForm.addEventListener('submit', (e) => {
                  e.preventDefault();
                  this.handleSearch()
            });
            this.btnSearchCourse.addEventListener('click', (e) => {
                  this.handleSearch()
            });

            this.categoriasHTML.forEach(categoria => {
                  categoria.addEventListener('click', () => {
                        let categoriaSearch = categoria.getAttribute('data-value');
                        this.handleSearchByCategory(categoriaSearch);

                  });
            });
      }

      async renderCourses(cursos = null) {
            const cursosNovedades = cursos || await this.cursoService.findCoursesNovedades();
            try {
                  if (Array.isArray(cursosNovedades)) {
                        // Concatenamos todo el HTML en una sola variable
                        let cursosHTML = '';
                        cursosNovedades.forEach(curso => {
                              cursosHTML += `
                                    <article class="courses__item" id="course-${curso.code}">
                                        <img src="${curso.portada}" alt="${curso.name}">
                                        <h3 class="courses__item_title">${curso.name}</h3>
                                        <div class="courses__item_data">
                                            <p>Autor: ${curso.author}</p>
                                            <p>Precio: ${curso.price} Precio anterior: ${curso.pricePrevious}</p>
                                            <p>Idioma: ${curso.language}</p>
                                        </div>
                                        <div class="courses__item_options">
                                            <button class="courses__item_option" id="btnCarrito-${curso.code}">Añadir al carrito</button>
                                            <button class="courses__item_option" id="btnPlan-${curso.code}">Agregar a un plan</button>
                                        </div>
                                    </article>
                                    `;
                        });

                        // Asignamos el HTML generado una sola vez
                        this.coursesListHTML.innerHTML = cursosHTML;

                        // Agregamos eventos a los botones después de que el HTML se ha insertado
                        cursosNovedades.forEach(curso => {
                              const btnAñadirCarrito = document.querySelector(`#btnCarrito-${curso.code}`);
                              const btnAgregarPlan = document.querySelector(`#btnPlan-${curso.code}`);

                              btnAñadirCarrito.addEventListener('click', () => {
                                    Carrito.addProduct(curso);
                              });

                              btnAgregarPlan.addEventListener('click', () => {

                              });
                        });

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

      async handleSearchByCategory(value) {
            const searchTerm = value.trim().toLowerCase();
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
