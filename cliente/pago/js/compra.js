// Inicializa productosEnCarrito desde localStorage o como un array vacío si no hay datos
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = productosEnCarrito ? JSON.parse(productosEnCarrito) : [];

// Selecciona los elementos del DOM necesarios con validación
const resumenOrden = document.querySelector(".order-items-list");
const totalPrecioOriginal = document.querySelector(".precio-original");
const totalDescuento = document.querySelector(".descuento");
const totalFinal = document.querySelector(".total-final");

document.addEventListener("DOMContentLoaded", () => {
  console.log("Productos en el carrito:", productosEnCarrito);

  // Inicializa Stripe con tu clave pública después de que el DOM esté cargado
  const stripe = Stripe('pk_test_51Q1H4cRodaQYZrxYzxybKMw54ev4rcVyh9MdwJSPD5DmMQHtLCDVry7f6whX6XNU6Pw7QD4wH2wTmoqNe7ZxYrIv003BaJGgt9');
  const elements = stripe.elements();

  // Crea un elemento de tarjeta con Stripe Elements
  const cardElement = elements.create('card', {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
      },
    },
  });
  cardElement.mount('#card-element'); // Asegúrate de que este ID coincida con tu HTML

  if (!resumenOrden || !totalPrecioOriginal || !totalDescuento || !totalFinal) {
    throw new Error("No se encontraron los elementos del DOM necesarios.");
  }

  if (productosEnCarrito.length > 0) {
    resumenOrden.innerHTML = ""; // Limpia la lista

    productosEnCarrito.forEach((producto) => {
      const li = document.createElement("li");
      li.classList.add("order-item");
      li.innerHTML = `
        <div class="item-summary">
          <img src="${producto.foto || 'https://via.placeholder.com/50'}" width="50" height="50" alt="${producto.nombreProducto}" class="item-image" loading="lazy">
          <div class="item-title">${producto.nombreProducto}</div>
        </div>
        <div class="item-price">
          <div class="purchase-price"><span>S/${(producto.precio * producto.cantidad).toFixed(2)}</span></div>
          <div class="original-price"><span><s>S/${producto.precio.toFixed(2)}</s></span></div>
        </div>
      `;
      resumenOrden.appendChild(li);
    });

    const totalOriginal = productosEnCarrito.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
    const descuento = totalOriginal * 0.2;
    const totalFinalPrecio = totalOriginal - descuento;

    totalPrecioOriginal.textContent = `S/${totalOriginal.toFixed(2)}`;
    totalDescuento.textContent = `- S/${descuento.toFixed(2)}`;
    totalFinal.textContent = `S/${totalFinalPrecio.toFixed(2)}`;
  } else {
    resumenOrden.innerHTML = `<p>No hay productos en el carrito.</p>`;
  }

  // Agrega el evento de clic al botón "Completar pago"
  document.querySelector('.purchase-button').addEventListener('click', async () => {
    // Validar campos requeridos
    const name = document.getElementById('name')?.value?.trim();
    const email = document.getElementById('email')?.value?.trim();
    const cardName = document.getElementById('cardName')?.value?.trim();

    console.log({ name, email, cardName }); // Depuración para verificar valores

    if (!name || !email || !cardName) {
      alert('Por favor, completa todos los campos requeridos antes de continuar.');
      return;
    }

    // Validar formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    const total = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    const confirm = window.confirm(`El total a pagar es S/${total.toFixed(2)}. ¿Deseas continuar con el pago?`);

    if (!confirm) {
      return;
    }

    const button = document.querySelector('.purchase-button');
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';

    try {
      // Usa Stripe para crear un token seguro con el elemento de tarjeta
      const { token, error } = await stripe.createToken(cardElement, {
        name: cardName,
      });

      if (error) {
        console.error('Error al generar el token:', error);
        alert(`Error: ${error.message}`);
        return; // Detiene el flujo si hay un error
      }

      // Envía el token al servidor para procesar el pago
      const response = await fetch('/api/payments/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token.id,
          amount: total.toFixed(2), // Envía el monto total
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Pago procesado exitosamente.');
        window.location.href = "/success";
      } else {
        alert(`Error procesando el pago: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
    } finally {
      button.disabled = false;
      button.innerHTML = '<i class="fas fa-lock lock-icon"></i> Completar pago';
    }
  });
});
