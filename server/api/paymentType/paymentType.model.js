'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var PaymentTypeSchema = new Schema({

    description: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    _id: { type: Number, default: 1, unique: true },
}, { _id: false });

PaymentTypeSchema.plugin(AutoIncrement.plugin, {
    model: 'PaymentType',
    field: '_id',
    startAt: 1
});
module.exports = mongoose.model('PaymentType', PaymentTypeSchema);