const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/process-payment', async (req, res) => {
    console.log('Cuerpo de la solicitud recibido:', req.body);
    const { token, amount } = req.body;

    if (!token || !amount) {
        return res.status(400).json({ success: false, message: 'El token y el monto son obligatorios.' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convertir a centavos
            currency: 'usd',
            payment_method_data: {
                type: 'card',
                card: { token: token },
            },
            confirm: true,
            automatic_payment_methods: {
                enabled: true, // Habilitar métodos de pago automáticos
            },
            // Proporcionar una return_url para métodos de pago que lo requieran
            return_url: 'http://localhost:3000/success',
        });

        res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
        console.error('Error procesando el pago:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
