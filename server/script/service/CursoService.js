export class CursoService {
        findAll = async () => {
                try {
                        const response = await fetch("/server/data/dataCourse.json")
                        if (!response.ok) {
                                throw new Error("Error en la respuesta del servidor")
                        }
                        const data = await response.json()
                        return data
                } catch (error) {

                }
        }
        findById = async ({ code }) => {
                try {

                        const response = await fetch("/server/data/dataCourse.json")
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