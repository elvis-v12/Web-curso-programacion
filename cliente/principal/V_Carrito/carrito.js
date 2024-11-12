// Inicializa productosEnCarrito desde localStorage o como un array vacío si no hay datos
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = productosEnCarrito ? JSON.parse(productosEnCarrito) : [];

// Selecciona los elementos del DOM con validación
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const marcadorCarrito = document.querySelector("#numerito");

// Selecciona los botones de los planes
const botonesPlanes = document.querySelectorAll(".price-column .cta");

// Función para cargar productos en el carrito
function cargarProductosCarrito() {
    if (!contenedorCarritoVacio || !contenedorCarritoProductos || !contenedorCarritoAcciones || !contenedorCarritoComprado) {
        console.error("Elementos del DOM no encontrados. Verifica los IDs en tu HTML.");
        return;
    }

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="../../V_R_Productos/${producto.foto || 'default.jpg'}" alt="${producto.nombreProducto}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.nombreProducto}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.productoID}"><i class="bi bi-trash-fill"></i></button>
            `;
            contenedorCarritoProductos.append(div);
        });

        actualizarBotonesEliminar();

        if (typeof actualizarTotal === "function") {
            actualizarTotal();
        } else {
            console.warn("La función actualizarTotal no está definida.");
        }
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

// Función para calcular y mostrar el total
function actualizarTotal() {
    if (!contenedorTotal) {
        console.error("Contenedor del total no encontrado (ID: total).");
        return;
    }

    const total = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    contenedorTotal.textContent = `$${total.toFixed(2)}`; // Actualiza el total en el DOM
}

// Función para actualizar el marcador del carrito
function actualizarMarcadorCarrito() {
    if (!marcadorCarrito) {
        console.error("No se encontró el marcador del carrito (ID: numerito).");
        return;
    }

    const totalProductos = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    marcadorCarrito.textContent = totalProductos; // Actualiza el texto del marcador
}

// Evento para agregar planes al carrito
botonesPlanes.forEach(boton => {
    boton.addEventListener("click", (e) => {
        const idPlan = e.currentTarget.dataset.id;
        const nombrePlan = e.currentTarget.dataset.nombre;
        const precioPlan = parseFloat(e.currentTarget.dataset.precio);

        const producto = {
            productoID: idPlan,
            nombreProducto: nombrePlan,
            precio: precioPlan,
            cantidad: 1 // Cantidad inicial
        };

        // Verificar si el producto ya existe en el carrito
        const index = productosEnCarrito.findIndex(item => item.productoID === idPlan);
        if (index !== -1) {
            productosEnCarrito[index].cantidad += 1; // Incrementa cantidad
        } else {
            productosEnCarrito.push(producto); // Agrega al carrito
        }

        // Guardar en localStorage
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
        actualizarMarcadorCarrito(); // Actualiza el marcador

        // Notificación de éxito
        Toastify({
            text: `${nombrePlan} agregado al carrito`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #4b33a8, #785ce9)",
                borderRadius: "2rem",
                textTransform: "uppercase",
                fontSize: ".75rem"
            },
        }).showToast();
    });
});

// Llama a la función para actualizar el marcador al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarProductosCarrito();
    actualizarMarcadorCarrito();
});

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
    }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.productoID === idBoton);

    productosEnCarrito.splice(index, 1);
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
    actualizarMarcadorCarrito(); // Actualiza el marcador
}

if (botonVaciar) {
    botonVaciar.addEventListener("click", vaciarCarrito);
}

function vaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
            actualizarMarcadorCarrito();
        }
    });
}
if (botonComprar) {
    botonComprar.addEventListener("click", (e) => {
        e.preventDefault();
        // Guarda los datos del carrito en localStorage antes de redirigir
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        // Redirige a la página de pago
        window.location.href = "/cliente/pago/Pago.html";
    });
}


