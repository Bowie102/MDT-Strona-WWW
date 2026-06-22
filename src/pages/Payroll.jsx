import { API_BASE_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Download, Search, Trash2 } from 'lucide-react';

const PAY_RATES = {
  // LSPD
  'Cadet': 9000,
  'Officer I': 10000,
  'Officer II': 11000,
  'Officer III': 12000,
  'Officer III+1': 13000,
  'Sergeant': 14000,
  'Staff Sergeant': 15000,
  'Master Sergeant': 16000,
  'Lieutenant I': 17000,
  'Lieutenant II': 18000,
  'Captain': 19000,
  'Commander': 20000,
  'Deputy Chief': 21000,
  'Assistant Chief': 22000,
  'Chief of Police': 23000,
  
  // BCSO
  'Deputy I': 9000,
  'Deputy II': 10000,
  'Deputy III': 11000,
  'Corporal': 12000,
  'Sergeant I': 13000,
  'Sergeant II': 14000,
  'Sergeant III': 15000,
  'Lieutenant I': 16000,
  'Lieutenant II': 17000,
  'Captain': 18000,
  'Undersheriff': 19000,
  'Sheriff': 20000,
};

function Payroll({ isLoggedIn }) {
  const [payrollData, setPayrollData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(API_BASE_URL + '/api/officers').then(res => res.json()),
      fetch(API_BASE_URL + '/api/duty').then(res => res.json())
    ]).then(([officers, logs]) => {
      
      const calculated = officers.map(off => {
        const userLogs = logs.filter(l => l.userId === off.id);
        const totalHours = userLogs.reduce((sum, l) => sum + l.hours, 0);
        const rate = PAY_RATES[off.rank] || 1000;
        const totalPay = totalHours * rate;
        
        return {
          ...off,
          totalHours,
          rate,
          totalPay
        };
      });

      calculated.sort((a, b) => b.totalPay - a.totalPay);
      setPayrollData(calculated);
    });
  }, []);

  const handleClearPayroll = async () => {
    if (!window.confirm("UWAGA! Czy na pewno chcesz wyzerować wszystkie godziny ze służby? Tej operacji nie można cofnąć!")) return;
    try {
      const res = await fetch(API_BASE_URL + '/api/duty/clear', { method: 'DELETE' });
      if (res.ok) {
        alert("Pomyślnie wyzerowano wszystkie godziny!");
        window.location.reload();
      } else {
        alert("Błąd podczas zerowania godzin.");
      }
    } catch (e) {
      console.error(e);
      alert("Błąd połączenia z serwerem.");
    }
  };

  const handleClearSingle = async (userId, name) => {
    if (!window.confirm(`Czy na pewno chcesz wyzerować godziny funkcjonariusza: ${name}? Tej operacji nie można cofnąć!`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/duty/clear/${userId}`, { method: 'DELETE' });
      if (res.ok) {
        alert(`Pomyślnie wyzerowano godziny dla ${name}!`);
        window.location.reload();
      } else {
        alert("Błąd podczas zerowania godzin pracownika.");
      }
    } catch (e) {
      console.error(e);
      alert("Błąd połączenia z serwerem.");
    }
  };

  const filtered = payrollData.filter(off => 
    off.totalHours > 0 && 
    `${off.firstName} ${off.lastName} ${off.badgeNumber}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBudget = filtered.reduce((sum, off) => sum + off.totalPay, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="page-header">
        <div className="page-title">
          <h2>Lista Wypłat (Payroll)</h2>
          <p>Automatyczne wyliczenia na podstawie czasu służby</p>
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        <div className="glass-card stat-card" style={{ gridColumn: 'span 2' }}>
          <div className="stat-icon gold">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h3 style={{ color: 'var(--gold-cb)' }}>${totalBudget.toLocaleString()}</h3>
            <p>Całkowity budżet do wypłaty</p>
          </div>
        </div>
        
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Szukaj pracownika..." 
              style={{ paddingLeft: '2.5rem' }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="glass-card">
        <div className="table-container">
          {isLoggedIn && (
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button className="btn-primary" onClick={() => alert("Pobieranie CSV w przygotowaniu...")}>
                <Download size={18} /> Eksportuj do CSV
              </button>
              <button className="btn-primary" style={{ backgroundColor: 'var(--danger-color, #ff4444)' }} onClick={handleClearPayroll}>
                <Trash2 size={18} /> Zeruj godziny (Wypłacono)
              </button>
            </div>
          )}
          <table className="mdt-table">
            <thead>
              <tr>
                <th>Funkcjonariusz</th>
                <th>Stopień / Stawka</th>
                <th>Przepracowane Godziny</th>
                <th>Suma do wypłaty</th>
                {isLoggedIn && <th style={{ textAlign: 'right' }}>Akcje</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(off => (
                <tr key={off.id}>
                  <td>
                    <span className={`badge-number ${off.department === 'BCSO' ? 'bcso' : ''}`} style={{ marginRight: '8px' }}>
                      {off.badgeNumber}
                    </span>
                    {off.firstName} {off.lastName}
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{off.rank}</div>
                    <div style={{ fontWeight: '600' }}>${off.rate.toLocaleString()} / h</div>
                  </td>
                  <td><strong style={{ fontSize: '1.1rem' }}>{off.totalHours}h</strong></td>
                  <td><strong style={{ color: 'var(--bcso-green)', fontSize: '1.2rem' }}>${off.totalPay.toLocaleString()}</strong></td>
                  {isLoggedIn && (
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="btn-danger" 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        onClick={() => handleClearSingle(off.id, `${off.firstName} ${off.lastName}`)}
                      >
                        Wypłacono
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={isLoggedIn ? "5" : "4"} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Brak danych do wypłaty dla tych kryteriów.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default Payroll;

