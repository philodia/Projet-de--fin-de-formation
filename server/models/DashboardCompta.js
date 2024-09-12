const mongoose = require('mongoose');

/**
 * Schéma pour les données du tableau de bord de comptabilité (Compta)
 */
const dashboardComptaSchema = new mongoose.Schema({
  totalIncome: {
    type: Number,
    default: 0, // Revenu total
  },
  totalExpenses: {
    type: Number,
    default: 0, // Total des dépenses
  },
  balance: {
    type: Number,
    default: 0, // Solde (revenu - dépenses)
  },
  incomeOverview: {
    type: [Object], // Aperçu des revenus (par mois, par source, etc.)
    default: [],
  },
  expensesOverview: {
    type: [Object], // Aperçu des dépenses (par mois, par catégorie, etc.)
    default: [],
  },
  topExpenses: {
    type: [Object], // Liste des principales dépenses
    default: [],
  },
  topIncomeSources: {
    type: [Object], // Liste des principales sources de revenus
    default: [],
  },
});

/**
 * Modèle pour les données du tableau de bord de comptabilité (Compta)
 */
const DashboardCompta = mongoose.model('DashboardCompta', dashboardComptaSchema);

/**
 * Fonction pour créer une instance de DashboardCompta à partir des données API
 * @param {Object} apiData - Les données de l'API
 * @returns {DashboardCompta} - Une instance du modèle DashboardCompta
 */
function createDashboardCompta(apiData) {
  return new DashboardCompta({
    totalIncome: apiData.totalIncome,
    totalExpenses: apiData.totalExpenses,
    balance: apiData.balance,
    incomeOverview: apiData.incomeOverview,
    expensesOverview: apiData.expensesOverview,
    topExpenses: apiData.topExpenses,
    topIncomeSources: apiData.topIncomeSources,
  });
}

module.exports = {
  DashboardCompta,
  createDashboardCompta,
};
