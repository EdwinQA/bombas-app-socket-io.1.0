const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets 
io.on('connection', (client) => {

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    // Verificar autenticacion
    if (!valido) { return client.disconnect(); }

    //Cliente autenticado
    console.log('Cliente Conectado y  Autenticado', uid);
    usuarioConectado(uid)

    //Ingresar al usuario a una sala en particular
    // sala global , client.id
    client.join(uid);


    client.on('mensaje-personal', async (payload) => {
        // Grabar mensaje
        console.log(payload);
        await grabarMensaje(payload)
        io.to(payload.para).emit('mensaje-personal', payload);
    });



    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

});
