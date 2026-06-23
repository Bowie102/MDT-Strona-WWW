import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { format } from 'date-fns';
import { PlusCircle, MinusCircle, User, Shield, FileText, Send, Activity, Lock } from 'lucide-react';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';

function Points({ isLoggedIn }) {
  const [officers, setOfficers] = useState([]);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    officerId: '',
    issuerId: '',
    type: 'PLUS',
    reason: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [offRes, recRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/officers`),
        fetch(`${API_BASE_URL}/api/points`)
      ]);
      const offData = await offRes.json();
      const recData = await recRes.json();
      
      const sorted = offData.sort((a, b) => parseInt(a.badgeNumber || 0) - parseInt(b.badgeNumber || 0));
      setOfficers(sorted);
      setRecords(recData);
    } catch (err) {
      console.error('Błąd pobierania danych', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/points`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('apiKey')}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ officerId: '', issuerId: '', type: 'PLUS', reason: '' });
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten wpis z akt?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/points/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('apiKey')}` }
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Błąd usuwania wpisu', err);
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
    <div className="main-content">
      <div className="page-header">
        <div className="page-title">
          <h2>Akta Oficerskie</h2>
          <p>Rejestr nadawania plusów i minusów dla funkcjonariuszy</p>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner message="Pobieranie akt oficerskich..." />
      ) : (
        <div className="points-layout">
          
          {/* FORMULARZ (Lewa kolumna) */}
          {isLoggedIn ? (
            <div className="points-card">
              <div className="points-card-header">
                <h2 className="points-card-title">
                  <FileText color="#60a5fa" size={22} /> Nowy wpis do akt
                </h2>
              </div>
            
            <form onSubmit={handleSubmit} className="points-form">
              <div className="points-form-group">
                <label className="points-form-label">
                  <User size={16} color="#818cf8" /> Otrzymujący
                </label>
                <Select
                  options={selectOptions}
                  styles={selectStyles}
                  placeholder="Wybierz funkcjonariusza..."
                  value={selectOptions.find(opt => opt.value === formData.officerId) || null}
                  onChange={(selected) => setFormData({ ...formData, officerId: selected ? selected.value : '' })}
                  isClearable
                  isSearchable
                />
              </div>

              <div className="points-form-group">
                <label className="points-form-label">
                  <Shield size={16} color="#a78bfa" /> Wystawiający
                </label>
                <Select
                  options={selectOptions}
                  styles={selectStyles}
                  placeholder="Wybierz przełożonego..."
                  value={selectOptions.find(opt => opt.value === formData.issuerId) || null}
                  onChange={(selected) => setFormData({ ...formData, issuerId: selected ? selected.value : '' })}
                  isClearable
                  isSearchable
                />
              </div>

              <div className="points-form-group">
                <label className="points-form-label">
                  <Activity size={16} color="#34d399" /> Typ wpisu
                </label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      value="PLUS" 
                      checked={formData.type === 'PLUS'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    />
                    <div className="radio-custom plus">
                      <PlusCircle size={16} /> PLUS
                    </div>
                  </label>
                  
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      value="MINUS" 
                      checked={formData.type === 'MINUS'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    />
                    <div className="radio-custom minus">
                      <MinusCircle size={16} /> MINUS
                    </div>
                  </label>
                </div>
              </div>

              <div className="points-form-group">
                <label className="points-form-label">Uzasadnienie</label>
                <textarea 
                  className="points-textarea" 
                  rows="4" 
                  placeholder="Dokładny opis sytuacji..."
                  required
                  value={formData.reason} 
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                />
              </div>

              <button type="submit" className="points-submit-btn">
                <Send size={18} /> Zapisz wpis w kartotece
              </button>
            </form>
          </div>
          ) : (
            <div className="points-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', textAlign: 'center' }}>
              <Lock size={48} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Zaloguj się</h3>
              <p style={{ color: 'var(--text-muted)', opacity: 0.7 }}>Tylko zalogowani członkowie zarządu mogą dodawać wpisy do akt.</p>
            </div>
          )}

          {/* HISTORIA (Prawa kolumna) */}
          <div className="points-card history-card">
            <div className="points-card-header">
              <h2 className="points-card-title">
                <FileText color="#fbbf24" size={22} /> Historia Wpisów
              </h2>
            </div>
            
            <div className="points-table-wrapper">
              <table className="points-table">
                <thead>
                  <tr>
                    <th>Typ & Data</th>
                    <th>Funkcjonariusze</th>
                    <th>Uzasadnienie</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map(record => (
                    <tr key={record.id}>
                      <td>
                        {record.type === 'PLUS' ? (
                          <div className="badge-plus">
                            <PlusCircle size={14} /> PLUS
                          </div>
                        ) : (
                          <div className="badge-minus">
                            <MinusCircle size={14} /> MINUS
                          </div>
                        )}
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                          {format(new Date(record.date), 'dd.MM HH:mm')}
                        </div>
                      </td>
                      
                      <td>
                        <div className="officer-name">
                          {record.officer?.firstName} {record.officer?.lastName}
                          <span className="officer-badge">[{record.officer?.badgeNumber}]</span>
                        </div>
                        <div className="issuer-name">
                          Nadane przez: {record.issuer?.lastName}
                        </div>
                      </td>
                      
                      <td>
                        <div className="reason-text">
                          {record.reason}
                        </div>
                        {isLoggedIn && (
                          <button className="btn-outline delete" onClick={() => handleDelete(record.id)}>
                            Usuń
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {records.length === 0 && (
                <div className="empty-state">
                  <FileText size={48} opacity={0.3} />
                  <h3>Brak wpisów w aktach</h3>
                  <p>Kartoteka jest czysta.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Points;
