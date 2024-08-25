const jwt = require('jsonwebtoken');

// Clé secrète pour JWT (doit correspondre à celle utilisée pour signer les tokens)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
  // Récupérer le token depuis les en-têtes de la requête
  const token = req.headers.authorization?.split(' ')[1]; // On s'attend à ce que le token soit dans l'en-tête "Authorization" sous le format "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  // Vérifier et décoder le token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }

    // Stocker les informations de l'utilisateur décodées dans la requête
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
