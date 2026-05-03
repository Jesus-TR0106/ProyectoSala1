/*
    Archivo: js/registro.js
    Proyecto: Nova Street
    Objetivo: Registrar nuevos usuarios en localStorage.
*/
 
const formRegistro      = document.getElementById("formRegistro");
const nombreRegistro    = document.getElementById("nombreRegistro");
const correoRegistro    = document.getElementById("correoRegistro");
const claveRegistro     = document.getElementById("claveRegistro");
const mensajeRegistro   = document.getElementById("mensajeRegistro");
 
formRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault();
 
    const nombre = nombreRegistro.value.trim();
    const correo = correoRegistro.value.trim();
    const clave  = claveRegistro.value.trim();
 
    if (nombre === "" || correo === "" || clave === "") {
        mensajeRegistro.textContent = "Todos los campos son obligatorios.";
        mensajeRegistro.style.color = "#dc2626";
        return;
    }
 
    if (clave.length < 6) {
        mensajeRegistro.textContent = "La contraseña debe tener al menos 6 caracteres.";
        mensajeRegistro.style.color = "#dc2626";
        return;
    }
 
    const usuariosGuardados = localStorage.getItem("usuariosNovaStreet");
    let usuarios = [];
 
    if (usuariosGuardados !== null) {
        usuarios = JSON.parse(usuariosGuardados);
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
        window.location.href = "login.html";
    }, 1200);
});
 