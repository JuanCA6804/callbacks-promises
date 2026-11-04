// El constructor recibe un único argumento obligatorio
var miPromesa = new Promise(
    // Función ejecutora (executor function)
    function (resolve, reject) {
        // Cuerpo de la función ejecutora
        var operacionExitosa = true;

        if (operacionExitosa) {
            // Cambia el estado de 'pending' a 'fulfilled' y entrega el valor
            resolve('Los datos se procesaron correctamente');
        } else {
            // Cambia el estado de 'pending' a 'rejected' y entrega el motivo del fallo
            reject("Ocurrió un fallo al procesar los datos.");
        }
    }
);

// then() : Registra una función que se ejecutará
// cuando la promesa pase al estado fulfilled (cumplida)
miPromesa.then(function (mensajeRecibido) {
    console.log("Resultado capturado en then(): " + mensajeRecibido);
});

// =======================================================
// Ejemplo 1: Crear y consumir una promesa sencilla
// =======================================================
function verificarStock(cantidadSolicitada) {
    return new Promise(function (resolve, reject) {
        var stockDisponible = 10;

        if (cantidadSolicitada <= stockDisponible) {
            resolve("Pedido confirmado por " + cantidadSolicitada + " unidades.");
        } else {
            reject("Stock insuficiente. Solo quedan " + stockDisponible + " unidades.");
        }
    });
}

verificarStock(4).then(function (confirmacion) {
    console.log(confirmacion);
});
