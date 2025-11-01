// js/cart.js

// CARGA inicial del carrito (array de objetos) desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// UTILS
const $ = (sel) => document.querySelector(sel);

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    // (Opcional) actualizar quantity en localStorage si tu nav lo usa:
    const totalQty = cart.reduce((s, p) => s + (p.qty || 0), 0);
    localStorage.setItem('quantity', String(totalQty));
}

// RENDER
function renderCart() {
    const container = $('#cartContainer');
    const totalEl = $('#total');

    if (!container || !totalEl) {
    console.error("Faltan #cartContainer o #total en el HTML");
    return;
    }

    if (!cart || cart.length === 0) {
    container.innerHTML = '<p>El carrito está vacío 💤</p>';
    totalEl.textContent = '$0';
    return;
    }

    container.innerHTML = ''; // limpiar

    cart.forEach((item, idx) => {
    // Aseguramos propiedades mínimas
    const id = item.id ?? idx;
    const name = item.name ?? 'Producto';
    const price = Number(item.price ?? 0);
    const qty = Number(item.qty ?? 1);
    const stock = Number(item.stock ?? 999);
    const image = item.image ?? 'https://placehold.co/100x100';

    const card = document.createElement('article');
    card.className = 'cart-item';
    card.innerHTML = `
    <img src="${image}" alt="${name}" width="100" />
    <div class="cart-info">
        <h3>${name}</h3>
        <p>Precio: $${price}</p>
        <p>Stock: ${stock}</p>
        <div class="cart-controls">
            <button data-idx="${idx}" class="dec-btn">-</button>
            <span class="qty">${qty}</span>
            <button data-idx="${idx}" class="inc-btn">+</button>
            <button data-idx="${idx}" class="remove-btn">Eliminar</button>
        </div>
        </div>
    `;
    container.appendChild(card);
    });

    calcTotal();
    attachButtons(); // enlazamos listeners
}

// CALCULAR TOTAL
function calcTotal() {
    const total = cart.reduce((acc, p) => acc + (Number(p.price || 0) * Number(p.qty || 0)), 0);
    $('#total').textContent = `$${total}`;
    // También guardar quantity en localStorage (opcional)
    const totalQty = cart.reduce((s, p) => s + (Number(p.qty) || 0), 0);
    localStorage.setItem('quantity', String(totalQty));
}

// FUNCIONES DE MODIFICACIÓN
function increaseItem(index) {
    if (!cart[index]) return;
    const item = cart[index];
    if ((item.qty || 0) < (item.stock ?? Infinity)) {
    item.qty = Number(item.qty || 0) + 1;
    saveCart();
    renderCart();
    } else {
    alert('No hay más stock disponible 😢');
    }
}

function decreaseItem(index) {
    if (!cart[index]) return;
    const item = cart[index];
    if ((item.qty || 0) > 1) {
    item.qty = Number(item.qty) - 1;
    saveCart();
    renderCart();
    } else {

    alert('La cantidad no puede ser menor a 1');
    }
}

function removeItem(index) {
    if (!cart[index]) return;
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function clearCart() {
    if (!confirm('¿Seguro quieres vaciar el carrito?')) return;
    cart = [];
    saveCart();
    renderCart();
}

// ASIGNAR LISTENERS A BOTONES CREADOS DINÁMICAMENTE
function attachButtons() {
    document.querySelectorAll('.inc-btn').forEach(btn => {
    btn.onclick = () => increaseItem(Number(btn.dataset.idx));
    });
    document.querySelectorAll('.dec-btn').forEach(btn => {
    btn.onclick = () => decreaseItem(Number(btn.dataset.idx));
    });
    document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.onclick = () => removeItem(Number(btn.dataset.idx));
    });
}

// BOTÓN VACÍAR
const clearBtn = document.getElementById('clearCart');
if (clearBtn) clearBtn.addEventListener('click', clearCart);

// INICIALIZAR
renderCart();
