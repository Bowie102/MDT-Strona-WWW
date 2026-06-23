import { API_BASE_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { Users, Shield, Clock, Activity, FileText, Briefcase, Award, TrendingUp, AlertTriangle, Terminal } from 'lucide-react';
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
      fetch(`${API_BASE_URL}/api/dashboard-logs`).then(res => res.json())
    ]).then(([officersData, logsData]) => {
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

      // Generowanie realistycznego rankingu na podstawie aktywności i odznaczeń (symulowane deterministycznie dla wizualizacji)
      const ranking = [...officersData]
        .filter(off => off.status.includes('AKTYWNY'))
        .map(off => {
          let score = 150 + (off.id * 7) % 85; 
          if (off.isHC) score += 100;
          if (off.isCB) score += 50;
          return { ...off, score };
        })
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
            <p>Zastępcy BCSO</p>
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

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        
        {/* LEWA KOLUMNA: Ostatnia Aktywność */}
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

        {/* PRAWA KOLUMNA: Ranking */}
        <div>
          <h3 style={{ color: '#facc15', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
            <Award size={16} /> Hall of Fame LSPD & BCSO
          </h3>
          <div className="glass-card" style={{ padding: '0.75rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(30, 41, 59, 0.8) 100%)', border: '1px solid rgba(250, 204, 21, 0.15)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            
            {topOfficers.map((off, idx) => {
              const isFirst = idx === 0;
              const isSecond = idx === 1;
              const isThird = idx === 2;
              
              let rankColor = '#64748b';
              if (isFirst) rankColor = '#facc15';
              else if (isSecond) rankColor = '#cbd5e1';
              else if (isThird) rankColor = '#b45309';

              return (
                <div key={off.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1.25rem', background: isFirst ? 'rgba(250, 204, 21, 0.05)' : 'rgba(0,0,0,0.3)', borderRadius: '8px', borderLeft: `4px solid ${rankColor}`, border: isFirst ? '1px solid rgba(250, 204, 21, 0.2)' : '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden', transition: 'transform 0.2s' }} onMouseOver={e=>e.currentTarget.style.transform='translateX(4px)'} onMouseOut={e=>e.currentTarget.style.transform='translateX(0)'}>
                  
                  <div style={{ position: 'absolute', right: '-10px', top: '-15px', fontSize: '5rem', opacity: isFirst ? 0.08 : 0.03, fontWeight: 900, color: rankColor, pointerEvents: 'none' }}>
                    #{idx + 1}
                  </div>

                  <div style={{ width: '38px', height: '38px', background: 'rgba(0,0,0,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem', color: rankColor, border: `1px solid ${rankColor}40`, boxShadow: isFirst ? '0 0 10px rgba(250, 204, 21, 0.2)' : 'none' }}>
                    #{idx + 1}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: isFirst ? '#facc15' : '#f8fafc', fontSize: '1.05rem', letterSpacing: '0.5px' }}>{off.firstName} {off.lastName}</span>
                      <span style={{ fontSize: '0.65rem', color: off.department === 'LSPD' ? '#60a5fa' : '#34d399', background: off.department === 'LSPD' ? 'rgba(59,130,246,0.1)' : 'rgba(16,185,129,0.1)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase' }}>{off.department}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{off.rank} • Odznaka [{off.badgeNumber}]</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f8fafc', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{off.score}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Skuteczność</div>
                  </div>
                </div>
              );
            })}

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
