import { Plan } from "../model/Plan.js";

export class PlanService {
        getSubscriptions = async () => {
                try {
                        const response = await fetch("/server/data/planes.json");
                        if (!response.ok) {
                                throw new Error(`Error fetching data: ${response.status}`);
                        }
                        const data = await response.json();
                        if (!data || !data.length) {
                                return null;
                        }
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

        findPlanByCode = async (code) => {
                try {
                        const response = await fetch("/server/data/planes.json");
                        if (!response.ok) {
                                throw new Error(`Error fetching data: ${response.status}`);
                        }
                        const data = await response.json();
                        if (!data || !data.length) {
                                return null;
                        }
                        return data.map((jsonObject) => {
                                return new Plan(
                                        jsonObject.code,
                                        jsonObject.name,
                                        jsonObject.price,
                                        jsonObject.description,
                                        jsonObject.caracteristicas
                                );
                        }).find((plan) => plan.code == code);
                } catch (error) {
                        console.error(`Error finding plan by code: ${error}`);
                }
        };
}

