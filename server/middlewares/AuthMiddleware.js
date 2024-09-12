const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Décommentez si nécessaire pour l'utilisation future

// Clé secrète pour JWT (doit correspondre à celle utilisée pour signer les tokens)
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérification de la présence de l'en-tête d'autorisation
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization manquante ou mal formatée' });
  }

  // Extraction du token
  const token = authHeader.split(' ')[1];

  // Vérification du token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide ou expiré' });
    }

    // Stocker l'utilisateur décodé dans la requête
    req.user = decoded;
    next();
  });
};

// Middleware pour vérifier les rôles et permissions
const checkRole = (roles = [], permissions = {}) => {
  return (req, res, next) => {
    const { roles: userRoles, permissions: userPermissions } = req.user || {};

    // Vérifier si les rôles de l'utilisateur sont définis
    if (!userRoles) {
      return res.status(403).json({ message: 'Accès refusé : rôle utilisateur non défini' });
    }

    // Vérifier si l'utilisateur a l'un des rôles requis
    const hasRole = roles.length === 0 || roles.some(role => userRoles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: 'Accès refusé : vous n\'avez pas le rôle nécessaire' });
    }

    // Vérifier les permissions si elles sont spécifiées
    if (userPermissions && Object.keys(permissions).length > 0) {
      for (const permission in permissions) {
        if (permissions[permission] && (!userPermissions || !userPermissions[permission])) {
          return res.status(403).json({ message: `Accès refusé : permission ${permission} manquante` });
        }
      }
    }

    next();
  };
};

module.exports = {
  authMiddleware,
  checkRole
};
