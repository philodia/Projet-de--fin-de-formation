// controllers/ProductController.js

const Product = require('../models/Product');

// Fonction pour créer un nouveau produit
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      imageUrl
    });

    await newProduct.save();
    res.status(201).json({ message: 'Produit créé avec succès', product: newProduct });
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};

// Fonction pour obtenir tous les produits
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};

// Fonction pour obtenir un produit par son ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};

// Fonction pour mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.status(200).json({ message: 'Produit mis à jour avec succès', product: updatedProduct });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};

// Fonction pour supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};
