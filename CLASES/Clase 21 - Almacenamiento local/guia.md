# Guía Completa de Local Storage

## ¿Qué es Local Storage?

Local Storage es una API del navegador web que permite almacenar datos de forma persistente en el lado del cliente. A diferencia de las cookies, los datos en Local Storage:
- No se envían automáticamente al servidor con cada petición
- Tienen mayor capacidad de almacenamiento (aproximadamente 5-10MB)
- Persisten hasta que el usuario los elimine manualmente o se borren mediante código

## Métodos Principales de Local Storage

### 1. setItem() - Guardar Datos

El método `setItem()` permite almacenar un valor asociado a una clave específica.

**Sintaxis:**
```javascript
localStorage.setItem(clave, valor);
```

**Ejemplos:**
```javascript
// Guardar un string
localStorage.setItem('usuario', 'Juan Pérez');

// Guardar un número (se convierte automáticamente a string)
localStorage.setItem('edad', 25);

// Guardar un boolean
localStorage.setItem('sesionActiva', true);
```

### 2. getItem() - Obtener Datos

El método `getItem()` recupera el valor asociado a una clave específica.

**Sintaxis:**
```javascript
localStorage.getItem(clave);
```

**Ejemplos:**
```javascript
// Obtener datos
const usuario = localStorage.getItem('usuario');
const edad = localStorage.getItem('edad');
const sesionActiva = localStorage.getItem('sesionActiva');

console.log(usuario); // "Juan Pérez"
console.log(edad); // "25" (siempre retorna string)
console.log(sesionActiva); // "true" (siempre retorna string)

// Si la clave no existe, retorna null
const datoInexistente = localStorage.getItem('noExiste');
console.log(datoInexistente); // null
```

### 3. removeItem() - Eliminar un Elemento

El método `removeItem()` elimina un elemento específico del Local Storage.

**Sintaxis:**
```javascript
localStorage.removeItem(clave);
```

**Ejemplos:**
```javascript
// Eliminar un elemento específico
localStorage.removeItem('edad');

// Verificar que se eliminó
console.log(localStorage.getItem('edad')); // null
```

### 4. clear() - Limpiar Todo

El método `clear()` elimina todos los elementos del Local Storage para el dominio actual.

**Sintaxis:**
```javascript
localStorage.clear();
```

**Ejemplo:**
```javascript
// Guardar varios elementos
localStorage.setItem('usuario', 'Ana');
localStorage.setItem('email', 'ana@email.com');
localStorage.setItem('tema', 'oscuro');

// Limpiar todo el Local Storage
localStorage.clear();

// Verificar que todo se eliminó
console.log(localStorage.getItem('usuario')); // null
console.log(localStorage.getItem('email')); // null
console.log(localStorage.getItem('tema')); // null
```

## Usando las Dev Tools para Inspeccionar Local Storage

### Cómo Acceder:
1. **Chrome/Edge**: F12 → Application → Local Storage
2. **Firefox**: F12 → Storage → Local Storage
3. **Safari**: F12 → Storage → Local Storage

### Funcionalidades en Dev Tools:
- **Ver todos los elementos**: Lista de clave-valor almacenados
- **Editar valores**: Doble clic sobre un valor para editarlo
- **Eliminar elementos**: Clic derecho → Delete
- **Limpiar todo**: Botón "Clear All" o clic derecho → "Clear"
- **Actualizar vista**: Botón de refresh para ver cambios en tiempo real

### Ejemplo Práctico:
```javascript
// Ejecuta este código en la consola y observa en Dev Tools
localStorage.setItem('ejemplo', 'Hola mundo');
localStorage.setItem('contador', 1);
localStorage.setItem('configuracion', '{"tema":"claro","idioma":"es"}');
```

## Trabajando con JSON

Como Local Storage solo puede almacenar strings, necesitamos JSON para trabajar con objetos y arrays.

### JSON.stringify() - Convertir a String

Convierte un objeto JavaScript en una cadena JSON.

**Sintaxis:**
```javascript
JSON.stringify(objeto);
```

**Ejemplos:**
```javascript
// Objeto simple
const usuario = {
    nombre: 'María González',
    edad: 28,
    email: 'maria@email.com',
    activo: true
};

// Convertir a string y guardar
const usuarioString = JSON.stringify(usuario);
localStorage.setItem('usuario', usuarioString);

// Array de objetos
const productos = [
    { id: 1, nombre: 'Laptop', precio: 999.99 },
    { id: 2, nombre: 'Mouse', precio: 25.50 },
    { id: 3, nombre: 'Teclado', precio: 75.00 }
];

localStorage.setItem('productos', JSON.stringify(productos));
```

### JSON.parse() - Convertir a Objeto

Convierte una cadena JSON en un objeto JavaScript.

**Sintaxis:**
```javascript
JSON.parse(string);
```

**Ejemplos:**
```javascript
// Recuperar y convertir objeto
const usuarioString = localStorage.getItem('usuario');
const usuario = JSON.parse(usuarioString);

console.log(usuario.nombre); // "María González"
console.log(usuario.edad); // 28 (ahora es number, no string)

// Recuperar array
const productosString = localStorage.getItem('productos');
const productos = JSON.parse(productosString);

console.log(productos[0].nombre); // "Laptop"
console.log(productos.length); // 3
```

### Manejo de Errores con JSON:
```javascript
function obtenerDatos(clave) {
    try {
        const datos = localStorage.getItem(clave);
        return datos ? JSON.parse(datos) : null;
    } catch (error) {
        console.error('Error al parsear JSON:', error);
        return null;
    }
}

function guardarDatos(clave, datos) {
    try {
        localStorage.setItem(clave, JSON.stringify(datos));
        return true;
    } catch (error) {
        console.error('Error al guardar datos:', error);
        return false;
    }
}
```

## Gestión de Sesiones con Local Storage

### ¿Qué es una Sesión?

Una sesión representa el período durante el cual un usuario está autenticado y activo en una aplicación web.

### Implementación Básica de Sesiones:

```javascript
// Clase para manejar sesiones
class SesionManager {
    constructor() {
        this.claveUsuario = 'sesion_usuario';
        this.claveTiempo = 'sesion_tiempo';
        this.tiempoExpiracion = 30 * 60 * 1000; // 30 minutos en millisegundos
    }

    // Iniciar sesión
    iniciarSesion(datosUsuario) {
        const ahora = Date.now();
        
        localStorage.setItem(this.claveUsuario, JSON.stringify(datosUsuario));
        localStorage.setItem(this.claveTiempo, ahora.toString());
        
        console.log('Sesión iniciada para:', datosUsuario.nombre);
    }

    // Verificar si hay sesión activa
    sesionActiva() {
        const usuario = localStorage.getItem(this.claveUsuario);
        const tiempo = localStorage.getItem(this.claveTiempo);
        
        if (!usuario || !tiempo) {
            return false;
        }

        const ahora = Date.now();
        const tiempoSesion = parseInt(tiempo);
        
        // Verificar si la sesión ha expirado
        if (ahora - tiempoSesion > this.tiempoExpiracion) {
            this.cerrarSesion();
            return false;
        }

        // Actualizar tiempo de última actividad
        localStorage.setItem(this.claveTiempo, ahora.toString());
        return true;
    }

    // Obtener datos del usuario
    obtenerUsuario() {
        if (this.sesionActiva()) {
            const usuarioString = localStorage.getItem(this.claveUsuario);
            return JSON.parse(usuarioString);
        }
        return null;
    }

    // Cerrar sesión
    cerrarSesion() {
        localStorage.removeItem(this.claveUsuario);
        localStorage.removeItem(this.claveTiempo);
        console.log('Sesión cerrada');
    }
}

// Uso del manager de sesiones
const sesion = new SesionManager();

// Ejemplo de login
function login(email, password) {
    // Aquí normalmente verificarías las credenciales con el servidor
    if (email === 'usuario@test.com' && password === '123456') {
        const datosUsuario = {
            id: 1,
            nombre: 'Usuario Test',
            email: email,
            rol: 'usuario'
        };
        
        sesion.iniciarSesion(datosUsuario);
        return true;
    }
    return false;
}
```

## Páginas Públicas vs Páginas Privadas

### Concepto:
- **Páginas Públicas**: Accesibles sin autenticación
- **Páginas Privadas**: Requieren autenticación válida

### Implementación de Control de Acceso:

```javascript
// Función para proteger páginas privadas
function protegerPagina() {
    const sesion = new SesionManager();
    
    if (!sesion.sesionActiva()) {
        // Redirigir a login si no hay sesión activa
        alert('Debes iniciar sesión para acceder a esta página');
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Función para verificar permisos de administrador
function requireAdmin() {
    const sesion = new SesionManager();
    const usuario = sesion.obtenerUsuario();
    
    if (!usuario || usuario.rol !== 'admin') {
        alert('No tienes permisos de administrador');
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

// Uso en páginas HTML
// En páginas privadas, agregar al inicio:
```
```HTML
<script>
    document.addEventListener('DOMContentLoaded', function() {
        if (!protegerPagina()) {
            return; // La función ya redirige
        }
        
        // Código específico de la página privada
        const usuario = new SesionManager().obtenerUsuario();
        document.getElementById('nombreUsuario').textContent = usuario.nombre;
    });
</script>
```

### Ejemplo de Sistema Completo:

```javascript
// Sistema completo de autenticación
class SistemaAuth {
    constructor() {
        this.sesion = new SesionManager();
        this.paginasPrivadas = [
            'dashboard.html',
            'perfil.html',
            'configuracion.html'
        ];
        this.paginasAdmin = [
            'admin.html',
            'usuarios.html'
        ];
    }

    // Verificar acceso a página actual
    verificarAcceso() {
        const paginaActual = window.location.pathname.split('/').pop();
        
        if (this.paginasPrivadas.includes(paginaActual)) {
            return this.sesion.sesionActiva();
        }
        
        if (this.paginasAdmin.includes(paginaActual)) {
            const usuario = this.sesion.obtenerUsuario();
            return usuario && usuario.rol === 'admin';
        }
        
        return true; // Página pública
    }

    // Redirigir según el estado de autenticación
    manejarRedireccion() {
        if (!this.verificarAcceso()) {
            if (this.sesion.sesionActiva()) {
                // Usuario logueado pero sin permisos
                window.location.href = 'acceso-denegado.html';
            } else {
                // Usuario no logueado
                window.location.href = 'login.html';
            }
        }
    }
}

// Inicializar en todas las páginas
document.addEventListener('DOMContentLoaded', function() {
    const auth = new SistemaAuth();
    auth.manejarRedireccion();
});
```

## Mejores Prácticas

### 1. Validación de Datos:
```javascript
function guardarConfiguracion(config) {
    // Validar estructura del objeto
    if (!config || typeof config !== 'object') {
        console.error('Configuración inválida');
        return false;
    }
    
    try {
        localStorage.setItem('configuracion', JSON.stringify(config));
        return true;
    } catch (error) {
        console.error('Error al guardar configuración:', error);
        return false;
    }
}
```

### 2. Manejo de Cuotas:
```javascript
function verificarEspacio() {
    try {
        // Intentar guardar un dato de prueba
        const test = 'x'.repeat(1024); // 1KB
        localStorage.setItem('test', test);
        localStorage.removeItem('test');
        return true;
    } catch (error) {
        console.warn('Local Storage casi lleno o lleno');
        return false;
    }
}
```

### 3. Funciones Utilitarias:
```javascript
const StorageUtils = {
    // Guardar con validación
    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            console.error('Error al guardar:', error);
            return false;
        }
    },

    // Obtener con valor por defecto
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error al obtener:', error);
            return defaultValue;
        }
    },

    // Verificar si existe una clave
    has(key) {
        return localStorage.getItem(key) !== null;
    },

    // Obtener todas las claves
    keys() {
        return Object.keys(localStorage);
    },

    // Obtener tamaño aproximado en bytes
    size() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        return total;
    }
};
```

## Ejemplo Práctico Completo

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Preferencias con Local Storage</title>
</head>
<body>
    <h1>Configuración de Usuario</h1>
    
    <form id="preferencesForm">
        <label>
            Tema:
            <select name="tema">
                <option value="claro">Claro</option>
                <option value="oscuro">Oscuro</option>
            </select>
        </label>
        
        <label>
            Idioma:
            <select name="idioma">
                <option value="es">Español</option>
                <option value="en">English</option>
            </select>
        </label>
        
        <label>
            <input type="checkbox" name="notificaciones"> 
            Recibir notificaciones
        </label>
        
        <button type="submit">Guardar Preferencias</button>
        <button type="button" id="resetBtn">Resetear</button>
    </form>

    <script>
        class PreferenciasManager {
            constructor() {
                this.clave = 'preferencias_usuario';
                this.defaultPrefs = {
                    tema: 'claro',
                    idioma: 'es',
                    notificaciones: true
                };
            }

            cargar() {
                const prefs = localStorage.getItem(this.clave);
                return prefs ? JSON.parse(prefs) : this.defaultPrefs;
            }

            guardar(preferencias) {
                localStorage.setItem(this.clave, JSON.stringify(preferencias));
                this.aplicar(preferencias);
            }

            aplicar(preferencias) {
                document.body.className = `tema-${preferencias.tema}`;
                document.documentElement.lang = preferencias.idioma;
                
                if (preferencias.notificaciones && 'Notification' in window) {
                    Notification.requestPermission();
                }
            }

            resetear() {
                localStorage.removeItem(this.clave);
                this.aplicar(this.defaultPrefs);
                this.llenarFormulario(this.defaultPrefs);
            }

            llenarFormulario(preferencias) {
                document.querySelector('[name="tema"]').value = preferencias.tema;
                document.querySelector('[name="idioma"]').value = preferencias.idioma;
                document.querySelector('[name="notificaciones"]').checked = preferencias.notificaciones;
            }
        }

        // Inicializar
        const prefManager = new PreferenciasManager();
        const preferenciasActuales = prefManager.cargar();

        // Aplicar preferencias guardadas
        prefManager.aplicar(preferenciasActuales);
        prefManager.llenarFormulario(preferenciasActuales);

        // Manejar formulario
        document.getElementById('preferencesForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const nuevasPrefs = {
                tema: formData.get('tema'),
                idioma: formData.get('idioma'),
                notificaciones: formData.has('notificaciones')
            };
            
            prefManager.guardar(nuevasPrefs);
            alert('Preferencias guardadas correctamente');
        });

        // Manejar reset
        document.getElementById('resetBtn').addEventListener('click', function() {
            if (confirm('¿Estás seguro de resetear las preferencias?')) {
                prefManager.resetear();
                alert('Preferencias reseteadas');
            }
        });
    </script>

    <style>
        .tema-claro {
            background-color: white;
            color: black;
        }
        
        .tema-oscuro {
            background-color: #222;
            color: white;
        }
        
        form {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-width: 300px;
            margin: 20px 0;
        }
        
        label {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        button {
            padding: 10px;
            margin: 5px;
        }
    </style>
</body>
</html>
```

## Consideraciones de Seguridad

### ⚠️ Importantes:
1. **No guardar información sensible**: Nunca almacenar contraseñas, tokens de autenticación, o datos personales sensibles
2. **Local Storage es accesible**: Cualquier script en la página puede leer/modificar los datos
3. **No es seguro contra XSS**: Los ataques de Cross-Site Scripting pueden acceder a Local Storage
4. **Usar HTTPS**: Siempre usar conexiones seguras en producción

### Alternativas Seguras:
- **SessionStorage**: Para datos temporales de sesión
- **Cookies httpOnly**: Para tokens de autenticación
- **IndexedDB**: Para datos más complejos y con mejor rendimiento

---

Esta guía te proporciona una base sólida para trabajar con Local Storage en tus proyectos JavaScript. ¡Practica con los ejemplos y experimenta con tus propias implementaciones!