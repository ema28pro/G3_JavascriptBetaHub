const categorylist = ["Electrodomesticos", "Herramientas", "Cocina", "Limpieza", "Hogar", "Dia a dia"]

let data = [];

fetch('https://6915119d84e8bd126af8878b.mockapi.io/API/HogarYMercado/productos', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => {
    if (response.ok) {
        data = response.json();
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}).catch(error => {
    console.error('Error al obtener productos:', error);
});
