const formLogin    = document.getElementById("formLogin");
const correoLogin  = document.getElementById("correoLogin");
const claveLogin   = document.getElementById("claveLogin");
const mensajeLogin = document.getElementById("mensajeLogin");
 
formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();
 
    const correo = correoLogin.value.trim();
    const clave  = claveLogin.value.trim();
 
    // Validar email
    if (!validarEmail(correo)) {
        mostrarMensaje("error-correo-login", "Ingresa un correo electrónico válido");
        return;
    } else {
        ocultarMensaje("error-correo-login");
    }
 
    // Validar contraseña
    if (!validarClave(clave)) {
        mostrarMensaje("error-clave-login", "La contraseña debe tener al menos 6 caracteres");
        return;
    } else {
        ocultarMensaje("error-clave-login");
    }
 
    const usuariosGuardados = localStorage.getItem("usuariosNovaStreet");
 
    if (usuariosGuardados === null) {
        mensajeLogin.textContent = "No hay usuarios registrados. Crea una cuenta primero.";
        mensajeLogin.style.color = "#dc2626";
        return;
    }
 
    let usuarios;
    try {
      usuarios = JSON.parse(usuariosGuardados);
    } catch (error) {
      console.error('Error parsing usuarios:', error);
      mensajeLogin.textContent = "Error al leer datos. Intenta de nuevo.";
      mensajeLogin.style.color = "#dc2626";
      return;
    }
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
 
    localStorage.setItem("usuarioActivoNovaStreet", JSON.stringify(usuarioEncontrado));
 
    mensajeLogin.textContent = "Sesión iniciada. Redirigiendo...";
    mensajeLogin.style.color = "#0F6E56";
 
    setTimeout(function () {
        // Si vino desde el carrito, regresa ahí; si no, al inicio
        const origen = localStorage.getItem("novaOrigenLogin");
        if (origen === "carrito") {
            localStorage.removeItem("novaOrigenLogin");
            window.location.href = "carrito.html";   // ✅ mismo nivel
        } else {
            window.location.href = "Proyecto.html";  // ✅ nombre real del archivo
        }
    }, 1000);
});
 
//VALIDACIÓN EN TIEMPO REAL
    
 
correoLogin.addEventListener("input", function() {
    validarCampo(this, "error-correo-login", "Ingresa un correo electrónico válido");
});
 
claveLogin.addEventListener("input", function() {
    validarCampo(this, "error-clave-login", "La contraseña debe tener al menos 6 caracteres");
});