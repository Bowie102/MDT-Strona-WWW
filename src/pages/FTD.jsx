import React, { useState, useEffect } from 'react';
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
        headers: { 'Content-Type': 'application/json' },
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
      if (!currentTrainings.includes(training)) currentTrainings.push(training);
    }

    fetch(`${API_BASE_URL}/api/officers/${officer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
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
      currentTrainings = currentTrainings.filter(t => t !== training);
    }

    fetch(`${API_BASE_URL}/api/officers/${officer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trainings: currentTrainings })
    }).then(() => fetchOfficers());
  };

  const assignSupervisor = async (cadetId, supervisorId) => {
    try {
      await fetch(`${API_BASE_URL}/api/officers/${cadetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
          headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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
            FTO <span style={{ color: '#facc15' }}>— Główni Szkoleniowcy</span>
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Zarządzaj oficerami przypisanymi jako główni szkoleniowcy do poszczególnych szkoleń.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: '1.5rem' }}>
          {TRAININGS.map(t => {
            const headTrainer = officers.find(o => safeParseJSON(o.trainings).includes(`HEAD_${t}`));
            const trainersForThis = officers.filter(o => safeParseJSON(o.trainings).includes(t) && !safeParseJSON(o.trainings).includes(`HEAD_${t}`));
            const availableToAssignHead = ftdMembers.filter(o => !safeParseJSON(o.trainings).includes(`HEAD_${t}`));
            const availableToAssignTrainer = ftdMembers.filter(o => !safeParseJSON(o.trainings).includes(t) && !safeParseJSON(o.trainings).includes(`HEAD_${t}`));

            return (
              <div key={t} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)' }}>
                
                {/* Karta Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ color: '#facc15', fontWeight: '900', fontSize: '1.75rem', letterSpacing: '1px', textShadow: '0 0 10px rgba(250, 204, 21, 0.3)' }}>
                      {t}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.5px', color: '#f8fafc' }}>{TRAINING_NAMES[t]}</h4>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{trainersForThis.length} Szkoleniowców</span>
                    </div>
                  </div>
                </div>

                {/* Główny Szkoleniowiec Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(250, 204, 21, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(250, 204, 21, 0.2)' }}>
                  <span style={{ fontSize: '0.8rem', color: '#facc15', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Główny Szkoleniowiec</span>
                  
                  {headTrainer ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(250, 204, 21, 0.2)', color: '#facc15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                          {headTrainer.badgeNumber}
                        </div>
                        <span style={{ color: '#f8fafc', fontWeight: '600' }}>{headTrainer.firstName} {headTrainer.lastName}</span>
                      </div>
                      {isLoggedIn && (
                        <button onClick={() => removeTrainer(t, headTrainer.id, true)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div style={{ color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' }}>Brak przypisanego głównego szkoleniowca</div>
                  )}

                  {isLoggedIn && !headTrainer && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <select id={`select-head-${t}`} style={{ flex: 1, background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #334155', color: '#f1f5f9', padding: '0.4rem 0.5rem', borderRadius: '6px', fontSize: '0.8rem', outline: 'none' }}>
                        <option value="">-- Wybierz oficera --</option>
                        {availableToAssignHead.map(off => (
                          <option key={off.id} value={off.id}>[{off.badgeNumber}] {off.firstName} {off.lastName}</option>
                        ))}
                      </select>
                      <button onClick={() => {
                        const sel = document.getElementById(`select-head-${t}`);
                        if(sel.value) assignTrainer(t, sel.value, true);
                        sel.value = '';
                      }} style={{ background: '#facc15', color: '#000', border: 'none', padding: '0 1rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>Ustaw</button>
                    </div>
                  )}
                </div>

                {/* Lista Zwykłych Instruktorów */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Szkoleniowcy</span>
                  
                  {isLoggedIn && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <select id={`select-trainer-${t}`} style={{ flex: 1, background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #334155', color: '#f1f5f9', padding: '0.4rem 0.5rem', borderRadius: '6px', fontSize: '0.8rem', outline: 'none' }}>
                        <option value="">-- Dodaj szkoleniowca --</option>
                        {availableToAssignTrainer.map(off => (
                          <option key={off.id} value={off.id}>[{off.badgeNumber}] {off.firstName} {off.lastName}</option>
                        ))}
                      </select>
                      <button onClick={() => {
                        const sel = document.getElementById(`select-trainer-${t}`);
                        if(sel.value) assignTrainer(t, sel.value, false);
                        sel.value = '';
                      }} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0 1rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>Dodaj</button>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto', paddingRight: '0.5rem' }} className="custom-scrollbar">
                    {trainersForThis.length === 0 && <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Brak przypisanych szkoleniowców.</div>}

                  {trainersForThis.map(fto => {
                    const trains = safeParseJSON(fto.trainings);
                    const isLspd = fto.department === 'LSPD';
                    
                    return (
                      <div key={fto.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)', borderLeft: isLspd ? '4px solid #3b82f6' : '4px solid #22c55e', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(30, 41, 59, 0.9)'; e.currentTarget.style.transform = 'translateX(4px)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ 
                            width: '42px', height: '42px', borderRadius: '50%', 
                            background: isLspd ? 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.05) 100%)' : 'linear-gradient(135deg, rgba(21,128,61,0.2) 0%, rgba(21,128,61,0.05) 100%)', 
                            border: isLspd ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(21, 128, 61, 0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            color: isLspd ? '#93c5fd' : '#86efac', fontWeight: 'bold', fontSize: '0.85rem', fontFamily: 'monospace',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                          }}>
                            {fto.badgeNumber}
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc' }}>{fto.firstName} {fto.lastName}</span>
                              <span style={{ fontSize: '0.7rem', color: isLspd ? '#60a5fa' : '#4ade80', background: isLspd ? 'rgba(59,130,246,0.1)' : 'rgba(21,128,61,0.1)', padding: '0.1rem 0.3rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{fto.rank}</span>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                              {trains.length > 0 ? trains.map(tr => (
                                <span key={tr} style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.1rem 0.35rem', borderRadius: '4px', color: '#cbd5e1', fontWeight: 600 }}>
                                  {tr}
                                </span>
                              )) : <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Brak uprawnień</span>}
                            </div>
                          </div>
                        </div>

                        {isLoggedIn && (
                          <button 
                            onClick={() => removeHeadTrainer(t, fto.id)} 
                            style={{ 
                              background: 'transparent', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', 
                              padding: '0.35rem 0.6rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem', 
                              fontWeight: 'bold', transition: 'all 0.2s' 
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.borderColor = '#ef4444'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'; }}
                          >
                            USUŃ
                          </button>
                        )}
                      </div>
                    );
                  })}
                  
                  {trainersForThis.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(15, 23, 42, 0.2)', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.05)' }}>
                      <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0, fontWeight: 500 }}>Brak przypisanych instruktorów.</p>
                    </div>
                  )}
                  </div>
                </div>

              </div>
            );
          })}
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
