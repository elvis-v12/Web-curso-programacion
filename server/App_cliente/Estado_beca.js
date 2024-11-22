async function updateEstado(robotEstado, dateEstado, idUsuario) {
    try {
        const response = await fetch(`http://localhost:3000/api/solicitud-estado/${idUsuario}`);
        if (response.ok) {
            const data = await response.json();

            // Actualizar el DOM con el estado y la fecha
            robotEstado.innerHTML = data.estado || 'Estado no disponible';
            dateEstado.innerHTML = data.fecha || 'Fecha no disponible';
        } else {
            const errorData = await response.json();
            robotEstado.innerHTML = 'Error al cargar el estado';
            dateEstado.innerHTML = errorData.error || 'Error desconocido';
        }
    } catch (error) {
        console.error('Error al obtener el estado de la solicitud:', error);
        robotEstado.innerHTML = 'Error al conectar con el servidor';
        dateEstado.innerHTML = '---';
    }
}

function cambiarEstado(estado) {
    const robotEspera = document.getElementById("robot-espera");
    const robotAceptado = document.getElementById("robot-aceptado");
    const estadoTexto = document.getElementById("estado-robot");

    const idUsuario = 1;
    updateEstado(estadoTexto, robotEspera, idUsuario);
}

// Simula el cambio a "Aceptado" después de 5 segundos
setTimeout(() => cambiarEstado("aceptado"), 5000);
