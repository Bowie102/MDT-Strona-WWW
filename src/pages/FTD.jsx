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
  const commanders = sortOfficers(ftdMembers.filter(o => o.ftdRank && o.ftdRank.toLowerCase().includes('commander')));
  const fto = sortOfficers(ftdMembers.filter(o => !o.ftdRank || !o.ftdRank.toLowerCase().includes('commander')));
  
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          {ftdMembers.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Brak przypisanych oficerów do FTD.</p>
            </div>
          ) : (
            ftdMembers.map(fto => {
              const isLspd = fto.department === 'LSPD';
              const isCommander = fto.ftdRank && fto.ftdRank.toLowerCase().includes('commander');
              const deptColor = isCommander ? '#facc15' : (isLspd ? '#3b82f6' : '#10b981');
              const bgGradient = isCommander ? 'linear-gradient(145deg, #1e293b 0%, #171000 100%)' : 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)';
              
              return (
                <div key={fto.id} style={{ 
                  background: bgGradient,
                  borderRadius: '16px', 
                  border: isCommander ? '1px solid rgba(250, 204, 21, 0.3)' : '1px solid rgba(255,255,255,0.05)', 
                  borderTop: `4px solid ${deptColor}`,
                  boxShadow: isCommander ? `0 10px 30px -5px rgba(250, 204, 21, 0.2)` : `0 10px 30px -10px rgba(0,0,0,0.5)`,
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'default'
                }} onMouseOver={e=>{
                  e.currentTarget.style.transform='translateY(-5px)';
                  e.currentTarget.style.boxShadow=isCommander ? `0 15px 40px -5px rgba(250, 204, 21, 0.4)` : `0 15px 40px -10px ${deptColor}40`;
                }} onMouseOut={e=>{
                  e.currentTarget.style.transform='translateY(0)';
                  e.currentTarget.style.boxShadow=isCommander ? `0 10px 30px -5px rgba(250, 204, 21, 0.2)` : `0 10px 30px -10px rgba(0,0,0,0.5)`;
                }}>
                  
                  {isCommander && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#facc15', opacity: 0.8 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4h20"/><path d="m2 8 3 11c.1.5.6.9 1.1.9h11.8c.6 0 1.1-.4 1.1-.9l3-11-5 3-4-6-4 6-5-3Z"/></svg>
                    </div>
                  )}

                  {/* Nagłówek ID */}
                  <div style={{ background: isCommander ? 'rgba(250, 204, 21, 0.1)' : (isLspd ? 'rgba(59,130,246,0.1)' : 'rgba(16,185,129,0.1)'), padding: '1.25rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: isCommander ? '1px solid rgba(250, 204, 21, 0.15)' : '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.65rem', color: deptColor, fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>{isCommander ? 'FIELD TRAINING COMMAND' : 'FIELD TRAINING DIV'}</span>
                      <span style={{ fontSize: '0.9rem', color: isCommander ? '#fef08a' : '#f8fafc', fontWeight: 800, letterSpacing: '1px' }}>{isCommander ? 'COMMANDER ID CARD' : 'OFFICIAL ID CARD'}</span>
                    </div>
                    <img src={isLspd ? '/lspd_logo.png' : '/bcso_logo.png'} alt="logo" style={{ width: '40px', height: '40px', objectFit: 'contain', filter: `drop-shadow(0 0 10px ${deptColor}60)` }} />
                  </div>

                  {/* Ciało ID */}
                  <div style={{ padding: '1.5rem 1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    
                    {/* Odznaka (Zamiast Kółka) */}
                    <div style={{ position: 'relative', width: '90px', height: '90px', marginBottom: '1.5rem' }}>
                      <img src={isLspd ? '/lspd_logo.png' : '/bcso_logo.png'} alt="Badge" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.5)) opacity(0.9)' }} />
                      <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', background: isCommander ? 'linear-gradient(135deg, #facc15, #ca8a04)' : (isLspd ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'linear-gradient(135deg, #10b981, #047857)'), border: '2px solid #0f172a', borderRadius: '6px', padding: '2px 10px', fontSize: '0.95rem', fontWeight: 900, color: isCommander ? '#0f172a' : '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        {fto.badgeNumber}
                      </div>
                    </div>
                    
                    {/* Dane Oficera */}
                    <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: isCommander ? '#fef08a' : '#f8fafc', textAlign: 'center', lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{fto.firstName} <br/>{fto.lastName}</h3>
                    <div style={{ color: deptColor, fontSize: '0.85rem', fontWeight: 700, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '1.5px', background: isCommander ? 'rgba(250, 204, 21, 0.15)' : 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '4px' }}>{fto.rank}</div>
                    
                    {/* Szkolenia (Certyfikaty) */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', marginTop: '1rem', width: '100%', minHeight: '24px' }}>
                      {safeParseJSON(fto.trainings).length === 0 ? (
                        <span style={{ fontSize: '0.65rem', color: '#64748b', fontStyle: 'italic', letterSpacing: '1px' }}>NO CERTIFICATIONS ON FILE</span>
                      ) : (
                        safeParseJSON(fto.trainings).map(t => {
                          const isTrainer = t.startsWith('TRAINER_');
                          const isHead = t.startsWith('HEAD_');
                          const baseTraining = t.replace('TRAINER_', '').replace('HEAD_', '');
                          
                          let pillColor = 'rgba(255,255,255,0.05)';
                          let textColor = '#cbd5e1';
                          let borderCol = 'rgba(255,255,255,0.1)';
                          
                          if (isHead) {
                            pillColor = 'rgba(239, 68, 68, 0.1)'; textColor = '#fca5a5'; borderCol = 'rgba(239, 68, 68, 0.3)';
                          } else if (isTrainer) {
                            pillColor = 'rgba(250, 204, 21, 0.1)'; textColor = '#fde047'; borderCol = 'rgba(250, 204, 21, 0.3)';
                          } else {
                            pillColor = isLspd ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)';
                            textColor = isLspd ? '#93c5fd' : '#6ee7b7';
                            borderCol = isLspd ? 'rgba(59, 130, 246, 0.3)' : 'rgba(16, 185, 129, 0.3)';
                          }

                          return (
                            <span key={t} style={{
                              background: pillColor, color: textColor, border: `1px solid ${borderCol}`,
                              padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.5px'
                            }} title={t}>
                              {isHead ? `HEAD ${baseTraining}` : isTrainer ? `INSTR ${baseTraining}` : t}
                            </span>
                          );
                        })
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.02)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</span>
                        <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 800 }}>ACTIVE</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Clearance</span>
                        <span style={{ fontSize: '0.8rem', color: '#f8fafc', fontWeight: 800 }}>LEVEL-F</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stopka ID / Barcode */}
                  <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Fake Barcode */}
                    <div style={{ height: '24px', width: '120px', background: 'repeating-linear-gradient(90deg, #94a3b8 0, #94a3b8 2px, transparent 2px, transparent 4px, #94a3b8 4px, #94a3b8 5px, transparent 5px, transparent 8px, #94a3b8 8px, #94a3b8 10px, transparent 10px, transparent 11px)', opacity: 0.4 }}></div>
                    
                    {isLoggedIn && (
                      <button 
                        onClick={() => removeFto(fto)} 
                        style={{ 
                          background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', 
                          padding: '0.4rem', borderRadius: '6px', cursor: 'pointer',
                          transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        onMouseOver={e=>{e.currentTarget.style.background='rgba(239, 68, 68, 0.3)';}}
                        onMouseOut={e=>{e.currentTarget.style.background='rgba(239, 68, 68, 0.1)';}}
                        title="Usuń szkoleniowca"
                      >
                        <UserMinus size={16} />
                      </button>
                    )}
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
                  <div style={{ position: 'relative', width: '46px', height: '46px' }}>
                    <img src={cadet.department === 'LSPD' ? '/lspd_logo.png' : '/bcso_logo.png'} alt="Badge" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))' }} onError={(e) => e.target.style.display='none'} />
                    <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #334155, #0f172a)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '0 4px', fontSize: '0.65rem', fontWeight: 900, color: '#f8fafc', boxShadow: '0 1px 3px rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>
                      {cadet.badgeNumber || '---'}
                    </div>
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
                        <div style={{ position: 'relative', width: '38px', height: '38px' }}>
                          <img src={supervisor.department === 'LSPD' ? '/lspd_logo.png' : '/bcso_logo.png'} alt="Badge" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: `drop-shadow(0 2px 5px ${supervisor.department === 'LSPD' ? 'rgba(59,130,246,0.3)' : 'rgba(16,185,129,0.3)'})` }} onError={(e) => e.target.style.display='none'} />
                          <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', background: supervisor.department === 'LSPD' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'linear-gradient(135deg, #10b981, #047857)', border: '1px solid #0f172a', borderRadius: '4px', padding: '0 4px', fontSize: '0.65rem', fontWeight: 900, color: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>
                            {supervisor.badgeNumber || '---'}
                          </div>
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
