const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Clé secrète pour JWT (devrait être dans un fichier de configuration)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Fonction d'inscription
exports.register = async (req, res) => {
  try {
    const { name, email, password, roles, permissions } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    // Création du nouvel utilisateur
    const newUser = new User({ name, email, password, roles, permissions });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction de connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Comparer les mots de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Créer un token JWT
    const token = jwt.sign(
      { id: user._id, roles: user.roles, permissions: user.permissions }, // Inclure les permissions dans le token
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction pour obtenir tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction pour mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, roles, permissions } = req.body; // Inclure les permissions ici

    // Mettre à jour l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, roles, permissions }, // Mettre à jour les permissions aussi
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction pour supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Supprimer l'utilisateur
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction de déconnexion (pour invalider le token JWT côté client)
exports.logout = (req, res) => {
  res.status(200).json({ message: 'Déconnexion réussie' });
};

// Fonction pour vérifier le statut de connexion (pour voir si l'utilisateur est toujours connecté)
exports.checkStatus = (req, res) => {
  res.status(200).json({ message: 'Utilisateur connecté' });
};
