import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Search } from 'lucide-react';

const FLEET_DATA = [
  { id: 1, tier: 'Tier 1', name: 'Stanier', ranks: 'Officer I / Deputy I', image: '/fleet/stanier.png' },
  { id: 2, tier: 'Tier 1', name: 'Scout', ranks: 'Officer I / Deputy I', image: '/fleet/scout.png' },
  { id: 3, tier: 'Tier 2', name: 'Sandstorm', ranks: 'Officer II / Deputy II', image: '/fleet/sandstorm.png' },
  { id: 4, tier: 'Tier 2', name: 'Aleutian', ranks: 'Officer III / Deputy III', image: '/fleet/aleutian.png' },
  { id: 5, tier: 'Tier 2', name: 'Torrence', ranks: 'Officer III+1 / Corporal', image: '/fleet/torrence.png' },
  { id: 6, tier: 'Tier 3', name: 'Buffalo', ranks: 'Sergeant', image: '/fleet/buffalo.png' },
  { id: 7, tier: 'Tier 3', name: 'Yosemite', ranks: 'Staff Sergeant / Sergeant II', image: '/fleet/yosemite.png' },
  { id: 8, tier: 'Merry', name: 'Sanchez', ranks: 'Wymagane szkolenie MERRY', image: '/fleet/sanchez.png' }
];

const containerVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function Fleet() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFleet = FLEET_DATA.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    car.tier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.ranks.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-title">
          <h2>Flota Pojazdów</h2>
          <p>Katalog radiowozów i wymagania stopniowe</p>
        </div>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-control" 
            placeholder="Szukaj pojazdu, tieru lub stopnia..." 
            style={{ paddingLeft: '2.5rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <motion.div 
        className="fleet-grid" 
        variants={containerVariant} 
        initial="hidden" 
        animate="show"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}
      >
        {filteredFleet.map(car => (
          <motion.div key={car.id} variants={itemVariant} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#0f172a' }}>
              <img 
                src={car.image} 
                alt={car.name} 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x338/1e293b/475569?text=Brak+Zdj%C4%99cia' }}
              />
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', color: car.tier.includes('Tier 3') ? '#fbbf24' : car.tier.includes('Merry') ? '#a855f7' : '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)' }}>
                {car.tier}
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Car size={20} color="var(--lspd-blue)" /> {car.name}
              </h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>Wymaganie:</span> {car.ranks}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredFleet.length === 0 && (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>Brak pojazdów spełniających kryteria wyszukiwania.</p>
        </div>
      )}
    </motion.div>
  );
}

export default Fleet;
