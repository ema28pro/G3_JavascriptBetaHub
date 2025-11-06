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
                        <button onclick="addItemToCar(${producto.id}, document.getElementById('cantidad').value)" class="btn-comprar">Comprar</button>
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
            text: "Producto no encontrado",
        }).showToast();
        return;
    }

    if (parseInt(cantidad) < 1 || cantidad > product.stack) {
        Toastify({
            text: `No hay stock suficiente.`,
        }).showToast();
        return;
    }

    Swal.fire({
        title: '¡Alerta!',
        text: `¿Estas seguro que quieres añadir ${cantidad} ${product.name} al carrito?`,
        // icon: 'success',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
    }).then(result => {
        if (result.isConfirmed) {
            Toastify({
                text: `${product.name} Agregado al carrito`,
            }).showToast()
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

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
            localStorage.setItem('cart', JSON.stringify(cart));

            // Actualizamos el total de unidades
            const cantidadTotal = cart.reduce((acc, item) => acc + item.quantity, 0);
            localStorage.setItem("quantity", cantidadTotal);
            
            // Actualizamos el stock del producto
            product.stack -= parseInt(cantidad);

            // Actualizar el contador del carrito en la navbar
            if (typeof updateCartCounter === 'function') {
                updateCartCounter();
            };

            // Resetear la cantidad del input a 0
            document.getElementById('cantidad').value = 0;

        } else {
            Toastify({
                text: `Operación cancelada`,
            }).showToast()
        }
    });
};


const cantidad = document.getElementById('cantidad');

function incrementarCantidad() {
    if (cantidad.value < producto.stack) {
        cantidad.value++;
    } else {
        Toastify({
            text: `No hay más stock disponible`,
        }).showToast()
    }
}

function decrementarCantidad() {
    if (cantidad.value > 0) {
        cantidad.value--;
    }
}