document.addEventListener('DOMContentLoaded', function() {
    const agregarMetaBtn = document.getElementById('agregarMetaBtn');
    const metaDiaria = document.getElementById('metaDiaria');
    const cancelarMetaBtn = document.getElementById('cancelarMetaBtn');
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownOptions = document.getElementById('dropdownOptions');
    const selectedOptionText = document.getElementById('selectedOption');
    const optionContent = document.getElementById('optionContent');
    const customInputContainer = document.getElementById('customInputContainer');
    const customInput = document.getElementById('customInput');
    const guardarMetaBtn = document.getElementById('guardarMetaBtn');
    const agregarMeta = document.getElementById('agregarMeta');
    const metaGuardada = document.getElementById('metaGuardada');
    let selectedOption = '';
    let selectedValue = '';

    // Mostrar modal al hacer clic en "Agregar meta"
    agregarMetaBtn.addEventListener('click', function() {
        metaDiaria.style.display = 'block';  // Muestra el modal
    });

    cancelarMetaBtn.addEventListener('click', function() {
        metaDiaria.style.display = 'none';  // Oculta el modal
    });

    // Mostrar opciones del dropdown
    dropdownButton.addEventListener('click', function() {
        dropdownOptions.style.display = dropdownOptions.style.display === 'none' || dropdownOptions.style.display === '' ? 'block' : 'none';
    });

    // Manejar la selección de opciones
    dropdownOptions.addEventListener('click', function(event) {
        selectedOption = event.target.getAttribute('data-option');

        if (selectedOption) {
            selectedOptionText.innerText = selectedOption;
            dropdownOptions.style.display = 'none';  // Oculta las opciones
            optionContent.style.display = 'block';  // Muestra el contenido dinámico
            updateContent(selectedOption); // Actualiza el contenido según la opción seleccionada
        }
    });

    // Función para actualizar el contenido dinámico según la opción seleccionada
    function updateContent(option) {
        optionContent.innerHTML = ''; // Limpia el contenido anterior
        customInputContainer.style.display = 'none'; // Ocultar input personalizado por defecto
        guardarMetaBtn.disabled = true; // Desactivar botón "Guardar" hasta que se seleccione algo

        if (option === "Por clases") {
            optionContent.innerHTML = `
                <p class="SetGoalForm-form-title">¿Cuántas clases te comprometes a estudiar?</p>
<div class="SetGoalForm-form-buttonGrid" style="display: flex; justify-content: center; flex-wrap: wrap; background: #2c3e50; text-align: center; margin-top: 17px; padding: 10px; border-radius: 2px; max-height: 200px; overflow-y: auto;">
    <button class="SetGoalForm-form-buttonGrid-button" data-value="1 clase" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease;">1 clase</button>
    <button class="SetGoalForm-form-buttonGrid-button" data-value="2 clases" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease;">2 clases</button>
    <button class="SetGoalForm-form-buttonGrid-button" data-value="3 clases" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease;">3 clases</button>
    <button class="SetGoalForm-form-buttonGrid-button" id="otroValor" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease;">Otro valor</button>
</div>

            `;
        } else if (option === "Por minutos") {
            optionContent.innerHTML = `
    <p class="SetGoalForm-form-title">¿Cuántos minutos te comprometes a estudiar?</p>
    <div class="SetGoalForm-form-buttonGrid" style="display: flex; justify-content: center; flex-wrap: wrap; background: #2c3e50; text-align: center; margin-top: 17px; padding: 10px; border-radius: 2px; max-height: 200px; overflow-y: auto;">
    <button class="SetGoalForm-form-buttonGrid-button" data-value="30 minutos" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease;">30 minutos</button>
    <button class="SetGoalForm-form-buttonGrid-button" data-value="45 minutos" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease;">45 minutos</button>
    <button class="SetGoalForm-form-buttonGrid-button" data-value="60 minutos" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease;">60 minutos</button>
    <button class="SetGoalForm-form-buttonGrid-button" data-value="90 minutos" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease;">90 minutos</button>
    <button class="SetGoalForm-form-buttonGrid-button" data-value="120 minutos" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease;">120 minutos</button>
    <button class="SetGoalForm-form-buttonGrid-button" id="otroValor" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease;">Otro valor</button>
</div>

`;
        } else if (option === "Por horas") {
            optionContent.innerHTML = `
               <p class="SetGoalForm-form-title">¿Cuántas horas te comprometes a estudiar?</p>
<div class="SetGoalForm-form-buttonGrid" style="display: flex; justify-content: center; flex-wrap: wrap; background: #2c3e50; text-align: center; margin-top: 17px; padding: 10px; border-radius: 2px; max-height: 200px; overflow-y: auto;">
    <button class="SetGoalForm-form-buttonGrid-button" data-value="1 hora" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease, border 0.3s ease;">1 hora</button>
    <button class="SetGoalForm-form-buttonGrid-button" data-value="2 horas" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease, border 0.3s ease;">2 horas</button>
    <button class="SetGoalForm-form-buttonGrid-button" data-value="3 horas" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease, border 0.3s ease;">3 horas</button>
    <button class="SetGoalForm-form-buttonGrid-button" id="otroValor" style="width: 97%; margin: 10px 0px 0px 0px; padding: 6px; background-color: #1ABC9C; color: white; cursor: pointer; border: none; border-radius: 2px; text-align: center; font-size: 16px; transition: background-color 0.3s ease, border 0.3s ease;">Otro valor</button>
</div>

            `;
        }

        // Detectar cuando se selecciona "Otro valor"
        document.getElementById('otroValor').addEventListener('click', function() {
            customInputContainer.style.display = 'block'; // Mostrar campo de input personalizado
            customInput.value = ''; // Limpiar el input
            guardarMetaBtn.disabled = true; // Deshabilitar "Guardar" hasta que el usuario ingrese un valor
            validateForm(); // Validar el input personalizado
        });

        // Detectar selección de valores fijos
        const buttons = optionContent.querySelectorAll('.SetGoalForm-form-buttonGrid-button[data-value]');
        buttons.forEach(button => {
            button.addEventListener('click', function(event) {
                selectedValue = event.target.getAttribute('data-value');
                guardarMetaBtn.disabled = false; // Habilitar el botón "Guardar" al seleccionar un valor fijo
            });
        });
    }

    // Validar el input personalizado y habilitar el botón "Guardar"
    function validateForm() {
        customInput.addEventListener('input', function() {
            if (customInput.value.trim() !== '') {
                guardarMetaBtn.disabled = false;
            } else {
                guardarMetaBtn.disabled = true;
            }
        });
    }

    // Guardar el valor y cerrar el modal al hacer clic en "Guardar"
// Función para actualizar el gráfico solo para las barras azules (Horas, Minutos, Clases)
function updateChart(metaValue, selectedOption) {
    let maxValue = 1;  // Valor máximo inicial para el eje Y
    let labelHoras = 'Meta alcanzada'; // Etiqueta por defecto
    let barColorHoras = 'rgba(173, 216, 230, 0.8)';  // Color azul para las barras dinámicas

    // Definir el valor máximo y el label en base a la opción seleccionada
    if (selectedOption === "Por minutos") {
        maxValue = 120;  // Suponiendo un máximo de 120 minutos
        labelHoras = 'Minutos';
    } else if (selectedOption === "Por horas") {
        maxValue = 3;  // Máximo 3 horas
        labelHoras = 'Horas';
    } else if (selectedOption === "Por clases") {
        maxValue = 3;  // Máximo 3 clases
        labelHoras = 'Clases';
    }

    // Asignar el valor seleccionado solo a la serie de "Horas" (barra azul)
    const newDataHoras = Array(chart.data.labels.length).fill(parseFloat(metaValue));

    // Actualizar solo las barras azules con el valor seleccionado
    chart.data.datasets[1].data = newDataHoras;  // Solo las barras azules
    chart.data.datasets[1].label = labelHoras; // Etiqueta basada en la opción seleccionada

    // Mantener las barras moradas (Meta) sin cambios
    chart.options.scales.y.max = maxValue;  // Asegurar que el eje Y se ajuste según la selección

    chart.update();  // Refrescar el gráfico
}

// Guardar el valor y cerrar el modal al hacer clic en "Guardar"
guardarMetaBtn.addEventListener('click', function() {
    const finalValue = customInputContainer.style.display === 'block' ? customInput.value : selectedValue;
    if (finalValue) {
        // Actualizar el gráfico con el valor seleccionado y la opción
        updateChart(finalValue, selectedOption);

        // Ocultar el div "AgregarMeta" y mostrar el div "metaGuardada" con la meta seleccionada
        agregarMeta.style.display = 'none'; // Oculta el contenido original
        metaGuardada.innerHTML = `
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bolt" class="svg-inline--fa fa-bolt " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"></path>
            </svg>
            <p>Meta: </p><button id="metaGuardadaBtn" style="margin: 10px;">${finalValue}</button>
        `;
        metaGuardada.style.display = 'flex';  // Mostrar la meta guardada
        metaDiaria.style.display = 'none';  // Cerrar el modal

        // Agregar evento para que el usuario pueda cambiar la meta haciendo clic en ella
        const metaGuardadaBtn = document.getElementById('metaGuardadaBtn');
        metaGuardadaBtn.addEventListener('click', function() {
            metaDiaria.style.display = 'block';  // Reabrir el modal para cambiar la meta
        });
    }
});


    // Cierra el dropdown si haces clic fuera del mismo
    document.addEventListener('click', function(event) {
        if (!dropdownButton.contains(event.target) && !dropdownOptions.contains(event.target)) {
            dropdownOptions.style.display = 'none'; // Ocultar si haces clic fuera
        }
    });
});

// Gráfico de metas
document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.querySelector('.ProgresoMeta canvas').getContext('2d');
    
    window.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['7 oct', '8 oct', '9 oct', '10 oct', '11 oct', '12 oct', '13 oct'],
            datasets: [
                {
                    label: 'Meta',
                    data: [1, 1, 1, 1, 1, 1, 1],
                    borderColor: 'rgba(128, 0, 128, 1)',
                    backgroundColor: 'rgba(128, 0, 128, 0.1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Horas',
                    data: [0.1, 0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(173, 216, 230, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    });
});


//metas guardar 

