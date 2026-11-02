// El constructor recibe un unico argumento obligatorio
var miPromesa = new Promise(
    // Función ejecutora (executor function)
    function (resolve, reject) {
       //Cuerpo de la función ejecutora
       var operacionExitosa = true;

       if(operacionExitosa){
        // Cambia el estado de 'pending' a 'fulfilled' y entrega el valor
        resolve('Los datos se procesaron corrrectamente')
       } else {
        // Cambia el estado de 'pending' a 'rejected' y entrega el motivo del fallo
        reject("Los datos se procesaron correctamente");
       }
},

);

//then() : Registra una función que se ejecutará
//cuando la promesa pase al estado fulfilled (cumplida)
miPromesa.then(function (mensajeRecibido) {
    console.log("Resultado capturado en then(): " + mensajeRecibido);
});