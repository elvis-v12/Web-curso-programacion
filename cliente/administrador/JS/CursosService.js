export class CursosService {
        findAll = async () => {
                try {
                        const response = await fetch("http://localhost:3000/api/cursos")
                        if (!response.ok) {
                                throw new Error("Error en la respuesta del servidor")
                        }
                        const data = await response.json()
                        return data
                } catch (error) {

                }
        }
        findCoursesNovedades = async () => {
                try {
                        const response = await fetch("http://localhost:3000/api/cursos-recomendados")
                        if (!response.ok) {
                                throw new Error("Error en la respuesta del servidor")
                        }
                        const data = await response.json()
                        return data
                } catch (error) {
                        console.error(error)
                }
        }

        async searchCourses(searchTerm) {
                try {
                        const response = await fetch("dataCoursesNovedades.json")
                        if (!response.ok) {
                                throw new Error("Error en la respuesta del servidor")
                        }
                        const courses = await response.json();
                        // Filtra los cursos según el término de búsqueda
                        if (!Array.isArray(courses)) {
                                return [];
                        }

                        // Separar el término de búsqueda en palabras
                        const searchWords = searchTerm.split(" ").map(word => word.toLowerCase());

                        // Filtrar los cursos que contienen al menos una de las palabras
                        const filteredCourses = courses.filter(curso => {
                                const cursoName = curso.name.toLowerCase();
                                const cursoCode = curso.code.toLowerCase();

                                // Ver si alguna de las palabras está en el nombre o código
                                return searchWords.some(word => cursoName.includes(word) || cursoCode.includes(word));
                        });

                        // Ordenar los resultados: primero los que contienen todas las palabras
                        const sortedCourses = filteredCourses.sort((a, b) => {
                                const aName = a.name.toLowerCase();
                                const aCode = a.code.toLowerCase();
                                const bName = b.name.toLowerCase();
                                const bCode = b.code.toLowerCase();

                                const aMatchAll = searchWords.every(word => aName.includes(word) || aCode.includes(word));
                                const bMatchAll = searchWords.every(word => bName.includes(word) || bCode.includes(word));

                                // Si A contiene todas las palabras y B no, A va primero
                                if (aMatchAll && !bMatchAll) return -1;
                                if (!aMatchAll && bMatchAll) return 1;
                                return 0; // Si ambos o ninguno coincide con todas las palabras, mantener el orden
                        });

                        return sortedCourses;
                } catch (error) {
                        console.error("Error al filtrar los cursos:", error);
                }
        }

        findById = async ({ code }) => {
                console.log(code);

                try {
                        const response = await fetch("http://localhost:3000/api/cursos?code=" + code);
                        if (!response.ok) {
                                throw new Error("Error en la respuesta del servidor");
                        }

                        // Obtenemos el curso desde el servidor
                        const data = await response.json();

                        // Creamos un auxiliar que agrega el campo `modules` sin modificar `data`
                        const dataWithModules = {
                                ...data,
                                modules: [
                                        {
                                                code: "MOD001",
                                                name: "Módulo 1: Introducción a Python",
                                                description: "En este módulo aprenderás las bases del lenguaje Python",
                                                contenidos: [
                                                        {
                                                                code: "CON001",
                                                                nombre: "Clase 1",
                                                                descripcion: "Introducción a la programación",
                                                                contenido: "https://youtu.be/QDYfEBY9NM4",
                                                                recursos: [
                                                                        {
                                                                                code: "RES001",
                                                                                nombre: "Recursos",
                                                                                descripcion: "Descargar recursos",
                                                                                url: "Contenido 1"
                                                                        },
                                                                        {
                                                                                code: "RES002",
                                                                                nombre: "Recursos 2",
                                                                                descripcion: "Descargar recursos",
                                                                                url: "Contenido 2"
                                                                        }
                                                                ]
                                                        },
                                                        {
                                                                code: "CON002",
                                                                nombre: "Clase 2",
                                                                descripcion: "Estructuras de control",
                                                                contenido: "https://youtu.be/QDYfEBY9NM4",
                                                                recursos: [
                                                                        {
                                                                                code: "RES001",
                                                                                nombre: "Recursos",
                                                                                descripcion: "Descargar recursos",
                                                                                url: "Contenido 1"
                                                                        },
                                                                        {
                                                                                code: "RES002",
                                                                                nombre: "Recursos 2",
                                                                                descripcion: "Descargar recursos",
                                                                                url: "Contenido 2"
                                                                        }
                                                                ]
                                                        }
                                                ]
                                        },
                                        {
                                                code: "MOD002",
                                                name: "Módulo 2: Python Intermedio",
                                                description: "En este módulo aprenderás conceptos más avanzados de Python",
                                                contenidos: [
                                                        {
                                                                code: "CON003",
                                                                nombre: "Clase 3",
                                                                descripcion: "Programación orientada a objetos",
                                                                contenido: "https://youtu.be/QDYfEBY9NM4",
                                                                recursos: [
                                                                        {
                                                                                code: "RES001",
                                                                                nombre: "Recursos",
                                                                                descripcion: "Descargar recursos",
                                                                                url: "Contenido 1"
                                                                        },
                                                                        {
                                                                                code: "RES002",
                                                                                nombre: "Recursos 2",
                                                                                descripcion: "Descargar recursos",
                                                                                url: "Contenido 2"
                                                                        }
                                                                ]
                                                        }
                                                ]
                                        }
                                ]
                        };

                        // Retornamos el nuevo objeto con los módulos agregados
                        return dataWithModules;
                } catch (error) {
                        console.error(error);
                }
        };

        saveCambiosCourses = async (curso) => {
                try {
                        console.log("Datos enviados:", JSON.stringify(curso, null, 2));


                        const response = await fetch("http://localhost:3000/api/cursos-save", {
                                method: "PUT",
                                headers: {
                                        "Content-Type": "application/json",
                                },
                                body: JSON.stringify(curso),
                        });

                        if (!response.ok) {
                                console.error("Error en la respuesta del servidor:", response.status, response.statusText);
                                const errorText = await response.text();
                                console.error("Detalle del error:", errorText);
                                throw new Error("Error en la respuesta del servidor");
                        }

                        const data = await response.json();
                        return data;
                } catch (error) {
                        console.error("Error capturado:", error);
                }
        };

        nuevoCurso = async (curso) => {
                try {
                        console.log("Datos enviados:", JSON.stringify(curso, null, 2));


                        const response = await fetch("http://localhost:3000/api/new-course", {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json",
                                },
                                body: JSON.stringify(curso),
                        });

                        if (!response.ok) {
                                console.error("Error en la respuesta del servidor:", response.status, response.statusText);
                                const errorText = await response.text();
                                console.error("Detalle del error:", errorText);
                                throw new Error("Error en la respuesta del servidor");
                        }

                        const data = await response.json();
                        return data;
                } catch (error) {
                        console.error("Error capturado:", error);
                }
        };

}