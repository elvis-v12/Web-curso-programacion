document.addEventListener("DOMContentLoaded", () => {
        const codePlan = new URLSearchParams(window.location.search).get("plan")
        document.querySelector(".datos-form__submit").addEventListener("click", () => {
                document.querySelector(".popular__item-buy-modal").showModal()
        })
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
})