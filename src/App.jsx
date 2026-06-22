import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Shield, Users, Clock, DollarSign, Activity, LogOut } from 'lucide-react';

import Dashboard from './pages/Dashboard';
import Roster from './pages/Roster';
import DutyLogs from './pages/DutyLogs';
import Payroll from './pages/Payroll';
import Points from './pages/Points';
import Login from './pages/Login';
import FTD from './pages/FTD';
import DTU from './pages/DTU';

function Sidebar({ userRole, onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo" style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
        <img src="/lspd_logo.png" alt="LSPD Logo" style={{ maxWidth: '140px', height: 'auto' }} onError={(e) => e.target.style.display='none'} />
      </div>
      
      <div className="nav-links">
        <div className="nav-category" style={{ borderColor: '#3b82f6' }}>GŁÓWNY PANEL</div>
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <Activity size={18} /> Centrala
        </NavLink>

        <div className="nav-category" style={{ borderColor: '#ef4444' }}>KADRY (HC)</div>
        <NavLink to="/points" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <Activity size={18} /> Akta (Plusy/Minusy)
        </NavLink>

        <div className="nav-category" style={{ borderColor: '#10b981' }}>ZARZĄDZANIE KADRĄ</div>
        <NavLink to="/roster" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <Users size={18} /> Lista Funkcjonariuszy
        </NavLink>
        <NavLink to="/duty" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <Clock size={18} /> Czas Służby
        </NavLink>
        <NavLink to="/payroll" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <DollarSign size={18} /> Wypłaty
        </NavLink>

        <div className="nav-category" style={{ borderColor: '#facc15' }}>TRAINING DIVISION</div>
        <NavLink to="/ftd" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <Shield size={18} /> FTO
        </NavLink>

        <div className="nav-category" style={{ borderColor: '#8b5cf6' }}>BIURO DETEKTYWISTYCZNE</div>
        <NavLink to="/dtu" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <Shield size={18} /> DTU
        </NavLink>
      </div>

      <div className="sidebar-footer">
        {userRole ? (
          <div className="user-profile">
            <div className="avatar" style={{ background: userRole === 'DTU' ? '#8b5cf6' : '#334155' }}>
              {userRole === 'DTU' ? 'D' : 'HC'}
            </div>
            <div className="info" style={{ flex: 1 }}>
              <strong>{userRole === 'DTU' ? 'Wydział DTU' : 'Zarząd Departamentu'}</strong>
              <span>Zalogowano bezpiecznie</span>
            </div>
            <button className="btn-icon" onClick={onLogout} title="Wyloguj">
              <LogOut size={18} color="#ef4444" />
            </button>
          </div>
        ) : (
          <div className="user-profile" style={{ cursor: 'pointer' }} onClick={() => window.location.href='/login'}>
            <div className="avatar" style={{ background: '#334155' }}>?</div>
            <div className="info">
              <strong>Niezalogowany</strong>
              <span>Kliknij, aby się zalogować</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('appUserRole') || null);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('appUserRole', userRole);
    } else {
      localStorage.removeItem('appUserRole');
    }
  }, [userRole]);

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('appUserRole');
    window.location.href = '/login';
  };

  const isLoggedIn = userRole !== null;
  const isZarzad = userRole && userRole.toUpperCase() === 'ZARZAD';

  return (
    <Router>
      <div className="watermark"></div>
      <div className="app-wrapper relative">
        <div className="app-container">
          <Sidebar userRole={userRole} onLogout={handleLogout} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/roster" element={<Roster isLoggedIn={isZarzad} />} />
              <Route path="/duty" element={<DutyLogs />} />
              <Route path="/payroll" element={<Payroll isLoggedIn={isZarzad} />} />
              <Route path="/points" element={<Points isLoggedIn={isZarzad} />} />
              <Route path="/ftd" element={<FTD isLoggedIn={isZarzad} />} />
              <Route path="/dtu" element={<DTU userRole={userRole} />} />
              
              <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={(role) => setUserRole(role)} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
