export class PlanService {
        findAll = async () => {
                try {
                        const response = await fetch('/server/data/dataPlanes.json');
                        if (!response.ok) {
                                throw new Error(`Error ${response.status}: ${response.statusText}`);
                        }
                        const data = await response.json();
                        return data;
                } catch (error) {
                        console.error(error);
                }
        }

}