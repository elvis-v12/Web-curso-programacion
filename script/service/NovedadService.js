import { Novedad } from "../model/Novedad.js";

export class NovedadService {
        static findAll = async () => {
                try {
                        const response = await fetch("/pictures/dataNovedades.json");
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