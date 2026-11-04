// =======================================================
// Ejemplo 2. Promesa rechazada y manejo con catch()
// =======================================================
// Utilizando la misma lógica de inventario, provocamos un rechazo
// enviando una cantidad que supera el inventario disponible.

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

// Invocamos solicitando 25 unidades cuando solo hay 10 disponibles
verificarStock(25)
    .then(function (confirmacion) {
        console.log(confirmacion);
    })
    .catch(function (mensajeError) {
        console.log("Atención: " + mensajeError);
    });

