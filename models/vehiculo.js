
const { Schema, model } = require('mongoose');

const VehiculoSchema = Schema({

    nombrebomba: {
        type: String,
        require: true
    },
    placa: {
        type: String,
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