function solicitarClima(ciudad) {
    return new Promise(function (resolve, reject) {
        console.log(
            "01.Solicitando pronóstico del clima para "
            + ciudad + "...");

            setTimeout(() => {
                if (ciudad ==""){
                    reject("Debes esperar el nombre de una ciudad válida");
                }
                {
                    var datosClima = {
                        ciudad : ciudad,
                        temperatura: 24,
                        condicion: "Soleado",
                    };
                    resolve(datosClima);
                }
            }, 5000);
    })
}