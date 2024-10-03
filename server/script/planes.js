import { SubscriptionService } from "./service/SubscriptionService.js";
document.addEventListener("DOMContentLoaded", () => {
    const planes = document.querySelector(".planes > .planes__content");
    render(planes);
});
const render = planesHTML => {
    try {
        const subscriptionService = new SubscriptionService();
        const subscriptions = subscriptionService.getSubscriptions();
        subscriptions.then(planes => {
            const html = planes.map(plan => {
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
                                    <button type="button" class="planes__item-option" id="planes__item-${plan.code}">Suscribirse</button>
                            </footer>
                    </article>
                    `;
            }).join("");
            planesHTML.innerHTML = html;
            return planes
        }).then(planes => {
            const buttonsHTML = document.querySelectorAll(".planes__item-option")
            buttonsHTML.forEach(button => {
                button.addEventListener("click", () => {
                    const planCode = button.id.split("-").pop();
                    const selectedPlan = planes.find(plan => plan.code == planCode);
                    window.location.href = `/cliente/subscription/datos/subscription-plan.html?plan=${selectedPlan.code}`;
                });
            });
        }).catch((error) => {
            console.error("Error al obtener los planes:", error);
        });

    } catch (error) { }

};
