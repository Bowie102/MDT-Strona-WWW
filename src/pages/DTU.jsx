import React, { useState, useEffect } from 'react';
import { Shield, Lock, FileText, Search, Plus, Trash2 } from 'lucide-react';

function DTU({ userRole }) {
  const [activeTab, setActiveTab] = useState('DETECTIVES');
  const [officers, setOfficers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Stan formularza nowego raportu
  const [showReportForm, setShowReportForm] = useState(false);
  const [editingReportId, setEditingReportId] = useState(null);
  const [newReport, setNewReport] = useState({
    title: '',
    suspect: '',
    detective: '',
    content: ''
  });

  const isAuthorized = userRole === 'ZARZAD' || userRole === 'DTU';

  useEffect(() => {
    if (isAuthorized) {
      fetchData();
    }
  }, [isAuthorized]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [officersData, reportsData] = await Promise.all([
        fetch('http://localhost:3001/api/officers').then(res => res.json()),
        fetch('http://localhost:3001/api/dtu/reports').then(res => res.json())
      ]);
      
      // Wagi rang DTU dla sortowania
      const getDtuRankWeight = (rank) => {
        if (!rank) return 0;
        const r = rank.toLowerCase();
        if (r.includes('commander')) return 110;
        if (r.includes('chief')) return 100;
        if (r.includes('captain')) return 90;
        if (r.includes('lieutenant')) return 80;
        if (r.includes('sergeant')) return 70;
        if (r.includes('detective iii') || r.includes('detective 3')) return 60;
        if (r.includes('detective ii') || r.includes('detective 2')) return 50;
        if (r.includes('detective i') || r.includes('detective 1')) return 40;
        if (r.includes('detective')) return 30;
        if (r.includes('investigator')) return 20;
        return 10;
      };

      // Filtrowanie detektywów i sortowanie po randze DTU
      const dtuMembers = officersData.filter(officer => {
        try {
          const divisions = JSON.parse(officer.divisions || '[]');
          return divisions.includes('DTU');
        } catch(e) {
          return false;
        }
      }).sort((a, b) => getDtuRankWeight(b.dtuRank) - getDtuRankWeight(a.dtuRank));
      
      setOfficers(dtuMembers);
      setReports(reportsData);
    } catch (error) {
      console.error('Błąd pobierania danych DTU:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();
    try {
      if (editingReportId) {
        await fetch(`http://localhost:3001/api/dtu/reports/${editingReportId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReport)
        });
      } else {
        await fetch('http://localhost:3001/api/dtu/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReport)
        });
      }
      setShowReportForm(false);
      setEditingReportId(null);
      setNewReport({ title: '', suspect: '', detective: '', content: '' });
      fetchData(); // Odśwież listę
    } catch (error) {
      console.error('Błąd zapisywania raportu:', error);
      alert('Nie udało się zapisać raportu.');
    }
  };

  const handleEditClick = (report) => {
    setNewReport({
      title: report.title,
      suspect: report.suspect,
      detective: report.detective,
      content: report.content
    });
    setEditingReportId(report.id);
    setShowReportForm(true);
  };

  const handleDeleteReport = async (id) => {
    if (!window.confirm('Na pewno chcesz usunąć ten raport?')) return;
    try {
      await fetch(`http://localhost:3001/api/dtu/reports/${id}`, {
        method: 'DELETE'
      });
      fetchData();
    } catch (error) {
      console.error('Błąd usuwania raportu:', error);
      alert('Nie udało się usunąć raportu.');
    }
  };

  // EKRAN BRAKU DOSTĘPU (ACCESS DENIED)
  if (!isAuthorized) {
    return (
      <div style={{ height: 'calc(100vh - 40px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#000', color: '#ef4444', fontFamily: 'monospace', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(239, 68, 68, 0.05) 2px, rgba(239, 68, 68, 0.05) 4px)', pointerEvents: 'none' }}></div>
        <Lock size={80} style={{ marginBottom: '2rem', filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))' }} />
        <h1 style={{ fontSize: '4rem', fontWeight: 900, margin: 0, letterSpacing: '4px', textShadow: '0 0 20px rgba(239, 68, 68, 0.5)' }}>ACCESS DENIED</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem', opacity: 0.8, letterSpacing: '1px' }}>DETECTIVE TASK UNIT - CLASSIFIED SYSTEM</p>
        <p style={{ fontSize: '0.9rem', marginTop: '2rem', color: '#666' }}>UNAUTHORIZED ACCESS ATTEMPT LOGGED.</p>
      </div>
    );
  }

  // WIDOK AUTORYZOWANY
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-mono)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(139, 92, 246, 0.3)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#a78bfa' }}>
            <Search size={32} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', color: '#f8fafc', fontWeight: 800, letterSpacing: '1px' }}>DTU DATABASE</h1>
            <p style={{ margin: '0.25rem 0 0 0', color: '#a78bfa', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Detective Task Unit</p>
          </div>
        </div>
      </div>

      {/* Nawigacja */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('DETECTIVES')}
          style={{ 
            background: activeTab === 'DETECTIVES' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(15, 23, 42, 0.5)', 
            border: activeTab === 'DETECTIVES' ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.1)',
            color: activeTab === 'DETECTIVES' ? '#a78bfa' : '#94a3b8',
            padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s'
          }}
        >
          <Shield size={18} /> Rejestr Detektywów
        </button>
        <button 
          onClick={() => setActiveTab('CASES')}
          style={{ 
            background: activeTab === 'CASES' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(15, 23, 42, 0.5)', 
            border: activeTab === 'CASES' ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.1)',
            color: activeTab === 'CASES' ? '#a78bfa' : '#94a3b8',
            padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s'
          }}
        >
          <FileText size={18} /> Akta i Przesłuchania
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#a78bfa' }}>Pobieranie danych wywiadowczych...</div>
      ) : (
        <>
          {/* TAB: DETECTIVES */}
          {activeTab === 'DETECTIVES' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              
              {/* Nagłówki Kolumn (Opcjonalne, dodają elegancji) */}
              {officers.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 1.5rem 0.5rem 1.5rem', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '3rem' }}>
                    <span style={{ width: '45px', textAlign: 'center' }}>Odznaka</span>
                    <span>Funkcjonariusz</span>
                  </div>
                  <div style={{ display: 'flex', gap: '2rem', paddingRight: '1rem' }}>
                    <span style={{ minWidth: '120px', textAlign: 'right' }}>Ranga DTU</span>
                    <span style={{ minWidth: '120px', textAlign: 'right' }}>Kryptonim</span>
                    <span style={{ minWidth: '80px', textAlign: 'right' }}>Jednostka</span>
                  </div>
                </div>
              )}

              {officers.map(officer => (
                <div 
                  key={officer.id} 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: '4px solid #8b5cf6', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} 
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)'; e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)'; }} 
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)'; e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    <div style={{ width: '45px', height: '45px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800, border: '1px solid rgba(139, 92, 246, 0.2)', boxShadow: 'inset 0 0 10px rgba(139, 92, 246, 0.1)' }}>
                      {officer.badgeNumber}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700, letterSpacing: '0.5px' }}>{officer.firstName} {officer.lastName}</h3>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.2rem' }}>{officer.rank}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ minWidth: '120px', textAlign: 'right' }}>
                      {officer.dtuRank ? (
                        <span style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>{officer.dtuRank}</span>
                      ) : (
                        <span style={{ color: '#475569', fontSize: '0.85rem' }}>---</span>
                      )}
                    </div>

                    <div style={{ minWidth: '120px', textAlign: 'right' }}>
                      {officer.dtuAlias ? (
                        <span style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.9rem', fontStyle: 'italic', letterSpacing: '1px' }}>"{officer.dtuAlias}"</span>
                      ) : (
                        <span style={{ color: '#475569', fontSize: '0.85rem' }}>---</span>
                      )}
                    </div>

                    <div style={{ minWidth: '80px', textAlign: 'right' }}>
                      <span style={{ 
                        color: officer.department === 'LSPD' ? '#93c5fd' : '#86efac', 
                        fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px',
                        background: officer.department === 'LSPD' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                        padding: '0.2rem 0.5rem', borderRadius: '4px', border: `1px solid ${officer.department === 'LSPD' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(34, 197, 94, 0.2)'}`
                      }}>
                        {officer.department}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {officers.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', background: 'rgba(15,23,42,0.4)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                  Brak zarejestrowanych detektywów w bazie.
                </div>
              )}
            </div>
          )}

          {/* TAB: CASES */}
          {activeTab === 'CASES' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.25rem' }}>Ostatnie Akta</h3>
                <button 
                  onClick={() => setShowReportForm(!showReportForm)}
                  style={{ background: '#8b5cf6', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                >
                  <Plus size={16} /> Dodaj Raport
                </button>
              </div>

              {showReportForm && (
                <form onSubmit={handleCreateReport} style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.3)', marginBottom: '2rem' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#a78bfa' }}>
                    {editingReportId ? 'Edycja Raportu' : 'Nowy Raport ze Śledztwa / Przesłuchania'}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.85rem' }}>Tytuł sprawy / Sygnatura</label>
                      <input required type="text" className="form-control" style={{ background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(255,255,255,0.1)' }} value={newReport.title} onChange={e => setNewReport({...newReport, title: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.85rem' }}>Detektyw prowadzący</label>
                      <input required type="text" className="form-control" style={{ background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(255,255,255,0.1)' }} value={newReport.detective} onChange={e => setNewReport({...newReport, detective: e.target.value})} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.85rem' }}>Podejrzany / Przesłuchiwany</label>
                    <input required type="text" className="form-control" style={{ background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(255,255,255,0.1)' }} value={newReport.suspect} onChange={e => setNewReport({...newReport, suspect: e.target.value})} />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.85rem' }}>Treść raportu</label>
                    <textarea required className="form-control" rows="6" style={{ background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(255,255,255,0.1)', resize: 'vertical' }} value={newReport.content} onChange={e => setNewReport({...newReport, content: e.target.value})}></textarea>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button type="button" onClick={() => { setShowReportForm(false); setEditingReportId(null); setNewReport({title:'', suspect:'', detective:'', content:''}); }} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>Anuluj</button>
                    <button type="submit" style={{ background: '#8b5cf6', border: 'none', color: '#fff', padding: '0.5rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                      {editingReportId ? 'Zapisz Zmiany' : 'Zapisz w bazie'}
                    </button>
                  </div>
                </form>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reports.map(report => (
                  <div key={report.id} style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ color: '#8b5cf6' }}><FileText size={20} /></div>
                        <div>
                          <h4 style={{ margin: 0, color: '#f8fafc', fontSize: '1.1rem' }}>{report.title}</h4>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{new Date(report.date).toLocaleString('pl-PL')}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', color: '#a78bfa' }}>
                          Prowadzący: <strong>{report.detective}</strong>
                        </div>
                        <button onClick={() => handleEditClick(report)} style={{ background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer', opacity: 0.7 }} onMouseOver={e => e.currentTarget.style.opacity=1} onMouseOut={e => e.currentTarget.style.opacity=0.7}>
                          ✏️
                        </button>
                        <button onClick={() => handleDeleteReport(report.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', opacity: 0.7 }} onMouseOver={e => e.currentTarget.style.opacity=1} onMouseOut={e => e.currentTarget.style.opacity=0.7}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ marginBottom: '1rem', color: '#ef4444', fontWeight: 600, fontSize: '0.85rem' }}>
                        CEL: {report.suspect}
                      </div>
                      <div style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                        {report.content}
                      </div>
                    </div>
                  </div>
                ))}
                {reports.length === 0 && !showReportForm && (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', background: 'rgba(15,23,42,0.4)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                    Brak akt w bazie danych DTU.
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DTU;
