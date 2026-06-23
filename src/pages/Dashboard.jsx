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
                {/* PODIUM dla TOP 3 */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '0.5rem', marginTop: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {/* #2 Miejsce */}
                  {topOfficers[1] && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative', transition: 'transform 0.3s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ marginBottom: '0.5rem', width: '45px', height: '45px', borderRadius: '50%', background: 'var(--bg-dark)', border: '2px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#cbd5e1', fontSize: '1rem', boxShadow: '0 0 15px rgba(203, 213, 225, 0.3)', position: 'relative', zIndex: 2 }}>
                        {topOfficers[1].badgeNumber}
                      </div>
                      <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.85rem', lineHeight: 1.1 }}>{topOfficers[1].lastName}</div>
                        <div style={{ fontSize: '0.65rem', color: topOfficers[1].department === 'LSPD' ? '#60a5fa' : '#34d399', fontWeight: 'bold' }}>{topOfficers[1].department}</div>
                      </div>
                      <div style={{ width: '100%', height: '100px', background: 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(203, 213, 225, 0.15))', borderTop: '4px solid #cbd5e1', borderRadius: '6px 6px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '1rem', borderLeft: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: '#cbd5e1', opacity: 0.8 }}>#2</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', marginTop: 'auto', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>{topOfficers[1].score.toFixed(1)}h</div>
                      </div>
                    </div>
                  )}

                  {/* #1 Miejsce */}
                  {topOfficers[0] && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1.2, position: 'relative', transition: 'transform 0.3s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <Award size={24} color="#facc15" style={{ position: 'absolute', top: '-60px', zIndex: 3, filter: 'drop-shadow(0 0 5px rgba(250,204,21,0.5))' }} />
                      <div style={{ marginBottom: '0.5rem', width: '55px', height: '55px', borderRadius: '50%', background: 'var(--bg-dark)', border: '2px solid #facc15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#facc15', fontSize: '1.2rem', boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)', position: 'relative', zIndex: 2 }}>
                        {topOfficers[0].badgeNumber}
                      </div>
                      <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ fontWeight: 900, color: '#facc15', fontSize: '0.95rem', lineHeight: 1.1 }}>{topOfficers[0].lastName}</div>
                        <div style={{ fontSize: '0.7rem', color: topOfficers[0].department === 'LSPD' ? '#60a5fa' : '#34d399', fontWeight: 'bold' }}>{topOfficers[0].department}</div>
                      </div>
                      <div style={{ width: '100%', height: '140px', background: 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(250, 204, 21, 0.2))', borderTop: '4px solid #facc15', borderRadius: '8px 8px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '1rem', borderLeft: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#facc15', opacity: 0.9, textShadow: '0 0 10px rgba(250,204,21,0.3)' }}>#1</div>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginTop: 'auto', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>{topOfficers[0].score.toFixed(1)}h</div>
                      </div>
                    </div>
                  )}

                  {/* #3 Miejsce */}
                  {topOfficers[2] && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative', transition: 'transform 0.3s' }} onMouseOver={e=>e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>
                      <div style={{ marginBottom: '0.5rem', width: '45px', height: '45px', borderRadius: '50%', background: 'var(--bg-dark)', border: '2px solid #b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#b45309', fontSize: '1rem', boxShadow: '0 0 15px rgba(180, 83, 9, 0.3)', position: 'relative', zIndex: 2 }}>
                        {topOfficers[2].badgeNumber}
                      </div>
                      <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.85rem', lineHeight: 1.1 }}>{topOfficers[2].lastName}</div>
                        <div style={{ fontSize: '0.65rem', color: topOfficers[2].department === 'LSPD' ? '#60a5fa' : '#34d399', fontWeight: 'bold' }}>{topOfficers[2].department}</div>
                      </div>
                      <div style={{ width: '100%', height: '80px', background: 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(180, 83, 9, 0.2))', borderTop: '4px solid #b45309', borderRadius: '6px 6px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '0.5rem', borderLeft: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#b45309', opacity: 0.8 }}>#3</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', marginTop: 'auto', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>{topOfficers[2].score.toFixed(1)}h</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reszta (Miejsca 4-5) jako czysta lista */}
                {topOfficers.length > 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {topOfficers.slice(3).map((off, idx) => (
                      <div key={off.id} style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                        background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', 
                        borderRadius: '4px', border: '1px solid rgba(255,255,255,0.02)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ fontWeight: 800, color: '#64748b', fontSize: '1rem', minWidth: '24px' }}>
                            #{idx + 4}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.85rem' }}>
                              {off.firstName} {off.lastName} 
                              <span style={{ marginLeft: '0.5rem', color: off.department === 'LSPD' ? '#60a5fa' : '#34d399', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>[{off.badgeNumber}]</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ fontWeight: 700, color: '#94a3b8', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                          {off.score.toFixed(1)}h
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
