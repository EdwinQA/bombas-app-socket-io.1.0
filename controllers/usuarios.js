const { response } = require("express");

const Usuario = require("../models/usuario");

const getUsuarios = async (req, res = response) => {

    const desde = Number(req.query.desde)|| 0;

    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } }) //todos los que son diferentes al id
        .sort('-online')
        .skip(desde)
        .limit(20);

    res.json({
        ok: true,
        usuarios,
       // desde // para hacer un llamado por partes. 
    });
}

module.exports = {
    getUsuarios
}