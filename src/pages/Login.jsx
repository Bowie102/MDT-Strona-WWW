import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        localStorage.setItem('apiKey', data.token);
        onLogin(data.role);
        navigate(data.role === 'DTU' ? '/dtu' : '/');
      } else {
        setError(data.error || 'ACCESS DENIED. INVALID CREDENTIALS.');
      }
    } catch (err) {
      setError('Błąd połączenia z serwerem.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%', background: 'var(--bg-dark)', fontFamily: 'var(--font-mono)' }}>
      <div style={{ background: 'var(--bg-card)', padding: '3rem', border: '1px solid var(--border-color)', width: '100%', maxWidth: '450px', position: 'relative' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
          <img src="/lspd-logo.png" alt="LSPD Logo" style={{ width: '100px', height: '100px', marginBottom: '1.5rem', objectFit: 'contain' }} onError={(e) => e.target.style.display='none'} />
          <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '1px', textAlign: 'center', textTransform: 'uppercase' }}>
            Restricted System
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.5rem', textAlign: 'center', letterSpacing: '0.5px' }}>
            AUTHORIZED PERSONNEL ONLY<br />
            UNAUTHORIZED ACCESS WILL BE PROSECUTED
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {error && <div style={{ background: '#7f1d1d', color: '#fca5a5', padding: '0.75rem', border: '1px solid #ef4444', fontSize: '0.8rem', textAlign: 'center', fontWeight: 'bold' }}>{error}</div>}
          
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Officer ID / Login</label>
            <input 
              type="text" 
              required
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Identification"
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Security Passcode</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                required
                className="form-control"
                style={{ paddingRight: '2.5rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Passcode"
              />
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', justifyContent: 'center', padding: '1rem' }}>
            AUTHENTICATE
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.65rem', color: '#475569' }}>
          SECURE CONNECTION ENCRYPTED VIA AES-256<br />
          LOS SANTOS POLICE DEPARTMENT © 2026
        </div>
      </div>
    </div>
  );
}

export default Login;
