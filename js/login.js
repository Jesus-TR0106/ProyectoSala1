/*
    Archivo: js/login.js
    Proyecto: Nova Street
    Objetivo: Iniciar sesión y redirigir al carrito o a la tienda.
*/
 
const formLogin     = document.getElementById("formLogin");
const correoLogin   = document.getElementById("correoLogin");
const claveLogin    = document.getElementById("claveLogin");
const mensajeLogin  = document.getElementById("mensajeLogin");
 
formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();
 
    const correo = correoLogin.value.trim();
    const clave  = claveLogin.value.trim();
 
    if (correo === "" || clave === "") {
        mensajeLogin.textContent = "Ingresa tu correo y contraseña.";
        mensajeLogin.style.color = "#dc2626";
        return;
    }
 
    const usuariosGuardados = localStorage.getItem("usuariosNovaStreet");
 
    if (usuariosGuardados === null) {
        mensajeLogin.textContent = "No hay usuarios registrados. Crea una cuenta primero.";
        mensajeLogin.style.color = "#dc2626";
        return;
    }
 
    const usuarios = JSON.parse(usuariosGuardados);
    let usuarioEncontrado = null;
 
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo === correo && usuarios[i].clave === clave) {
            usuarioEncontrado = usuarios[i];
            break;
        }
    }
 
    if (usuarioEncontrado === null) {
        mensajeLogin.textContent = "Correo o contraseña incorrectos.";
        mensajeLogin.style.color = "#dc2626";
        return;
    }
 
    // Guardamos sesión
    localStorage.setItem("usuarioActivoNovaStreet", JSON.stringify(usuarioEncontrado));
 
    mensajeLogin.textContent = "Sesión iniciada. Redirigiendo...";
    mensajeLogin.style.color = "#0F6E56";
 
    setTimeout(function () {
        // Si vino desde el carrito, regresamos ahí; si no, a la tienda
        const origen = localStorage.getItem("novaOrigenLogin");
        if (origen === "carrito") {
            localStorage.removeItem("novaOrigenLogin");
            window.location.href = "carrito.html";
        } else {
            window.location.href = "index.html";
        }
    }, 1000);
});