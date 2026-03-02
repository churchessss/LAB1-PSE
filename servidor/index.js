
import express from 'express';
import cors from 'cors';
import factorial from './functions/factorial.js';


//Instanciamos Express
const app = express();
// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Definición de endpoint inicial
app.get('/', (req, res) => {
    res.send("Hola mundo");
});

// Definición de endpoint factorial
app.get('/factorial/:num', (req, res) => {
    res.send(`El factorial de ${req.params.num} es ${factorial(req.params.num)}`);
})

// Definición de endpoint factorial mejorado (con manejo de errores)
app.post('/factorial2', (req, res) => {
    console.log(req.body);
    const status = isNaN(req.body.numero) ? 0 : 1;
    if (status === 0) {
        res.status(500).json({
            status,
            input: req.body.numero,
            result: 'no es un número!'
        });
    } else {
        res.status(200).json({
            status,
            input: req.body.numero,
            result: factorial(req.body.numero)
        });
    }
});


//Definimos el puerto 3000 como puerto de escucha y un mensaje de confirmacion cuando el servidor este levantado
app.listen(3000,() => {
    console.log('Servidor escuchando en el puerto 3000');
})