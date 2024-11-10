document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      // Validar las credenciales
      if (email === "administrador@gmail.com" && password === "administrador7") {
        window.location.href = "/cliente/administrador/index.html";
  
        alert("Correo electrónico o contraseña incorrectos.");
      }
    });
  });
  
  let profileDropdownList = document.querySelector(".profile-dropdown-list");
  let btn = document.querySelector(".profile-dropdown-btn");
  
  let classList = profileDropdownList.classList;
  
  const toggle = () => classList.toggle("active");
  
  window.addEventListener("click", function (e) {
    if (!btn.contains(e.target)) classList.remove("active");
  });
  