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
                        const response = await fetch("dataCoursesNovedades.json")
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
                try {
                        const response = await fetch("dataCourse.json")
                        if (!response.ok) {
                                throw new Error("Error en la respuesta del servidor")
                        }
                        const data = await response.json()
                        const curso = data.find(curso => curso.code === code)
                        return curso
                } catch (error) {

                }
        }
}