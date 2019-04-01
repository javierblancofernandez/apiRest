const fs = require('fs');


module.exports =(request, response) => {
    //leo un string json del archivo db.json con fs(FILESYSTEM) que esta en String
    const dataString = fs.readFileSync('./db.json', 'UTF-8');
    //parseo a JSON
    const data = JSON.parse(dataString );
    //aqui hacemos una desestructuracion de los datos que me pasan por el headers
    const { email, password } = request.headers;
    console.log(request.headers);
    const hasInvalidHeader = !(email && password);
    //validación
    if (hasInvalidHeader) {
        response.status(400).json({ message: 'necesito parametro email y password' });
    }
    else {
        const userFound = data.user.find(user => user.email === email && user.password === password);
        if (!userFound){
            response.status(400).json({ message: 'email o contraseña invalidos' });
        } 
        else if (userFound.rol==="admin") {
            response.status(200).json({ message: 'BIENVENIDO ADMIN SUS DATOS SON :',  data});
        } else{
            response.status(200).send({ message: 'USTED ES UN USUARIO :',usuario: `${userFound.username}`,email:`${userFound.email}`});
        }
    }
};
