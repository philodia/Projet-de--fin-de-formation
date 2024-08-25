const express = require('express');
const {
  createDashboardAdminData,
  getDashboardAdminData,
  updateDashboardAdminData,
  deleteDashboardAdminData,
} = require('../controllers/DashboardAdminController.js'); // Correction de l'importation

const router = express.Router();

router.post('/', createDashboardAdminData);
router.get('/:id', getDashboardAdminData);
router.patch('/:id', updateDashboardAdminData);
router.delete('/:id', deleteDashboardAdminData);

module.exports = router; // Correction de l'export
