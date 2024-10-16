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

//ASI NAV PRINCIPAL USUARIO


// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
})
