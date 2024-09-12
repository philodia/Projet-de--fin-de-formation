const { DashboardCompta } = require('../models/DashboardCompta');

/**
 * Contrôleur pour obtenir les données du tableau de bord de comptabilité
 */
const getDashboardCompta = async (req, res) => {
  try {
    const dashboardData = await DashboardCompta.findOne(); // On suppose qu'il y a une seule instance
    if (!dashboardData) {
      return res.status(404).json({ message: 'Données de comptabilité non trouvées.' });
    }
    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des données de comptabilité.', error: error.message });
  }
};

/**
 * Contrôleur pour mettre à jour les données du tableau de bord de comptabilité
 */
const updateDashboardCompta = async (req, res) => {
  const { totalIncome, totalExpenses, balance, incomeOverview, expensesOverview, topExpenses, topIncomeSources } = req.body;

  try {
    let dashboardData = await DashboardCompta.findOne();

    if (!dashboardData) {
      // Si aucune donnée existante, en créer une nouvelle
      dashboardData = new DashboardCompta({
        totalIncome,
        totalExpenses,
        balance,
        incomeOverview,
        expensesOverview,
        topExpenses,
        topIncomeSources,
      });
    } else {
      // Mise à jour des champs existants
      dashboardData.totalIncome = totalIncome ?? dashboardData.totalIncome;
      dashboardData.totalExpenses = totalExpenses ?? dashboardData.totalExpenses;
      dashboardData.balance = balance ?? dashboardData.balance;
      dashboardData.incomeOverview = incomeOverview ?? dashboardData.incomeOverview;
      dashboardData.expensesOverview = expensesOverview ?? dashboardData.expensesOverview;
      dashboardData.topExpenses = topExpenses ?? dashboardData.topExpenses;
      dashboardData.topIncomeSources = topIncomeSources ?? dashboardData.topIncomeSources;
    }

    await dashboardData.save();
    res.status(200).json({ message: 'Données de comptabilité mises à jour avec succès.', dashboardData });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour des données de comptabilité.', error: error.message });
  }
};

module.exports = {
  getDashboardCompta,
  updateDashboardCompta,
};
