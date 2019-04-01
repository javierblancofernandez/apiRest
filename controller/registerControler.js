const fs = require('fs');
const id = require('uniqid');
const validator = require('validator');

module.exports = (request, response) => {
    // get text from file
    const dataString = fs.readFileSync( './db.json', 'UTF-8' );
    console.log(dataString);
    // parse json string to object
    const data = JSON.parse( dataString );

    //aqui hacemos una desestructuracion de los datos que me pasan por el body
    const { username, email, password,rol } = request.body;

    const hasInvalidBody = !( username && email && password && rol)
    const hasinValidPassword = password.length < 8;
    const usernameExists = !!data.user.find( user => user.username === username )
    const emailExists = !!data.user.find( user => user.email === email );
    const isNotValidEmail = !validator.isEmail( email );

    switch(true){
        case hasInvalidBody:
        response.status( 400 ).json( { message: 'necesitamos un body con las propiedades username, email , password y rol' } )
        return;
    case hasinValidPassword:
        response.status( 400 ).json( { message: 'El password debe ser tener al menos 8 caracteresponse' } )
        return;
    case usernameExists:
        response.status( 400 ).json( { message: 'Ya existe un usuario con ese email. Puede logearse' } )
        return;
    case emailExists:
        response.status( 400 ).json( { message: 'Ya existe un usuario con ese email. Puede logearse' } )
        return;
    case isNotValidEmail:
        response.status( 400 ).json( { message: 'El email no es un email. Escríbalo bien ' } )
        return;
    default:
    const newUser ={
        id:id(),
        username,
        email,
        password,
        rol
    }
    //meto el nuevo usuario en el array de user
    data.user.push(newUser);
    //paso los datos del nuevo usuario con stringify de JSON a String
    const nuevoUsuario = JSON.stringify(data);
    //escribo en la bd con writeFileSync de nuevo usuario
    fs.writeFileSync('./db.json',nuevoUsuario)
    //mando la responsepuesta al cliente de que se ha grabado bien 
    response.status(200).json({data:'new user Created!!!'});





    }
}
