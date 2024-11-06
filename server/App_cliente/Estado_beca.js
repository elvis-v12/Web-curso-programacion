function cambiarEstado(estado) {
    const robotEspera = document.getElementById("robot-espera");
    const robotAceptado = document.getElementById("robot-aceptado");
    const estadoTexto = document.getElementById("estado-robot");

    if (estado === "aceptado") {
        robotEspera.style.display = "none";
        robotAceptado.style.display = "block";
        estadoTexto.innerText = "Aceptado";
    } else {
        robotEspera.style.display = "block";
        robotAceptado.style.display = "none";
        estadoTexto.innerText = "En Revisión";
    }
}

// Simula el cambio a "Aceptado" después de 5 segundos
setTimeout(() => cambiarEstado("aceptado"), 5000);
