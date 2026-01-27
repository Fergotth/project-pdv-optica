//! Falta agregar alguna validacion para que cuando se intenten guardar los datos en el backend, si falla el servidor, 
//! se mantengan los datos en el frontend y no se borren y se vuelva a intentar el guardado

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