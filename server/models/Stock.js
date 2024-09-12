// models/Stock.js

const mongoose = require('mongoose');

// Définir le schéma pour le stock
const stockSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Référence au modèle Product
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0 // La quantité en stock ne peut pas être négative
  },
  updatedAt: {
    type: Date,
    default: Date.now // Date de mise à jour par défaut
  }
});

// Middleware pour mettre à jour la date de mise à jour avant chaque sauvegarde
stockSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Créer et exporter le modèle
const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
