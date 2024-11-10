
const certificadosDB = [
  {
    id: 1,
    estudiante: "Juan Pérez",
    curso: "Marketing Digital",
    nota: 95,
    fechaCurso: "2024-05-15",
    profesor: "Ricardo Salinas",
    certificado: "/cliente/administrador/certificado.html",
  },
  {
    id: 2,
    estudiante: "María López",
    curso: "Desarrollo Web",
    nota: 89,
    fechaCurso: "2024-06-20",
    profesor: "Ana Morales",
    certificado: "/cliente/administrador/certificado.html",
  },
  {
    id: 3,
    estudiante: "Carlos Gómez",
    curso: "Introducción a Python",
    nota: 92,
    fechaCurso: "2024-07-10",
    profesor: "Pedro Vargas",
    certificado: "/cliente/administrador/certificado.html",
  },
  {
    id: 4,
    estudiante: "Lucía Martínez",
    curso: "Bases de Datos SQL",
    nota: 88,
    fechaCurso: "2024-08-05",
    profesor: "Laura Mendoza",
    certificado: "/cliente/administrador/certificado.html",
  },
  {
    id: 5,
    estudiante: "Javier Sánchez",
    curso: "JavaScript Avanzado",
    nota: 94,
    fechaCurso: "2024-09-15",
    profesor: "Diego Herrera",
    certificado: "/cliente/administrador/certificado.html",
  },

];

// Función para cargar datos en la tabla
function cargarCertificados() {
  const tbody = document.querySelector("#tabla-certificados tbody");
  tbody.innerHTML = "";

  certificadosDB.forEach((certificado) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${certificado.estudiante}</td>
      <td>${certificado.curso}</td>
      <td>${certificado.nota}</td>
      <td>${certificado.fechaCurso}</td>
      <td>${certificado.profesor}</td>
      <td>
        <button onclick="verCertificado('${certificado.certificado}')">Ver Certificado</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
function filtrarCertificados() {
  const filtroNombre = document.getElementById("filtroNombre").value.toLowerCase();
  const filtroCurso = document.getElementById("filtroCurso").value.toLowerCase();
  const filtroProfesor = document.getElementById("filtroProfesor").value.toLowerCase();

  const tbody = document.querySelector("#tabla-certificados tbody");
  tbody.innerHTML = "";

  certificadosDB.forEach((certificado) => {
    // Filtrar por los campos introducidos
    const coincideNombre = certificado.estudiante.toLowerCase().includes(filtroNombre);
    const coincideCurso = certificado.curso.toLowerCase().includes(filtroCurso);
    const coincideProfesor = certificado.profesor.toLowerCase().includes(filtroProfesor);

    if (coincideNombre && coincideCurso && coincideProfesor) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${certificado.estudiante}</td>
        <td>${certificado.curso}</td>
        <td>${certificado.nota}</td>
        <td>${certificado.fechaCurso}</td>
        <td>${certificado.profesor}</td>
        <td>
          <button onclick="verCertificado('${certificado.certificado}')">Ver Certificado</button>
        </td>
      `;
      tbody.appendChild(tr);
    }
  });
}

// Cargar datos iniciales al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarCertificados();
});

// Función para mostrar el certificado en un modal
function verCertificado(ruta) {
  const modal = document.getElementById("modal-certificado");
  const iframe = document.getElementById("iframe-certificado");

  // Cargar el archivo del certificado en el iframe
  iframe.src = ruta;

  // Ajustar el tamaño del modal al contenido del iframe
  iframe.onload = function () {
    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow.document;
    const iframeBody = iframeDocument.body;

    // Obtener dimensiones del contenido del iframe
    const contentWidth = iframeBody.scrollWidth;
    const contentHeight = iframeBody.scrollHeight;

    // Ajustar el modal al tamaño del contenido
    modal.style.width = contentWidth + "px";
    modal.style.height = contentHeight + 100 + "px"; // Agregar espacio para el botón

    iframe.style.width = contentWidth + "px";
    iframe.style.height = contentHeight + "px";
  };





  // Mostrar el modal
  modal.style.display = "flex";
}

// Función para cerrar el modal
function cerrarModal() {
  const modal = document.getElementById("modal-certificado");
  const iframe = document.getElementById("iframe-certificado");

  // Limpiar el iframe al cerrar el modal
  iframe.src = "";
  modal.style.display = "none";
}

// Función para descargar el certificado como PDF
async function descargarCertificadoPDF() {
  const iframe = document.getElementById("iframe-certificado");
  const iframeDocument =
    iframe.contentDocument || iframe.contentWindow.document;

  // Obtener el contenido HTML del certificado
  const certificadoHTML = iframeDocument.documentElement;

  // Crear un objeto jsPDF
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("landscape", "px", [900, 600]); // Configuración del tamaño del PDF

  // Convertir el contenido HTML a una imagen para el PDF
  const canvas = await html2canvas(certificadoHTML, {
    scale: 2, // Alta resolución
    useCORS: true, // Permitir recursos externos
  });

  // Convertir el canvas a una imagen en formato base64
  const imgData = canvas.toDataURL("image/png");

  // Agregar la imagen al PDF
  pdf.addImage(imgData, "PNG", 0, 0, 900, 600);

  // Descargar el PDF
  pdf.save("certificado.pdf");
}



// Inicialización
document.addEventListener("DOMContentLoaded", cargarCertificados);
