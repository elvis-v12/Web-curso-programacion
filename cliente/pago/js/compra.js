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

  // Validar que los elementos del DOM existan
  if (!resumenOrden || !totalPrecioOriginal || !totalDescuento || !totalFinal) {
    console.error(
      "No se encontraron los elementos del DOM necesarios. Verifica tu estructura HTML."
    )
    return;
  }

  // Si hay productos en el carrito, genera el contenido
  if (productosEnCarrito && productosEnCarrito.length > 0) {
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

    // Calcular totales
    const totalOriginal = productosEnCarrito.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
    const descuento = totalOriginal * 0.2; // Ejemplo: 20% de descuento
    const totalFinalPrecio = totalOriginal - descuento;

    // Mostrar los totales
    totalPrecioOriginal.textContent = `S/${totalOriginal.toFixed(2)}`;
    totalDescuento.textContent = `- S/${descuento.toFixed(2)}`;
    totalFinal.textContent = `S/${totalFinalPrecio.toFixed(2)}`;
  } else {
    // Si no hay productos, mostrar un mensaje
    resumenOrden.innerHTML = `<p>No hay productos en el carrito.</p>`;
  }
});
