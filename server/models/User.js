const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Définition du schéma de l'utilisateur
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        // Validation de l'email
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} n'est pas un email valide !`
    }
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']
  },
  roles: {
    type: [String], // Tableau de chaînes de caractères pour les rôles
    enum: ['gestionnaire_commercial', 'comptable', 'administrateur' ], // Liste des rôles possibles
    default: ['gestionnaire_commercial'] // Valeur par défaut pour le rôle
  },
  permissions: {
    canCreate: { type: Boolean, default: false },
    canRead: { type: Boolean, default: false },
    canUpdate: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false },
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Méthode pour vérifier le mot de passe
UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware pour hasher le mot de passe avant de sauvegarder
UserSchema.pre('save', async function(next) {
  // Si le mot de passe n'est pas modifié, passer au middleware suivant
  if (!this.isModified('password')) {
    return next();
  }

  // Génération du salt et hachage du mot de passe
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error); // En cas d'erreur, passer l'erreur à la chaîne de middlewares
  }
});

// Créer et exporter le modèle User
const User = mongoose.model('User', UserSchema);
module.exports = User;
