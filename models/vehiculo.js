
const { Schema, model } = require('mongoose');

const VehiculoSchema = Schema({

    nombrepropietario: {
        type: String,
        require: true
    },
    placa: {
        type: String,
        require: true
    },
    modelo: {
        type: String,
        require: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'tipovehiculo',
        require: true
    },

}, {
    timestamps: true
});


VehiculoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Vehiculo', VehiculoSchema);