import React, { useState } from 'react';
import Login from '../../components/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap
import './Home.css'; // Assurez-vous de créer ce fichier CSS

const Home = () => {
    const [welcomeMessage] = useState('');

    return (
        <div className="home d-flex flex-column justify-content-center align-items-center text-white">
            <h1 className="display-4">{welcomeMessage}</h1>
            <Login />
        </div>
    );
};

export default Home;