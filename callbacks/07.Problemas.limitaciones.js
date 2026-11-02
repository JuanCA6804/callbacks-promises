function obtenerUsuario(idUsuario, callback) {
setTimeout(function() {
callback(null, { id: idUsuario, nombre: "Carlos" });
}, 500);
}
function obtenerMaterias(idUsuario, callback) {
setTimeout(function() {
callback(null, ["Programación Web", "Bases de Datos"]);
}, 500);
}
function obtenerCalificacion(materia, callback) {
setTimeout(function() {
callback(null, { materia: materia, promedio: 9.5 });
}, 500);
}
// EJECUCIÓN ANIDADA (Callback Hell)
obtenerUsuario(101, function(errorUsuario, usuario) {
if (errorUsuario) {
console.log("Error al obtener usuario:", errorUsuario);
return;
}
obtenerMaterias(usuario.id, function(errorMaterias, materias) {
if (errorMaterias) {
console.log("Error al obtener materias:", errorMaterias);
return;
}
obtenerCalificacion(materias[0], function(errorCalif, reporte) {
if (errorCalif) {
console.log("Error al obtener calificación:", errorCalif);
return;
}
console.log("Alumno: " + usuario.nombre);
console.log("Materia: " + reporte.materia + " | Promedio: " +
reporte.promedio);
});
});
});