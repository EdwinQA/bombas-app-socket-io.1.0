
const { Schema, model } = require('mongoose');

const TanqueoSchema = Schema({

    vehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo',
        require: true
    },
    bomba: {
        type: String,
        require: true
    },
}, {
    timestamps: true
});


TanqueoSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Tanqueo', TanqueoSchema);