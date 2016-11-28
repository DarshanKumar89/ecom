'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var UploadProductsPropertiesSchema = new Schema({
  	fieldName: {
      type: String,
      required: true
    },
	ProductMappingfield: {
      type: String,
      required: true
    },
    dataType: {
      type: String,
      required: true
    },
    isImage: {
      type: Boolean
    },
    specialConditionValue: {
      type: String
    },
    isRequired: {
      type: Boolean
    },
    subCategory: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('UploadProductsProperties', UploadProductsPropertiesSchema);
UploadProductsPropertiesSchema.plugin(AutoIncrement.plugin, 'UploadProductsProperties');