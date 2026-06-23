import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLogs = [
  "LSPD Secure Terminal [Version 12.0.41]",
  "(c) 2026 San Andreas Police Department. All rights reserved.",
  "",
  "> INIT BOOT SEQUENCE...",
  "> LOADING KERNEL MODULES... [OK]",
  "> MOUNTING ENCRYPTED DRIVES... [OK]",
  "> ESTABLISHING SECURE CONNECTION TO MDT SERVER...",
  "> CONNECTION ESTABLISHED [PING: 12ms]",
  "> VERIFYING USER CREDENTIALS...",
  "> ACCESS GRANTED.",
  "> WELCOME TO THE LOS SANTOS POLICE DEPARTMENT."
];

function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < bootLogs.length) {
        setLines(prev => [...prev, bootLogs[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 800); // Wait for fade out animation
        }, 600); // Pause before fading out
      }
    }, 150); // Speed of lines appearing

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000',
            color: '#10b981', // Terminal green
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '14px',
            padding: '2rem',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            overflow: 'hidden'
          }}
        >
          {/* CRT Overlay just for the boot screen */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
            backgroundSize: '100% 2px, 3px 100%',
            pointerEvents: 'none',
            opacity: 0.5
          }}></div>

          {lines.map((line, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              style={{ marginBottom: '4px', textShadow: '0 0 5px rgba(16, 185, 129, 0.8)' }}
            >
              {line || <br />}
            </motion.div>
          ))}
          
          {/* Blinking cursor */}
          {lines.length < bootLogs.length && (
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{ width: '8px', height: '14px', backgroundColor: '#10b981', marginTop: '4px', boxShadow: '0 0 5px rgba(16, 185, 129, 0.8)' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BootSequence;
