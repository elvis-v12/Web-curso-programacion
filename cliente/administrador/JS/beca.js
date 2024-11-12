const postulantesDB = [
    {
      id: 1,
      nombre: "Juan Pérez",
      fechaNacimiento: "1999-05-14",
      promedio: 87.7,
      estado: "Pendiente",
      fechaSolicitud: "2024-10-15",
      cursosLibres: [
        { nombre: "Introducción a HTML", nota: 90 },
        { nombre: "Fundamentos de CSS", nota: 85 },
        { nombre: "JavaScript Básico", nota: 88 },
      ],
      cursosPostulados: ["React Avanzado", "Node.js Profesional"],
      direccion: "Av. Siempre Viva 123",
      telefono: "999-888-777",
      email: "juan.perez@mail.com",
      documentos: [
        "DNI.pdf",
        "Certificado de notas.pdf",
        "Carta de recomendación.pdf",
      ],
      foto: "img/TAE.webp",
    },
    {
        id: 1,
        nombre: "Raul Pérez",
        fechaNacimiento: "2000-05-14",
        promedio: 87.7,
        estado: "Pendiente",
        fechaSolicitud: "2024-10-15",
        cursosLibres: [
          { nombre: "Introducción a HTML", nota: 90 },
          { nombre: "Fundamentos de CSS", nota: 85 },
          { nombre: "JavaScript Básico", nota: 88 },
        ],
        cursosPostulados: ["React Avanzado", "Node.js Profesional"],
        direccion: "Av. Siempre Viva 123",
        telefono: "999-888-777",
        email: "juan.perez@mail.com",
        documentos: [
          "DNI.pdf",
          "Certificado de notas.pdf",
          "Carta de recomendación.pdf",
        ],
        foto: "img/TAE.webp",
      },{
        id: 1,
        nombre: "Lucas Pérez",
        fechaNacimiento: "1969-05-14",
        promedio: 87.7,
        estado: "Pendiente",
        fechaSolicitud: "2024-10-15",
        cursosLibres: [
          { nombre: "Introducción a HTML", nota: 90 },
          { nombre: "Fundamentos de CSS", nota: 85 },
          { nombre: "JavaScript Básico", nota: 88 },
        ],
        cursosPostulados: ["React Avanzado", "Node.js Profesional"],
        direccion: "Av. Siempre Viva 123",
        telefono: "999-888-777",
        email: "juan.perez@mail.com",
        documentos: [
          "DNI.pdf",
          "Certificado de notas.pdf",
          "Carta de recomendación.pdf",
        ],
        foto: "img/TAE.webp",
      }
    // Puedes agregar más postulantes...
  ];
  
  let paginaActual = 1;
  const itemsPorPagina = 10;
  let postulantesFiltrados = postulantesDB;
  
  // Cargar datos y generar tabla
  document.addEventListener("DOMContentLoaded", () => {
    cargarPostulantes();
    document.getElementById("paginaActual").textContent = paginaActual;
  });
  
  function cargarPostulantes() {
    const tablaPostulantes = document.querySelector("#tabla-postulantes tbody");
    tablaPostulantes.innerHTML = "";
  
    const inicio = (paginaActual - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const postulantesPaginados = postulantesFiltrados.slice(inicio, fin);
  
    postulantesPaginados.forEach((postulante) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
              <td>${postulante.nombre}</td>
              <td>${postulante.fechaNacimiento}</td>
              <td>${postulante.promedio}</td>
              <td>${postulante.estado}</td>
              <td>${postulante.fechaSolicitud}</td>
              <td><button class="btn-info" onclick="mostrarModal(${postulante.id})">Más info</button></td>
          `;
      tablaPostulantes.appendChild(fila);
    });
  }
  
  // Filtrar postulantes
  function filtrarPostulantes() {
    const estado = document.getElementById("filtroEstado").value;
    const edad = document.getElementById("filtroEdad").value;
    const promedioMin = document.getElementById("filtroPromedio").value;
    const nombreBusqueda = document
      .getElementById("busquedaNombre")
      .value.toLowerCase();
  
    postulantesFiltrados = postulantesDB.filter((postulante) => {
      const cumpleEstado = !estado || postulante.estado === estado;
      const cumpleEdad =
        !edad || calcularEdad(postulante.fechaNacimiento) >= edad;
      const cumplePromedio = !promedioMin || postulante.promedio >= promedioMin;
      const cumpleNombre =
        !nombreBusqueda ||
        postulante.nombre.toLowerCase().includes(nombreBusqueda);
  
      return cumpleEstado && cumpleEdad && cumplePromedio && cumpleNombre;
    });
  
    paginaActual = 1;
    document.getElementById("paginaActual").textContent = paginaActual;
    cargarPostulantes();
  }
  
  // Calcular edad del postulante
  function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  }
  
  // Cambiar página
  function cambiarPagina(direccion) {
    if (direccion === "anterior" && paginaActual > 1) {
      paginaActual--;
    } else if (
      direccion === "siguiente" &&
      paginaActual * itemsPorPagina < postulantesFiltrados.length
    ) {
      paginaActual++;
    }
    document.getElementById("paginaActual").textContent = paginaActual;
    cargarPostulantes();
  }
  
  // Mostrar detalles en el modal
  function mostrarModal(id) {
    const postulante = postulantesDB.find((p) => p.id === id);
  
    // Asignar los datos al modal
    document.getElementById("nombre").textContent = postulante.nombre;
    document.getElementById("fechaNacimiento").textContent =
      postulante.fechaNacimiento;
    document.getElementById("sexo").textContent =
      postulante.sexo || "No especificado";
    document.getElementById("telefono").textContent = postulante.telefono;
    document.getElementById("email").textContent = postulante.email;
    document.getElementById("direccion").textContent = postulante.direccion;
    document.getElementById("promedio").textContent = postulante.promedio;
    document.getElementById("estadoSolicitud").textContent = postulante.estado;
  
    // Cargar documentos adjuntos
    const documentosList = document.getElementById("documentos");
    documentosList.innerHTML = postulante.documentos
      .map((doc) => `<li><a href="${doc}" download>${doc}</a></li>`)
      .join("");
  
    // Crear tarjetas para cursos completados
    const cursosLibresList = document.getElementById("cursosLibres");
    cursosLibresList.innerHTML = postulante.cursosLibres
      .map(
        (curso) => `
        <div class="course-card">
          <h4>${curso.nombre}</h4>
          <p>Nota: ${curso.nota}</p>
        </div>
      `
      )
      .join("");
  
    // Crear tarjetas para cursos postulados para la beca
    const cursosPostuladosList = document.getElementById("cursosPostulados");
    cursosPostuladosList.innerHTML = postulante.cursosPostulados
      .map(
        (curso) => `
        <div class="course-card">
          <h4>${curso}</h4>
        </div>
      `
      )
      .join("");
  
    // Mostrar la imagen si existe
    const avatar = document.querySelector(".avatar");
    avatar.src = postulante.foto || "avatar_placeholder.png";
  
    document.getElementById("modal").style.display = "flex";
  
    // Guardar el ID del postulante seleccionado para usarlo en aprobar/rechazar
    document.getElementById("modal").dataset.postulanteId = postulante.id;
  }
  
  // Cerrar el modal
  function cerrarModal() {
    document.getElementById("modal").style.display = "none";
  }
  
  // Gestionar aceptación o rechazo de la solicitud de beca
  function gestionarBeca(accion) {
    const postulanteId = parseInt(
      document.getElementById("modal").dataset.postulanteId,
      10
    );
    const postulante = postulantesDB.find((p) => p.id === postulanteId);
  
    if (accion === "aprobar") {
      postulante.estado = "Aprobado";
    } else if (accion === "rechazar") {
      postulante.estado = "Rechazado";
    }
  
    cerrarModal();
    cargarPostulantes();
  }
  