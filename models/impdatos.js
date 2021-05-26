
const { Schema, model } = require('mongoose');

const ImpdatoSchema = Schema({

    dias_vt: {
        type: String,
        require: true
    },

});


ImpdatoSchema.method('toJSON', function () {
    const {__v,_id, ...object} = this.toObject();
    return object;
});

module.exports = model('Impdato', ImpdatoSchema);