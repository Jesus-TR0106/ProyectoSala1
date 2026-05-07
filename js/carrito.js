/*
    Archivo: js/carrito.js
    Proyecto: Nova Street
*/
 
/* =========================================================
   1. SESIÓN DE USUARIO
   ========================================================= */
 
const usuarioGuardado  = localStorage.getItem("usuarioActivoNovaStreet");
let usuarioActivo      = null;
 
const nombreUsuarioEl  = document.getElementById("nombreUsuario");
const btnSesion        = document.getElementById("btnSesion");
 
if (usuarioGuardado !== null) {
    usuarioActivo = JSON.parse(usuarioGuardado);
    nombreUsuarioEl.textContent = "Hola, " + usuarioActivo.nombre;
    btnSesion.textContent = "Cerrar sesión";
    btnSesion.addEventListener("click", function () {
        localStorage.removeItem("usuarioActivoNovaStreet");
        window.location.href = "Proyecto.html";
    });
} else {
    nombreUsuarioEl.textContent = "";
    btnSesion.textContent = "Iniciar sesión";
    btnSesion.addEventListener("click", function () {
        window.location.href = "login.html";
    });
}
 
/* =========================================================
   2. CARGAR CARRITO DESDE LOCALSTORAGE
   ========================================================= */
 
let carrito = [];
 
const carritoGuardado = localStorage.getItem("carritoNovaStreet");
if (carritoGuardado !== null) {
    carrito = JSON.parse(carritoGuardado);
}
 
function guardarCarrito() {
    localStorage.setItem("carritoNovaStreet", JSON.stringify(carrito));
}
 
/* =========================================================
   3. RENDERIZAR LISTA
   ========================================================= */
 
function renderCarrito() {
    const lista      = document.getElementById("listaCarrito");
    const totalQtyEl = document.getElementById("totalQty");
    const subtotalEl = document.getElementById("subtotalMonto");
    const envioEl    = document.getElementById("costoEnvio");
    const totalEl    = document.getElementById("totalMonto");
 
    lista.innerHTML = "";
 
    const itemsActivos = carrito.filter(function (p) { return p.qty > 0; });
 
    if (itemsActivos.length === 0) {
        lista.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío. <a href="Proyecto.html">Volver a la tienda →</a></p>';
        totalQtyEl.textContent = "0";
        subtotalEl.textContent = "S/ 0.00";
        envioEl.textContent    = "S/ 0.00";
        totalEl.textContent    = "S/ 0.00";
        return;
    }
 
    let subtotal = 0;
    let totalQty = 0;
 
    for (let i = 0; i < itemsActivos.length; i++) {
        const p      = itemsActivos[i];
        const precio = parseFloat(p.price);
        const sub    = precio * p.qty;
        subtotal    += sub;
        totalQty    += p.qty;
 
        const item = document.createElement("div");
        item.className = "carrito-item";
 
        const imgWrap = document.createElement("div");
        imgWrap.className = "item-img";
        imgWrap.style.background = p.bg || "#f5f4f0";
        const img = document.createElement("img");
        img.src = p.image;
        img.alt = p.name;
        imgWrap.appendChild(img);
 
        const info = document.createElement("div");
        info.className = "item-info";
        info.innerHTML =
            '<div class="item-name">' + p.name + '</div>' +
            '<div class="item-cat">'  + p.cat  + '</div>' +
            '<div class="item-price">S/ ' + precio.toFixed(2) + ' c/u</div>';
 
        const right = document.createElement("div");
        right.className = "item-right";
 
        const subEl = document.createElement("div");
        subEl.className = "item-subtotal";
        subEl.textContent = "S/ " + sub.toFixed(2);
 
        const qtyCtrl = document.createElement("div");
        qtyCtrl.className = "qty-ctrl";
 
        const btnMenos = document.createElement("button");
        btnMenos.className = "qty-btn";
        btnMenos.textContent = "−";
        btnMenos.addEventListener("click", function () { cambiarQty(p.id, -1); });
 
        const numSpan = document.createElement("span");
        numSpan.className = "qty-num-c";
        numSpan.textContent = p.qty;
 
        const btnMas = document.createElement("button");
        btnMas.className = "qty-btn";
        btnMas.textContent = "+";
        btnMas.addEventListener("click", function () { cambiarQty(p.id, +1); });
 
        qtyCtrl.appendChild(btnMenos);
        qtyCtrl.appendChild(numSpan);
        qtyCtrl.appendChild(btnMas);
 
        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn-eliminar";
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", function () { eliminarItem(p.id); });
 
        right.appendChild(subEl);
        right.appendChild(qtyCtrl);
        right.appendChild(btnEliminar);
 
        item.appendChild(imgWrap);
        item.appendChild(info);
        item.appendChild(right);
        lista.appendChild(item);
    }
 
    const envio = subtotal >= 199 ? 0 : 15;
 
    totalQtyEl.textContent = totalQty;
    subtotalEl.textContent = "S/ " + subtotal.toFixed(2);
    envioEl.textContent    = envio === 0 ? "Gratis" : "S/ " + envio.toFixed(2);
    totalEl.textContent    = "S/ " + (subtotal + envio).toFixed(2);
}
 
/* =========================================================
   4. ACCIONES DEL CARRITO
   ========================================================= */
 
function cambiarQty(id, delta) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito[i].qty += delta;
            if (carrito[i].qty < 0) { carrito[i].qty = 0; }
            break;
        }
    }
    guardarCarrito();
    renderCarrito();
}
 
function eliminarItem(id) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito[i].qty = 0;
            break;
        }
    }
    guardarCarrito();
    renderCarrito();
}
 
function aplicarPromo() {
    const codigo = document.getElementById("codigoPromo").value.trim().toUpperCase();
    const msg    = document.getElementById("mensajeCarrito");
    if (codigo === "ENVINOVA10") {
        msg.textContent = "Codigo aplicado: envio gratis.";
        msg.style.color = "#0F6E56";
    } else {
        msg.textContent = "Codigo invalido o expirado.";
        msg.style.color = "#dc2626";
    }
}
 
/* =========================================================
   5. CHECKOUT
   ========================================================= */
 
document.getElementById("btnCheckout").addEventListener("click", function () {
    const msg     = document.getElementById("mensajeCarrito");
    const activos = carrito.filter(function (p) { return p.qty > 0; });
 
    if (activos.length === 0) {
        msg.textContent = "Tu carrito esta vacio.";
        msg.style.color = "#dc2626";
        return;
    }
 
    if (usuarioActivo === null) {
        msg.textContent = "Debes iniciar sesion para finalizar la compra.";
        msg.style.color = "#dc2626";
        localStorage.setItem("novaOrigenLogin", "carrito");
        setTimeout(function () {
            window.location.href = "login.html";
        }, 1200);
        return;
    }
 
    document.getElementById("formEnvio").classList.add("activo");
    msg.textContent = "Completa tus datos de envio.";
    msg.style.color = "#2C2C2A";
});
 
document.getElementById("formEnvio").addEventListener("submit", function (evento) {
    evento.preventDefault();
 
    const direccion = document.getElementById("direccion").value.trim();
    const telefono  = document.getElementById("telefono").value.trim();
    const msg       = document.getElementById("mensajeCarrito");
 
    if (direccion === "" || telefono === "") {
        msg.textContent = "Completa direccion y telefono.";
        msg.style.color = "#dc2626";
        return;
    }
 
    const activos = carrito.filter(function (p) { return p.qty > 0; });
    const total   = activos.reduce(function (sum, p) { return sum + parseFloat(p.price) * p.qty; }, 0);
    const envio   = total >= 199 ? 0 : 15;
    const nombre  = usuarioActivo !== null ? usuarioActivo.nombre : "cliente";
 
    msg.textContent = "Pedido confirmado, " + nombre + "! Total: S/ " + (total + envio).toFixed(2) + ". Gracias!";
    msg.style.color = "#0F6E56";
 
    for (let i = 0; i < carrito.length; i++) { carrito[i].qty = 0; }
    guardarCarrito();
 
    document.getElementById("formEnvio").classList.remove("activo");
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value  = "";
 
    setTimeout(function () { renderCarrito(); }, 800);
});
 
INICIO

renderCarrito();