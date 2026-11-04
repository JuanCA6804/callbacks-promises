// =============================================================================
// UNIVERSIDAD TECNOLÓGICA DEL CENTRO DE VERACRUZ
// TECNOLOGÍAS DE LA INFORMACIÓN E INNOVACIÓN DIGITAL
// DESARROLLO DE SOFTWARE MULTIPLATAFORMA
// 
// Actividad Práctica: Callbacks y Promesas en JavaScript
// =============================================================================

// =============================================================================
// === PARTE 1: DETECCIÓN Y CORRECCIÓN DE ERRORES ===
// =============================================================================

// -----------------------------------------------------------------------------
// Reto 1.1: El callback que se ejecuta antes de tiempo
// -----------------------------------------------------------------------------
// [EXPLICACIÓN DEL ERROR]:
// En la línea original con error: 'guardarEnDispositivo(mostrarConfirmacion());',
// se colocaron paréntesis '()' al pasar 'mostrarConfirmacion'. Esto provoca que la
// función se invoque inmediatamente en el hilo principal antes de que 'guardarEnDispositivo'
// comience a ejecutarse, imprimiendo la notificación de inmediato sin esperar los 1000 ms.
// Además, como 'mostrarConfirmacion()' no retorna ningún valor (devuelve undefined),
// 'guardarEnDispositivo' recibe 'undefined' como callback, lo que ocasiona un fallo cuando
// setTimeout intenta invocarlo después de 1 segundo.
//
// [CÓDIGO CORREGIDO]:
// Se debe pasar la referencia a la función SIN paréntesis: 'guardarEnDispositivo(mostrarConfirmacion);'

const mostrarConfirmacion = () => {
    console.log("Notificación: Datos guardados en el dispositivo.");
};

const guardarEnDispositivo = (callback) => {
    console.log("Guardando información, por favor espera...");
    setTimeout(callback, 1000);
};

// Ejecución corregida del Reto 1.1:
guardarEnDispositivo(mostrarConfirmacion);


// -----------------------------------------------------------------------------
// Reto 1.2: La cadena de promesas que pierde el dato (undefined)
// -----------------------------------------------------------------------------
// [EXPLICACIÓN DEL ERROR]:
// En las cadenas de promesas, el siguiente método .then() recibe como argumento
// exactamente lo que el .then() anterior devuelva mediante la palabra reservada 'return'.
// En el código original, dentro del primer .then() se calculó 'totalConCargo', pero se
// omitió la instrucción 'return totalConCargo;'. Al no retornar nada, la función retorna
// 'undefined' implícitamente, por lo que el segundo .then() recibe 'precioFinal' como
// 'undefined' y el cálculo o concatenación arroja 'Total final a pagar: $NaN' o '$undefined'.
//
// [CÓDIGO CORREGIDO]:
// Se añade la instrucción 'return totalConCargo;' al final del primer .then().

const obtenerPrecioBoleto = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(120), 500);
    });
};

obtenerPrecioBoleto()
    .then((precioBase) => {
        console.log(`Precio base del boleto: $${precioBase}`);
        const totalConCargo = precioBase + 30;
        return totalConCargo; // <-- Indispensable para pasar el dato al siguiente .then()
    })
    .then((precioFinal) => {
        console.log(`Total final a pagar: $${precioFinal}`);
    });


// =============================================================================
// === PARTE 2: SIMULACIÓN ASÍNCRONA CON CALLBACKS ===
// =============================================================================

const validarCuponCallback = (codigoCupon, callback) => {
    console.log(`Validando cupón '${codigoCupon}' en el servidor...`);

    setTimeout(() => {
        // Validación con patrón error-first: callback(error, resultado)
        if (codigoCupon === "DESCUENTO20") {
            // Éxito: error es null y entregamos el objeto con los datos del cupón
            callback(null, { codigo: "DESCUENTO20", porcentaje: 20 });
        } else {
            // Fallo: enviamos el mensaje de error y null en el resultado
            callback("El cupón ingresado no existe o ha expirado.", null);
        }
    }, 1000);
};

// Función manejadora para procesar el resultado o el error
const manejarRespuestaCupon = (error, datosCupon) => {
    // 1. Verifica si existe un error; si lo hay, imprímelo y detén la función con return.
    if (error !== null) {
        console.log(`[Error Callback]: ${error}`);
        return;
    }

    // 2. Si no hay error, imprime el mensaje de cupón válido
    console.log(`Cupón válido: ${datosCupon.codigo} con ${datosCupon.porcentaje}% de descuento.`);
};

// Pruebas obligatorias (ambas llamadas se ejecutan):
setTimeout(() => {
    console.log("\n--- Inicio Pruebas Parte 2 (Callbacks) ---");
    validarCuponCallback("DESCUENTO20", manejarRespuestaCupon);
    validarCuponCallback("CUPON_FALSO", manejarRespuestaCupon);
}, 2000);


// =============================================================================
// === PARTE 3: REFACTORIZACIÓN A PROMESAS Y ENCADENAMIENTO ===
// =============================================================================

// 1. Función validarCuponPromesa
const validarCuponPromesa = (codigoCupon) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (codigoCupon === "DESCUENTO20") {
                resolve({ codigo: "DESCUENTO20", porcentaje: 20 });
            } else {
                reject("El cupón ingresado no existe o ha expirado.");
            }
        }, 800);
    });
};

// 2. Función aplicarDescuentoPromesa
const aplicarDescuentoPromesa = (montoPedido, datosCupon) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Regla de negocio: compra mínima de $200
            if (montoPedido < 200) {
                reject("El monto mínimo de compra para usar este cupón es de $200.");
            } else {
                const descuento = montoPedido * (datosCupon.porcentaje / 100);
                const totalFinal = montoPedido - descuento;
                resolve({
                    montoOriginal: montoPedido,
                    descuentoAplicado: descuento,
                    totalPagar: totalFinal
                });
            }
        }, 800);
    });
};

// 3. Consumo encadenado probando con cupón "DESCUENTO20" y pedido de $300:
setTimeout(() => {
    console.log("\n--- Inicio Pruebas Parte 3 (Promesas Encadenadas) ---");

    validarCuponPromesa("DESCUENTO20")
        .then((cupon) => {
            console.log(`Cupón aceptado: ${cupon.codigo} (${cupon.porcentaje}% de descuento).`);
            // Retornamos la segunda promesa para encadenar
            return aplicarDescuentoPromesa(300, cupon);
        })
        .then((resumenPago) => {
            console.log(`Resumen de pago -> Monto original: $${resumenPago.montoOriginal} | Descuento aplicado: $${resumenPago.descuentoAplicado} | Total a pagar: $${resumenPago.totalPagar}`);
        })
        .catch((error) => {
            console.log(`Error detectado en el proceso: ${error}`);
        })
        .finally(() => {
            console.log("--- Proceso de validación de compra finalizado ---");
        });
}, 4500);
