const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Clé secrète pour JWT (doit correspondre à celle utilisée pour signer les tokens)
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// Fonction pour créer un administrateur (réservé aux administrateurs)
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    // Créer un nouvel administrateur avec les permissions adéquates
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      roles: ['administrateur'],
      permissions: {
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true
      }
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Administrateur créé avec succès', user: newAdmin });
  } catch (error) {
    console.error('Erreur lors de la création de l\'administrateur:', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction d'inscription pour un utilisateur (accessible uniquement aux administrateurs)
exports.register = async (req, res) => {
  try {
    const { name, email, password, roles, permissions } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    // Création du nouvel utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      roles: roles || ['gestionnaire_commercial', 'comptable'],
      permissions: permissions || {
        canCreate: false,
        canRead: false,
        canUpdate: false,
        canDelete: false,
      }
    });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};

// Fonction de connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Comparer les mots de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Créer un token JWT avec les informations de l'utilisateur (rôles et permissions)
    const token = jwt.sign(
      { id: user._id, roles: user.roles, permissions: user.permissions },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction pour obtenir tous les utilisateurs (réservé à l'administrateur)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction pour mettre à jour un utilisateur (réservé à l'administrateur)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, roles, permissions } = req.body;

    // Mise à jour partielle pour ne pas écraser les champs vides
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (roles) updatedData.roles = roles;
    if (permissions) updatedData.permissions = permissions;

    // Mettre à jour l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction pour supprimer un utilisateur (réservé à l'administrateur)
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
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Fonction de déconnexion
exports.logout = (req, res) => {
  res.status(200).json({ message: 'Déconnexion réussie' });
};

// Fonction pour vérifier le statut de connexion
exports.checkStatus = (req, res) => {
  res.status(200).json({ message: 'Utilisateur connecté', user: req.user });
};
