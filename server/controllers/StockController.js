// controllers/StockController.js

const Stock = require('../models/Stock');

// Fonction pour créer un stock
exports.createStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const newStock = new Stock({
      productId,
      quantity
    });

    await newStock.save();

    res.status(201).json({ message: 'Stock créé avec succès', stock: newStock });
  } catch (error) {
    console.error('Erreur lors de la création du stock:', error);
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};

// Fonction pour obtenir tous les stocks
exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().populate('productId');
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction pour mettre à jour un stock
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updatedStock = await Stock.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!updatedStock) {
      return res.status(404).json({ message: 'Stock non trouvé' });
    }

    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction pour supprimer un stock
exports.deleteStock = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStock = await Stock.findByIdAndDelete(id);

    if (!deletedStock) {
      return res.status(404).json({ message: 'Stock non trouvé' });
    }

    res.status(200).json({ message: 'Stock supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
