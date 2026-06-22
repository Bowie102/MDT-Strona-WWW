import { API_BASE_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, UserPlus, X } from 'lucide-react';

const RANK_WEIGHTS = {
  'Chief of Police': 100,
  'Assistant Chief': 95,
  'Deputy Chief': 90,
  'Commander': 85,
  'Sheriff': 84,
  'Undersheriff': 82,
  'Captain': 80,
  'Lieutenant II': 75,
  'Lieutenant I': 70,
  'Master Sergeant': 65, 'Sergeant III': 65,
  'Staff Sergeant': 60, 'Sergeant II': 60,
  'Sergeant': 55, 'Sergeant I': 55,
  'Corporal': 50,
  'Officer III+1': 45,
  'Officer III': 40, 'Deputy III': 40,
  'Officer II': 35, 'Deputy II': 35,
  'Officer I': 30, 'Deputy I': 30,
  'Cadet': 0
};

const DIVISIONS = ['METRO', 'FTD', 'HWP', 'DTU'];
const TRAININGS = ['SEU', 'SV', 'NT', 'PWC', 'WU', 'K9', 'ASU', 'MARY', 'FAC'];
const STATUSES = ['AKTYWNY', 'URLOP', 'ZAWIESZONY', 'SZKOLENIE'];

const RANKS = {
  LSPD: [
    'Chief of Police', 'Assistant Chief', 'Deputy Chief', 'Commander', 'Captain',
    'Lieutenant II', 'Lieutenant I', 'Master Sergeant', 'Staff Sergeant', 'Sergeant',
    'Officer III+1', 'Officer III', 'Officer II', 'Officer I', 'Cadet'
  ],
  BCSO: [
    'Sheriff', 'Undersheriff', 'Lieutenant II', 'Lieutenant I',
    'Sergeant III', 'Sergeant II', 'Sergeant I', 'Corporal',
    'Deputy III', 'Deputy II', 'Deputy I'
  ]
};

function Roster({ isLoggedIn }) {
  const [officers, setOfficers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('ALL');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentOfficer, setCurrentOfficer] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', discordNick: '', department: 'LSPD', rank: 'Cadet',
    isHC: false, isCB: false, statuses: [], divisions: [], trainings: [], discordAlert: true, notes: '', dtuRank: '', dtuAlias: '', ftdRank: '', metroRank: '', hwpRank: ''
  });

  const [dutyLogs, setDutyLogs] = useState([]);

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = () => {
    Promise.all([
      fetch(API_BASE_URL + '/api/officers').then(res => res.json()),
      fetch(API_BASE_URL + '/api/duty').then(res => res.json())
    ]).then(([officersData, logsData]) => {
      setOfficers(officersData);
      setDutyLogs(logsData);
    });
  };

  const safeParseJSON = (str) => {
    if (!str) return [];
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [str];
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      firstName: '', lastName: '', discordNick: '', department: 'LSPD', rank: 'Cadet',
      isHC: false, isCB: false, statuses: [], divisions: [], trainings: [], discordAlert: true, notes: '', dtuRank: '', dtuAlias: '', ftdRank: '', metroRank: '', hwpRank: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (off) => {
    setIsEditMode(true);
    setCurrentOfficer(off);
    setFormData({
      firstName: off.firstName, lastName: off.lastName, discordNick: off.discordNick || '',
      department: off.department, rank: off.rank, isHC: off.isHC, isCB: off.isCB,
      statuses: safeParseJSON(off.status), divisions: safeParseJSON(off.divisions),
      trainings: safeParseJSON(off.trainings), discordAlert: true, notes: off.notes || '', dtuRank: off.dtuRank || '', dtuAlias: off.dtuAlias || '',
      ftdRank: off.ftdRank || '', metroRank: off.metroRank || '', metroBadge: off.metroBadge || '', metroAlias: off.metroAlias || '', hwpRank: off.hwpRank || ''
    });
    setIsModalOpen(true);
  };

  const handleToggle = (field, value) => {
    setFormData(prev => {
      const arr = prev[field] || [];
      if (arr.includes(value)) {
        return { ...prev, [field]: arr.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...arr, value] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditMode ? `${API_BASE_URL}/api/officers/${currentOfficer.id}` : `${API_BASE_URL}/api/officers`;
    const method = isEditMode ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(() => {
      setIsModalOpen(false);
      fetchOfficers();
    })
    .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    const reason = window.prompt('Wpisz powód zwolnienia funkcjonariusza:');
    if (reason === null) return; // Anulowano
    
    if (window.confirm('Potwierdzasz usunięcie z bazy? Zabrane zostaną mu również role na Discordzie.')) {
      fetch(`${API_BASE_URL}/api/officers/${id}?reason=${encodeURIComponent(reason || 'Brak podanego powodu')}`, { method: 'DELETE' })
        .then(() => fetchOfficers());
    }
  };

  const filtered = officers.filter(o => {
    if (filterDept !== 'ALL') {
      if (filterDept === 'LSPD' || filterDept === 'BCSO') {
        if (o.department !== filterDept) return false;
      } else {
        const divs = safeParseJSON(o.divisions) || [];
        if (!divs.includes(filterDept)) return false;
      }
    }
    const term = searchTerm.toLowerCase();
    return o.firstName.toLowerCase().includes(term) ||
           o.lastName.toLowerCase().includes(term) ||
           o.badgeNumber.includes(term);
  }).sort((a, b) => {
    // 1. Logika sortowania po rangach wydziałowych (tylko, gdy wybrano wydział)
    let divWeightA = 0;
    let divWeightB = 0;

    const getDivWeight = (rank) => {
      if (!rank) return 0;
      const upper = rank.toUpperCase();
      if (upper.includes('COMMANDER')) {
        if (upper.includes('DEPUTY')) return 90;
        return 100;
      }
      if (upper.includes('LEAD DETECTIVE')) return 80;
      if (upper.includes('SENIOR DETECTIVE')) return 70;
      if (upper === 'DETECTIVE') return 60;
      if (upper.includes('JUNIOR DETECTIVE')) return 50;
      return 0;
    };

    if (filterDept === 'DTU') {
      divWeightA = getDivWeight(a.dtuRank);
      divWeightB = getDivWeight(b.dtuRank);
    } else if (filterDept === 'METRO') {
      divWeightA = getDivWeight(a.metroRank);
      divWeightB = getDivWeight(b.metroRank);
    } else if (filterDept === 'FTD') {
      divWeightA = getDivWeight(a.ftdRank);
      divWeightB = getDivWeight(b.ftdRank);
    } else if (filterDept === 'HWP') {
      divWeightA = getDivWeight(a.hwpRank);
      divWeightB = getDivWeight(b.hwpRank);
    }

    if (divWeightA !== divWeightB) {
      return divWeightB - divWeightA;
    }

    // 2. Standardowa logika sortowania po głównej randze
    const weightA = RANK_WEIGHTS[a.rank] || 0;
    const weightB = RANK_WEIGHTS[b.rank] || 0;
    
    // Sort descending by rank weight
    if (weightA !== weightB) {
      return weightB - weightA;
    }
    // If rank is identical, sort by badge number ascending
    return parseInt(a.badgeNumber) - parseInt(b.badgeNumber);
  });

  const getShortRank = (rank) => {
    if (!rank) return '';
    const map = {
      'Chief of Police': 'COP', 'Assistant Chief': 'AC', 'Deputy Chief': 'DC', 'Commander': 'CMD',
      'Captain': 'CPT', 'Lieutenant II': 'LT II', 'Lieutenant I': 'LT I',
      'Master Sergeant': 'MSG', 'Staff Sergeant': 'SSG', 'Sergeant': 'SGT', 'Sergeant III': 'SGT III', 'Sergeant II': 'SGT II', 'Sergeant I': 'SGT I',
      'Corporal': 'CPL', 'Officer III+1': 'OFC III+', 'Officer III': 'OFC III', 'Officer II': 'OFC II', 'Officer I': 'OFC I',
      'Cadet': 'CDT', 'Sheriff': 'SHF', 'Undersheriff': 'USHR', 'Assistant Sheriff': 'ASHF',
      'Deputy Sheriff': 'DEP', 'Deputy III': 'DEP III', 'Deputy II': 'DEP II', 'Deputy I': 'DEP I'
    };
    return map[rank] || rank.substring(0, 3).toUpperCase();
  };

  const getRankClass = (off) => {
    if (off.rank === 'Sheriff' || off.rank === 'Undersheriff') return 'rank-hc-text';
    if (off.rank === 'Captain') return 'rank-cpt-text';
    
    const weight = RANK_WEIGHTS[off.rank] || 0;
    if (weight >= 85) return 'rank-hc-text';
    if (weight >= 70) return 'rank-cmd-text';
    if (weight >= 50) return 'rank-sup-text';
    return off.department === 'BCSO' ? 'rank-bcso-text' : 'rank-lspd-text';
  };

  const COLS_DIV = ['METRO', 'FTD', 'Highway Patrol Division', 'DTU'];
  const COLS_TRN = ['SEU', 'SV', 'NT', 'PWC', 'WU', 'K9', 'ASU', 'MARY', 'FAC'];

  // --- AUTO-SCALING LOGIC ---
  const containerRef = React.useRef(null);
  const tableRef = React.useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && tableRef.current) {
        // Zresetuj transformacje by pobrać naturalną szerokość
        tableRef.current.style.transform = 'none';
        tableRef.current.style.width = 'max-content';
        
        const containerWidth = containerRef.current.clientWidth;
        const tableNaturalWidth = tableRef.current.offsetWidth;

        if (tableNaturalWidth > containerWidth && containerWidth > 0) {
          const scaleRatio = containerWidth / tableNaturalWidth;
          tableRef.current.style.transform = `scale(${scaleRatio})`;
          tableRef.current.style.transformOrigin = 'top left';
          // Dostosuj wysokość kontenera, żeby nie było pustej przestrzeni pod tabelą po jej zmniejszeniu
          containerRef.current.style.height = `${tableRef.current.offsetHeight * scaleRatio}px`;
        } else {
          tableRef.current.style.transform = 'none';
          tableRef.current.style.width = '100%';
          containerRef.current.style.height = 'auto';
        }
      }
    };

    // Odpal przy każdej zmianie rozmiaru okna lub przy zmianie wierszy (filtered)
    window.addEventListener('resize', handleResize);
    // Małe opóźnienie dla pewności, że React wyrenderował tabelę
    setTimeout(handleResize, 50); 
    
    return () => window.removeEventListener('resize', handleResize);
  }, [filtered]);

  return (
    <div className="main-content">
      <div className="page-header">
        <div className="page-title">
          <h2>Lista Funkcjonariuszy</h2>
          <p>Zarządzaj kadrą wydziału oraz stopniami.</p>
        </div>
        {isLoggedIn && (
          <button className="btn-primary" onClick={() => openAddModal()}>
            <UserPlus size={18} />
            Dodaj Funkcjonariusza
          </button>
        )}
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-control" 
            placeholder="Szukaj po odznace, nazwisku..." 
            style={{ paddingLeft: '2.5rem' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="form-control" style={{ width: '250px' }} value={filterDept} onChange={e => setFilterDept(e.target.value)}>
          <option value="ALL">Wszystkie Jednostki i Wydziały</option>
          <optgroup label="Departamenty">
            <option value="LSPD">LSPD</option>
            <option value="BCSO">BCSO</option>
          </optgroup>
          <optgroup label="Wydziały">
            <option value="DTU">Detective Training Unit (DTU)</option>
            <option value="METRO">Metropolitan Division (METRO)</option>
            <option value="FTD">Field Training Division (FTD)</option>
            <option value="HWP">Highway Patrol (HWP)</option>
          </optgroup>
        </select>
      </div>

      <div ref={containerRef} style={{ width: '100%', overflowX: 'hidden', paddingBottom: '1rem', position: 'relative' }}>
        <table ref={tableRef} className="nostalgia-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '30px' }}></th>
              <th>JEDNOSTKA</th>
              <th className="col-divider">ODZNAKA</th>
              <th className="col-divider">IMIĘ I NAZWISKO</th>
              <th className="col-divider">NICK</th>
              <th className="col-divider">STOPIEŃ</th>
              <th className="col-divider">STATUS</th>
              {COLS_DIV.map(d => <th key={d} className={d === 'METRO' ? 'col-divider' : ''}>{d === 'Highway Patrol Division' ? 'HWP' : d}</th>)}
              {COLS_TRN.map(t => <th key={t} className={t === 'SEU' ? 'col-divider' : ''}>{t}</th>)}
              <th className="col-divider" style={{ color: '#fbbf24', textAlign: 'center' }}>GODZINY</th>
              {isLoggedIn && <th className="col-divider">AKCJE</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map(off => {
              const divs = safeParseJSON(off.divisions);
              const trains = safeParseJSON(off.trainings);
              const isLspd = off.department === 'LSPD';
              
              let st = 'AKTYWNY';
              try {
                const p = JSON.parse(off.status);
                if (Array.isArray(p) && p.includes('URLOP')) st = 'URLOP';
              } catch (e) {}

              let rowClass = isLspd ? 'row-lspd' : 'row-bcso';
              if (off.isHC) rowClass = 'row-hc';

              return (
                <tr key={off.id} className={rowClass}>
                  <td>
                    <input type="checkbox" style={{ accentColor: '#fbbf24' }} />
                  </td>
                  <td>
                    <span className={`dept-pill ${isLspd ? 'lspd' : 'bcso'}`}>{off.department}</span>
                  </td>
                  <td className={`col-divider ${isLspd ? 'badge-lspd' : 'badge-bcso'}`}>
                    #{off.badgeNumber}
                    {divs.includes('METRO') && off.metroBadge && (
                      <span style={{ marginLeft: '4px', color: '#f8fafc', fontSize: '1rem', fontWeight: '900' }}>/{off.metroBadge}</span>
                    )}
                  </td>
                  <td className="name-cell col-divider">
                    {off.firstName} {off.lastName}
                    {off.dtuAlias && <span className="dtu-alias">"{off.dtuAlias}"</span>}
                    {off.metroAlias && <span className="metro-alias">"{off.metroAlias}"</span>}
                    {off.isHC && <span className="tag hc" style={{ marginLeft: '8px' }}>HC</span>}
                    {off.isCB && <span className="tag cb" style={{ marginLeft: '8px' }}>CB</span>}
                  </td>
                  <td className="col-divider" style={{ color: '#94a3b8' }}>{off.discordNick || '-'}</td>
                  <td className="col-divider">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                      <div className={`rank-full ${getRankClass(off)}`} style={{ fontSize: '0.9rem', fontWeight: 'bold', margin: 0 }}>{off.rank}</div>
                      {divs.includes('DTU') && off.dtuRank && (
                        <div className={off.dtuRank.toUpperCase().includes('COMMANDER') ? 'div-command-box' : 'dtu-rank-box'} style={{ margin: 0 }}>{off.dtuRank.toUpperCase()}</div>
                      )}
                      {divs.includes('FTD') && off.ftdRank && (
                        <div className={off.ftdRank.toUpperCase().includes('COMMANDER') ? 'div-command-box' : 'ftd-rank-box'} style={{ margin: 0 }}>{off.ftdRank.toUpperCase()}</div>
                      )}
                      {divs.includes('METRO') && off.metroRank && (
                        <div className={off.metroRank.toUpperCase().includes('COMMANDER') ? 'div-command-box' : 'metro-rank-box'} style={{ margin: 0 }}>{off.metroRank.toUpperCase()}</div>
                      )}
                      {divs.includes('HWP') && off.hwpRank && (
                        <div className={off.hwpRank.toUpperCase().includes('COMMANDER') ? 'div-command-box' : 'hwp-rank-box'} style={{ margin: 0 }}>{off.hwpRank.toUpperCase()}</div>
                      )}
                    </div>
                  </td>
                  <td className="col-divider">
                    <span className={`status-pill ${st.toLowerCase()}`}>{st}</span>
                  </td>
                  
                  {COLS_DIV.map(d => {
                    const hasDTU = divs.includes(d);
                    return (
                      <td key={d} className={`${hasDTU ? 'check-yes' : 'check-no'} ${d === 'METRO' ? 'col-divider' : ''}`} style={{ textAlign: 'center' }}>
                        {hasDTU ? '✓' : '—'}
                      </td>
                    );
                  })}
                  
                  {COLS_TRN.map(t => (
                    <td key={t} className={`${trains.includes(t) ? 'check-yes' : 'check-no'} ${t === 'SEU' ? 'col-divider' : ''}`} style={{ textAlign: 'center' }}>
                      {trains.includes(t) ? '✓' : '—'}
                    </td>
                  ))}
                  
                  <td className="col-divider" style={{ textAlign: 'center', color: '#fbbf24', fontWeight: 'bold' }}>
                    {(() => {
                      const userLogs = dutyLogs.filter(l => l.userId === off.id);
                      const totalHours = userLogs.reduce((sum, l) => sum + l.hours, 0);
                      return totalHours > 0 ? `${totalHours.toFixed(1)}h` : '0.0h';
                    })()}
                  </td>
                  
                  {isLoggedIn && (
                    <td className="col-divider">
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        <button className="btn-outline edit" onClick={() => openEditModal(off)}>
                          EDYTUJ
                        </button>
                        <button className="btn-outline delete" onClick={() => handleDelete(off.id)}>
                          USUŃ
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
              <div className="modal-header">
                <h3>{isEditMode ? 'Edytuj Funkcjonariusza' : 'Zatrudnij Funkcjonariusza'}</h3>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  
                  <div className="form-group">
                    <label>Imię</label>
                    <input className="form-control" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} required />
                  </div>
                  
                  <div className="form-group">
                    <label>Nazwisko</label>
                    <input className="form-control" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} required />
                  </div>

                  <div className="form-group">
                    <label>Jednostka</label>
                    <select className="form-control" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value, rank: RANKS[e.target.value][0]})}>
                      <option value="LSPD">LSPD</option>
                      <option value="BCSO">BCSO</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Stopień</label>
                    <select className="form-control" value={formData.rank} onChange={e => setFormData({...formData, rank: e.target.value})}>
                      {RANKS[formData.department].map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  {isEditMode && formData.rank !== currentOfficer?.rank && (
                    <div className="form-group" style={{ gridColumn: 'span 2', background: 'rgba(251, 191, 36, 0.05)', padding: '0.75rem', borderRadius: '4px', borderLeft: '3px solid #fbbf24' }}>
                      <label style={{ color: '#fbbf24' }}>Powód awansu/degradacji</label>
                      <input className="form-control" value={formData.actionReason || ''} onChange={e => setFormData({...formData, actionReason: e.target.value})} placeholder="np. Zaangażowanie w służbę..." style={{ marginTop: '0.5rem' }} />
                    </div>
                  )}

                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Discord Nick (Opcjonalny - np. Kubixon)</label>
                    <input className="form-control" value={formData.discordNick} onChange={e => setFormData({...formData, discordNick: e.target.value})} />
                  </div>

                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label>Wydziały</label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {DIVISIONS.map(div => (
                        <label key={div} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '4px' }}>
                          <input type="checkbox" checked={formData.divisions.includes(div)} onChange={() => handleToggle('divisions', div)} /> {div}
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.divisions.includes('DTU') && (
                    <div className="form-group" style={{ gridColumn: 'span 2', background: 'rgba(168, 85, 247, 0.1)', padding: '0.75rem', borderRadius: '4px', borderLeft: '3px solid #a855f7' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ color: '#d8b4fe' }}>Stopień Detektywistyczny</label>
                          <select className="form-control" value={formData.dtuRank || ''} onChange={e => setFormData({...formData, dtuRank: e.target.value})} style={{ marginTop: '0.5rem' }}>
                            <option value="">Brak stopnia (tylko przydział)</option>
                            <option value="Junior Detective">Junior Detective</option>
                            <option value="Detective">Detective</option>
                            <option value="Senior Detective">Senior Detective</option>
                            <option value="Lead Detective">Lead Detective</option>
                            <option value="Deputy Commander">Deputy Commander</option>
                            <option value="Commander DTU">Commander DTU</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ color: '#d8b4fe' }}>Pseudonim DTU (Opcjonalny)</label>
                          <input className="form-control" value={formData.dtuAlias || ''} onChange={e => setFormData({...formData, dtuAlias: e.target.value})} placeholder="np. Cień" style={{ marginTop: '0.5rem' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.divisions.includes('FTD') && (
                    <div className="form-group" style={{ gridColumn: 'span 2', background: 'rgba(6, 182, 212, 0.1)', padding: '0.75rem', borderRadius: '4px', borderLeft: '3px solid #06b6d4' }}>
                      <label style={{ color: '#67e8f9' }}>Stopień FTD</label>
                      <select className="form-control" value={formData.ftdRank || ''} onChange={e => setFormData({...formData, ftdRank: e.target.value})} style={{ marginTop: '0.5rem' }}>
                        <option value="">Brak stopnia (tylko przydział)</option>
                        <option value="Deputy Commander">Deputy Commander</option>
                        <option value="Commander FTD">Commander FTD</option>
                      </select>
                    </div>
                  )}

                  {formData.divisions.includes('METRO') && (
                    <div className="form-group" style={{ gridColumn: 'span 2', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '4px', borderLeft: '3px solid #ef4444' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                          <label style={{ color: '#fca5a5' }}>Stopień METRO</label>
                          <select className="form-control" value={formData.metroRank || ''} onChange={e => setFormData({...formData, metroRank: e.target.value})} style={{ marginTop: '0.5rem' }}>
                            <option value="">Brak stopnia (tylko przydział)</option>
                            <option value="Deputy Commander">Deputy Commander</option>
                            <option value="Commander METRO">Commander METRO</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ color: '#fca5a5' }}>Odznaka METRO</label>
                          <input className="form-control" value={formData.metroBadge || ''} onChange={e => setFormData({...formData, metroBadge: e.target.value})} placeholder="np. E-13" style={{ marginTop: '0.5rem' }} />
                        </div>
                        <div>
                          <label style={{ color: '#fca5a5' }}>Pseudonim METRO</label>
                          <input className="form-control" value={formData.metroAlias || ''} onChange={e => setFormData({...formData, metroAlias: e.target.value})} placeholder="np. Duch" style={{ marginTop: '0.5rem' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.divisions.includes('HWP') && (
                    <div className="form-group" style={{ gridColumn: 'span 2', background: 'rgba(245, 158, 11, 0.1)', padding: '0.75rem', borderRadius: '4px', borderLeft: '3px solid #f59e0b' }}>
                      <label style={{ color: '#fcd34d' }}>Stopień HWP</label>
                      <select className="form-control" value={formData.hwpRank || ''} onChange={e => setFormData({...formData, hwpRank: e.target.value})} style={{ marginTop: '0.5rem' }}>
                        <option value="">Brak stopnia (tylko przydział)</option>
                        <option value="Deputy Commander">Deputy Commander</option>
                        <option value="Commander HWP">Commander HWP</option>
                      </select>
                    </div>
                  )}

                  <div className="form-group">
                    <label>Szkolenia</label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {TRAININGS.map(train => (
                        <label key={train} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--bg-dark)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                          <input type="checkbox" checked={formData.trainings.includes(train)} onChange={() => handleToggle('trainings', train)} /> {train}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
                    <label style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                      <input type="checkbox" checked={formData.isHC} onChange={e => setFormData({...formData, isHC: e.target.checked})} /> High Command (HC)
                    </label>
                    <label style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                      <input type="checkbox" checked={formData.isCB} onChange={e => setFormData({...formData, isCB: e.target.checked})} /> Command Bureau (CB)
                    </label>
                  </div>

                  <div className="form-group">
                    <label style={{display:'flex', alignItems:'center', gap:'0.5rem', color: 'var(--lspd-blue)'}}>
                      <input type="checkbox" checked={formData.discordAlert} onChange={e => setFormData({...formData, discordAlert: e.target.checked})} /> Wyślij powiadomienie Discord
                    </label>
                  </div>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-danger" onClick={() => setIsModalOpen(false)}>Anuluj</button>
                  <button type="submit" className="btn-primary">Zapisz Dane</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Roster;

