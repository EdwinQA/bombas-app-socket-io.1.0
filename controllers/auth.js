const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const Impdato = require("../models/impdatos");

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();

        //Generar mi Jason Web Token JWT

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña erronea'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuarioDB.id);

        const impdatoDB = await Impdato.find({});
        if (!impdatoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Error con Impdato Hable con el administrador'
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB,
            dias_vt: impdatoDB[0].dias_vt,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        });
    }

}


const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const token = await generarJWT(uid);
    const usuarioDB = await Usuario.findOne({ _id: uid });

    const impdatoDB = await Impdato.find({});
    if (!impdatoDB) {
        return res.status(404).json({
            ok: false,
            msg: 'Error con Impdato Hable con el administrador'
        });
    }

    res.json({
        ok: true,
        usuario: usuarioDB,
        dias_vt: impdatoDB[0].dias_vt,
        token
    });

}



module.exports = {
    crearUsuario,
    login,
    renewToken
}