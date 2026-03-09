import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import factorial from './functions/factorial.js';
import { prisma } from "./lib/db";

//Instanciamos Express
const app = express();
// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Definición de endpoint inicial
app.get('/', (req:Request, res:Response) => {
    res.send("Hola mundo");
});

// Definición de endpoint factorial
app.get('/factorial/:num', (req: Request, res: Response) => {
  const numero = Number(req.params.num);

  if (Number.isNaN(numero)) {
    return res.status(500).send("No es un número");
  }

  const resultado = factorial(numero);
  return res.send(`El factorial de ${numero} es ${resultado}`);
});

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

// Definición de endpoint factorial mejorado (con persistencia)
app.post('/factorialFinal', async(req:Request, res:Response) => {
    try {
        const { numero, nombreUsuario } = req.body;
        const numeroAsNumber: number = Number(numero);

        if (isNaN(numeroAsNumber) || numeroAsNumber < 0) {
            return res.status(400).send("El número debe ser un entero y positivo");
        }

        const resultado = factorial(numeroAsNumber);

        await prisma.factorial.create({
            data: {
                base: numeroAsNumber.toString(),
                usuario: nombreUsuario && nombreUsuario.trim() !== "" ? nombreUsuario : "Anónimo"
            }
        });

        res.status(200).send(`El factorial de ${numeroAsNumber} es ${resultado}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error interno del servidor");
    }
});


//Definimos el puerto 3000 como puerto de escucha y un mensaje de confirmacion cuando el servidor este levantado
app.listen(3000,() => {
    console.log('Servidor escuchando en el puerto 3000');
})