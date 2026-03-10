const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [String]
    },
    color: {
      type: [String]
    },
    brand: {
      type: String
    },
    price: {
      type: String
    },
    is_deleted:{
      type:Boolean,
      default: false
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
