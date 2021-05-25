
const { Schema, model } = require('mongoose');

const TipoVehiculoSchema = Schema({

    tipo: {
        type: String,
        require: true,
        unique: true
    },
    descripcion: {
        type: String,
        require: true,
    },
    max_gasolina: {
        type: String,
        require: true
    },

});


TipoVehiculoSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Tipovehiculo', TipoVehiculoSchema);