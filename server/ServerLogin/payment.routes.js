const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/process-payment', async (req, res) => {
    console.log('Cuerpo de la solicitud recibido:', req.body);
    const { cardName, cardNumber, expiryDate, cvv } = req.body;

    if (!cardName || !cardNumber || !expiryDate || !cvv) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
    }

    try {
        const [exp_month, exp_year] = expiryDate.split('/');
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: cardNumber.replace(/\s/g, ''),
                exp_month,
                exp_year,
                cvc: cvv,
            },
            billing_details: { name: cardName },
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Monto en centavos
            currency: 'usd',
            payment_method: paymentMethod.id,
            confirm: true,
        });

        res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
        console.error('Error procesando el pago:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
