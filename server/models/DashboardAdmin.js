// models/DashboardAdmin.js
const mongoose = require('mongoose');

/**
 * Schéma pour les données du tableau de bord administratif
 */
const dashboardAdminSchema = new mongoose.Schema({
  totalUsers: {
    type: Number,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    default: 0,
  },
  growthRate: {
    type: Number,
    default: 0,
  },
  salesOverview: {
    type: [Object], // Vous pouvez spécifier un schéma plus détaillé si nécessaire
    default: [],
  },
  expensesOverview: {
    type: [Object], // Vous pouvez spécifier un schéma plus détaillé si nécessaire
    default: [],
  },
});

/**
 * Modèle pour les données du tableau de bord administratif
 */
const DashboardAdmin = mongoose.model('DashboardAdmin', dashboardAdminSchema);

/**
 * Fonction pour créer une instance de DashboardAdmin à partir des données API
 * @param {Object} apiData - Les données de l'API
 * @returns {DashboardAdmin} - Une instance du modèle DashboardAdmin
 */
function createDashboardAdmin(apiData) {
  return new DashboardAdmin({
    totalUsers: apiData.totalUsers,
    totalRevenue: apiData.totalRevenue,
    growthRate: apiData.growthRate,
    salesOverview: apiData.salesOverview,
    expensesOverview: apiData.expensesOverview,
  });
}

module.exports = {
  DashboardAdmin,
  createDashboardAdmin
};
