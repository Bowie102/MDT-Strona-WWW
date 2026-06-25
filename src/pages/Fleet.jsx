import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Search, Maximize2, X } from 'lucide-react';

const FLEET_DATA = [
  { id: 1, tier: 'Tier 1', name: 'Stanier', ranks: 'Officer I / Deputy I', image: '/fleet/stanier.png', unit: 'ADAM' },
  { id: 2, tier: 'Tier 1', name: 'Scout', ranks: 'Officer I / Deputy I', image: '/fleet/scout.png', unit: 'HENRY' },
  { id: 3, tier: 'Tier 2', name: 'Sandstorm', ranks: 'Officer II / Deputy II', image: '/fleet/sandstorm.png', unit: 'HENRY' },
  { id: 4, tier: 'Tier 2', name: 'Aleutian', ranks: 'Officer III / Deputy III', image: '/fleet/aleutian.png', unit: 'HENRY' },
  { id: 5, tier: 'Tier 2', name: 'Torrence', ranks: 'Officer III+1 / Corporal', image: '/fleet/torrence.png', unit: 'ADAM' },
  { id: 6, tier: 'Tier 3', name: 'Buffalo', ranks: 'Sergeant', image: '/fleet/buffalo.png', unit: 'ADAM' },
  { id: 7, tier: 'Tier 3', name: 'Yosemite', ranks: 'Staff Sergeant / Sergeant II', image: '/fleet/yosemite.png', unit: 'HENRY' },
  { id: 8, tier: 'Merry', name: 'Sanchez', ranks: 'Wymagane szkolenie MERRY', image: '/fleet/sanchez.png', unit: 'MERRY' }
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
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredFleet = FLEET_DATA.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    car.tier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.ranks.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const adamVehicles = filteredFleet.filter(v => v.unit === 'ADAM');
  const henryVehicles = filteredFleet.filter(v => v.unit === 'HENRY');
  const merryVehicles = filteredFleet.filter(v => v.unit === 'MERRY');

  const renderVehicleCard = (car) => (
    <motion.div key={car.id} variants={itemVariant} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div 
        style={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#0f172a', cursor: 'pointer', group: 'fleet-image' }}
        onClick={() => setSelectedImage(car.image)}
      >
        <img 
          src={car.image} 
          alt={car.name} 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/600x338/1e293b/475569?text=Brak+Zdj%C4%99cia' }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        />
        <div className="fleet-image-overlay">
          <Maximize2 size={32} color="#fff" />
        </div>
        <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold', color: car.tier.includes('Tier 3') ? '#fbbf24' : car.tier.includes('Merry') ? '#a855f7' : '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)' }}>
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

      <motion.div variants={containerVariant} initial="hidden" animate="show">
        
        {adamVehicles.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid rgba(59, 130, 246, 0.3)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: 'var(--lspd-blue)', color: '#fff', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '1px' }}>ADAM</span>
              </h3>
              <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Podstawowy Patrol (Miejskie / Autostradowe)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
              {adamVehicles.map(renderVehicleCard)}
            </div>
          </div>
        )}

        {henryVehicles.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid rgba(234, 179, 8, 0.3)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: '#ca8a04', color: '#fff', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '1px' }}>HENRY</span>
              </h3>
              <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Jednostki Off-Road (Terenowe / Pościgowe SUV)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
              {henryVehicles.map(renderVehicleCard)}
            </div>
          </div>
        )}

        {merryVehicles.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid rgba(168, 85, 247, 0.3)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: '#9333ea', color: '#fff', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '1px' }}>MERRY</span>
              </h3>
              <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Motocykle Policyjne (Szybkie Pościgi Miejske)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
              {merryVehicles.map(renderVehicleCard)}
            </div>
          </div>
        )}

      </motion.div>

      {filteredFleet.length === 0 && (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>Brak pojazdów spełniających kryteria wyszukiwania.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.9)',
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out',
              padding: '2rem'
            }}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <X size={36} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Większy podgląd"
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 0 40px rgba(0,0,0,0.5)'
              }}
              onClick={(e) => e.stopPropagation()} // żeby nie zamknąć klikając w zdjęcie
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Fleet;
