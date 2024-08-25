// server.js

// Importer les modules nécessaires
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
require('./config/db');

const authRoutes = require('./routes/Auth.routes');
const dashboardAdminRoutes = require('./routes/DashboardAdmin.routes.js');

// Créer une instance d'Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// http://localhost:5000/api/auth*
app.use('/auth', authRoutes);
app.use('/auth/dashboard', dashboardAdminRoutes);

// Gestion des routes non trouvées (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Écouter le serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Mon Server a Demarrer sur le port ${port}`);
});