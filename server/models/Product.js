// models/Product.js

const mongoose = require('mongoose');

// Définir le schéma pour le produit
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Supprimer les espaces avant et après
  },
  description: {
    type: String,
    required: true,
    trim: true // Supprimer les espaces avant et après
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Le prix ne peut pas être négatif
  },
  stock: {
    type: Number,
    required: true,
    min: 0 // La quantité en stock ne peut pas être négative
  },
  category: {
    type: String,
    required: true,
    trim: true // Supprimer les espaces avant et après
  },
  imageUrl: {
    type: String,
    required: false // L'image est optionnelle
  },
  createdAt: {
    type: Date,
    default: Date.now // Date de création par défaut
  },
  updatedAt: {
    type: Date,
    default: Date.now // Date de mise à jour par défaut
  }
});

// Middleware pour mettre à jour la date de mise à jour avant chaque sauvegarde
productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Créer et exporter le modèle
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
