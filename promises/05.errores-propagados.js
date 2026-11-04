// =======================================================
// Ejemplo 5. Manejo de errores propagados con catch()
// =======================================================
// Si en una cadena de tres operaciones falla la primera o la segunda,
// todos los .then() posteriores se omiten automáticamente y el flujo salta al .catch()

function validarCredenciales(usuario, clave) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (usuario === "admin" && clave === "1234") {
                resolve({ id: 1, rol: "Administrador" });
            } else {
                reject("Usuario o contraseña incorrectos.");
            }
        }, 800);
    });
}

function cargarPanelControl(datosUsuario) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Bienvenido al panel de " + datosUsuario.rol);
        }, 800);
    });
}

// Simulamos un inicio de sesión con clave incorrecta:
validarCredenciales("admin", "clave_erronea")
    .then(function (usuarioValidado) {
        console.log("Credenciales correctas, cargando panel...");
        return cargarPanelControl(usuarioValidado);
    })
    .then(function (mensajePanel) {
        console.log(mensajePanel);
    })
    .catch(function (error) {
        // Captura el fallo de validarCredenciales; los dos .then() fueron ignorados
        console.log("Acceso denegado: " + error);
    });
