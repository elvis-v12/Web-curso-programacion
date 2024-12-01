import { CursosService } from "./CursosService.js";

(() => {
        document.addEventListener("DOMContentLoaded", () => {
                console.log("lel");

                const addCourses = () => document.querySelector("#add-courses");
                console.log(addCourses());
                const btnSaveContentCourse = () => addCourses().querySelector(".form-options-content-menu-new-course button");
                console.log(btnSaveContentCourse());

                btnSaveContentCourse().addEventListener("click", async (event) => {
                        event.preventDefault(); // Evita que el formulario recargue la página

                        // Captura de datos del formulario
                        const curso = {
                                titulo: addCourses().querySelector("#course-name").value.trim(),
                                precio: parseFloat(addCourses().querySelector("#course-price").value.trim()),
                                idioma: addCourses().querySelector("#course-language").value.trim(),
                                idCategoria: addCourses().querySelector("#course-learning-path").value,
                                descripcion: addCourses().querySelector("#course-description").innerText.trim(),
                                resumen: addCourses().querySelector("#course-summary").innerText.trim(),
                                detalles: addCourses().querySelector("#course-details").innerText.trim(),
                        };
                        console.log(curso);
                        // Valida que los campos requeridos tengan datos
                        if (!curso.titulo || !curso.precio || !curso.idioma || !curso.idCategoria) {
                                alert("Por favor, completa todos los campos obligatorios.");
                                return;
                        }
                        console.log(curso);

                        try {
                                // Llamada al método nuevoCurso de CursosService
                                const cursosService = new CursosService();
                                const result = await cursosService.nuevoCurso(curso);

                                // Manejo de la respuesta
                                console.log("Curso creado exitosamente:", result);
                                alert("El curso se creó correctamente.");
                        } catch (error) {
                                console.error("Error al crear el curso:", error);
                                alert("Hubo un error al crear el curso. Inténtalo de nuevo.");
                        }
                });
        });
})();
