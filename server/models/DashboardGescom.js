const mongoose = require('mongoose');

/**
 * Schéma pour les données du tableau de bord de gestion commerciale (Gescom)
 */
const dashboardGescomSchema = new mongoose.Schema({
  totalProducts: {
    type: Number,
    default: 0, // Nombre total de produits gérés
  },
  totalOrders: {
    type: Number,
    default: 0, // Nombre total de commandes effectuées
  },
  pendingOrders: {
    type: Number,
    default: 0, // Nombre de commandes en attente
  },
  totalRevenue: {
    type: Number,
    default: 0, // Revenus générés par les ventes
  },
  mostSoldProducts: {
    type: [Object], // Liste des produits les plus vendus
    default: [],
  },
  salesOverview: {
    type: [Object], // Aperçu général des ventes, vous pouvez détailler ce champ selon vos besoins
    default: [],
  },
  topClients: {
    type: [Object], // Liste des meilleurs clients
    default: [],
  },
});

/**
 * Modèle pour les données du tableau de bord de gestion commerciale (Gescom)
 */
const DashboardGescom = mongoose.model('DashboardGescom', dashboardGescomSchema);

/**
 * Fonction pour créer une instance de DashboardGescom à partir des données API
 * @param {Object} apiData - Les données de l'API
 * @returns {DashboardGescom} - Une instance du modèle DashboardGescom
 */
function createDashboardGescom(apiData) {
  return new DashboardGescom({
    totalProducts: apiData.totalProducts,
    totalOrders: apiData.totalOrders,
    pendingOrders: apiData.pendingOrders,
    totalRevenue: apiData.totalRevenue,
    mostSoldProducts: apiData.mostSoldProducts,
    salesOverview: apiData.salesOverview,
    topClients: apiData.topClients,
  });
}

module.exports = {
  DashboardGescom,
  createDashboardGescom,
};
