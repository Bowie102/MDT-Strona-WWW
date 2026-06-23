import React, { useState, useEffect } from 'react';
import { X, UserMinus, ShieldCheck } from 'lucide-react';
import { API_BASE_URL } from '../config';

const TRAININGS = ['SEU', 'SV', 'NT', 'PWC', 'WU', 'K9', 'ASU', 'MARY', 'FAC'];

const TRAINING_NAMES = {
  SEU: 'Speed Enforcement Unit',
  SV: 'Supervisor',
  NT: 'Negocjator',
  PWC: 'Patrol Watch Commander',
  WU: 'Water Unit',
  K9: 'Pchlorze',
  ASU: 'Air Support Unit',
  MARY: 'Motocykl',
  FAC: 'Pierwsza Pomoc'
};

function safeParseJSON(str) {
  try {
    return JSON.parse(str) || [];
  } catch {
    return [];
  }
}

export default function FTD({ isLoggedIn }) {
  const [officers, setOfficers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTrainings, setEditTrainings] = useState([]);
  const [activeTab, setActiveTab] = useState('FTO');
  const [assigningCadetId, setAssigningCadetId] = useState(null); // Stan dla modalu wyboru FTO

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/officers`);
      const data = await res.json();
      setOfficers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (off) => {
    setEditingId(off.id);
    setEditTrainings(safeParseJSON(off.trainings));
  };

  const toggleTraining = (t) => {
    if (editTrainings.includes(t)) {
      setEditTrainings(editTrainings.filter(x => x !== t));
    } else {
      setEditTrainings([...editTrainings, t]);
    }
  };

  const saveEdit = async (off) => {
    try {
      await fetch(`${API_BASE_URL}/api/officers/${off.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('apiKey')}` },
        body: JSON.stringify({ trainings: editTrainings })
      });
      setEditingId(null);
      fetchOfficers();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };


  const assignTrainer = (training, officerId, isHead) => {
    if (!officerId) return;
    const officer = officers.find(o => o.id === parseInt(officerId));
    if (!officer) return;

    let currentTrainings = safeParseJSON(officer.trainings);
    if (isHead) {
      if (!currentTrainings.includes(`HEAD_${training}`)) currentTrainings.push(`HEAD_${training}`);
    } else {
      if (!currentTrainings.includes(`TRAINER_${training}`)) currentTrainings.push(`TRAINER_${training}`);
    }

    fetch(`${API_BASE_URL}/api/officers/${officer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('apiKey')}` },
      body: JSON.stringify({ trainings: currentTrainings })
    }).then(() => fetchOfficers());
  };

  const removeTrainer = (training, officerId, isHead) => {
    const officer = officers.find(o => o.id === parseInt(officerId));
    if (!officer) return;

    let currentTrainings = safeParseJSON(officer.trainings);
    if (isHead) {
      currentTrainings = currentTrainings.filter(t => t !== `HEAD_${training}`);
    } else {
      currentTrainings = currentTrainings.filter(t => t !== `TRAINER_${training}`);
    }

    fetch(`${API_BASE_URL}/api/officers/${officer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('apiKey')}` },
      body: JSON.stringify({ trainings: currentTrainings })
    }).then(() => fetchOfficers());
  };

  const assignSupervisor = async (cadetId, supervisorId) => {
    try {
      await fetch(`${API_BASE_URL}/api/officers/${cadetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('apiKey')}` },
        body: JSON.stringify({ supervisorId: supervisorId ? parseInt(supervisorId) : null })
      });
      fetchOfficers();
    } catch (err) {
      console.error(err);
    }
  };

  const addFto = async (officerId) => {
    if (!officerId) return;
    try {
      const off = officers.find(o => o.id === parseInt(officerId));
      if (!off) return;
      const divs = safeParseJSON(off.divisions);
      if (!divs.includes('FTD')) {
        await fetch(`${API_BASE_URL}/api/officers/${off.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('apiKey')}` },
          body: JSON.stringify({ divisions: [...divs, 'FTD'] })
        });
        fetchOfficers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeFto = async (off) => {
    try {
      const divs = safeParseJSON(off.divisions).filter(d => d !== 'FTD');
      await fetch(`${API_BASE_URL}/api/officers/${off.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('apiKey')}` },
        body: JSON.stringify({ divisions: divs, ftdRank: '' }) // Clear ftdRank as well
      });
      fetchOfficers();
    } catch (err) {
      console.error(err);
    }
  };

  const sortOfficers = (arr) => arr.sort((a, b) => parseInt(a.badgeNumber || 0) - parseInt(b.badgeNumber || 0));

  const ftdMembers = sortOfficers(officers.filter(o => safeParseJSON(o.divisions).includes('FTD')));
  const nonFtdMembers = sortOfficers(officers.filter(o => !safeParseJSON(o.divisions).includes('FTD')));
  const commanders = sortOfficers(ftdMembers.filter(o => o.ftdRank === 'FTD Commander' || o.ftdRank === 'Commander'));
  const fto = sortOfficers(ftdMembers.filter(o => o.ftdRank !== 'FTD Commander' && o.ftdRank !== 'Commander'));
  
  // Kadeci: zakładamy, że to rangi "Cadet", "Kadet", "Rekrut" itp.
  const cadets = sortOfficers(officers.filter(o => 
    o.rank.toLowerCase().includes('cadet') || 
    o.rank.toLowerCase().includes('rekrut') || 
    o.rank.toLowerCase().includes('kadet')
  ));

  const renderFtoTab = () => {
    return (
      <div style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            FTO <span style={{ color: '#facc15' }}>— Szkoleniowcy</span>
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Lista oficerów posiadających przydział do Field Training Division.
          </p>
        </div>

        {isLoggedIn && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', background: 'rgba(15, 23, 42, 0.4)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }}>
            <select id="select-new-fto" style={{ flex: 1, background: 'rgba(0,0,0,0.5)', border: '1px solid #334155', color: '#fff', padding: '0.5rem', borderRadius: '6px', outline: 'none' }}>
              <option value="">-- Dodaj nowego szkoleniowca do FTD --</option>
              {nonFtdMembers.map(off => (
                <option key={off.id} value={off.id}>[{off.badgeNumber}] {off.firstName} {off.lastName}</option>
              ))}
            </select>
            <button onClick={() => {
              const sel = document.getElementById('select-new-fto');
              if(sel.value) {
                addFto(sel.value);
                sel.value = '';
              }
            }} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#2563eb'} onMouseOut={e=>e.currentTarget.style.background='#3b82f6'}>Dodaj do FTD</button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {ftdMembers.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Brak przypisanych oficerów do FTD.</p>
            </div>
          ) : (
            ftdMembers.map(fto => {
              const isLspd = fto.department === 'LSPD';
              const deptColor = isLspd ? '#3b82f6' : '#10b981';
              
              return (
                <div key={fto.id} style={{ 
                  background: 'var(--bg-dark)', 
                  borderRadius: '6px', 
                  border: '1px solid var(--border-color)', 
                  borderLeft: `4px solid ${deptColor}`,
                  display: 'flex', 
                  flexDirection: 'column',
                  padding: '1rem 1.25rem',
                  position: 'relative'
                }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ 
                        background: isLspd ? '#1e3a8a' : '#064e3b', 
                        color: isLspd ? '#93c5fd' : '#6ee7b7', 
                        padding: '0.35rem 0.6rem', 
                        borderRadius: '4px', 
                        fontWeight: '900', 
                        fontSize: '1rem', 
                        fontFamily: 'var(--font-mono)',
                        border: `1px solid ${deptColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {fto.badgeNumber}
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.3px' }}>{fto.firstName} {fto.lastName}</h4>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{fto.rank}</div>
                      </div>
                    </div>
                    
                    {isLoggedIn && (
                      <button 
                        onClick={() => removeFto(fto)} 
                        style={{ 
                          background: 'transparent', color: '#ef4444', border: 'none', 
                          padding: '0.2rem', cursor: 'pointer', opacity: 0.7,
                          transition: 'opacity 0.2s', display: 'flex', alignItems: 'center'
                        }}
                        onMouseOver={e=>{e.currentTarget.style.opacity='1'}}
                        onMouseOut={e=>{e.currentTarget.style.opacity='0.7'}}
                        title="Usuń szkoleniowca"
                      >
                        <UserMinus size={16} />
                      </button>
                    )}
                  </div>

                  <div style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem', 
                    fontSize: '0.7rem', color: '#cbd5e1', 
                    background: 'rgba(255,255,255,0.03)', padding: '0.25rem 0.5rem', 
                    borderRadius: '4px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.05)', alignSelf: 'flex-start'
                  }}>
                    <ShieldCheck size={14} color={deptColor} />
                    Field Training Division ({fto.department})
                  </div>

                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const renderProwadzacyTab = () => {
    return (
      <div style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Program <span style={{ color: '#3b82f6' }}>Mentorski</span>
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Zarządzaj przypisaniem oficerów szkoleniowych (FTO) do kadetów i rekrutów.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {cadets.map(cadet => {
            const supervisor = officers.find(o => o.id === cadet.supervisorId);
            const isAssigned = !!supervisor;

            return (
              <div key={cadet.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                
                {/* Ozdobny pasek na górze karty zależny od statusu przypisania */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: isAssigned ? '#10b981' : '#f59e0b' }} />

                {/* Sekcja Kadeta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', paddingTop: '0.5rem' }}>
                  <div style={{ 
                    width: '46px', height: '46px', borderRadius: '12px', 
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 100%)', 
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: '#60a5fa', fontWeight: 'bold', fontSize: '0.9rem', fontFamily: 'monospace',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}>
                    {cadet.badgeNumber || '---'}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {cadet.firstName} {cadet.lastName}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: '#60a5fa', background: 'rgba(59,130,246,0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                      {cadet.rank}
                    </span>
                  </div>
                </div>

                {/* Sekcja Prowadzącego */}
                <div style={{ background: isAssigned ? 'rgba(16, 185, 129, 0.05)' : 'rgba(245, 158, 11, 0.05)', padding: '1rem', borderRadius: '8px', border: isAssigned ? '1px solid rgba(16, 185, 129, 0.1)' : '1px dashed rgba(245, 158, 11, 0.2)', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: isAssigned ? '#10b981' : '#f59e0b', marginBottom: '0.75rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                    Oficer Prowadzący (FTO)
                  </div>
                  
                  {isAssigned ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid rgba(16,185,129,0.3)' }}>
                          {supervisor.badgeNumber}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.95rem' }}>{supervisor.firstName} {supervisor.lastName}</div>
                          <div style={{ fontSize: '0.75rem', color: '#10b981' }}>{supervisor.rank}</div>
                        </div>
                      </div>
                      
                      {isLoggedIn && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => setAssigningCadetId(cadet.id)}
                            style={{ background: 'transparent', border: '1px solid #3b82f6', color: '#3b82f6', padding: '0.3rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }}
                            onMouseOver={e => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)' }}
                            onMouseOut={e => { e.currentTarget.style.background = 'transparent' }}
                          >
                            ZMIEŃ
                          </button>
                          <button 
                            onClick={() => assignSupervisor(cadet.id, '')}
                            style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.3rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }}
                            onMouseOver={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)' }}
                            onMouseOut={e => { e.currentTarget.style.background = 'transparent' }}
                          >
                            USUŃ
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      {isLoggedIn ? (
                        <button 
                          onClick={() => setAssigningCadetId(cadet.id)}
                          style={{ 
                            background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px dashed #f59e0b', 
                            padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', 
                            fontWeight: 'bold', width: '100%', transition: 'all 0.2s', letterSpacing: '0.5px' 
                          }}
                          onMouseOver={e => { e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)'; e.currentTarget.style.borderStyle = 'solid'; }}
                          onMouseOut={e => { e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)'; e.currentTarget.style.borderStyle = 'dashed'; }}
                        >
                          + WYBIERZ MENTORA
                        </button>
                      ) : (
                        <div style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 500, fontStyle: 'italic' }}>
                          Oczekuje na przypisanie
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
          
          {cadets.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎓</div>
              <h4 style={{ color: '#f8fafc', margin: '0 0 0.5rem 0' }}>Brak Kadetów</h4>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Aktualnie w bazie nie ma oficerów ze stopniem Kadet lub Rekrut.</p>
            </div>
          )}
        </div>

        {/* Modal Przypisywania FTO */}
        {assigningCadetId && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', width: '100%', maxWidth: '800px', maxHeight: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
              
              <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.25rem', fontWeight: 800 }}>Wybierz Oficera Prowadzącego</h3>
                  <p style={{ margin: '0.25rem 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>Kliknij na wybranego oficera z listy, aby przydzielić mu kadeta.</p>
                </div>
                <button 
                  onClick={() => setAssigningCadetId(null)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#f8fafc', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', transition: 'all 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  ×
                </button>
              </div>

              <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                {ftdMembers.map(fto => {
                  const currentCadetsCount = cadets.filter(c => c.supervisorId === fto.id).length;
                  const isLspd = fto.department === 'LSPD';
                  
                  return (
                    <div 
                      key={fto.id}
                      onClick={() => {
                        assignSupervisor(assigningCadetId, fto.id);
                        setAssigningCadetId(null);
                      }}
                      style={{ 
                        background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1rem', cursor: 'pointer', transition: 'all 0.2s',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem', position: 'relative', overflow: 'hidden'
                      }}
                      onMouseOver={e => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'; e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseOut={e => { e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: isLspd ? '#3b82f6' : '#22c55e' }} />
                      
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 800, color: isLspd ? '#93c5fd' : '#86efac', border: `1px solid ${isLspd ? 'rgba(59,130,246,0.3)' : 'rgba(34,197,94,0.3)'}` }}>
                        {fto.badgeNumber}
                      </div>
                      
                      <div>
                        <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.95rem' }}>{fto.firstName} {fto.lastName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{fto.rank}</div>
                      </div>

                      <div style={{ marginTop: 'auto', background: currentCadetsCount > 0 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.05)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 600, color: currentCadetsCount > 0 ? '#fcd34d' : '#94a3b8' }}>
                        Podopieczni: {currentCadetsCount}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div className="page-title">
          <h2>FIELD TRAINING <span style={{ color: '#3b82f6' }}>DIVISION</span></h2>
          <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 'bold' }}>
            FTD — Los Santos Police Department
          </p>
        </div>
      </div>

      <div className="ftd-tabs">
        <div className={`ftd-tab ${activeTab === 'FTO' ? 'active' : ''}`} onClick={() => setActiveTab('FTO')}>FTO</div>
        <div className={`ftd-tab ${activeTab === 'Prowadzący' ? 'active' : ''}`} onClick={() => setActiveTab('Prowadzący')}>Prowadzący</div>
      </div>

      {activeTab === 'FTO' && renderFtoTab()}
      {activeTab === 'Prowadzący' && renderProwadzacyTab()}

    </div>
  );
}
