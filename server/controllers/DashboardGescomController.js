const { DashboardGescom } = require('../models/DashboardGescom');

/**
 * Contrôleur pour récupérer les données du tableau de bord de gestion commerciale (Gescom)
 */
const getDashboardData = async (req, res) => {
  try {
    const dashboardData = await DashboardGescom.findOne(); // On récupère les données du tableau de bord Gescom
    if (!dashboardData) {
      return res.status(404).json({ message: 'Données du tableau de bord non trouvées' });
    }
    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des données du tableau de bord', error: error.message });
  }
};

/**
 * Contrôleur pour créer ou mettre à jour les données du tableau de bord de gestion commerciale (Gescom)
 */
const updateDashboardData = async (req, res) => {
  const apiData = req.body;

  try {
    let dashboardData = await DashboardGescom.findOne();

    if (dashboardData) {
      // Mise à jour des données existantes
      Object.assign(dashboardData, apiData); // On met à jour les propriétés existantes avec les nouvelles données
      await dashboardData.save();
    } else {
      // Création d'un nouveau tableau de bord
      dashboardData = new DashboardGescom(apiData); // Crée un nouveau document avec les données fournies
      await dashboardData.save();
    }

    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour des données du tableau de bord', error: error.message });
  }
};

module.exports = {
  getDashboardData,
  updateDashboardData,
};
