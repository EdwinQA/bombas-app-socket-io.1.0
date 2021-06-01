
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
    validarJWT,
], getVehiculoPlaca);

router.post('/new', [
    check('nombrebomba', 'La bomba que registra es obligatoria').not().isEmpty(),
    check('placa', 'La placa es obligatoria').not().isEmpty(),
    validarCampos,
    validarJWT
], crearVehiculo);

router.post('/tanqueo', [
    check('vehiculo', 'Referenciar un vehiculo es obligatorio').not().isEmpty(),
    check('bomba', 'Referencias una bomba es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT
], tanqueoVehiculo);


module.exports = router;