document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;

        try {
            const response = await fetch('/api/payments/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    cardNumber,
                    expiryDate,
                    cvv,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Pago procesado exitosamente');
            } else {
                alert(`Error procesando el pago: ${data.message}`);
            }
        } catch (error) {
            console.error('Error al enviar los datos del pago:', error);
        }
    });
});

