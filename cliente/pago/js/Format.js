// Formatear el número de tarjeta
function formatCardNumber(input) {
    // Permitir solo números y agregar un espacio cada 4 dígitos
    input.value = input.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
}

// Formatear la fecha de vencimiento
function formatExpiryDate(input) {
    // Permitir solo números y formatear como MM/AA
    input.value = input.value.replace(/\D/g, '').replace(/^(\d{2})(\d{2})$/, '$1/$2');
}
