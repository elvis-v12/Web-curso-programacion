// Selección de elementos del sidebar
const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");
const sections = document.querySelectorAll("main .section"); // Todas las secciones de contenido

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    // Desactivar todas las opciones del sidebar
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    // Activar la opción seleccionada
    li.classList.add("active");

    // Mostrar la sección correspondiente y ocultar las demás
    const sectionId = li.getAttribute("data-section");
    sections.forEach((section) => {
      section.classList.remove("active");
    });
    if (sectionId) {
      document.getElementById(sectionId).classList.add("active");
    }
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

// Toggle para el buscador en pantallas pequeñas
const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

// Ajuste para responsive
if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

// Switch para modo oscuro/claro
const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress');
allProgress.forEach(item=> {
	item.style.setProperty('--value', item.dataset.value)
})


//
let jsonData;
fetch("data.json")
  .then(function (response) {
    if (response.status == 200) {
      return response.json();
    }
  })
  .then(function (data) {
    jsonData = data;
    createChart("barChart", "bar");
    createChart("doughnutChart", "doughnut");
  });

function createChart(elementId, type) {
  const ctx = document.getElementById(elementId).getContext("2d");
  new Chart(ctx, {
    type: type,
    data: {
      labels: jsonData.map((row) => row.month),
      datasets: [
        {
          label: "#Visible",
          data: jsonData.map((row) => row.income),
          borderWidth: 1,
          backgroundColor: [
            "#65a30d",
            "#f59e0b",
            "#fed7aa",
            "#a5b4fc",
            "#1d4ed8",
            "#93c5fd",
          ],
          borderColor: [
            "#65a30d",
            "#f59e0b",
            "#fed7aa",
            "#a5b4fc",
            "#1d4ed8",
            "#93c5fd",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}
