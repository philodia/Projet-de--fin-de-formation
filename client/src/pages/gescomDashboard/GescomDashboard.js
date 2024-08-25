// src/pages/gescomDashboard/DashboardGescom.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardNavbar from '../../components/gescomDashboard/Navbar';
import Sidebar from '../../components/gescomDashboard/Sidebar';
import { fetchDashboardData } from '../../actions/gescomActions';
import './DashboardGescom.css'; // Assurez-vous que le chemin d'accès est correct

function DashboardGescom() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.gescom || {});

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100">
        <DashboardNavbar />
        
      </div>
    </div>
  );
}

export default DashboardGescom;
