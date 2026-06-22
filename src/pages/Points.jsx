import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { format } from 'date-fns';
import { PlusCircle, MinusCircle, User, Shield, FileText, Send, Activity, Lock } from 'lucide-react';

function Points({ isLoggedIn }) {
  const [officers, setOfficers] = useState([]);
  const [records, setRecords] = useState([]);
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
    try {
      const offRes = await fetch(`${API_BASE_URL}/api/officers`);
      const offData = await offRes.json();
      setOfficers(offData);

      const recRes = await fetch(`${API_BASE_URL}/api/points`);
      const recData = await recRes.json();
      setRecords(recData);
    } catch (err) {
      console.error('Błąd pobierania danych', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/points`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  return (
    <div className="main-content">
      <div className="page-header">
        <div className="page-title">
          <h2>Akta Oficerskie</h2>
          <p>Rejestr nadawania plusów i minusów dla funkcjonariuszy</p>
        </div>
      </div>

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
              <select
                required
                className="points-select"
                value={formData.officerId}
                onChange={(e) => setFormData({ ...formData, officerId: e.target.value })}
              >
                <option value="" disabled>Wybierz funkcjonariusza...</option>
                {officers.map(o => (
                  <option key={o.id} value={o.id}>{o.firstName} {o.lastName} [{o.badgeNumber}]</option>
                ))}
              </select>
            </div>

            <div className="points-form-group">
              <label className="points-form-label">
                <Shield size={16} color="#a78bfa" /> Wystawiający
              </label>
              <select
                required
                className="points-select"
                value={formData.issuerId}
                onChange={(e) => setFormData({ ...formData, issuerId: e.target.value })}
              >
                <option value="" disabled>Twoje dane...</option>
                {officers.map(o => (
                  <option key={o.id} value={o.id}>{o.firstName} {o.lastName} [{o.badgeNumber}]</option>
                ))}
              </select>
            </div>

            <div className="points-form-group">
              <label className="points-form-label">Wybierz typ wpisu</label>
              <div className="points-type-selector">
                <div
                  className={`type-btn ${formData.type === 'PLUS' ? 'active-plus' : ''}`}
                  onClick={() => setFormData({ ...formData, type: 'PLUS' })}
                >
                  <PlusCircle size={28} />
                  <span>PLUS</span>
                </div>
                <div
                  className={`type-btn ${formData.type === 'MINUS' ? 'active-minus' : ''}`}
                  onClick={() => setFormData({ ...formData, type: 'MINUS' })}
                >
                  <MinusCircle size={28} />
                  <span>MINUS</span>
                </div>
              </div>
            </div>

            <div className="points-form-group">
              <label className="points-form-label">Powód</label>
              <input
                required
                className="points-input"
                placeholder="Krótki powód przyznania..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              />
            </div>

            <button type="submit" className="points-submit">
              Wystaw do akt <Send size={18} />
            </button>
          </form>
        </div>
        ) : (
          <div className="points-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <div style={{ textAlign: 'center' }}>
              <Lock size={48} opacity={0.5} style={{ marginBottom: '1rem' }} />
              <h3>Brak dostępu</h3>
              <p>Zaloguj się jako Zarząd, aby wystawiać Akta.</p>
            </div>
          </div>
        )}

        {/* TABELA (Prawa kolumna) */}
        <div className="points-card">
          <div className="points-card-header">
            <h2 className="points-card-title">Historia Wpisów</h2>
          </div>
          
          <div className="points-table-wrapper">
            <table className="points-table">
              <thead>
                <tr>
                  <th>Decyzja</th>
                  <th>Oficer</th>
                  <th>Powód</th>
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
    </div>
  );
}

export default Points;
