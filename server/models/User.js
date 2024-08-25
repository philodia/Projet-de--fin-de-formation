const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Définition du schéma pour l'utilisateur
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissions: {
    canCreate: { type: Boolean, default: false },
    canRead: { type: Boolean, default: false },
    canUpdate: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false },
  },
  roles: {
    type: [String],  // Utilisation d'un tableau de chaînes de caractères pour les rôles
    enum: ['gestionnaire_commercial', 'comptable', 'administrateur'], // Liste des rôles possibles
    default: ['gestionnaire_commercial'], // Valeur par défaut pour le rôle
  },
});

// Hash le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Comparer le mot de passe fourni avec le mot de passe hashé
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
