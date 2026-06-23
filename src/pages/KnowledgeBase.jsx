import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Map, FileText, Search, ShieldAlert } from 'lucide-react';

const TEN_CODES = [
  { code: '10-4', desc: 'Zrozumiałem / Potwierdzam' },
  { code: '10-8', desc: 'Dostępny na służbie' },
  { code: '10-7', desc: 'Niedostępny na służbie' },
  { code: '10-5', desc: 'W drodze' },
  { code: '10-6', desc: 'Zajęty (np. Traffic Stop)' },
  { code: '10-10', desc: 'Strzały / Użycie broni' },
  { code: '10-13', desc: 'Ranny funkcjonariusz / Potrzebny medyk' },
  { code: '10-20', desc: 'Lokalizacja' },
  { code: '10-70', desc: 'Pościg pieszy' },
  { code: '10-80', desc: 'Pościg zmotoryzowany' },
  { code: 'Code 4', desc: 'Sytuacja opanowana, brak dalszej pomocy' },
  { code: 'Code 5', desc: 'Felony Stop (Zatrzymanie wysokiego ryzyka)' },
  { code: 'Code 77', desc: 'Zasadzka / Możliwa pułapka' }
];

function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState('codes');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCodes = TEN_CODES.filter(c => 
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="page-header">
        <div className="page-title">
          <h2>Baza Wiedzy</h2>
          <p>Podręcznik oficera i kody radiowe</p>
        </div>
      </div>

      {/* Zakładki */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className={`btn-primary ${activeTab === 'codes' ? '' : 'btn-outline'}`}
          onClick={() => setActiveTab('codes')}
          style={activeTab === 'codes' ? {} : { color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}
        >
          <Book size={18} /> Kody Radiowe
        </button>
        <button 
          className={`btn-primary ${activeTab === 'miranda' ? '' : 'btn-outline'}`}
          onClick={() => setActiveTab('miranda')}
          style={activeTab === 'miranda' ? {} : { color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}
        >
          <ShieldAlert size={18} /> Prawa Mirandy
        </button>
        <button 
          className={`btn-primary ${activeTab === 'map' ? '' : 'btn-outline'}`}
          onClick={() => setActiveTab('map')}
          style={activeTab === 'map' ? {} : { color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}
        >
          <Map size={18} /> Mapa Sektorów
        </button>
      </div>

      {/* Kontent Zakładek */}
      {activeTab === 'codes' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Kody 10- i Statusy</h3>
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="form-control" 
                placeholder="Szukaj kodu..." 
                style={{ paddingLeft: '2.5rem' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="table-container">
            <table className="mdt-table">
              <thead>
                <tr>
                  <th style={{ width: '150px' }}>KOD</th>
                  <th>ZNACZENIE</th>
                </tr>
              </thead>
              <tbody>
                {filteredCodes.map((item, idx) => (
                  <tr key={idx}>
                    <td><strong style={{ color: 'var(--lspd-blue)' }}>{item.code}</strong></td>
                    <td>{item.desc}</td>
                  </tr>
                ))}
                {filteredCodes.length === 0 && (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                      Brak wyników
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'miranda' && (
        <div className="glass-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <ShieldAlert size={20} color="var(--gold-cb)" /> Prawa Mirandy (Formułka zatrzymania)
          </h3>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#e2e8f0', fontStyle: 'italic' }}>
              "Masz prawo zachować milczenie. Wszystko, co powiesz, może i zostanie użyte przeciwko tobie w sądzie. <br /><br />
              Masz prawo do adwokata. Jeśli cię na niego nie stać, zostanie ci przydzielony z urzędu. <br /><br />
              Czy rozumiesz prawa, które ci przedstawiłem?"
            </p>
          </div>
        </div>
      )}

      {activeTab === 'map' && (
        <div className="glass-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Map size={20} color="var(--bcso-green)" /> Mapa Sektorów
          </h3>
          <div style={{ background: 'rgba(0,0,0,0.2)', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)' }}>
            <p style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Map size={48} opacity={0.5} />
              <em>Tutaj możesz w przyszłości wrzucić zdjęcie mapy z postal codes.</em>
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default KnowledgeBase;
