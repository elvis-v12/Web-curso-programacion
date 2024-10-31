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
}