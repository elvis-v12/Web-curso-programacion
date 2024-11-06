document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course-card");
  const filterSelect = document.getElementById("academy");

  // Datos específicos para cada curso
  const coursesData = [
    { targetPercentage: 45, isEnrolled: true },
    { targetPercentage:  0, isEnrolled: true },
    { targetPercentage: 25, isEnrolled: true },
    { targetPercentage: 75, isEnrolled: true },
    { targetPercentage: 100, isEnrolled: true },  
    { targetPercentage: 60, isEnrolled: true },
  ];

  // Inicializa cada curso con su progreso y estado de inscripción
  courses.forEach((course, index) => {
    const progressFill = course.querySelector(".progress-fill");
    const progressPercentage = course.querySelector(".progress-percentage");
    const courseActionBtn = course.querySelector(".course-action-btn");

    // Extrae la información del curso correspondiente
    const { targetPercentage, isEnrolled } = coursesData[index];
    let currentPercentage = 0;

    // Configura el estado del botón según el estado de inscripción y progreso
    if (isEnrolled) {
      courseActionBtn.textContent =
        targetPercentage > 0 ? "Continuar" : "Empezar";
    } else {
      courseActionBtn.style.display = "none"; // Oculta el botón si no está inscrito
    }

    // Función para actualizar el progreso
    function updateProgress() {
      if (currentPercentage < targetPercentage) {
        currentPercentage++;
        progressFill.style.width = `${currentPercentage}%`;
        progressPercentage.textContent = `${currentPercentage}%`;
        requestAnimationFrame(updateProgress);
      } else {
        // Asigna clases al curso según su progreso
        if (targetPercentage === 100) {
          course.classList.add("completado");
        } else if (targetPercentage > 0) {
          course.classList.add("en-progreso");
        } else {
          course.classList.add("no-iniciado");
        }
      }
    }

    // Inicia la animación de progreso para este curso
    updateProgress();
  });

  // Función para filtrar cursos
  function filterCourses() {
    const filterValue = filterSelect.value;

    courses.forEach((course) => {
      course.style.display = "none"; // Oculta todas las tarjetas de curso inicialmente

      // Muestra los cursos según la opción seleccionada en el filtro
      if (filterValue === "all") {
        course.style.display = "block";
      } else if (
        filterValue === "completado" &&
        course.classList.contains("completado")
      ) {
        course.style.display = "block";
      } else if (
        filterValue === "en-progreso" &&
        course.classList.contains("en-progreso")
      ) {
        course.style.display = "block";
      } else if (
        filterValue === "no-iniciado" &&
        course.classList.contains("no-iniciado")
      ) {
        course.style.display = "block";
      }
    });
  }

  // Evento que escucha cambios en el filtro
  filterSelect.addEventListener("change", filterCourses);

  // Llama a filterCourses una vez para aplicar el filtro inicial
  filterCourses();
});
