import { PlanService } from "../service/PlanService.js";

document.addEventListener("DOMContentLoaded", () => {
        const codePlan = new URLSearchParams(window.location.search).get("plan")
        render(codePlan);
})
const render = code => {
        try {
                const planService = new PlanService();
                const planByCode = planService.findPlanByCode(code);
                planByCode.then(plan => {
                        const headerHTML = `<h2 class="header__name">Plan ${plan.name}</h2>`;
                        document.querySelector(".header").innerHTML += headerHTML
                        const mainHTML = `
                <section class="datos-form-container">
                        <form action="" class="datos-form">
                                <label class="datos-form__label" for="nombre-completo">Ingresa tus Datos:</label>
                                <div class="datos-form__inputs">
                                        <input type="text" required name="nombre-completo" id="nombre-completo" placeholder="Nombre completo" class="datos-form__input">
                                        <input type="email" required name="correo-electronico" id="correo-electronico" placeholder="Correo electrónico" class="datos-form__input">
                                </div>
                                <input type="submit" value="Continuar" class="datos-form__submit">
                        </form>
                </section>
                <section class="informacion-plan">
                        <article class="informacion-plan__item">
                                <h3 class="informacion-plan__titulo">Precio:</h3>
                                <p class="informacion-plan__precio">S/${plan.price}</p>
                        </article>
                        <article class="informacion-plan__item">
                                <h3 class="informacion-plan__titulo">Características:</h3>
                                <div class="informacion-plan__caracteristicas">${plan.caracteristicas}</div>
                        </article>
                </section>
                        `;
                        document.querySelector(".datos-container").innerHTML = mainHTML
                        addEventListener()
                }).catch((error) => {
                        console.error(error);
                });

        } catch (error) { }

};


const addEventListener = () => {
        const form = document.querySelector('.datos-form');
        const nombreCompletoInput = document.querySelector('#nombre-completo');
        const correoElectronicoInput = document.querySelector('#correo-electronico');

        form.addEventListener('submit', (e) => {
                e.preventDefault(); // prevent the form from submitting

                const nombreCompleto = nombreCompletoInput.value.trim();
                const correoElectronico = correoElectronicoInput.value.trim();

                // Validate the inputs
                if (nombreCompleto === '') {
                        alert('Por favor, ingresa tu nombre completo');
                        return;
                }

                if (!validateEmail(correoElectronico)) {
                        alert('Por favor, ingresa un correo electrónico válido');
                        return;
                }
                document.querySelector(".popular__item-buy-modal").showModal()
        });
        // Acciones de modales
        document.querySelector(".cancel-button").addEventListener("click", () => {
                document.querySelector(".popular__item-buy-modal").close();
        });
        document.querySelector(".continue-button").addEventListener("click", () => {
                const cardOption = document.getElementById("card-option");
                const qrOption = document.getElementById("qr-option");
                if (cardOption.checked) {
                        // Si está seleccionada la tarjeta, redirige a index.html
                        window.location.href = '/cliente/pago/index.html';
                } else if (qrOption.checked) {
                        // Si está seleccionada la opción de Yape, redirige a Yape.html
                        window.location.href = '/cliente/pago/Yape.html';
                } else {
                        alert("Por favor, selecciona un método de pago.");
                }
        });
}

function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
}