import { Novedad } from "/server/script/model/Novedad.js";

export class NovedadService {
        static findAll = async () => {
                try {
                        const response = await fetch("/server/data/dataNovedades.json");
                        const data = await response.json();
                        return data.map(jsonNovedad => {
                                return new Novedad(
                                        jsonNovedad.id,
                                        jsonNovedad.portada,
                                        jsonNovedad.name,
                                        jsonNovedad.description,
                                        jsonNovedad.date,
                                )
                        })
                } catch (error) {
                        console.log(error)
                }
        }
}