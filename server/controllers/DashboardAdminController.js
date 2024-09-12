// controllers/DashboardAdminController.js

const { DashboardAdmin, createDashboardAdmin } = require('../models/DashboardAdmin');

/**
 * Obtenir les données du tableau de bord administrateur.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */
const getDashboardAdmin = async (req, res) => {
  try {
    const dashboardData = await DashboardAdmin.findOne(); // On récupère les données du tableau de bord
    if (!dashboardData) {
      return res.status(404).json({ message: 'Tableau de bord non trouvé' });
    }
    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

/**
 * Mettre à jour les données du tableau de bord administrateur.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */
const updateDashboardAdmin = async (req, res) => {
  try {
    const apiData = req.body;
    const updatedDashboard = await DashboardAdmin.findOneAndUpdate(
      {}, // Critère de recherche, vide pour mettre à jour le seul document existant
      apiData,
      { new: true, upsert: true } // On crée une nouvelle entrée si elle n'existe pas
    );
    res.status(200).json(updatedDashboard);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

/**
 * Créer un nouveau tableau de bord administrateur.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */
const createDashboardAdminController = async (req, res) => {
  try {
    const apiData = req.body;
    const newDashboard = createDashboardAdmin(apiData);
    await newDashboard.save();
    res.status(201).json(newDashboard);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du tableau de bord', error });
  }
};

module.exports = {
  getDashboardAdmin,
  updateDashboardAdmin,
  createDashboardAdminController
};
