import React from 'react';
import NavbarComponent from '../../components/comptaDashboard/Navbar';
import Sidebar from '../../components/comptaDashboard/Sidebar';
import Chart from '../../components/comptaDashboard/Chart';
import Widget from '../../components/comptaDashboard/Widget';
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <div>
      <NavbarComponent />
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">
            <Sidebar />
          </Col>
          <Col md={10}>
            <Row>
              <Col sm={4}>
                <Widget title="Total Sales" value="$12,345" />
              </Col>
              <Col sm={4}>
                <Widget title="New Orders" value="123" />
              </Col>
              <Col sm={4}>
                <Widget title="Revenue" value="$9,876" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Chart />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
