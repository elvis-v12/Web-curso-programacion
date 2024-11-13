// Función para mostrar/ocultar la información de la tarjeta
function toggleCardInfo(cardInfoId, show) {
    const cardInfo = document.getElementById(cardInfoId);
    cardInfo.style.display = show ? 'block' : 'none';
}