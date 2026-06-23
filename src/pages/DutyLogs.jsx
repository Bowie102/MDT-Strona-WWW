import { API_BASE_URL } from '../config';
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Trash2, FileText } from 'lucide-react';
import { format } from 'date-fns';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';

function DutyLogs() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [logs, setLogs] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ userId: '', date: format(new Date(), 'yyyy-MM-dd'), hours: '', report: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([
      fetch(API_BASE_URL + '/api/officers').then(res => res.json()),
      fetch(API_BASE_URL + '/api/duty').then(res => res.json())
    ]).then(([officersData, logsData]) => {
      const sorted = officersData.sort((a, b) => parseInt(a.badgeNumber || 0) - parseInt(b.badgeNumber || 0));
      setOfficers(sorted);
      setLogs(logsData);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  };

  const fetchLogs = () => {
    fetch(API_BASE_URL + '/api/duty')
      .then(res => res.json())
      .then(data => setLogs(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Zamiana przecinka na kropkę do poprawnego parsowania float
    let parsedHours = formData.hours.toString().replace(',', '.');
    const dataToSend = { ...formData, hours: parsedHours };

    fetch(API_BASE_URL + '/api/duty', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('apiKey')}` },
      body: JSON.stringify(dataToSend)
    })
    .then(res => res.json())
    .then(() => {
      fetchLogs();
      setFormData(prev => ({ ...prev, hours: '', report: '' }));
    });
  };

  const handleDelete = (id) => {
    if(window.confirm('Usunąć ten wpis?')) {
      fetch(`${API_BASE_URL}/api/duty/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('apiKey')}` } })
        .then(() => fetchLogs());
    }
  };

  const selectOptions = officers.map(o => ({
    value: o.id,
    label: `[${o.badgeNumber}] ${o.firstName} ${o.lastName}`
  }));

  const selectStyles = {
    control: (base) => ({ ...base, background: 'rgba(0, 0, 0, 0.2)', borderColor: 'rgba(255, 255, 255, 0.1)', color: '#fff', minHeight: '44px' }),
    singleValue: (base) => ({ ...base, color: '#fff' }),
    menu: (base) => ({ ...base, background: '#1e293b', zIndex: 100 }),
    option: (base, state) => ({ ...base, background: state.isFocused ? '#334155' : 'transparent', color: '#fff', cursor: 'pointer' }),
    input: (base) => ({ ...base, color: '#fff' })
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="page-header">
        <div className="page-title">
          <h2>Czas Służby</h2>
          <p>Rejestrowanie przepracowanych godzin i raporty z patrolu</p>
        </div>
      </div>
      {isLoading ? (
        <LoadingSpinner message="Pobieranie bazy dzienników służby..." />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          
          {/* Formularz */}
          <div className="glass-card">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="var(--lspd-blue)" /> Dodaj Wpis
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Funkcjonariusz</label>
                <Select
                  options={selectOptions}
                  styles={selectStyles}
                  placeholder="Wybierz..."
                  value={selectOptions.find(opt => opt.value === formData.userId) || null}
                  onChange={(selected) => setFormData({ ...formData, userId: selected ? selected.value : '' })}
                  isClearable
                  isSearchable
                />
              </div>
              
              <div className="form-group">
                <label>Data</label>
                <input type="date" className="form-control" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>

              <div className="form-group">
                <label>Ilość Godzin (np. 2.5 lub 2,5)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  value={formData.hours} 
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^0-9.,]/g, '');
                    setFormData({...formData, hours: val});
                  }} 
                />
              </div>

              <div className="form-group">
                <label>Raport ze służby (Co robiłeś?)</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  placeholder="Np. Patrol z jednostką ADAM-12, 3 zatrzymania drogowe, 1 aresztowanie..."
                  value={formData.report} 
                  onChange={(e) => setFormData({...formData, report: e.target.value})}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Plus size={18} /> Zapisz Czas i Raport
              </button>
            </form>
          </div>

          {/* Historia */}
          <div className="glass-card" style={{ overflowX: 'auto' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Ostatnie Wpisy</h3>
            <div className="table-container">
              <table className="mdt-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Funkcjonariusz</th>
                    <th>Godziny</th>
                    <th>Raport</th>
                    <th style={{ width: '50px' }}>Akcja</th>
                  </tr>
                </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                      Brak wpisów
                    </td>
                  </tr>
                ) : (
                  logs.map(log => (
                    <tr key={log.id}>
                      <td>{format(new Date(log.date), 'dd.MM.yyyy')}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span className={`badge-number ${log.user?.department === 'BCSO' ? 'bcso' : ''}`} style={{ marginRight: '8px' }}>
                            {log.user?.badgeNumber}
                          </span>
                          {log.user?.firstName} {log.user?.lastName}
                        </div>
                      </td>
                      <td><strong style={{ color: 'var(--lspd-blue)' }}>{log.hours}h</strong></td>
                      <td>
                        {log.report ? (
                          <div style={{ fontSize: '0.85rem', color: '#ccc', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={log.report}>
                            <FileText size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: '#aaa' }} />
                            {log.report}
                          </div>
                        ) : (
                          <span style={{ color: '#555', fontSize: '0.85rem' }}>-</span>
                        )}
                      </td>
                      <td>
                        {isLoggedIn && (
                          <button className="btn-icon" style={{ color: '#ef4444' }} onClick={() => handleDelete(log.id)}>
                            <Trash2 size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      )}
    </motion.div>
  );
}

export default DutyLogs;

