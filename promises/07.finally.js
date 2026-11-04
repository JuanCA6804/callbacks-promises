// =======================================================
// Ejemplo 6. Uso de finally() en una operación completa
// =======================================================
// .finally() registra una función que se ejecutará siempre cuando
// la promesa termine (esté asentada), sin importar si se cumplió o se rechazó.

function procesarPago(monto) {
    console.log("[UI] Botón de pago deshabilitado para evitar cobros dobles.");

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (monto > 0) {
                resolve("Transacción aprobada por $" + monto);
            } else {
                reject("El monto a cobrar no es válido.");
            }
        }, 1000);
    });
}

// Probamos con monto inválido (0) para observar el manejo del rechazo y el cierre con finally:
procesarPago(0)
    .then(function (recibo) {
        console.log("Éxito: " + recibo);
    })
    .catch(function (fallo) {
        console.log("Error en el cobro: " + fallo);
    })
    .finally(function () {
        console.log("[UI] Operación finalizada. Botón de pago habilitado nuevamente.");
    });
