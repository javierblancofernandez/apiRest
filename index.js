const express = require('express');
const app = express();
//libreria FileSystem del core de node
const fs = require('fs');
const loginController = require('./controller/loginController.js');
const registerControler = require('./controller/registerControler');

const port = process.argv[2] || 3000


//body parse a JSON
app.use(express.json());

//Rutas
app.get('/ping', (request, response) => {
    console.log('alguien ha hecho una peticion Get a ping ')
    response.status(200).send({
        data: "pong"

    })
});
app.post('/login', loginController);

app.post('/registro',registerControler);





//Creación del servidor
app.listen(port, () => {
    console.log(`servidor escuchando en el puerto : ${port}`)
});