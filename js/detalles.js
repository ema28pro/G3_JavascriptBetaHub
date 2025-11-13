// 1. Obtener el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const idProducto = parseInt(params.get("prod"));

// if idproduct no in [1, ... 25]

// 2. Buscar el producto en el array
const producto = data.find(p => p.id === idProducto);

// if producto // Si no se encontro

// 3. Mostrar los detalles en el HTML
const main = document.getElementById("detalle-producto");

if (producto) {
    // Verificar si hay sesión iniciada
    const sesionIniciada = localStorage.getItem("email");

    main.innerHTML = `
    <div class="detalle-card">
        <div class="detalle-content">
            <div class="detalle-imagen">
                <img src="${producto.url}" alt="${producto.name}">
                <a href="index.html">← Volver al catálogo</a>
            </div>
            <div class="detalle-info">
                <h2>${producto.name}</h2>
                <p>${producto.long_description}</p>
                <span>Precio: ${producto.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
                
                ${sesionIniciada ? `
                    <div class="compra-section">
                        <div class="contador-container">
                            <button onclick="decrementarCantidad()">-</button>
                            <input type="number" id="cantidad" value="0">
                            <button onclick="incrementarCantidad()">+</button>
                        </div>
                        <button onclick="addItemToCar(${producto.id}, document.getElementById('cantidad').value)" class="btn-comprar">Añadir al carrito</button>
                    </div>
                ` : '<a href="login.html">Inicia sesión para comprar</a>'}
            </div>
        </div>
    </div>`;
}

function addItemToCar(productId, cantidad) {
    // Buscar el producto usando el ID
    const product = data.find(p => p.id === productId);

    if (!product) {
        Toastify({
            backgroundColor: "#ff4757",
            text: "Producto no encontrado",
            offset: {
                y: 95 // Posición debajo del header-top
            }
        }).showToast();
        return;
    }

    if (parseInt(cantidad) < 1) {
        Toastify({
            backgroundColor: "#ff4757",
            text: "Debes seleccionar al menos 1 producto.",
            offset: {
                y: 95 // Posición debajo del header-top
            }
        }).showToast();
        return;
    }

    if (cantidad > product.stock) {
        Toastify({
            backgroundColor: "#ff4757",
            text: "No hay Stock suficiente.",
            offset: {
                y: 95 // Posición debajo del header-top
            }
        }).showToast();
        return;
    }

    Swal.fire({
        title: "¡Alerta!",
        text: `¿Estas seguro que quieres añadir ${cantidad} ${product.name} al carrito?`,
        // icon: 'success',
        confirmButtonText: "Si",
        cancelButtonText: "No",
        showCancelButton: true,
    }).then(result => {
        if (result.isConfirmed) {
            Toastify({
                backgroundColor: "#28a745",
                text: `${cantidad} ${product.name} agregado al carrito`,
                offset: {
                    y: 95 // Posición debajo del header-top
                }
            }).showToast()
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            const index = cart.findIndex(item => item.id === product.id);

            if (index !== -1) {
                // El producto ya está en el carrito, actualizar la cantidad
                cart[index].quantity += parseInt(cantidad);
            } else {
                // El producto no está en el carrito, agregarlo
                cart.push({
                    ...product,
                    quantity: parseInt(cantidad)
                });
            }

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Actualizamos el total de unidades
            const cantidadTotal = cart.reduce((acc, item) => acc + item.quantity, 0);
            localStorage.setItem("quantity", cantidadTotal);

            // Actualizamos el stock del producto
            product.stock -= parseInt(cantidad);

            // Actualizar el contador del carrito en la navbar
            if (typeof updateCartCounter === "function") {
                updateCartCounter();
            };

            // Resetear la cantidad del input a 0
            document.getElementById("cantidad").value = 0;

        } else {
            Toastify({
                backgroundColor: "#ff4757",
                text: "Operación cancelada",
                offset: {
                    y: 95 // Posición debajo del header-top
                }
            }).showToast()
        }
    });
};


const cantidad = document.getElementById("cantidad");

function incrementarCantidad() {
    if (cantidad.value < producto.stock) {
        cantidad.value++;
    } else {
        Toastify({
            backgroundColor: "#ff4757",
            text: "No hay más stock disponible",
            offset: {
                y: 95 // Posición debajo del header-top
            }
        }).showToast()
    }
}

function decrementarCantidad() {
    if (cantidad.value > 0) {
        cantidad.value--;
    }
}