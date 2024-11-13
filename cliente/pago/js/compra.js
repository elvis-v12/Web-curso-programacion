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
  const cardElement = elements.create('card', { style: { base: { fontSize: '16px' } } });
  cardElement.mount('#hidden-card-element');

  if (!resumenOrden || !totalPrecioOriginal || !totalDescuento || !totalFinal) {
    console.error("No se encontraron los elementos del DOM necesarios.");
    return;
  }

  if (productosEnCarrito.length > 0) {
    resumenOrden.innerHTML = ""; // Limpia la lista

    productosEnCarrito.forEach((producto) => {
      const li = document.createElement("li");
      li.classList.add("order-item");
      li.innerHTML = `
        <div class="item-summary">
          <img src="../../V_R_Productos/${producto.foto || "default.jpg"}" width="50" height="50" alt="${producto.nombreProducto}" class="item-image" loading="lazy">
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
    const cardName = document.getElementById('cardName').value.trim();

    if (!cardName) {
      alert('Por favor, completa el nombre del titular de la tarjeta.');
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
        throw new Error(error.message);
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
