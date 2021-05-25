
/*
path: api/vehiculo
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearVehiculo, getTipoVehiculo, tanqueoVehiculo, getTanqueadas, getVehiculoPlaca } = require('../controllers/vehiculos');

const router = Router();

router.get("/gettipovehiculo", validarJWT, getTipoVehiculo);

router.get("/gettanqueadas/:de", validarJWT, getTanqueadas);

router.post('/getvehiculoplaca', [
    check('placa', 'La placa es obligatorio').not().isEmpty(),
], getVehiculoPlaca);

router.post('/new', [
    check('nombrepropietario', 'El nombre del propietario es obligatorio').not().isEmpty(),
    check('placa', 'La placa es obligatoria').not().isEmpty(),
    check('modelo', 'El modelo es obligatorio, describe el vehiculo').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    validarCampos
], crearVehiculo);

router.post('/tanqueo', [
    check('vehiculo', 'Referenciar un vehiculo es obligatorio').not().isEmpty(),
    check('bomba', 'Referencias una bomba es obligatorio').not().isEmpty(),
    check('valor', 'El valor del tanqueo es obligatorio').not().isEmpty(),
    validarCampos
], tanqueoVehiculo);


module.exports = router;