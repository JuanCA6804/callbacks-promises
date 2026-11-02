function duplicarNumero(numero) {
console.log("Resultado duplicado: " + (numero * 2));
}

function procesarLista(listaNumeros, accionCallback) {
    console.log("--- Inicio del procesamiento de la lista");
    for (var i = 0; i < listaNumeros.length; i++) {
        accionCallback(listaNumeros[i]);
    }
    console.log("--- Fin del procesamiento de la lista");
}

var listaNumeros = [5, 10, 15, 20, 25];
procesarLista(listaNumeros, duplicarNumero);
console.log("Siguiente instruccion del programa");