const mongoose = require('mongoose');

/**
 * Schéma pour les données du tableau de bord administratif
 * incluant les informations des tableaux de bord de gestion commerciale (Gescom)
 * et de comptabilité (Compta).
 */
const dashboardAdminSchema = new mongoose.Schema({
  // Données générales pour l'administrateur
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
    type: [Object], // Aperçu des ventes
    default: [],
  },
  expensesOverview: {
    type: [Object], // Aperçu des dépenses
    default: [],
  },

  // Données spécifiques au tableau de bord de gestion commerciale (Gescom)
  gescom: {
    totalProducts: {
      type: Number,
      default: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    pendingOrders: {
      type: Number,
      default: 0,
    },
  },

  // Données spécifiques au tableau de bord de comptabilité (Compta)
  compta: {
    totalExpenses: {
      type: Number,
      default: 0,
    },
    totalIncome: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },

  // Historique des utilisateurs et des permissions
  userActivityLog: {
    type: [Object], // Liste des activités des utilisateurs
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
    gescom: {
      totalProducts: apiData.gescom.totalProducts,
      totalOrders: apiData.gescom.totalOrders,
      pendingOrders: apiData.gescom.pendingOrders,
    },
    compta: {
      totalExpenses: apiData.compta.totalExpenses,
      totalIncome: apiData.compta.totalIncome,
      balance: apiData.compta.balance,
    },
    userActivityLog: apiData.userActivityLog,
  });
}

module.exports = {
  DashboardAdmin,
  createDashboardAdmin
};
