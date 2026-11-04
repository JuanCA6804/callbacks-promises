// =======================================================
// Ejemplo 7. Convertir un callback en una promesa (Promisificación)
// =======================================================
// Retomamos el Ejemplo 6 de la sección de Callbacks (buscarProductoPorId)
// y lo convertimos en una función basada en promesas.

// ANTES (Con Callback Error-First):
// function buscarProductoPorId(id, callback) { ... }

// AHORA (Con Promesa): Ya no necesitamos recibir el parámetro 'callback'
function buscarProductoPorIdPromesa(id) {
    return new Promise(function (resolve, reject) {
        console.log("Buscando producto con ID: " + id + "...");

        setTimeout(function () {
            if (id <= 0) {
                // En lugar de callback("error", null), usamos reject()
                reject("El ID del producto debe ser un número mayor a cero.");
            } else {
                var productoEncontrado = {
                    id: id,
                    nombre: "Monitor 24 pulgadas",
                    precio: 3200,
                };
                // En lugar de callback(null, producto), usamos resolve()
                resolve(productoEncontrado);
            }
        }, 1000);
    });
}

// Consumo limpio y separado con .then() y .catch():
buscarProductoPorIdPromesa(10)
    .then(function (producto) {
        console.log("ÉXITO: Producto encontrado -> " + producto.nombre + " ($" + producto.precio + ")");
    })
    .catch(function (error) {
        console.log("ERROR DETECTADO: " + error);
    });
