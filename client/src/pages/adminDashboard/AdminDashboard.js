// src/pages/adminDashboard/DashboardAdmin.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { FaUser, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { fetchDashboardData } from '../../actions/adminActions';

import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import Chart from '../../components/admin/Chart';
import Widget from '../../components/admin/Widget';
import './AdminDashboard.css'; // Ensure the path is correct

function DashboardAdmin() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.admin || {});

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // Error handling
  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error.message || "An error occurred while fetching data."}</p>
        <button onClick={() => dispatch(fetchDashboardData())}>Retry</button>
      </div>
    );
  }

  // Check if data is available
  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100">
        <Navbar />
        <Container fluid>
          <Row className="mb-4">
            <Col md={4}>
              <Widget
                title="Total Users"
                value={data.totalUsers !== undefined ? data.totalUsers.toLocaleString() : 0}
                icon={<FaUser />}
              />
            </Col>
            <Col md={4}>
              <Widget
                title="Total Revenue"
                value={data.totalRevenue !== undefined ? `$${data.totalRevenue.toLocaleString()}` : '$0'}
                icon={<FaDollarSign />}
              />
            </Col>
            <Col md={4}>
              <Widget
                title="Growth Rate"
                value={data.growthRate !== undefined ? `${data.growthRate}%` : '0%'}
                icon={<FaChartLine />}
              />
            </Col>
          </Row>
          {(data.salesOverview || data.expensesOverview) && (
            <>
              {data.salesOverview && (
                <Row className="mb-4">
                  <Col md={12}>
                    <div className="chart-container">
                      <h5 className="section-title">Sales Overview</h5>
                      <div className="chart-group">
                        <h6 className="chart-subtitle">Line Chart</h6>
                        <Chart type="line" data={data.salesOverview} />
                      </div>
                      <div className="chart-group">
                        <h6 className="chart-subtitle">Bar Chart</h6>
                        <Chart type="bar" data={data.salesOverview} />
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
              {data.expensesOverview && (
                <Row className="mb-4">
                  <Col md={12}>
                    <div className="chart-container">
                      <h5 className="section-title">Expenses Overview</h5>
                      <div className="chart-group">
                        <h6 className="chart-subtitle">Line Chart</h6>
                        <Chart type="line" data={data.expensesOverview} />
                      </div>
                      <div className="chart-group">
                        <h6 className="chart-subtitle">Bar Chart</h6>
                        <Chart type="bar" data={data.expensesOverview} />
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Container>
      </div>
    </div>
  );
}

export default DashboardAdmin;