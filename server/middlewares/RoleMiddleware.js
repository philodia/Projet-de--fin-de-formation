// middlewares/RoleMiddleware.js

/**
 * Middleware pour vérifier les rôles de l'utilisateur.
 * @param {Array} allowedRoles - Les rôles autorisés pour accéder à la route.
 */
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      const user = req.user; // Assurez-vous que le middleware d'authentification a ajouté l'utilisateur à la requête
  
      if (!user) {
        return res.status(401).json({ message: 'Non autorisé' });
      }
  
      // Vérifie si l'utilisateur a l'un des rôles autorisés
      const hasRole = allowedRoles.some((role) => user.roles.includes(role));
  
      if (!hasRole) {
        return res.status(403).json({ message: 'Accès refusé' });
      }
  
      next(); // L'utilisateur a le bon rôle, on passe à l'étape suivante
    };
  };
  
  module.exports = {
    checkRole,
  };
  