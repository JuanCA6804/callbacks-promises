// declaramos al callback
function mostrarTotal(montoTotal){
    console.log("El total a pagar con iva incluido es: " + montoTotal);
}

// Declaramos la funcion principal
function calcularPrecioConIva(precioBase, callbackMostrar) {
    var iva = precioBase * 1.16; 
    var total = precioBase + iva;
    // Invocamos la funcion que recibimos como argumento
    callbackMostrar(total);
}
 calcularPrecioConIva(100, mostrarTotal);
