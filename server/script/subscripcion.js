import { SubscriptionService } from "./service/SubscriptionService.js";
document.addEventListener("DOMContentLoaded", () => {
        const planes = document.querySelector(".planes > .planes__content");
        render(planes);
});
const render = (planesHTML) => {
        try {
                const subscriptionService = new SubscriptionService();
                const subscriptions = subscriptionService.getSubscriptions();
                subscriptions.then((planes) => {
                        const html = planes.map((plan) => {
                                return `
                                <article class="planes__item">
                                        <header class="planes__item-header">
                                                <h3 class="planes__item-title">${plan.name}</h3>
                                        </header>
                                        <main class="planes__item-content">
                                                <section class="planes__item-description">${plan.description}</section>
                                                <section class="planes__item-caracteristicas">${plan.caracteristicas}</section>
                                        </main>
                                        <footer class="planes__item-options">
                                                <button type="button" class="planes__item-option">Suscribirse</button>
                                        </footer>
                                </article>
                                `;
                        }).join("");
                        planesHTML.innerHTML = html;
                }).catch((error) => {
                        console.error("Error al obtener los planes:", error);
                });

        } catch (error) { }

};
