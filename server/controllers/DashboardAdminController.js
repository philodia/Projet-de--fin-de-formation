const { DashboardAdmin } = require('../models/DashboardAdmin.js');

// Crée une nouvelle instance de DashboardAdmin et la sauvegarde en base de données
const createDashboardAdminData = async (req, res) => {
  try {
    const dashboardData = new DashboardAdmin(req.body); // Crée une nouvelle instance avec les données du corps de la requête
    const savedDashboard = await dashboardData.save(); // Sauvegarde dans la base de données
    res.status(201).json(savedDashboard); // Retourne l'objet sauvegardé avec un statut 201
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retourne une erreur interne du serveur
  }
};

// Récupère un DashboardAdmin par son identifiant
const getDashboardAdminData = async (req, res) => {
  try {
    const dashboardData = await DashboardAdmin.findById(req.params.id); // Cherche l'objet par son ID
    if (!dashboardData) {
      return res.status(404).json({ error: 'Dashboard data not found' }); // Retourne une erreur 404 si non trouvé
    }
    res.json(dashboardData); // Retourne l'objet trouvé
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retourne une erreur interne du serveur
  }
};

// Met à jour un DashboardAdmin par son identifiant
const updateDashboardAdminData = async (req, res) => {
  try {
    const dashboardData = await DashboardAdmin.findByIdAndUpdate(
      req.params.id, // ID de l'objet à mettre à jour
      req.body, // Données de mise à jour
      { new: true, runValidators: true } // Retourne l'objet mis à jour et exécute les validateurs
    );
    if (!dashboardData) {
      return res.status(404).json({ error: 'Dashboard data not found' }); // Retourne une erreur 404 si non trouvé
    }
    res.json(dashboardData); // Retourne l'objet mis à jour
  } catch (error) {
    res.status(400).json({ error: error.message }); // Retourne une erreur 400 si la mise à jour échoue
  }
};

// Supprime un DashboardAdmin par son identifiant
const deleteDashboardAdminData = async (req, res) => {
  try {
    const dashboardData = await DashboardAdmin.findByIdAndDelete(req.params.id); // Supprime l'objet par son ID
    if (!dashboardData) {
      return res.status(404).json({ error: 'Dashboard data not found' }); // Retourne une erreur 404 si non trouvé
    }
    res.json({ message: 'Dashboard data deleted' }); // Retourne un message de succès
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retourne une erreur interne du serveur
  }
};

module.exports = {
  createDashboardAdminData,
  getDashboardAdminData,
  updateDashboardAdminData,
  deleteDashboardAdminData
};
