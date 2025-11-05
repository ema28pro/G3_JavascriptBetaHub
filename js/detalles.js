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
                            <input type="number" id="cantidad" value="1" min="1">
                            <button onclick="incrementarCantidad()">+</button>
                        </div>
                        <button onclick="addToCar('${producto.name}', document.getElementById('cantidad').value)" class="btn-comprar">Comprar</button>
                    </div>
                ` : '<a href="login.html">Inicia sesión para comprar</a>'}
            </div>
        </div>
        
    </div>`;
}

function addToCar(productName, cantidad) {
    Swal.fire({
        title: '¡Alerta!',
        text: `¿Estas seguro que quieres añadir ${cantidad} ${productName} al carrito?`,
        // icon: 'success',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
        showCloseButtton: true
    }).then(result => {
        if (result.isConfirmed) {
            Toastify({
                text: `${productName} Agregado al carrito`,
            }).showToast()
        };
    });
};

function incrementarCantidad() {
    const cantidadElement = document.getElementById('cantidad');
    let cantidad = parseInt(cantidadElement.value);
    cantidad++;
    cantidadElement.value = cantidad;

}

function decrementarCantidad() {
    const cantidadElement = document.getElementById('cantidad');
    let cantidad = parseInt(cantidadElement.value);
    if (cantidad > 1) {
        cantidad--;
        cantidadElement.value = cantidad;
    }
}