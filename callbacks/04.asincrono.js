function notificarDescarga(nombreArchivo) {
    console.log("Notificacion: El archivo " + nombreArchivo + " se ha descargado correctamente.");
}

function descargarArchivo(archivo, callbackAlTerminar) {
    console.log("Iniciando descarga de : " + archivo+ "...")

    setTimeout(function() {
        callbackAlTerminar(archivo);
    }, 3000);
}

descargarArchivo("manual_callbacks_.pdf", notificarDescarga);
console.log("El ususario puede seguir navegando por la pagina mientras se descarga el archivo");
