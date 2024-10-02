import { Plan } from "../model/Plan.js";

export class SubscriptionService {
        getSubscriptions = async () => {
                try {
                        const response = await fetch("/server/data/planes.json");
                        const data = await response.json();
                        return data.map((jsonObject) => {
                                return new Plan(
                                        jsonObject.code,
                                        jsonObject.name,
                                        jsonObject.price,
                                        jsonObject.description,
                                        jsonObject.caracteristicas
                                );
                        });
                } catch (error) {
                        console.error(error);
                }
        };
}
