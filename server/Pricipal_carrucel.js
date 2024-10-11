const novedadesData = [
    {
        "id": 1,
        "portada": "/cliente/principal/pictures/novedades/image.png",
        "name": "Desafío internacional Bebras 2024: ¡sumate!",
        "description": "Estudiantes y docentes de EBI y EMS podrán preparar el desafío internacional que busca promover el desarrollo del pensamiento computacional. ¡Son más de 70 los países que ya están participando!",
        "date": "10 de septiembre de 2024"
    },
    {
        "id": 2,
        "portada": "/cliente/principal/pictures/novedades/image2.png",
        "name": "Llega la Feria Educativa Ceibal para las Áreas STEM 2024",
        "description": "Propuestas de desarrollo profesional docente en educación STEM a cargo del Departamento de Matemática de Ceibal.",
        "date": "10 de septiembre de 2024"
    },
    {
        "id": 3,
        "portada": "/cliente/principal/pictures/novedades/image3.png",
        "name": "Se amplía la participación de grados en RoboGarden",
        "description": "A partir de ahora pueden acceder a la plataforma libremente docentes y estudiantes desde 1° a 6° y grupos de Ciencias de la Computación de 7° de Educación Básica Integrada.",
        "date": "06 de septiembre de 2024"
    }
];

// Inyectar contenido dinámico en cada novedad
novedadesData.forEach(novedad => {
    const container = document.getElementById(`novedad-${novedad.id}`);
    if (container) {
        const contentHTML = `
            <div class="novedades__item" style="border-radius: 12px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; background-color: rgba(255, 255, 255, 0.9);">
    <img src="${novedad.portada}" alt="${novedad.name}" class="novedades__image" style="width: 100%; height: 200px; object-fit: contain; border-radius: 8px; background-color: #f8f8f8;">
    <div class="novedades__info" style="padding: 10px;">
        <h3 class="novedades__title" style="font-size: 1.4rem; font-weight: bold; margin-bottom: 8px; color: #000;">${novedad.name}</h3>
        <p class="novedades__description" style="font-size: 0.9rem; color: #000; margin-bottom: 8px; line-height: 1.3;">${novedad.description}</p>
        <p class="novedades__date" style="font-size: 0.75rem; color: #000;">${novedad.date}</p>
    </div>
</div>

        `;
        container.innerHTML = contentHTML;
    }
});
