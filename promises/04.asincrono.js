// =======================================================
// Ejemplo 3. Promesa con una operación asíncrona simulada (setTimeout)
// =======================================================

function solicitarClima(ciudad) {
    return new Promise(function (resolve, reject) {
        console.log("Solicitando pronóstico del clima para " + ciudad + "...");

        setTimeout(function () {
            if (ciudad === "") {
                reject("Debes especificar el nombre de una ciudad válida.");
            } else {
                var datosClima = {
                    ciudad: ciudad,
                    temperatura: 24,
                    condicion: "Soleado",
                };
                resolve(datosClima);
            }
        }, 2000);
    });
}

// Invocamos la promesa:
solicitarClima("Monterrey")
    .then(function (reporte) {
        console.log("Clima en " + reporte.ciudad + ": " + reporte.temperatura + "°C (" + reporte.condicion + ")");
    })
    .catch(function (error) {
        console.log("Error: " + error);
    });

console.log("La aplicación continúa ejecutándose mientras llega el reporte...");
