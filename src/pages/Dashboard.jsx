import { API_BASE_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { Users, Shield, Clock, Activity, FileText, Briefcase, Award, TrendingUp, AlertTriangle, Terminal, Crown, Medal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import LoadingSpinner from '../components/LoadingSpinner';

function Dashboard() {
  const [stats, setStats] = useState({
    lspdCount: 0, bcsoCount: 0, dtuCount: 0, metroCount: 0, ftdCount: 0, hwpCount: 0
  });
  const [logs, setLogs] = useState([]);
  const [topOfficers, setTopOfficers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [threatLevel, setThreatLevel] = useState(localStorage.getItem('threatLevel') || 'GREEN');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch(`${API_BASE_URL}/api/officers`).then(res => res.json()),
      fetch(`${API_BASE_URL}/api/dashboard-logs`).then(res => res.json()),
      fetch(`${API_BASE_URL}/api/duty`).then(res => res.json())
    ]).then(([officersData, logsData, dutyData]) => {
      let lspd = 0, bcso = 0, dtu = 0, metro = 0, ftd = 0, hwp = 0;
      officersData.forEach(off => {
        if (off.department === 'LSPD') lspd++;
        if (off.department === 'BCSO') bcso++;
        
        try {
          const divs = JSON.parse(off.divisions || '[]');
          if (divs.includes('DTU')) dtu++;
          if (divs.includes('METRO')) metro++;
          if (divs.includes('FTD')) ftd++;
          if (divs.includes('HWP')) hwp++;
        } catch(e) {}
      });
      setStats({ lspdCount: lspd, bcsoCount: bcso, dtuCount: dtu, metroCount: metro, ftdCount: ftd, hwpCount: hwp });
      setLogs(logsData);

      // Obliczanie realnych przepracowanych godzin na podstawie pobranych logów służby
      const hoursMap = {};
      if (Array.isArray(dutyData)) {
        dutyData.forEach(d => {
          if (d.userId) {
            hoursMap[d.userId] = (hoursMap[d.userId] || 0) + parseFloat(d.hours || 0);
          }
        });
      }

      // Generowanie rankingu na podstawie godzin na służbie
      const ranking = [...officersData]
        .map(off => ({
          ...off,
          score: hoursMap[off.id] || 0
        }))
        .filter(off => off.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
        
      setTopOfficers(ranking);
    }).catch(err => {
      console.error("Dashboard fetch error:", err);
    }).finally(() => {
      setIsLoading(false);
    });

    document.body.className = `threat-${threatLevel.toLowerCase()}`;
  }, [threatLevel]);

  const changeThreatLevel = () => {
    const levels = ['GREEN', 'ORANGE', 'RED'];
    const next = levels[(levels.indexOf(threatLevel) + 1) % levels.length];
    setThreatLevel(next);
    localStorage.setItem('threatLevel', next);
  };

  const threatColors = {
    GREEN: '#10b981',
    ORANGE: '#f97316',
    RED: '#ef4444'
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div className="relative">
      
      <div>
        <div className="dash-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <Terminal size={32} color="var(--lspd-blue)" />
              <h1 style={{ margin: 0, fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-1px' }}>Centrala Kadr</h1>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>System Zarządzania Personelem & HR Departamentu</p>
          </div>
          {isLoggedIn && (
            <div style={{ textAlign: 'right', cursor: 'pointer' }} onClick={changeThreatLevel}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Stan Gotowości</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', border: `1px solid ${threatColors[threatLevel]}`, borderRadius: '6px' }}>
                <AlertTriangle color={threatColors[threatLevel]} size={16} />
                <strong style={{ color: threatColors[threatLevel], fontSize: '1rem', letterSpacing: '1px' }}>CODE {threatLevel}</strong>
              </div>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner message="Ładowanie panelu informacyjnego..." />
      ) : (
        <>

      <div className="dashboard-grid" style={{ marginBottom: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <div className="stat-card" style={{ borderLeft: '3px solid #1d4ed8' }}>
          <div className="stat-icon" style={{ padding: 0, overflow: 'hidden', background: 'transparent' }}>
            <img src="/lspd_logo.png" alt="LSPD" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.style.display='none'} />
          </div>
          <div className="stat-info">
            <h3>{stats.lspdCount}</h3>
            <p>Oficerowie LSPD</p>
          </div>
        </div>

        <div className="stat-card" style={{ borderLeft: '3px solid #15803d' }}>
          <div className="stat-icon" style={{ padding: 0, overflow: 'hidden', background: 'transparent' }}>
            <img src="/bcso_logo.png" alt="BCSO" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.style.display='none'} />
          </div>
          <div className="stat-info">
            <h3>{stats.bcsoCount}</h3>
            <p>Szeryfowie BCSO</p>
          </div>
        </div>

        <div className="stat-card" style={{ borderLeft: '3px solid #8b5cf6' }}>
          <div className="stat-icon" style={{ padding: 0, overflow: 'hidden', background: 'transparent' }}>
            <img src="/dtu_logo.png" alt="DTU" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.style.display='none'} />
          </div>
          <div className="stat-info">
            <h3>{stats.dtuCount}</h3>
            <p>Członkowie DTU</p>
          </div>
        </div>

        <div className="stat-card" style={{ borderLeft: '3px solid #ef4444' }}>
          <div className="stat-icon" style={{ padding: 0, overflow: 'hidden', background: 'transparent' }}>
            <img src="/metro_logo.png" alt="METRO" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.style.display='none'} />
          </div>
          <div className="stat-info">
            <h3>{stats.metroCount}</h3>
            <p>Członkowie METRO</p>
          </div>
        </div>

        <div className="stat-card" style={{ borderLeft: '3px solid #f59e0b' }}>
          <div className="stat-icon" style={{ padding: 0, overflow: 'hidden', background: 'transparent' }}>
            <img src="/ftd_logo.png" alt="FTD" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.style.display='none'} />
          </div>
          <div className="stat-info">
            <h3>{stats.ftdCount}</h3>
            <p>Członkowie FTD</p>
          </div>
        </div>

        <div className="stat-card" style={{ borderLeft: '3px solid #64748b' }}>
          <div className="stat-icon" style={{ padding: 0, overflow: 'hidden', background: 'transparent' }}>
            <img src="/hwp_logo.png" alt="HWP" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.style.display='none'} />
          </div>
          <div className="stat-info">
            <h3>{stats.hwpCount}</h3>
            <p>Członkowie HWP</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* SEKACJA: Ostatnia Aktywność */}
        <div>
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
            <Activity size={16} /> Ostatnia Aktywność Wydziału
          </h3>
          <div className="glass-card" style={{ padding: '0.5rem' }}>
            {logs.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem', fontFamily: 'var(--font-mono)' }}>Brak logów w systemie.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {logs.slice(0, 5).map((log) => {
                  let badgeColor = '#64748b'; // default
                  let badgeText = log.type;
                  let borderLeft = '3px solid #64748b';

                  if (log.type === 'POINT') {
                    badgeColor = log.action === 'PLUS' ? '#10b981' : '#ef4444';
                    badgeText = log.action === 'PLUS' ? 'AKTA +' : 'AKTA -';
                    borderLeft = `3px solid ${badgeColor}`;
                  } else if (log.type === 'DUTY') {
                    badgeColor = '#3b82f6';
                    badgeText = 'SŁUŻBA';
                    borderLeft = `3px solid ${badgeColor}`;
                  } else if (log.type === 'SYSTEM') {
                    if (log.action === 'HIRE') { badgeColor = '#8b5cf6'; badgeText = 'KADRY'; borderLeft = `3px solid ${badgeColor}`; }
                    if (log.action === 'PROMOTION') { badgeColor = '#f59e0b'; badgeText = 'AWANS'; borderLeft = `3px solid ${badgeColor}`; }
                    if (log.action === 'DEMOTION') { badgeColor = '#ef4444'; badgeText = 'DEGRADACJA'; borderLeft = `3px solid ${badgeColor}`; }
                  }

                  return (
                    <div key={log.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderLeft, borderRadius: '6px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span style={{ color: badgeColor, fontWeight: 'bold', fontSize: '0.75rem' }}>[{badgeText}]</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>dla</span>
                          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.85rem' }}>{log.officer?.firstName} {log.officer?.lastName}</span>
                        </div>
                        <div style={{ color: '#cbd5e1', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>{log.description}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>{format(new Date(log.date), 'dd/MM/yyyy HH:mm')}</div>
                        {log.issuer && (
                          <div style={{ color: '#64748b', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>Wystawił: {log.issuer?.lastName}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* SEKCJA: Ranking */}
        <div>
          <h3 style={{ color: '#facc15', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
            <Award size={16} /> Hall of Fame LSPD & BCSO (Godziny na Służbie)
          </h3>
          <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {topOfficers.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem', fontFamily: 'var(--font-mono)' }}>Brak zarejestrowanych godzin.</p>
            ) : (
              <>
                {/* TOP 5 E-SPORTS CARDS */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem', paddingBottom: '1rem', flexWrap: 'wrap' }}>
                  
                  {/* #4 Miejsce */}
                  {topOfficers[3] && (
                    <div style={{ 
                      width: '180px', background: 'linear-gradient(180deg, rgba(51, 65, 85, 0.1) 0%, rgba(15, 23, 42, 0.7) 100%)', 
                      borderRadius: '12px', border: '1px solid rgba(51, 65, 85, 0.3)', boxShadow: '0 5px 15px -5px rgba(0,0,0,0.3)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 0.75rem 1rem 0.75rem',
                      position: 'relative', transition: 'transform 0.3s', cursor: 'default'
                    }} onMouseOver={e=>{e.currentTarget.style.transform='translateY(-5px)'}} onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)'}}>
                      <div style={{ position: 'absolute', top: '-15px', background: '#0f172a', borderRadius: '50%', padding: '0.4rem', border: '1px solid rgba(51, 65, 85, 0.4)' }}>
                        <span style={{ fontWeight: 900, color: '#94a3b8', fontSize: '0.9rem' }}>#4</span>
                      </div>
                      <div style={{ width: '50px', height: '50px', position: 'relative', marginBottom: '0.75rem' }}>
                        <img src={topOfficers[3].department === 'LSPD' ? '/lspd_logo.png' : '/bcso_logo.png'} alt="Badge" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.2))' }} />
                        <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', background: '#0f172a', border: '1px solid #334155', borderRadius: '4px', padding: '0 4px', fontSize: '0.65rem', fontWeight: 900, color: '#f8fafc' }}>{topOfficers[3].badgeNumber}</div>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#f8fafc', textAlign: 'center', lineHeight: 1.1 }}>{topOfficers[3].lastName}</h3>
                      <div style={{ marginTop: '0.75rem', textAlign: 'center', width: '100%', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '6px' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#cbd5e1', lineHeight: 1, fontFamily: 'var(--font-mono)' }}>{topOfficers[3].score.toFixed(1)}<span style={{fontSize: '0.7rem', color: '#64748b', marginLeft: '2px'}}>h</span></div>
                      </div>
                    </div>
                  )}

                  {/* #2 Miejsce (Srebro) */}
                  {topOfficers[1] && (
                    <div style={{ 
                      width: '200px', background: 'linear-gradient(180deg, rgba(148, 163, 184, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)', 
                      borderRadius: '14px', border: '1px solid rgba(148, 163, 184, 0.3)', boxShadow: '0 10px 25px -10px rgba(148, 163, 184, 0.2)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1rem 1.25rem 1rem',
                      position: 'relative', transition: 'transform 0.3s', cursor: 'default'
                    }} onMouseOver={e=>{e.currentTarget.style.transform='translateY(-5px)'}} onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)'}}>
                      <div style={{ position: 'absolute', top: '-18px', background: '#0f172a', borderRadius: '50%', padding: '0.4rem', border: '2px solid rgba(148, 163, 184, 0.4)' }}>
                        <Medal size={20} color="#cbd5e1" />
                      </div>
                      <div style={{ width: '60px', height: '60px', position: 'relative', marginBottom: '1rem' }}>
                        <img src={topOfficers[1].department === 'LSPD' ? '/lspd_logo.png' : '/bcso_logo.png'} alt="Badge" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(148,163,184,0.3))' }} />
                        <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)', border: '2px solid #0f172a', borderRadius: '4px', padding: '0 6px', fontSize: '0.75rem', fontWeight: 900, color: '#0f172a' }}>{topOfficers[1].badgeNumber}</div>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#f8fafc', textAlign: 'center', lineHeight: 1.2 }}>{topOfficers[1].firstName}<br/>{topOfficers[1].lastName}</h3>
                      <div style={{ marginTop: '1rem', textAlign: 'center', width: '100%', background: 'rgba(0,0,0,0.3)', padding: '0.6rem', borderRadius: '6px', borderTop: '1px solid rgba(148,163,184,0.1)' }}>
                        <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#cbd5e1', lineHeight: 1, fontFamily: 'var(--font-mono)' }}>{topOfficers[1].score.toFixed(1)}<span style={{fontSize: '0.8rem', color: '#94a3b8', marginLeft: '2px'}}>h</span></div>
                      </div>
                    </div>
                  )}

                  {/* #1 Miejsce (Złoto) */}
                  {topOfficers[0] && (
                    <div style={{ 
                      width: '230px', background: 'linear-gradient(180deg, rgba(250, 204, 21, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)', 
                      borderRadius: '16px', border: '1px solid rgba(250, 204, 21, 0.5)', boxShadow: '0 10px 35px -5px rgba(250, 204, 21, 0.3)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2.5rem 1rem 1.5rem 1rem',
                      position: 'relative', transform: 'scale(1.05)', transition: 'transform 0.3s', cursor: 'default', zIndex: 10
                    }} onMouseOver={e=>{e.currentTarget.style.transform='scale(1.08)'}} onMouseOut={e=>{e.currentTarget.style.transform='scale(1.05)'}}>
                      <div style={{ position: 'absolute', top: '-25px', background: '#0f172a', borderRadius: '50%', padding: '0.6rem', border: '2px solid rgba(250, 204, 21, 0.6)', boxShadow: '0 0 20px rgba(250, 204, 21, 0.5)' }}>
                        <Crown size={28} color="#facc15" />
                      </div>
                      <div style={{ width: '80px', height: '80px', position: 'relative', marginBottom: '1.25rem' }}>
                        <img src={topOfficers[0].department === 'LSPD' ? '/lspd_logo.png' : '/bcso_logo.png'} alt="Badge" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 15px rgba(250,204,21,0.4))' }} />
                        <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #facc15, #ca8a04)', border: '2px solid #0f172a', borderRadius: '6px', padding: '2px 8px', fontSize: '0.9rem', fontWeight: 900, color: '#0f172a', boxShadow: '0 2px 10px rgba(250,204,21,0.3)' }}>{topOfficers[0].badgeNumber}</div>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#f8fafc', textAlign: 'center', lineHeight: 1.1 }}>{topOfficers[0].firstName}<br/>{topOfficers[0].lastName}</h3>
                      <div style={{ marginTop: '1.5rem', textAlign: 'center', width: '100%', background: 'rgba(0,0,0,0.4)', padding: '0.75rem', borderRadius: '8px', borderTop: '1px solid rgba(250,204,21,0.2)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: '#facc15', lineHeight: 1, textShadow: '0 0 10px rgba(250, 204, 21, 0.4)', fontFamily: 'var(--font-mono)' }}>{topOfficers[0].score.toFixed(1)}<span style={{fontSize: '1rem', color: '#ca8a04', marginLeft: '2px'}}>h</span></div>
                      </div>
                    </div>
                  )}

                  {/* #3 Miejsce (Brąz) */}
                  {topOfficers[2] && (
                    <div style={{ 
                      width: '200px', background: 'linear-gradient(180deg, rgba(180, 83, 9, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)', 
                      borderRadius: '14px', border: '1px solid rgba(180, 83, 9, 0.3)', boxShadow: '0 10px 25px -10px rgba(180, 83, 9, 0.2)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1rem 1.25rem 1rem',
                      position: 'relative', transition: 'transform 0.3s', cursor: 'default'
                    }} onMouseOver={e=>{e.currentTarget.style.transform='translateY(-5px)'}} onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)'}}>
                      <div style={{ position: 'absolute', top: '-18px', background: '#0f172a', borderRadius: '50%', padding: '0.4rem', border: '2px solid rgba(180, 83, 9, 0.4)' }}>
                        <Award size={20} color="#d97706" />
                      </div>
                      <div style={{ width: '60px', height: '60px', position: 'relative', marginBottom: '1rem' }}>
                        <img src={topOfficers[2].department === 'LSPD' ? '/lspd_logo.png' : '/bcso_logo.png'} alt="Badge" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(180,83,9,0.3))' }} />
                        <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #f59e0b, #92400e)', border: '2px solid #0f172a', borderRadius: '4px', padding: '0 6px', fontSize: '0.75rem', fontWeight: 900, color: '#0f172a' }}>{topOfficers[2].badgeNumber}</div>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#f8fafc', textAlign: 'center', lineHeight: 1.2 }}>{topOfficers[2].firstName}<br/>{topOfficers[2].lastName}</h3>
                      <div style={{ marginTop: '1rem', textAlign: 'center', width: '100%', background: 'rgba(0,0,0,0.3)', padding: '0.6rem', borderRadius: '6px', borderTop: '1px solid rgba(180,83,9,0.1)' }}>
                        <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#d97706', lineHeight: 1, fontFamily: 'var(--font-mono)' }}>{topOfficers[2].score.toFixed(1)}<span style={{fontSize: '0.8rem', color: '#92400e', marginLeft: '2px'}}>h</span></div>
                      </div>
                    </div>
                  )}

                  {/* #5 Miejsce */}
                  {topOfficers[4] && (
                    <div style={{ 
                      width: '180px', background: 'linear-gradient(180deg, rgba(51, 65, 85, 0.1) 0%, rgba(15, 23, 42, 0.7) 100%)', 
                      borderRadius: '12px', border: '1px solid rgba(51, 65, 85, 0.3)', boxShadow: '0 5px 15px -5px rgba(0,0,0,0.3)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 0.75rem 1rem 0.75rem',
                      position: 'relative', transition: 'transform 0.3s', cursor: 'default'
                    }} onMouseOver={e=>{e.currentTarget.style.transform='translateY(-5px)'}} onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)'}}>
                      <div style={{ position: 'absolute', top: '-15px', background: '#0f172a', borderRadius: '50%', padding: '0.4rem', border: '1px solid rgba(51, 65, 85, 0.4)' }}>
                        <span style={{ fontWeight: 900, color: '#94a3b8', fontSize: '0.9rem' }}>#5</span>
                      </div>
                      <div style={{ width: '50px', height: '50px', position: 'relative', marginBottom: '0.75rem' }}>
                        <img src={topOfficers[4].department === 'LSPD' ? '/lspd_logo.png' : '/bcso_logo.png'} alt="Badge" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.2))' }} />
                        <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', background: '#0f172a', border: '1px solid #334155', borderRadius: '4px', padding: '0 4px', fontSize: '0.65rem', fontWeight: 900, color: '#f8fafc' }}>{topOfficers[4].badgeNumber}</div>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#f8fafc', textAlign: 'center', lineHeight: 1.1 }}>{topOfficers[4].lastName}</h3>
                      <div style={{ marginTop: '0.75rem', textAlign: 'center', width: '100%', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '6px' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#cbd5e1', lineHeight: 1, fontFamily: 'var(--font-mono)' }}>{topOfficers[4].score.toFixed(1)}<span style={{fontSize: '0.7rem', color: '#64748b', marginLeft: '2px'}}>h</span></div>
                      </div>
                    </div>
                  )}

                </div>
              </>
            )}

          </div>
        </div>

      </div>

      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
          <Briefcase size={16} /> Moduły Nawigacyjne
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <button className="btn-primary" style={{ background: 'var(--bg-dark)', color: '#3b82f6', border: '1px solid var(--border-color)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }} onClick={() => navigate('/duty')}>
            <Clock size={20} /> Zarejestruj czas służby
          </button>
          <button className="btn-primary" style={{ background: 'var(--bg-dark)', color: '#10b981', border: '1px solid var(--border-color)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }} onClick={() => navigate('/points')}>
            <Award size={20} /> Wypisz plus/minus
          </button>
          <button className="btn-primary" style={{ background: 'var(--bg-dark)', color: '#8b5cf6', border: '1px solid var(--border-color)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }} onClick={() => navigate('/payroll')}>
            <TrendingUp size={20} /> Wypłaty
          </button>
          <button className="btn-primary" style={{ background: 'var(--bg-dark)', color: '#f59e0b', border: '1px solid var(--border-color)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }} onClick={() => navigate('/roster')}>
            <Users size={20} /> Lista funkcjonariuszy
          </button>
        </div>
      </div>
      </>
      )}
    </div>
  );
}

export default Dashboard;
