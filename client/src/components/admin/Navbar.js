import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaHome, FaChartLine, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';
import { useSelector } from 'react-redux';

function DashboardNavbar() {
  // Récupérer les informations de l'utilisateur actuel depuis le store Redux
  const userState = useSelector(state => state.user || {}); // Sécuriser l'accès à state.user
  const { currentUser } = userState;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">
        <FaHome /> Dashboard
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">
            <FaHome /> Home
          </Nav.Link>
          <Nav.Link href="#reports">
            <FaChartLine /> Reports
          </Nav.Link>
          <NavDropdown title="Management" id="basic-nav-dropdown">
            <NavDropdown.Item href="/user">
              <FaUser /> Users
            </NavDropdown.Item>
            <NavDropdown.Item href="#settings">
              <FaCog /> Settings
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {/* Section pour afficher le profil de l'utilisateur */}
        <Nav className="ml-auto">
          {currentUser ? (
            <NavDropdown title={currentUser.name || 'User'} id="user-profile-dropdown">
              <NavDropdown.Item href="/profile">
                <FaUser /> Mon Profil
              </NavDropdown.Item>
              <NavDropdown.Item href="#logout">
                <FaSignOutAlt /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link href="#login">
              <FaSignOutAlt /> Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default DashboardNavbar;
