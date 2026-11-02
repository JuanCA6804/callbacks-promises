function mostrarPerfilEnPantalla(usuarioRecibido) {
    console.log("Datos recibidos del servidor:");
        console.log("ID: " + usuarioRecibido.id + " | Nombre: " +
usuarioRecibido.nombre);
}
function obtenerUsuarioDeServidor(idUsuario, callbackExito) {
    console.log("Consultando servidor para el usuario con ID " + idUsuario + "...");
    setTimeout(function() {
        // Simulamos el objeto que nos devolvería una base de datos real
        var usuarioSimulado = {
        id: idUsuario,
        nombre: "Elena Gómez",
        rol: "Estudiante de Ingeniería"
};
        // Entregamos el resultado a través del callback
        callbackExito(usuarioSimulado);
    }, 1500);
}
obtenerUsuarioDeServidor(42, mostrarPerfilEnPantalla);