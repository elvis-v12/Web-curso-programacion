export class CursosService {
        static findAll = async () => {
                try {
                        const response = await fetch("/server/data/dataCourses.json")
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
                        const response = await fetch("/server/data/dataCoursesNovedades.json")
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
                        const response = await fetch("/server/data/dataCoursesNovedades.json")
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
        findByCodeByUser = async ({ username, code }) => {
                try {
                        const response = await fetch("/server/data/dataCourseUser.json")
                        if (!response.ok) {
                                throw new Error("Error en la respuesta del servidor")
                        }
                        const data = await response.json()
                        const curso = data.find(curso => curso.code === code)
                        return curso
                } catch (error) {

                }
        }

        findCommentsByCourseModuleSession = async ({ course, session }) => {
                try {
                        const response = await fetch("/server/data/dataComentarios.json");
                        if (!response.ok) {
                                throw new Error("Error en la respuesta del servidor");
                        }
                        const comments = await response.json();

                        // Filter comments by course, module, and session codes
                        const filteredComments = comments.filter(comment =>
                                comment.courseCode === course &&
                                comment.sessionCode === session
                        );

                        return filteredComments;
                } catch (error) {
                        console.error("Error al obtener comentarios:", error);
                        return []; // Return an empty array in case of an error
                }
        };

}