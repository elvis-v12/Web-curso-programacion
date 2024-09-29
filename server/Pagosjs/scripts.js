function handleContinue() {
    // Verifica si la opción de pago con tarjeta está seleccionada
    const cardOption = document.getElementById("card-option");
    const qrOption = document.getElementById("qr-option");

    if (cardOption.checked) {
        // Si está seleccionada la tarjeta, redirige a index.html
        window.location.href = "index.html";
    } else if (qrOption.checked) {
        // Si está seleccionada la opción de Yape, redirige a Yape.html
        window.location.href = "Yape.html";
    } else {
        alert("Por favor, selecciona un método de pago.");
    }
}
