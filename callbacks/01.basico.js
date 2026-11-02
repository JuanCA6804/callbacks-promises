// Declramos la funcion que servira como callback
function despedirse(){
    console.log("Adiós, hemos terminado la clase");
}

// Declaramos la funcion que recibe un  parametro llamado callback
function iniciarProceso(micallback){
    console.log("Iniciando el proceso principal");
    // Invocamos la funcion que recibimos como argumento
    micallback();
}

// Llamamos a la funcion principal y le pasamos como argumento la funcion despedirse
iniciarProceso(despedirse);