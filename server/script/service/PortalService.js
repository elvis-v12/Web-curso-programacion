import { Popular } from "../model/Popular.js";

export class PortalService {
        static findAllPopular = async () => {
                try {
                        const response = await fetch('/server/data/dataCarousel.json');
                        const data = await response.json();
                        return data.map((jsonObject) => {
                                return new Popular(
                                        jsonObject.id,
                                        jsonObject.url,
                                        jsonObject.author,
                                        jsonObject.name,
                                        jsonObject.score,
                                        jsonObject.stars,
                                        jsonObject.votes,
                                        jsonObject.price,
                                        jsonObject.pricePrevous,
                                        jsonObject.portada,
                                        jsonObject.detalles,
                                        jsonObject.language,
                                        jsonObject.lastUpdate
                                );
                        });
                } catch (error) {
                        console.error(error)
                }
        }
}
