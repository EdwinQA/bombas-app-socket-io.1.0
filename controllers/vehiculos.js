const { response } = require("express");
const bcrypt = require('bcryptjs');
const Vehiculo = require("../models/vehiculo");
const Tipovehiculo = require("../models/tipovehiculo");
const Tanqueo = require("../models/tanqueo");
const { generarJWT } = require("../helpers/jwt");
const { now } = require("mongoose");

const getTipoVehiculo = async (req, res = response) => {


    const tipovehiculoBD = await Tipovehiculo.find({});

    res.json({
        ok: true,
        tipovehiculo: tipovehiculoBD,
        // desde // para hacer un llamado por partes. 
    });
}

const crearVehiculo = async (req, res = response) => {

    const { placa } = req.body;

    try {

        const existePlaca = await Vehiculo.findOne({ placa });
        if (existePlaca) {
            return res.status(400).json({
                ok: false,
                msg: 'La Placa ya esta registrada'
            })
        }

        const vehiculo = new Vehiculo(req.body);
        await vehiculo.save();


        res.json({
            ok: true,
            vehiculo
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const tanqueoVehiculo = async (req, res = response) => {

    try {

        const tanqueo = new Tanqueo(req.body);
        await tanqueo.save();

        res.json({
            ok: true,
            tanqueo,
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}


const getTanqueadas = async (req, res = response) => {

    const tanqueadaDe = req.params.de;

    const last30 = await Tanqueo.find({ vehiculo: tanqueadaDe })
        .sort({ createAt: 'desc' })
        .limit(30);

    res.json({
        ok: true,
        tanqueadas: last30,
        fecha: now()
    })
}

const getVehiculoPlaca = async (req, res = response) => {

    const { placa } = req.body;

    try {

        const vehiculoDB = await Vehiculo.findOne({ placa });
        if (!vehiculoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Placa no encontrado'
            });
        }


 
        res.json({
            ok: true,
            vehiculo: vehiculoDB
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    crearVehiculo,
    getTipoVehiculo,
    tanqueoVehiculo,
    getTanqueadas,
    getVehiculoPlaca
}