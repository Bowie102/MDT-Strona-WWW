import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

function LoadingSpinner({ message = 'Pobieranie danych...' }) {
  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '300px',
      width: '100%',
      color: 'var(--text-muted)'
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      >
        <Loader2 size={48} opacity={0.6} />
      </motion.div>
      <div style={{ marginTop: '1rem', fontSize: '1rem', letterSpacing: '1px', fontWeight: 600 }}>
        {message}
      </div>
      <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.5, maxWidth: '300px', textAlign: 'center' }}>
        Przy pierwszym uruchomieniu może to zająć do 60 sekund z powodu wybudzania serwera bazy danych.
      </div>
    </div>
  );
}

export default LoadingSpinner;
