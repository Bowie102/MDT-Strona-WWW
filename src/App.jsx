import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Shield, Users, Clock, DollarSign, Activity, LogOut, Book } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

import Dashboard from './pages/Dashboard';
import Roster from './pages/Roster';
import DutyLogs from './pages/DutyLogs';
import Payroll from './pages/Payroll';
import Points from './pages/Points';
import Login from './pages/Login';
import FTD from './pages/FTD';
import DTU from './pages/DTU';
import KnowledgeBase from './pages/KnowledgeBase';
import BootSequence from './components/BootSequence';

import { motion } from 'framer-motion';

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink to={to} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{ position: 'relative' }}>
      {({ isActive }) => (
        <>
          <Icon size={18} style={{ zIndex: 2, position: 'relative' }} /> 
          <span style={{ zIndex: 2, position: 'relative' }}>{label}</span>
          {isActive && <motion.div layoutId="sidebarActive" className="active-indicator" />}
        </>
      )}
    </NavLink>
  );
}

function Sidebar({ userRole, onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo" style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
        <img src="/lspd_logo.png" alt="LSPD Logo" style={{ maxWidth: '140px', height: 'auto' }} onError={(e) => e.target.style.display='none'} />
      </div>
      
      <div className="nav-links">
        <div className="nav-category" style={{ borderColor: '#3b82f6' }}>GŁÓWNY PANEL</div>
        <NavItem to="/" icon={Activity} label="Centrala" />
        <NavItem to="/knowledge" icon={Book} label="Baza Wiedzy" />

        <div className="nav-category" style={{ borderColor: '#ef4444' }}>KADRY (HC)</div>
        <NavItem to="/points" icon={Activity} label="Akta (Plusy/Minusy)" />

        <div className="nav-category" style={{ borderColor: '#10b981' }}>ZARZĄDZANIE KADRĄ</div>
        <NavItem to="/roster" icon={Users} label="Lista Funkcjonariuszy" />
        <NavItem to="/duty" icon={Clock} label="Czas Służby" />
        <NavItem to="/payroll" icon={DollarSign} label="Wypłaty" />

        <div className="nav-category" style={{ borderColor: '#facc15' }}>TRAINING DIVISION</div>
        <NavItem to="/ftd" icon={Shield} label="FTO" />

        <div className="nav-category" style={{ borderColor: '#8b5cf6' }}>BIURO DETEKTYWISTYCZNE</div>
        <NavItem to="/dtu" icon={Shield} label="DTU" />
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
  const [userRole, setUserRole] = useState(localStorage.getItem('lspdAuthRole') || null);
  const [hasBooted, setHasBooted] = useState(sessionStorage.getItem('lspd_booted') === 'true');

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('lspdAuthRole', userRole);
    } else {
      localStorage.removeItem('lspdAuthRole');
    }
  }, [userRole]);

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('lspdAuthRole');
    localStorage.removeItem('apiKey');
    window.location.href = '/login';
  };

  const isLoggedIn = userRole !== null;
  const isZarzad = userRole && userRole.toUpperCase() === 'ZARZAD';

  return (
    <Router>
      {!hasBooted && (
        <BootSequence onComplete={() => {
          sessionStorage.setItem('lspd_booted', 'true');
          setHasBooted(true);
        }} />
      )}
      
      {hasBooted && (
        <>
          <div className="watermark"></div>
          <div className="scanlines"></div>
          <Toaster 
            position="bottom-right" 
            toastOptions={{ 
              style: { background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px' },
              success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } }
            }} 
          />
          <div className="app-wrapper relative">
            <div className="app-container">
          <Sidebar userRole={userRole} onLogout={handleLogout} />
          <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/knowledge" element={<KnowledgeBase />} />
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
      </>
      )}
    </Router>
  );
}

export default App;
