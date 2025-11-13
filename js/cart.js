// VERIFICAR SESIÓN ACTIVA
function checkActiveSession() {
    const userEmail = localStorage.getItem("email");
    if (!userEmail) {
        // Redirigir inmediatamente a la home con código simple
        window.location.href = "./index.html?auth=required";
        return false;
    }
    return true;
}

checkActiveSession()

// CARGA inicial del carrito (array de objetos) desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const totalQty = cart.reduce((s, p) => s + p.quantity, 0);
    localStorage.setItem('quantity', totalQty);
    updateCartCounter()
}

// RENDER
function renderCart() {
    const container = document.querySelector('#cartContainer');
    const totalEl = document.querySelector('#total');
    const itemCountEl = document.querySelector('#itemCount');

    // if (!container || !totalEl || !itemCountEl) {
    //     console.error("Faltan elementos en el HTML");
    //     return;
    // }

    if (!cart || cart.length === 0) {
        container.innerHTML = '<p>El carrito está vacío 💤</p>';
        totalEl.textContent = (0).toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
        itemCountEl.textContent = '0';
        return;
    }

    container.innerHTML = ''; // limpiar

    cart.forEach((item, idx) => {
        const id = item.id;
        const name = item.name;
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        const stock = Number(item.stock);
        const image = item.url ?? 'https://placehold.co/100x100';

        const card = document.createElement('article');
        card.className = 'cart-item';
        card.innerHTML = `
    <img src="${image}" alt="${name}" width="100" />
    <div class="cart-info">
        <h3>${name}</h3>
        <p>Precio unitario: ${price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
        <p>Total: ${(price * quantity).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
        <div class="cart-controls">
            <button onclick="decreaseItem(${idx})">-</button>
            <span class="qty">${quantity}</span>
            <button onclick="increaseItem(${idx})">+</button>
            <button onclick="removeItem(${idx})">Eliminar</button>
        </div>
        </div>
    `;
        container.appendChild(card);
    });

    calcTotal();
}

// CALCULAR TOTAL
function calcTotal() {
    const total = cart.reduce((acc, p) => acc + (Number(p.price || 0) * Number(p.quantity || 0)), 0);
    const totalItems = cart.reduce((acc, p) => acc + Number(p.quantity || 0), 0);

    document.querySelector('#total').textContent = total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    document.querySelector('#itemCount').textContent = totalItems;
}

// FUNCIONES DE MODIFICACIÓN
function increaseItem(index) {
    if (!cart[index]) return;
    const item = cart[index];
    if (item.quantity < item.stock) {
        item.quantity = Number(item.quantity) + 1;
        saveCart();
        renderCart();
    } else {
        Toastify({
            backgroundColor: "#ff4757",
            text: `No hay más stock disponible`,
            offset: {
                y: 95 // Posición debajo del header-top
            }
        }).showToast();
    }
}

function decreaseItem(index) {
    if (!cart[index]) return;
    const item = cart[index];
    if (item.quantity > 1) {
        item.quantity = Number(item.quantity) - 1;
        saveCart();
        renderCart();
    } else {
        removeItem(index);
    }
}

function removeItem(index) {
    if (!cart[index]) return;

    const item = cart[index];

    Swal.fire({
        title: "¡Alerta!",
        text: `¿Estás seguro que quieres eliminar ${item.name} del carrito?`,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        showCancelButton: true,
    }).then(result => {
        if (result.isConfirmed) {
            cart.splice(index, 1);
            saveCart();
            renderCart();

            Toastify({
                backgroundColor: "#47ff6fff",
                text: `${item.name} eliminado del carrito correctamente`,
                offset: {
                    y: 95 // Posición debajo del header-top
                }
            }).showToast();
        } else {
            Toastify({
                backgroundColor: "#ff4757",
                text: "Operación cancelada",
                offset: {
                    y: 95 // Posición debajo del header-top
                }
            }).showToast();
        }
    });
}

function clearCart() {
    if (!cart || cart.length === 0) {
        Toastify({
            backgroundColor: "#ff4757",
            text: "El carrito está vacío",
            offset: {
                y: 95 // Posición debajo del header-top
            }
        }).showToast();
        return;
    }
    
    Swal.fire({
        title: "¡Alerta!",
        text: "¿Estás seguro que quieres vaciar todo el carrito?",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        showCancelButton: true,
    }).then(result => {
        if (result.isConfirmed) {
            cart = [];
            saveCart();
            renderCart();

            Toastify({
                backgroundColor: "#47ff6fff",
                text: "Carrito vaciado completamente",
                offset: {
                    y: 95 // Posición debajo del header-top
                }
            }).showToast();
        } else {
            Toastify({
                backgroundColor: "#ff4757",
                text: "Operación cancelada",
                offset: {
                    y: 95 // Posición debajo del header-top
                }
            }).showToast();
        }
    });
}

// FUNCIÓN DE COMPRAR
function checkout() {
    if (!cart || cart.length === 0) {
        Toastify({
            backgroundColor: "#ff4757",
            text: "El carrito está vacío",
            offset: {
                y: 95 // Posición debajo del header-top
            }
        }).showToast();
        return;
    }

    const total = cart.reduce((acc, p) => acc + (Number(p.price || 0) * Number(p.quantity || 0)), 0);
    const totalItems = cart.reduce((acc, p) => acc + Number(p.quantity || 0), 0);

    Swal.fire({
        title: "¡Confirmar compra!",
        html: `
            <div style="text-align: left;">
                <p><strong>Productos:</strong> ${totalItems} artículos</p>
                <p><strong>Total a pagar:</strong> ${total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
            </div>
        `,
        confirmButtonText: "Confirmar compra",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
    }).then(result => {
        if (result.isConfirmed) {
            // Simular compra exitosa
            cart = [];
            saveCart();
            renderCart();

            Toastify({
                text: "¡Compra realizada exitosamente! 🎉",
                offset: {
                    y: 95 // Posición debajo del header-top
                }
            }).showToast();
        } else {
            Toastify({
                backgroundColor: "#ff4757",
                text: "Compra cancelada",
                offset: {
                    y: 95 // Posición debajo del header-top
                }
            }).showToast();
        }
    });
}

// BOTÓN VACÍAR Y COMPRAR
const clearBtn = document.getElementById("clearCart");
const checkoutBtn = document.getElementById("checkoutBtn");

if (clearBtn) clearBtn.addEventListener("click", clearCart);
if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);

// INICIALIZAR
renderCart();
