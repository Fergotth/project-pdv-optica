//! Falta agregar alguna validacion para que cuando se intenten guardar los datos en el backend, si falla el servidor, 
//! se mantengan los datos en el frontend y no se borren y se vuelva a intentar el guardado
//! Falta generar ticket de receta, queda pendiente

//* 10/01/2026 - correccion de validacion de power y axis para que solo se apliquen en los campos correspondientes
//* 20/01/2026 - correccion de error al generar ticket cuando falla la primera vez
//* 20/01/2026 - agregado reintento al generar ticket en utils.js
//* 20/01/2026 - agregado reintento al postDataToDB.js
//* 20/01/2026 - agregado reintento al getDataClientDB.js
//* 20/01/2026 - agregado reintento al showClient.js
//* 21/01/2026 - se mejora el script global en general para agregar reintentos en las funciones fetch
//* 21/01/2026 - se mejora script de ticket para no repetir codigo de style de cada ticket
//* 22/01/2026 - se agrega boton de guardar receta en la interfaz de receta
//* 22/01/2026 - se empieza a implementar la captura de datos del armazon en la receta
//* 30/01/2026 - se agrega z-index al boton de cerrar en la receta para que quede por encima del modal
//* 30/01/2026 - se agrega el boton de guardar receta en la interfaz de receta
//* 30/01/2026 - se re estructura el codigo para mayor claridad de scriptPrescriptions.js
//* 30/01/2026 - se agrega el favicon.ico al proyecto
//* 04/02/2026 - se agrega en operaciones el dropdown para registrar en las notas de venta el material a surtir
//* 05/02/2026 - se empieza a crear la plantilla para registrar nota de venta, se agrega el dropdown para seleccionar el material a surtir
//* 06/02/2026 - se agrega script para manejar los eventos, funciones y utilidades de materiales
//* 07/02/2026 - se agrega el script de utilidades para validar los campos de materiales y agregar los valores a los selects
//* 10/02/2026 - se re organiza server.js para agregar la nueva ruta de materiales y se crea el archivo materialDispatchDB.js para manejar las rutas de materiales
//* 10/02/2026 - se crea la base de datos para el registro de despachos de materiales
//* 10/02/2026 - Se crea la ruta en el backend para guardar los datos y se conecta con el frontend para guardar los datos desde la interfaz de registro de materiales
//* 10/02/2026 - se crea el archivo saveData.js de materiales para manejar la función de guardar los datos del formulario de registro de materiales
//* 10/02/2026 - se agrega boton cerrar al popup de registro de materiales
//* 10/02/2026 - se agrega poppu o ventana para consultar los materiales despachados en las notas de venta de las sucursales o laboratorio
//* 11/02/2026 - se agrega sriptConsult.js para la consula de materiales despachados
//* 11/02/2026 - se agrega al server de materialDispatchDB.js la ruta para exportar a excel los datos
//* 12/02/2026 - se implementa Redux para manejar el estado de Materiales 
//* 12/02/2026 - se modifica funciones de handlers, saveDatam getDara y utils para el nuevo manejador de estado
//* 12/02/2026 - ya es funcional la funcion para exportar a excel la consulta de materiales despachados