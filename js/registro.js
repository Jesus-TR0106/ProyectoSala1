/*
    Archivo: js/registro.js
    Proyecto: Nova Street
*/
 
const formRegistro    = document.getElementById("formRegistro");
const nombreRegistro  = document.getElementById("nombreRegistro");
const correoRegistro  = document.getElementById("correoRegistro");
const claveRegistro   = document.getElementById("claveRegistro");
const mensajeRegistro = document.getElementById("mensajeRegistro");
 
formRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault();
 
    const nombre = nombreRegistro.value.trim();
    const correo = correoRegistro.value.trim();
    const clave  = claveRegistro.value.trim();
 
    // Validar nombre
    if (!validarNombre(nombre)) {
        mostrarMensaje("error-nombre-registro", "El nombre debe tener al menos 2 caracteres");
        return;
    } else {
        ocultarMensaje("error-nombre-registro");
    }
 
    // Validar email
    if (!validarEmail(correo)) {
        mostrarMensaje("error-correo-registro", "Ingresa un correo electrónico válido");
        return;
    } else {
        ocultarMensaje("error-correo-registro");
    }
 
    // Validar contraseña
    if (!validarClave(clave)) {
        mostrarMensaje("error-clave-registro", "La contraseña debe tener al menos 6 caracteres");
        return;
    } else {
        ocultarMensaje("error-clave-registro");
    }
 
    const usuariosGuardados = localStorage.getItem("usuariosNovaStreet");
    let usuarios = [];
 
    if (usuariosGuardados !== null) {
        try {
            usuarios = JSON.parse(usuariosGuardados);
        } catch (error) {
            console.error('Error parsing usuarios:', error);
            localStorage.removeItem("usuariosNovaStreet");
            usuarios = [];
        }
    }
 
    let existeUsuario = false;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo === correo) {
            existeUsuario = true;
            break;
        }
    }
 
    if (existeUsuario === true) {
        mensajeRegistro.textContent = "Este correo ya está registrado.";
        mensajeRegistro.style.color = "#dc2626";
        return;
    }
 
    const nuevoUsuario = { nombre: nombre, correo: correo, clave: clave };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuariosNovaStreet", JSON.stringify(usuarios));
 
    mensajeRegistro.textContent = "Cuenta creada. Redirigiendo al login...";
    mensajeRegistro.style.color = "#0F6E56";
 
    nombreRegistro.value = "";
    correoRegistro.value = "";
    claveRegistro.value  = "";
 
    setTimeout(function () {
        window.location.href = "login.html"; // ✅ mismo nivel
    }, 1200);
});
 
//VALIDACIÓN EN TIEMPO REAL
 
nombreRegistro.addEventListener("input", function() {
    validarCampo(this, "error-nombre-registro", "El nombre debe tener al menos 2 caracteres");
});
 
correoRegistro.addEventListener("input", function() {
    validarCampo(this, "error-correo-registro", "Ingresa un correo electrónico válido");
});
 
claveRegistro.addEventListener("input", function() {
    validarCampo(this, "error-clave-registro", "La contraseña debe tener al menos 6 caracteres");
});

 