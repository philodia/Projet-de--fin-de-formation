// server.js

// Importer les modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
require('./config/db'); // Assurez-vous que ce fichier configure correctement la connexion à la base de données

// Importer les routes
const authRoutes = require('./routes/Auth.routes');
const dashboardAdminRoutes = require('./routes/DashboardAdmin.routes');
const dashboardGescomRoutes = require('./routes/DashboardGescom.routes');
const productRoutes = require('./routes/Product.routes');
const stockRoutes = require('./routes/Stock.routes');
const dashboardComptaRoutes = require('./routes/DashboardCompta.routes');

// Créer une instance d'Express
const app = express();

// Middleware
app.use(cors()); // Activer CORS
app.use(express.json()); // Analyser les requêtes JSON
app.use(bodyParser.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // Analyser les requêtes URL-encoded

// Routes
// http://localhost:5000/auth*
app.use('/auth', authRoutes);
// http://localhost:5000/auth/dashboard*
app.use('/auth/dashboardAdmin', dashboardAdminRoutes);
app.use('/auth/dashboardGescom', dashboardGescomRoutes);
app.use('/auth/dashboardGescom/product', productRoutes);
app.use('/auth/dashboardGescom/stock', stockRoutes);
app.use('/auth/dashboardCompta', dashboardComptaRoutes);

// Gestion des routes non trouvées (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'La route demandée est introuvable' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack); // Log de l'erreur dans la console

  // En développement, on renvoie le message d'erreur complet
  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }

  // En production, on envoie un message générique
  res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard.' });
});

// Écouter le serveur sur le port spécifié
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Le serveur EasygescOOM a démarré sur le port ${port}`);
});
