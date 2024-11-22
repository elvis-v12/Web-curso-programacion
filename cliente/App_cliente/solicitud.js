document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('#becaForm');

        form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const solicitud = {
                        id_usuario: 1, // Esto debería ser dinámico, según el usuario autenticado
                        nombre: document.getElementById('nombre').value,
                        dni: document.getElementById('dni').value,
                        fecha_nacimiento: document.getElementById('fechaNacimiento').value,
                        numero_telefono: document.getElementById('telefono').value,
                        email: document.getElementById('email').value,
                        sexo: document.getElementById('sexo').value,
                        pais: document.getElementById('pais').value,
                        departamento: document.getElementById('departamento').value,
                        distrito: document.getElementById('distrito').value,
                        direccion_domiciliaria: document.getElementById('direccion').value,
                        codigo_postal: document.getElementById('codigoPostal').value,
                        referencia: document.getElementById('referencia').value,
                        estado: 'En espera'
                };
                console.log(solicitud);

                try {
                        const checkResponse = await fetch('http://localhost:3000/api/solicitud-check', {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ id_usuario: solicitud.id_usuario })
                        });

                        const checkResult = await checkResponse.json();
                        if (checkResult.hasSolicitud) {
                                alert('Ya existe una solicitud en proceso para este usuario.');
                                return;
                        }

                        const response = await fetch('http://localhost:3000/api/solicitud-save', {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(solicitud)
                        });

                        if (response.ok) {
                                alert('Solicitud enviada exitosamente.');
                        } else {
                                const errorData = await response.json();
                                alert('Error al enviar la solicitud: ' + errorData.error);
                        }
                } catch (error) {
                        console.error('Error:', error);
                        alert('Hubo un problema al enviar la solicitud.');
                }
        });
});
