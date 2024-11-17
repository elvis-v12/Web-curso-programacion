export class CursosService {
        findAll = async () => {
                try {
                        const response = await fetch("dataCourses.json")
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
                        const response = await fetch("http://localhost:3000/api/cursos?code=" + code)
                        if (!response.ok) {
                                throw new Error("Error en la respuesta del servidor")
                        }
                        const data = await response.json()
                        return data;
                } catch (error) {

                }
        }

        // saveCambiosCourses = async (curso) => {
        //         try {
        //                 const response = await fetch("http://localhost:3000/api/cursos-save", {
        //                         method: "PUT", // Cambia a POST si deseas usar otro método
        //                         headers: {
        //                                 "Content-Type": "application/json", // Especificar que el cuerpo está en formato JSON
        //                         },
        //                         body: JSON.stringify(curso), // Convertir el objeto curso a JSON
        //                 });

        //                 if (!response.ok) {
        //                         throw new Error("Error en la respuesta del servidor");
        //                 }

        //                 const data = await response.json();
        //                 return data;
        //         } catch (error) {
        //                 console.error(error);
        //         }
        // };
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


}