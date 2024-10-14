function toggleMenu() {
    const aside = document.querySelector('.aside-left');
    const toggleButton = document.querySelector('.nav-toggler span');
    
    aside.classList.toggle('expanded');

    // Cambiar el icono de la flecha dependiendo del estado
    if (aside.classList.contains('expanded')) {
        toggleButton.innerHTML = '&#10094;'; // Flecha hacia la izquierda
    } else {
        toggleButton.innerHTML = '&#10095;'; // Flecha hacia la derecha
    }
}

function toggleProfile() {
    const menu = document.getElementById('profile-menu');
    const arrow = document.getElementById('popover-arrow');
    const isMenuVisible = menu.style.display === 'block';

    // Cambiar visibilidad del menú y la flecha
    if (isMenuVisible) {
        menu.style.display = 'none';
        arrow.style.display = 'none';
    } else {
        menu.style.display = 'block';
        arrow.style.display = 'block';
    }
}

// Cerrar el menú si se hace clic fuera de él
document.addEventListener('click', function(event) {
    const menu = document.getElementById('profile-menu');
    const arrow = document.getElementById('popover-arrow');
    const toggleButton = document.getElementById('profile-toggle');
    
    // Si el clic es fuera del menú y fuera del botón, se cierra el menú
    if (!menu.contains(event.target) && !toggleButton.contains(event.target)) {
        menu.style.display = 'none';
        arrow.style.display = 'none';
    }
});

// Funcionalidad del carrusel de testimonios
let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.carousel-dots .dot');

// Muestra el siguiente testimonio en el carrusel
function showNextTestimonial() {
    testimonials[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    currentIndex = (currentIndex + 1) % testimonials.length;
    
    testimonials[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

// Muestra un testimonio específico al hacer clic en un punto
function showSpecificTestimonial(index) {
    testimonials[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    currentIndex = index;
    
    testimonials[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

// Cambia de testimonio automáticamente cada 3 segundos
setInterval(showNextTestimonial, 3000);


//ASIDE DE LOS COMPONENTES DEPLEGABLES UWU
