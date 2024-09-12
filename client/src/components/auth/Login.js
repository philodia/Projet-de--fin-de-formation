import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../actions/authActions'; // Assurez-vous que ce chemin est correct
import styles from './Login.module.css';
import logo from '../../assets/logo/logo3.avif';
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, role, permissions, error, loading } = useSelector(state => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (token) {
      let redirectPath = '/';
      if (role === 'admin' && permissions?.canAccessAdminPage) {
        redirectPath = '/admin';
      } else if (role === 'gescom' && permissions?.canAccessGescomPage) {
        redirectPath = '/gescom';
      } else if (role === 'compta' && permissions?.canAccessComptaPage) {
        redirectPath = '/compta';
      }
      navigate(redirectPath);
    }
  }, [token, role, permissions, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <h2>Connexion</h2>
      {error && <p className={styles.textDanger}>{error.message || "An error occurred"}</p>}
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <div className={styles.inputGroup}>
            <FaUserAlt className={styles.icon} />
            <input
              id="email"
              type="email"
              placeholder="Entrez votre email"
              className={styles.formControl}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Mot de passe
          </label>
          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Entrez votre mot de passe"
              className={styles.formControl}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.togglePassword}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <button type="submit" className={styles.btnPrimary} disabled={loading}>
          {loading ? 'Connexion en cours...' : 'Se Connecter'}
        </button>
      </form>
    </div>
  );
};

export default Login;
