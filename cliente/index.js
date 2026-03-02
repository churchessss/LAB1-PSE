import express from 'express';
import path from 'path';

// Instanciamos Express y el middleware de JSON
const app = express();

// Definimos la ruta raíz (/) que devolverá un archivo HTML como respuesta
// path.join une el directorio con el archivo, y path.resolve() devuelve el directorio actual
app.get('/', (req, res) => {
res.sendFile(path.join(path.resolve(), './index.html'));
})

// Definimos el puerto 8080 como puerto de escucha y un mensaje de confirmación cuando el servidor esté levantado
app.listen(8080,() => {
console.log('Cliente escuchando en el puerto 8080');

})