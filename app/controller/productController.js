const Product = require("../models/product");

class productController {
  async createProduct(req, res) {
    try {
      const { name, size, color, brand, price } = req.body;
      const data = new Product({
        name,
        size,
        color,
        brand,
        price,
      });
      const product = await data.save();

      return res.status(201).json({
        success: true,
        message: "product created successfully",
        product: product,
      });
    } catch (err) {
      return res.status(500).json({
        success: true,
        message: err.message,
      });
    }
  }

  async getAllProduct(req, res) {
    try {
      const products = await Product.find();

      return res.status(200).json({
        success: true,
        message: "All products get successfully",
        length: products.length,
        products: products,
      });
    } catch (err) {
      return res.status(500).json({
        success: true,
        message: err.message,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(401).json({
          success: false,
          message: "product id is required",
        });
      }

      await Product.findByIdAndUpdate(id, req.body, {
        returnDocument: "after",
      });

      return res.status(200).json({
        success: true,
        message: "product updated successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: true,
        message: err.message,
      });
    }
  }

    async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(401).json({
          success: false,
          message: "product id is required",
        });
      }

      await Product.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "product deleted successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: true,
        message: err.message,
      });
    }
  }
}

module.exports = new productController();
