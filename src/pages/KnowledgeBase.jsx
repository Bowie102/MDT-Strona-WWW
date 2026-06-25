import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Shield, Users, Radio, AlertTriangle, Crosshair, Map, ShieldAlert, FileText, ChevronRight, Tablet, Car, HandMetal, AlertCircle, Banknote, HelpCircle, GraduationCap, ChevronDown, Activity, Siren, ClipboardList, Check, Package, MapPin, Shirt, Ban } from 'lucide-react';

const SECTIONS = [
  { id: 'zasady', title: 'Podstawowe Zasady', icon: Shield },
  { id: 'wewnetrzne', title: 'Zasady Wewnętrzne', icon: AlertCircle },
  { id: 'organizacja', title: 'Organizacja LSPD/BCSO', icon: Users },
  { id: 'struktura', title: 'Struktura Dywizji', icon: Map },
  { id: 'radio', title: 'Radio i Kody', icon: Radio },
  { id: 'tablet', title: 'Tablet Policyjny', icon: Tablet },
  { id: 'zatrzymanie', title: 'Zatrzymanie i FTS', icon: Car },
  { id: 'strzelanina', title: 'Po Strzelaninie', icon: Activity },
  { id: 'use_of_force', title: 'Use of Force', icon: HandMetal },
  { id: 'zagrozenia', title: 'Zagrożenia i Jednostki', icon: Siren },
  { id: 'poscig', title: 'Pościg i Manewry', icon: Crosshair },
  { id: 'konwoj', title: 'Konwój', icon: ShieldAlert },
  { id: 'napady', title: 'Napady i Limity', icon: Banknote },
  { id: 'miranda', title: 'Prawa Mirandy', icon: FileText },
  { id: 'szkolenia', title: 'Szkolenia', icon: GraduationCap },
  { id: 'antymustwin', title: 'ANTY MUSTWIN', icon: AlertTriangle },
];

function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState('zasady');
  const [expandedSzkolenie, setExpandedSzkolenie] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);

  const containerVariant = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariant = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'zasady':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* PRIORYTET ABSOLUTNY */}
            <motion.div variants={itemVariant} className="glass-card" style={{ background: 'linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(0,0,0,0.2))', border: '1px solid rgba(239, 68, 68, 0.3)', borderLeft: '4px solid #ef4444' }}>
              <h3 style={{ color: '#ef4444', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.4rem' }}>
                <AlertTriangle size={28} /> PRIORYTET ABSOLUTNY
              </h3>
              <p style={{ margin: 0, color: '#fca5a5', fontSize: '1.15rem', lineHeight: '1.6' }}>
                <strong>KOD 0 to ŚWIĘTOŚĆ</strong> i ma zawsze NAJWYŻSZY PRIORYTET — rzucasz wszystko, nie ważne co robisz i reagujesz!
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              
              {/* Regulamin i Zachowanie */}
              <motion.div variants={itemVariant} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                  <ShieldAlert size={24} /> Regulamin i Zachowanie
                </h3>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                    <Shield size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: '1.6' }}><strong style={{ color: '#fff' }}>ZAWSZE</strong> oddawaj szacunek i wykonuj polecenia wyższego stopnia (nawet gdy się z tym nie zgadzasz).</span>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                    <HandMetal size={20} color="#eab308" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: '1.6' }}><strong style={{ color: '#fff' }}>SALUTOWANIE</strong>: Pamiętaj o salutowaniu do wyższego stopnia (salutujemy tylko do stopnia bezpośrednio wyżej).</span>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                    <Users size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: '1.6' }}><strong style={{ color: '#fff' }}>NIGDY</strong> nie zostawiaj samego partnera przy zdarzeniu — miej go zawsze na widoku. Przy zatrzymaniu drogowym <strong>każdy wysiada z radiowozu!</strong></span>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                    <Book size={20} color="var(--lspd-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: '1.6' }}>Nie podważaj decyzji wyższej rangi. Nigdy nie wchodź w pół-zdania przełożonym.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Chain of Command */}
              <motion.div variants={itemVariant} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginTop: 0, color: '#eab308', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                  <Users size={24} /> Chain of Command
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1))', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'var(--lspd-blue)', fontSize: '1.1rem' }}>Officer I – III+1</strong>
                    <span style={{ color: 'var(--text-muted)' }}>➔ <strong style={{ color: '#e2e8f0' }}>Sergeant</strong></span>
                  </div>
                  <div style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1))', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'var(--lspd-blue)', fontSize: '1.1rem' }}>Sgt / Staff / Master</strong>
                    <span style={{ color: 'var(--text-muted)' }}>➔ <strong style={{ color: '#e2e8f0' }}>Lieutenant</strong></span>
                  </div>
                  <div style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1))', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'var(--lspd-blue)', fontSize: '1.1rem' }}>Lieutenant I/II</strong>
                    <span style={{ color: 'var(--text-muted)' }}>➔ <strong style={{ color: '#e2e8f0' }}>Captain</strong></span>
                  </div>
                  <div style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1))', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'var(--lspd-blue)', fontSize: '1.1rem' }}>Captain</strong>
                    <span style={{ color: 'var(--text-muted)' }}>➔ <strong style={{ color: '#e2e8f0' }}>Commander+</strong></span>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', padding: '1.2rem', background: 'rgba(234, 179, 8, 0.05)', borderRadius: '8px', borderLeft: '3px solid #eab308' }}>
                  <strong style={{ color: '#eab308', display: 'block', marginBottom: '0.5rem' }}>KAMIZELKA / PISTOLET CIĘŻKI</strong>
                  <p style={{ margin: 0, color: '#fef08a', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Kamizelka na patrol: <strong>Porucznik II+</strong>.<br/>
                    Pistolet ciężki w kodzie terrorystycznym: <strong>Kapitan+</strong>.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );

      case 'wewnetrzne':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Kontrabanda */}
            <motion.div variants={itemVariant} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1.5rem', borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <h3 style={{ margin: 0, color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.4rem' }}>
                  <Package size={24} /> 1. Kontrabanda i Skonfiskowane Przedmioty
                </h3>
              </div>
              <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                    <Check size={20} color="#60a5fa" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: '1.6' }}>Nieopodatkowane pieniądze trafiają do depozytu ("Wypierz pieniądze"). <strong style={{ color: '#ef4444' }}>Przywłaszczanie = IAD.</strong></span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                    <Check size={20} color="#60a5fa" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: '1.6' }}>Narkotyki <strong>MUSZĄ</strong> trafić do depozytu na komendzie. Nie wyrzucamy, nie bierzemy.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                    <Check size={20} color="#60a5fa" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: '1.6' }}>Broń krótka — do zbrojowni z 1 pociskiem. Broń długa — z zebraną amunicją + wpis do ewidencji.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                    <Check size={20} color="#60a5fa" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: '1.6' }}>Modyfikacje broni (celownik, tłumik) to zarzut <strong>"Modyfikacja broni palnej"</strong> (10 mies. + 25k$).</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                    <Check size={20} color="#60a5fa" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: '1.6' }}>Rzeczy "lotne" bez właściciela = lombard.</span>
                  </li>
                </ul>

                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <strong style={{ color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} /> Lokalizacja Magazynu Dowodowego</strong>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.5' }}>Korytarz między zbrojownią a szatnią, drugie drzwi z prawej.</p>
                  </div>
                  <div style={{ flex: 1, position: 'relative', minHeight: '150px' }}>
                    <img 
                      src="/magazyn.png?v=3" 
                      alt="Szafka w magazynie dowodowym" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in', transition: 'transform 0.3s ease' }} 
                      onClick={() => setLightboxImg('/magazyn.png?v=3')}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              
              {/* Umundurowanie */}
              <motion.div variants={itemVariant} className="glass-card" style={{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.02), rgba(0,0,0,0.2))' }}>
                <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                  <Shirt size={24} /> 2. Umundurowanie
                </h3>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                    <AlertCircle size={20} color="#eab308" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: '1.6' }}>Modyfikacje munduru zakazane bez autoryzacji Zarządu. <strong>Brak akceptacji = IAD.</strong></span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                    <AlertCircle size={20} color="#eab308" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: '1.6' }}>Mundur motocyklowy <strong>tylko</strong> podczas jazdy jednostką MARY.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                    <AlertCircle size={20} color="#eab308" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: '1.6' }}>Mundur galowy — oficjalne apele i uroczystości.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                    <AlertCircle size={20} color="#eab308" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ lineHeight: '1.6' }}>Dłuższe włosy muszą być <strong>spinane z tyłu głowy</strong>.</span>
                  </li>
                </ul>
              </motion.div>

              {/* ZAKAZ ALKOHOL I NARKOTYKI */}
              <motion.div variants={itemVariant} className="glass-card" style={{ background: 'linear-gradient(to bottom right, rgba(239, 68, 68, 0.05), rgba(0,0,0,0.5))', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ color: '#ef4444', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.3rem', marginBottom: '1.5rem' }}>
                  <Ban size={24} /> ALKOHOL I NARKOTYKI
                </h3>
                <p style={{ margin: '0 0 1rem 0', color: '#fca5a5', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  Wejście lub przebywanie na służbie pod wpływem jest <strong>kategorycznie zakazane</strong>.
                </p>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #ef4444', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Jednostka IAD ma prawo do narkotestów KAŻDEGO funkcjonariusza w dowolnym momencie. Wykrycie równa się <strong>degradacji lub zwolnieniu dyscyplinarnemu</strong>.
                </div>
              </motion.div>
            </div>

          </motion.div>
        );

      case 'organizacja':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', left: '-20px', opacity: 0.05, transform: 'rotate(-15deg)' }}><img src="/lspd_logo.png" style={{ height: '200px' }} /></div>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05, transform: 'rotate(15deg)' }}><img src="/bcso_logo.png" style={{ height: '200px' }} /></div>
              
              <h3 style={{ marginTop: 0, color: '#fff', fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
                <img src="/lspd_logo.png" alt="LSPD Logo" style={{ height: '40px', filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.5))' }} />
                Chain of Command
                <img src="/bcso_logo.png" alt="BCSO Logo" style={{ height: '40px', filter: 'drop-shadow(0 0 8px rgba(234,179,8,0.5))' }} />
              </h3>
              <p style={{ color: 'var(--text-muted)', margin: 0, position: 'relative', zIndex: 1 }}>Poznaj oficjalną ścieżkę awansów i strukturę dowodzenia obu departamentów (LSPD oraz BCSO).</p>
            </motion.div>

            <motion.div variants={itemVariant} style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              
              {/* KADET (WSPÓLNY) */}
              <div style={{ flex: '1 1 100%', background: 'linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(234, 179, 8, 0.05))', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                 <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <img src="/lspd_logo.png" alt="LSPD" style={{ height: '30px', opacity: 0.8 }} />
                    <GraduationCap size={32} color="#fff" />
                    <img src="/bcso_logo.png" alt="BCSO" style={{ height: '30px', opacity: 0.8 }} />
                 </div>
                 <h4 style={{ margin: 0, color: '#fff', fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Kadet (Akademia)</h4>
                 <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px' }}>Kadet to stopień początkowy, wspólny dla obu departamentów. Po zdaniu egzaminu końcowego w akademii (Training Division), kadet wybiera swoją docelową jednostkę (LSPD lub BCSO).</p>
              </div>

              {/* LSPD COLUMN */}
              <div style={{ flex: '1 1 400px', background: 'rgba(59, 130, 246, 0.03)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.1)', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05))', padding: '1.5rem', textAlign: 'center', borderBottom: '2px solid rgba(59, 130, 246, 0.3)' }}>
                  <img src="/lspd_logo.png" alt="LSPD" style={{ height: '80px', marginBottom: '1rem', filter: 'drop-shadow(0 0 15px rgba(59,130,246,0.4))' }} />
                  <h4 style={{ margin: 0, color: '#60a5fa', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Los Santos Police</h4>
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative' }}>
                   {/* Central line */}
                   <div style={{ position: 'absolute', left: '2.5rem', top: '2.5rem', bottom: '2.5rem', width: '2px', background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.5), #eab308)' }} />
                   {[
                      { rank: 'Officer I', desc: 'Początkujący funkcjonariusz' },
                      { rank: 'Officer II', desc: 'Pełnoprawny funkcjonariusz' },
                      { rank: 'Officer III', desc: 'Doświadczony funkcjonariusz' },
                      { rank: 'Officer III+1', desc: 'Senior Officer (Supervisory)' },
                      { rank: 'Sergeant', desc: 'Dowódca zmiany', isCommand: true },
                      { rank: 'Staff Sergeant', desc: 'Starszy dowódca', isCommand: true },
                      { rank: 'Master Sergeant', desc: 'Główny sierżant', isCommand: true },
                      { rank: 'Lieutenant I', desc: 'Zastępca dowódcy jednostki', isCommand: true, isHigh: true },
                      { rank: 'Lieutenant II', desc: 'Dowódca jednostki / zmiany', isCommand: true, isHigh: true },
                      { rank: 'Captain', desc: 'Kapitan dywizji', isCommand: true, isHigh: true },
                      { rank: 'Commander', desc: 'Dowództwo szczebla wyższego', isCommand: true, isHigh: true },
                      { rank: 'Deputy Chief', desc: 'Zastępca Szefa Departamentu', isCommand: true, isHigh: true },
                      { rank: 'Assistant Chief', desc: 'Asystent Szefa Policji', isCommand: true, isHigh: true },
                      { rank: 'Chief of Police', desc: 'Szef Policji (Zarząd)', isCommand: true, isHigh: true },
                   ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 1 }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: item.isHigh ? '#eab308' : item.isCommand ? '#60a5fa' : '#94a3b8', border: '4px solid #0f172a', marginLeft: '0.6rem', boxShadow: `0 0 10px ${item.isHigh ? 'rgba(234,179,8,0.5)' : item.isCommand ? 'rgba(59,130,246,0.5)' : 'rgba(148,163,184,0.3)'}` }} />
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '6px', flex: 1, borderLeft: `3px solid ${item.isHigh ? '#eab308' : item.isCommand ? '#60a5fa' : '#94a3b8'}`, transition: 'transform 0.2s', cursor: 'default' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                           <strong style={{ color: item.isHigh ? '#eab308' : item.isCommand ? '#60a5fa' : '#f8fafc', display: 'block', fontSize: '1.05rem' }}>{item.rank}</strong>
                           <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.desc}</span>
                        </div>
                      </div>
                   ))}
                </div>
              </div>

              {/* BCSO COLUMN */}
              <div style={{ flex: '1 1 400px', background: 'rgba(234, 179, 8, 0.03)', borderRadius: '12px', border: '1px solid rgba(234, 179, 8, 0.1)', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(to bottom, rgba(234, 179, 8, 0.15), rgba(234, 179, 8, 0.05))', padding: '1.5rem', textAlign: 'center', borderBottom: '2px solid rgba(234, 179, 8, 0.3)' }}>
                  <img src="/bcso_logo.png" alt="BCSO" style={{ height: '80px', marginBottom: '1rem', filter: 'drop-shadow(0 0 15px rgba(234,179,8,0.4))' }} />
                  <h4 style={{ margin: 0, color: '#facc15', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Blaine County Sheriff</h4>
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative' }}>
                   {/* Central line */}
                   <div style={{ position: 'absolute', right: '2.5rem', top: '2.5rem', bottom: '2.5rem', width: '2px', background: 'linear-gradient(to bottom, rgba(234, 179, 8, 0.1), rgba(234, 179, 8, 0.5), #eab308)' }} />
                   {[
                      { rank: 'Deputy I', desc: 'Początkujący zastępca' },
                      { rank: 'Deputy II', desc: 'Pełnoprawny zastępca' },
                      { rank: 'Deputy III', desc: 'Doświadczony zastępca' },
                      { rank: 'Corporal', desc: 'Dowódca polowy (Supervisory)' },
                      { rank: 'Sergeant I', desc: 'Młodszy dowódca zmiany', isCommand: true },
                      { rank: 'Sergeant II', desc: 'Sierżant sztabowy', isCommand: true },
                      { rank: 'Sergeant III', desc: 'Dowódca zmiany', isCommand: true },
                      { rank: 'Lieutenant I', desc: 'Zastępca dowódcy jednostki', isCommand: true, isHigh: true },
                      { rank: 'Lieutenant II', desc: 'Dowódca jednostki', isCommand: true, isHigh: true },
                      { rank: 'Undersheriff', desc: 'Zastępca Szeryfa (Zarząd)', isCommand: true, isHigh: true },
                      { rank: 'Sheriff', desc: 'Szeryf (Zarząd)', isCommand: true, isHigh: true },
                   ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 1, flexDirection: 'row-reverse' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: item.isHigh ? '#eab308' : item.isCommand ? '#facc15' : '#d4d4d8', border: '4px solid #0f172a', marginRight: '0.6rem', boxShadow: `0 0 10px ${item.isHigh ? 'rgba(234,179,8,0.5)' : item.isCommand ? 'rgba(234,179,8,0.5)' : 'rgba(212,212,216,0.3)'}` }} />
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '6px', flex: 1, borderRight: `3px solid ${item.isHigh ? '#eab308' : item.isCommand ? '#facc15' : '#d4d4d8'}`, textAlign: 'right', transition: 'transform 0.2s', cursor: 'default' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                           <strong style={{ color: item.isHigh ? '#eab308' : item.isCommand ? '#facc15' : '#f8fafc', display: 'block', fontSize: '1.05rem' }}>{item.rank}</strong>
                           <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.desc}</span>
                        </div>
                      </div>
                   ))}
                </div>
              </div>

            </motion.div>
          </motion.div>
        );

      case 'struktura':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-50px', right: '-20px', opacity: 0.05, transform: 'rotate(15deg)' }}><Shield size={300} /></div>
              <h3 style={{ marginTop: 0, color: '#fff', fontSize: '1.8rem', position: 'relative', zIndex: 1, textTransform: 'uppercase', letterSpacing: '2px' }}>Struktura Dywizji i Agencji</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0, position: 'relative', zIndex: 1, maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                Zbiór wszystkich jednostek operacyjnych, wydziałów specjalnych oraz agencji federalnych współpracujących na terenie całego stanu San Andreas.
              </p>
            </motion.div>

            {/* HIGH COMMAND */}
            <motion.div variants={itemVariant} className="glass-card" style={{ background: 'linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(0,0,0,0.3))', border: '1px solid rgba(239, 68, 68, 0.3)', borderLeft: '4px solid #ef4444', padding: '1.5rem' }}>
              <h4 style={{ color: '#ef4444', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <ShieldAlert size={24} /> HIGH COMMAND (01 - 05)
              </h4>
              <p style={{ margin: 0, color: '#fca5a5', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Najwyższą władzę nad <strong>każdym departamentem, wydziałem oraz agencją federalną</strong> sprawuje Zarząd (High Command), czyli osoby ze stopniami od 01 do 05.
              </p>
            </motion.div>

            {/* Główne Wydziały */}
            <motion.div variants={itemVariant}>
              <h4 style={{ color: 'var(--lspd-blue)', borderBottom: '2px solid rgba(59, 130, 246, 0.3)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <Shield size={24} /> Główne Wydziały Departamentów
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {[
                  { tag: 'PD', name: 'Patrol Division', desc: 'Podstawa działania departamentu. Zajmuje się reagowaniem na wezwania, patrolowaniem ulic, prewencją i wstępnym zabezpieczeniem miejsc zbrodni.', img: '/lspd_logo.png', color: 'var(--lspd-blue)' },
                  { tag: 'FTD', name: 'Field Training Division', desc: 'Odpowiedzialni za proces akademii policyjnej, egzaminowanie kadetów, oraz przeprowadzanie zaawansowanych szkoleń (np. ASU, SEU, MARY).', img: '/ftd_logo.png', color: '#10b981' },
                  { tag: 'BCSO', name: 'Blaine County Sheriff', desc: 'Patrol i administracja poza miastem (Sandy Shores, Paleto Bay). Zarządza więzieniem stanowym Bolingbroke Penitentiary.', img: '/bcso_logo.png', color: '#eab308' },
                  { tag: 'HWP', name: 'Highway Patrol', desc: 'Służba drogowa odpowiedzialna za bezpieczeństwo na autostradach stanowych. Zajmują się pościgami na trasach szybkiego ruchu.', img: '/hwp_logo.png', color: 'var(--lspd-blue)' }
                ].map((div, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', borderRadius: '12px', border: `1px solid ${div.color}40`, padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'default' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 10px 30px ${div.color}30`; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}>
                    <div style={{ position: 'absolute', top: '0', left: '0', width: '4px', height: '100%', background: div.color }}></div>
                    <img src={div.img} alt={div.tag} style={{ width: '70px', height: '70px', objectFit: 'contain', filter: `drop-shadow(0 0 10px ${div.color}60)` }} />
                    <div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <span style={{ background: `${div.color}20`, color: div.color, padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>{div.tag}</span>
                          <h5 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>{div.name}</h5>
                       </div>
                       <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{div.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Jednostki Specjalistyczne i Federalne */}
            <motion.div variants={itemVariant} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
               
               <div>
                  <h4 style={{ color: '#eab308', borderBottom: '2px solid rgba(234, 179, 8, 0.3)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <Crosshair size={20} /> Wydziały Specjalistyczne
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { tag: 'METRO', name: 'Metropolitan Division', desc: 'Powoływani w przypadku ataków terrorystycznych, Kodu Czarnego, zbrojnych napadów lub konwojów więźniów o zaostrzonym rygorze.', img: '/metro_logo.png', color: '#eab308' },
                      { tag: 'DTU', name: 'Detective Unit', desc: 'Jednostka prowadząca szczegółowe dochodzenia kryminalne, infiltrację gangów oraz operacje pod przykrywką w terenie.', img: '/dtu_logo.png', color: '#f97316' },
                      { tag: 'IAD', name: 'Internal Affairs Division', desc: 'Biuro spraw wewnętrznych. Infiltrują i analizują działania funkcjonariuszy pod kątem korupcji i łamania regulaminów.', icon: ShieldAlert, color: 'var(--text-muted)' }
                    ].map((div, idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: `3px solid ${div.color}`, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
                         {div.img ? <img src={div.img} alt={div.tag} style={{ width: '50px', height: '50px', objectFit: 'contain', filter: `drop-shadow(0 0 8px ${div.color}50)` }} /> : <div.icon size={50} color={div.color} style={{ opacity: 0.7 }} />}
                         <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                               <strong style={{ color: div.color }}>{div.tag}</strong>
                               <span style={{ color: '#fff', fontSize: '1.05rem' }}>{div.name}</span>
                            </div>
                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>{div.desc}</p>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div>
                  <h4 style={{ color: '#ef4444', borderBottom: '2px solid rgba(239, 68, 68, 0.3)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <ShieldAlert size={20} /> Agencje Federalne
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { tag: 'FIB', name: 'Federal Investigation Bureau', desc: 'Rozpracowywanie zorganizowanych grup przestępczych, przeciwdziałanie terroryzmowi oraz nadzór nad bezpieczeństwem narodowym.', icon: Shield, color: '#ef4444' },
                      { tag: 'USMS', name: 'United States Marshal Service', desc: 'Zapewnienie ochrony ważnych świadków koronnych, poszukiwanie groźnych uciekinierów oraz transport więźniów federalnych.', icon: Crosshair, color: '#f43f5e' }
                    ].map((div, idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: `3px solid ${div.color}`, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
                         <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: `${div.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <div.icon size={30} color={div.color} />
                         </div>
                         <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                               <strong style={{ color: div.color }}>{div.tag}</strong>
                               <span style={{ color: '#fff', fontSize: '1.05rem' }}>{div.name}</span>
                            </div>
                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>{div.desc}</p>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>

            </motion.div>
          </motion.div>
        );

      case 'radio':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #eab308' }}>
                <Radio size={32} color="#eab308" style={{ marginBottom: '1rem' }} />
                <h3 style={{ color: '#eab308', margin: '0 0 0.5rem 0' }}>Konfiguracja Główna</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>Masz radio na freq <strong>MAIN</strong>.<br/>Zmiana freq: <strong>SHIFT + STRZAŁKA LEWO/PRAWO</strong> (np. TAC #1).</p>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <strong style={{ color: '#60a5fa', display: 'block', marginBottom: '0.25rem' }}>SV (Supervisor)</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Bezpośredni przełożony na służbie odpowiadający za akcję.</span>
                  </div>
                  <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <strong style={{ color: '#60a5fa', display: 'block', marginBottom: '0.25rem' }}>PWC (Patrol Watch Cmdr)</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Osoba dowodząca dyżurem patrolowym na dzielnicy.</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
              <motion.div variants={itemVariant} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ background: 'rgba(30,95,196,0.15)', padding: '1.25rem', borderBottom: '1px solid rgba(30,95,196,0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Radio size={20} color="var(--lspd-blue)" /> <h4 style={{ margin: 0, color: 'var(--lspd-blue)' }}>KODY 10-X</h4>
                </div>
                <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                  {[
                    ['10-1', 'Do wszystkich jednostek'], ['10-2', 'Potwierdzam'], ['10-3', 'Odmawiam'],
                    ['10-4', 'Zrozumiałem'], ['10-5', 'W drodze'], ['10-8', 'Potrzebne wsparcie', '#eab308'],
                    ['10-9', 'Powtórz komunikat'], ['10-12', 'Teren czysty'], ['10-13', 'Ranny FP', '#ef4444'], 
                    ['10-20', 'Lokalizacja'], ['10-23', 'Dojechałem na miejsce'], ['10-38', 'Zatrzymanie drogowe'],
                    ['10-50', 'Wypadek/kolizja'], ['10-71', 'Strzały', '#ef4444'], ['10-72', 'Sprzedaż narkotyków'],
                    ['10-80', 'Rozpoczynam pościg', '#eab308'], ['10-81', 'Pościg udany'], ['10-82', 'Pościg nieudany'], ['10-90', 'Napad', '#ef4444']
                  ].map(([code, desc, color], idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                      <span style={{ 
                        background: color ? `${color}20` : 'rgba(59, 130, 246, 0.2)', 
                        color: color || '#60a5fa', 
                        padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.9rem', width: '60px', textAlign: 'center'
                      }}>{code}</span>
                      <span style={{ color: color ? '#fff' : 'var(--text-muted)', fontWeight: color ? 'bold' : 'normal' }}>{desc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariant} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1.25rem', borderBottom: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle size={20} color="#ef4444" /> <h4 style={{ margin: 0, color: '#ef4444' }}>KODY CODE</h4>
                  </div>
                  <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                    {[
                      ['Code 0', 'Strzały w kierunku funkcjonariusza!', '#ef4444'],
                      ['Code 1', 'Brak sygnałów świetlnych i dźwiękowych', ''],
                      ['Code 2', 'Wsparcie na sygnałach (tylko świetlne)', ''],
                      ['Code 3', 'Wsparcie na sygnałach (świetlne + dźwiękowe)', '#eab308'],
                      ['Code 4', 'Zakończenie interwencji', '#10b981'],
                      ['Code 6', 'Interwencja poza pojazdem', ''],
                      ['Code 6J', 'Prośba o wsparcie na FTS', '#eab308'],
                      ['Code 8', 'Zebranie (Roll Call)', ''],
                      ['Code 100', 'Cisza na radiu', '']
                    ].map(([code, desc, color], idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                        <span style={{ 
                          background: color ? `${color}20` : 'rgba(255,255,255,0.05)', 
                          color: color || '#e2e8f0', 
                          padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.9rem', width: '75px', textAlign: 'center', border: `1px solid ${color ? color+'40' : 'rgba(255,255,255,0.1)'}`
                        }}>{code}</span>
                        <span style={{ color: color || 'var(--text-muted)' }}>{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.25rem', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Activity size={20} color="#10b981" /> <h4 style={{ margin: 0, color: '#10b981' }}>STATUSY SŁUŻBOWE</h4>
                  </div>
                  <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                    {[
                      ['Status 1', 'Rozpoczęcie służby'], ['Status 2', 'Przerwa w służbie'], ['Status 3', 'Zakończenie służby'],
                      ['Status 4', 'Wolna jednostka'], ['Status 5', 'Rozpoczęcie patrolu'], ['Status 6', 'W trakcie patrolu'],
                      ['Status 7', 'Zatrzymanie poza komendą'], ['Status 8', 'Zatrzymanie na komendzie'], ['Status 9', 'Czynności służbowe na komendzie']
                    ].map(([code, desc], idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                        <strong style={{ width: '70px', color: '#10b981' }}>{code}</strong>
                        <span style={{ color: 'var(--text-muted)' }}>{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );

      case 'tablet':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #ef4444', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <ShieldAlert size={32} color="#ef4444" />
                <div>
                  <h3 style={{ color: '#ef4444', marginTop: 0, marginBottom: '0.5rem' }}>UWAGA WAŻNE!</h3>
                  <p style={{ margin: 0, color: '#fff', fontWeight: 'bold' }}>NIGDY NIE ŁĄCZYMY WYKROCZEŃ DROGOWYCH Z WYKROCZENIAMI KARNYMI!</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #eab308', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <Banknote size={32} color="#eab308" />
                <div>
                  <h3 style={{ color: '#eab308', marginTop: 0, marginBottom: '0.5rem' }}>PRZELICZNIK KAUCJI</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}><strong style={{ color: '#fff' }}>1 miesiąc = 2 000$</strong> — obowiązuje przy zamianie miesięcy na pieniądze lub odwrotnie.</p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Tablet size={20} /> Systemy MDT (Tablet)
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '1.5rem' }}>
                  <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Activity size={20} color="var(--lspd-blue)" />
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#e2e8f0' }}>Statusy</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Na stronie głównej na bieżąco ustawiamy swój aktualny status służbowy, by PWC miało podgląd sytuacji.</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '1.5rem' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Radio size={20} color="#10b981" />
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#e2e8f0' }}>Dispatch (Patrole)</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Wpisujemy patrol przydzielony przez PWC. Na napadach korzystamy z zakładek Akcja 1, Akcja 2 itd.</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '1.5rem' }}>
                  <div style={{ background: 'rgba(249, 115, 22, 0.1)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <FileText size={20} color="#f97316" />
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#e2e8f0' }}>Kartoteka Obywatela</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Wyszukiwanie po nazwisku/rejestracji. <strong>Notatki</strong> (tu dodajemy i zdejmujemy info o poszukiwaniu). Wgląd w <strong>Historię wyroków</strong> oraz <strong>Oznaczenia</strong> (niebezpieczny).</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '1.5rem' }}>
                  <div style={{ background: 'rgba(234, 179, 8, 0.1)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Book size={20} color="#eab308" />
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#e2e8f0' }}>Mandaty i Wyroki</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}><strong>Opłata:</strong> powód kary.<br/><strong>Więzienie:</strong> liczba miesięcy (0 dla mandatu).<br/><strong>Grzywna:</strong> kwota w dolarach.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case 'zatrzymanie':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Car size={20} /> Normal Traffic Stop (NTS)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {[
                  { title: 'Inicjacja', desc: 'Włączamy KOD 3, używamy megafonu (zjazd na pobocze). Zatrzymujemy się za autem.' },
                  { title: 'Zabezpieczenie', desc: 'Zmieniamy KOD 3 na KOD 2. Przez megafon: zgaszenie silnika, ręce na kierownicy.' },
                  { title: 'Podejście', desc: 'RO zgłasza na radiu (CODE 6). Kierowca (SV) podchodzi do auta. RO osłania z tyłu.' },
                  { title: 'Kontakt', desc: 'Ranga, Imię i Nazwisko. Pytamy o powód zatrzymania, pobieramy dokumenty.' },
                  { title: 'Weryfikacja', desc: 'Sprawdzenie w MDT. Nigdy nie zdradzaj powodu weryfikacji przed zabraniem dowodu!' },
                  { title: 'Zakończenie', desc: 'Wystawienie mandatu / pouczenie. Obywatel odjeżdża po zgaszeniu przez nas KODu 2.' }
                ].map((step, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', right: '-15px', top: '-15px', fontSize: '4rem', fontWeight: '900', color: 'rgba(255,255,255,0.03)', lineHeight: '1' }}>{idx + 1}</div>
                    <strong style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--lspd-blue)' }}>Krok {idx + 1}.</span> {step.title}
                    </strong>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card" style={{ border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)' }}>
              <h3 style={{ color: '#ef4444', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <ShieldAlert size={20} /> Felony Traffic Stop (FTS)
              </h3>
              <p style={{ color: '#fca5a5', marginBottom: '1.5rem' }}>Zatrzymanie wysokiego ryzyka. Procedura obowiązuje wobec pojazdów kradzionych, uciekających lub z uzbrojonymi przestępcami.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {[
                  { title: 'Dystans', desc: 'KOD 3 + megafon. Zatrzymanie z dużej odległości (bezpieczna strefa).' },
                  { title: 'Wsparcie', desc: 'Wezwanie wsparcia (CODE 6J). Czekamy na min. 2 radiowozy (łącznie 6 FP).' },
                  { title: 'Osłona i Kluczyki', desc: 'Wsparcie ustawia się z boku. SV nakazuje wyrzucić kluczyki przez okno.' },
                  { title: 'Bariera Kuloodporna', desc: 'FP wysiadają osłaniając się za drzwiami. Broń wycelowana. Jeden pilnuje tyłów.' },
                  { title: 'Rozkazy Głosowe', desc: '"Lewą ręką otwórz drzwi, wyjdź, krok w bok, podwiń koszulkę, obrót 360".' },
                  { title: 'Aresztowanie', desc: 'Zatrzymany idzie tyłem. Zakucie. Sprawdzenie bagażnika (min 3 FP). Odholowanie.' }
                ].map((step, idx) => (
                  <div key={idx} style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid #ef4444' }}>
                    <strong style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--gold)' }}>{idx + 1}.</span> {step.title}
                    </strong>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case 'use_of_force':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <HandMetal size={20} /> Force Continuum (Zasady Użycia Siły)
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                {/* Lewa kolumna: Skala Zachowań */}
                <div>
                  <h4 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Zachowanie Podejrzanego</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', borderRadius: '4px' }}>
                      <strong style={{ color: '#3b82f6', display: 'block', marginBottom: '0.25rem' }}>WSPÓŁPRACA</strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Osoba stosuje się do poleceń, nie stawia oporu.</span>
                    </div>
                    <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderLeft: '4px solid #f59e0b', borderRadius: '4px' }}>
                      <strong style={{ color: '#f59e0b', display: 'block', marginBottom: '0.25rem' }}>OPÓR BIERNY</strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Brak współpracy, ale nie ucieka i nie atakuje (np. udaje nieprzytomnego).</span>
                    </div>
                    <div style={{ padding: '1rem', background: 'rgba(249, 115, 22, 0.1)', borderLeft: '4px solid #f97316', borderRadius: '4px' }}>
                      <strong style={{ color: '#f97316', display: 'block', marginBottom: '0.25rem' }}>OPÓR AKTYWNY</strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Wyrywa się lub próbuje uciec, bez agresji w stronę funkcjonariusza.</span>
                    </div>
                    <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', borderRadius: '4px' }}>
                      <strong style={{ color: '#ef4444', display: 'block', marginBottom: '0.25rem' }}>OPÓR AGRESYWNY</strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Chce zrobić fizyczną krzywdę (np. kopanie, bicie pięścią).</span>
                    </div>
                    <div style={{ padding: '1rem', background: 'rgba(153, 27, 27, 0.2)', borderLeft: '4px solid #991b1b', borderRadius: '4px' }}>
                      <strong style={{ color: '#fca5a5', display: 'block', marginBottom: '0.25rem' }}>OPÓR ZAOSTRZONY</strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Zagrożenie życia/zdrowia (broń palna, nóż, auto jako broń).</span>
                    </div>
                  </div>
                </div>

                {/* Prawa kolumna: Odpowiedź LSPD */}
                <div>
                  <h4 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Adekwatna Odpowiedź LSPD</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#3b82f6' }}>POZIOM 1 (Lekki)</strong>
                        <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>BIERNY / AKTYWNY</span>
                      </div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Obecność, komunikacja werbalna, powalenie, kajdanki, blokowanie, popychanie, K-9 (bez gryzienia).</span>
                    </div>

                    <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#f97316' }}>POZIOM 2 (Pośredni)</strong>
                        <span style={{ background: 'rgba(249, 115, 22, 0.2)', color: '#fb923c', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>AGRESYWNY</span>
                      </div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Kopnięcia, uderzenia pałką, gaz pieprzowy, taser, bean-bag, K-9 (z gryzieniem), PIT do 120 km/h.</span>
                    </div>

                    <div style={{ padding: '1.25rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#ef4444' }}>POZIOM 3 (Deadly Force)</strong>
                        <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>ZAOSTRZONY</span>
                      </div>
                      <span style={{ color: '#fca5a5', fontSize: '0.85rem' }}>Broń palna, wjechanie autem w cel, duszenie, uderzenia w głowę/kręgosłup, PIT &gt;120 km/h.</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case 'strzelanina':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #eab308' }}>
              <h3 style={{ color: '#eab308', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={24} /> ZŁOTA ZASADA (PRIORYTET EMS)
              </h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.05rem' }}>Jeżeli leżący obywatel ma puls i wymaga <strong>natychmiastowej</strong> pomocy EMS — odpuszczamy przeszukania dowodowe i wykonujemy je dopiero po ustabilizowaniu pacjenta przez medyka. Zachowujemy zdrowy rozsądek!</p>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Activity size={20} /> Czynności bezwzględne po zakończeniu strzelaniny
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {[
                  { icon: ShieldAlert, title: 'Zabezpieczenie Otoczenia', desc: 'Podchodzimy do rannego obywatela, celując. Zabieramy ewentualną broń leżącą przy nim lub ją odkopujemy z dala od jego rąk.' },
                  { icon: Activity, title: 'Triage / Staza', desc: 'Zapewniamy pierwszą pomoc. Na widoczną ranę postrzałową kończyny zakładamy stazę taktyczną (każdy FP posiada ją przy pasie).' },
                  { icon: FileText, title: 'Identyfikacja i Ślady', desc: 'Przeszukujemy by znaleźć dowód osobisty. Pobieramy próbkę prochu z dłoni i rękawiczek obywatela (np. bibułką GSR).' },
                  { icon: Shield, title: 'Konfiskata Dowodów', desc: 'Kategorycznie konfiskujemy wszystkie nielegalne i niebezpieczne narzędzia z ekwipunku (broń palna, biała, narkotyki).' },
                  { icon: Tablet, title: 'Ewidencja MDT', desc: 'Zapisujemy zdobyte informacje w notesie lub na radiu/dispatchu. Dopiero po spisaniu personaliów przekazujemy rannych pod opiekę EMS.' }
                ].map((step, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid var(--lspd-blue)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                        <step.icon size={20} color="var(--lspd-blue)" />
                      </div>
                      <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Krok {idx + 1}.</strong>
                    </div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#60a5fa' }}>{step.title}</h4>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case 'zagrozenia':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <AlertTriangle size={20} /> Poziomy Zagrożenia Terrorystycznego
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1.5rem', background: 'rgba(249, 115, 22, 0.15)', borderLeft: '4px solid #f97316', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.1 }}><ShieldAlert size={80} /></div>
                  <strong style={{ color: '#f97316', fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem' }}>KOD POMARAŃCZOWY</strong>
                  <p style={{ margin: 0, color: 'var(--text-muted)', maxWidth: '80%' }}>Zastosowanie gdy uzyskano informacje o możliwości wystąpienia zdarzenia terrorystycznego lub odnotowuje się zwiększoną aktywność gangów.</p>
                </div>
                
                <div style={{ padding: '1.5rem', background: 'rgba(239, 68, 68, 0.15)', borderLeft: '4px solid #ef4444', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.1 }}><AlertTriangle size={80} /></div>
                  <strong style={{ color: '#ef4444', fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem' }}>KOD CZERWONY</strong>
                  <p style={{ margin: 0, color: '#fca5a5', maxWidth: '80%' }}>Zaistniało konkretne zdarzenie terrorystyczne lub gangi znacznie zachwiały równowagę. <strong>Policja ma prawo zatrzymać i wylegitymować KAŻDEGO obywatela bez podawania przyczyny.</strong></p>
                </div>
                
                <div style={{ padding: '1.5rem', background: 'linear-gradient(90deg, rgba(15,23,42,0.9), rgba(0,0,0,0.5))', borderLeft: '4px solid #000', border: '1px solid #334155', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.2 }}><Crosshair size={80} color="#ef4444" /></div>
                  <strong style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem', textShadow: '0 0 10px rgba(255,0,0,0.5)' }}>KOD CZARNY (STAN WYJĄTKOWY)</strong>
                  <p style={{ margin: 0, color: '#cbd5e1', maxWidth: '80%' }}>Poważne ataki terrorystyczne paraliżujące miasto. <strong>Policja legitymuje i przeszukuje KAŻDEGO obywatela. Ogień w kierunku uzbrojonej osoby jest otwierany natychmiast bez żadnego ostrzeżenia.</strong></p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Car size={20} /> Wykaz Identyfikatorów (Jednostki Patrolowe)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {[
                  ['ADAM', 'Podstawowy Patrol', '#3b82f6'], ['DAVID', 'SWAT / Uderzeniowa', '#ef4444'],
                  ['EAGLE', 'Helikopter LSPD', '#eab308'], ['KILO', 'Detektyw (Unmarked)', '#10b981'],
                  ['EDWARD', 'Jednostka Pościgowa', '#8b5cf6'], ['MARY', 'Motocykl LSPD', '#f97316'],
                  ['BIKE', 'Rower LSPD', '#64748b'], ['HENRY', 'Off-road', '#d97706'],
                  ['TOM', 'Holownik Policyjny', '#64748b'], ['CANINE', 'Jednostka K-9', '#a855f7'],
                  ['FRANK-BOY', 'Patrol Pieszy', '#64748b'], ['OCEAN', 'Jednostka Wodna', '#06b6d4'],
                  ['QUEEN', 'Pojazd Opancerzony', '#1e293b'], ['TURTLE', 'Czołg / Riot', '#000']
                ].map(([name, desc, color], idx) => (
                  <div key={idx} style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderBottom: `3px solid ${color}`, borderRadius: '6px', display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ color: '#fff', fontSize: '1rem' }}>{name}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>{desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case 'poscig':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant}>
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Siren size={24} /> Kody Pościgowe (Nadaje SV)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                
                {/* ŻÓŁTY */}
                <div style={{ background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.05) 0%, rgba(0,0,0,0) 100%)', borderRadius: '12px', border: '1px solid rgba(234, 179, 8, 0.2)', overflow: 'hidden' }}>
                  <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '1rem', borderBottom: '1px solid rgba(234, 179, 8, 0.2)' }}>
                    <strong style={{ color: '#fde047', fontSize: '1.2rem', letterSpacing: '1px' }}>KOD ŻÓŁTY</strong>
                  </div>
                  <div style={{ padding: '1.2rem' }}>
                    <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Po <strong>5 minutach</strong> ucieczki, jazda pod prąd lub bardzo niebezpieczna.</p>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> Blokady nieruchome</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> PIT/BOX/RAM (poza miastem do 80 km/h)</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> Kolczatki (poza miastem)</li>
                    </ul>
                  </div>
                </div>

                {/* CZERWONY */}
                <div style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(0,0,0,0) 100%)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', overflow: 'hidden' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderBottom: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <strong style={{ color: '#fca5a5', fontSize: '1.2rem', letterSpacing: '1px' }}>KOD CZERWONY</strong>
                  </div>
                  <div style={{ padding: '1.2rem' }}>
                    <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Po <strong>10 minutach</strong>, zmiana pojazdu, pasażer, chodnik, strzały.</p>
                    <ul style={{ margin: '0 0 1rem 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> Blokady wszędzie</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> PIT/BOX/RAM (poza do 160 km/h, miasto 80 km/h)</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> Kolczatki wszędzie</li>
                    </ul>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fca5a5', fontSize: '0.85rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '4px' }}>
                      <AlertTriangle size={14} /> <strong>Możliwość strzelania w opony!</strong>
                    </div>
                  </div>
                </div>

                {/* CZARNY */}
                <div style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(0,0,0,0) 100%)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.2)', overflow: 'hidden' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                    <strong style={{ color: '#fff', fontSize: '1.2rem', letterSpacing: '1px' }}>KOD CZARNY</strong>
                  </div>
                  <div style={{ padding: '1.2rem' }}>
                    <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Strzały do FP/przechodniów, potrącenia. Zagrożenie życia.</p>
                    <ul style={{ margin: '0 0 1rem 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> Blokady wszędzie</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> PIT/BOX/RAM bez limitu prędkości</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Crosshair size={16} color="#ef4444" /> Strzały w kierunku kierowcy</li>
                    </ul>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', color: '#ef4444', fontSize: '0.85rem', background: '#000', border: '1px solid #333', padding: '0.5rem', borderRadius: '4px' }}>
                      <strong style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><AlertTriangle size={14} /> ZATRZYMAĆ ZA WSZELKĄ CENĘ</strong>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'BOX', desc: 'Zablokowanie "w pudełku" przez 4 jednostki. Zaciągnięcie hamulca ręcznego po zablokowaniu.', img: '/box.png' },
                { title: 'Strzałka', desc: 'Radiowozy ustawiają się za uciekinierem, tworząc klin lub łuk, zapobiegający nagłemu wyhamowaniu lub zepchnięciu innych jednostek.', img: '/strzalka.png' },
                { title: 'Blokada Drogowa', desc: 'Celowe wjechanie w pojazd uciekiniera, aby całkowicie unieruchomić jego maszynę po zablokowaniu drogi ucieczki.', img: '/blokada_drogowa.png' },
                { title: 'PIT (Precision Immobilization Technique)', desc: 'Uderzenie przodem radiowozu w tylny róg uciekającego pojazdu, aby wywołać niekontrolowany obrót i zgaszenie silnika.', img: '/pit.png' }
              ].map((maneuver, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #facc15', display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#facc15' }}>{maneuver.title}</h4>
                  <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>{maneuver.desc}</p>
                  <div style={{ width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                    <img 
                      src={`${maneuver.img}?v=3`} 
                      alt={maneuver.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'zoom-in', transition: 'transform 0.3s ease' }} 
                      onClick={() => setLightboxImg(`${maneuver.img}?v=3`)}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        );

      case 'konwoj':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
              <motion.div variants={itemVariant} style={{ background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(0,0,0,0.2))', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <h3 style={{ marginTop: 0, color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                  <ClipboardList size={24} /> Kryteria Organizacji Konwoju
                </h3>
                <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}><Check size={20} color="#4ade80" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>Minimum <strong>6 funkcjonariuszy</strong> na służbie.</span></li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}><Check size={20} color="#4ade80" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>Obecność osoby kompetentnej <strong>(Sergeant+)</strong>.</span></li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}><Check size={20} color="#4ade80" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>Obywatel ma wyrok minimum <strong>90 miesięcy</strong>.</span></li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}><Check size={20} color="#4ade80" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>Każdy biorący udział <strong>ZAKŁADA kamizelkę kuloodporną</strong> (nie pytamy o autoryzację).</span></li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariant} style={{ background: 'linear-gradient(to bottom right, rgba(239, 68, 68, 0.05), rgba(0,0,0,0.5))', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ color: '#ef4444', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.3rem', marginBottom: '1.5rem' }}>
                  <AlertTriangle size={24} /> KONWÓJ = RUCHOMY KOD CZARNY
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#fca5a5', lineHeight: '1.6' }}>
                  <p style={{ margin: 0 }}>
                    Konwój jedzie stale ok. <strong>80 km/h</strong>.
                  </p>
                  <p style={{ margin: 0, paddingLeft: '1rem', borderLeft: '3px solid #ef4444' }}>
                    Każde zagrożenie eliminujemy po 1 komunikacie. Pierwsze strzały lecą w opony, drugie prosto w kierowcę.
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>U1 i Ostatnia jednostka</strong> włączają KOD 3, reszta KOD 2. Do więzienia wjeżdża <strong>TYLKO więźniarka</strong>.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariant} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'Kolumna', desc: 'Używana w mieście. Auta jadą 5 metrów za sobą na jednym pasie.', img: '/kolumna.png' },
                { title: 'Szachownica', desc: 'Formacja polegająca na naprzemiennym ułożeniu radiowozów na pasach ruchu (lewy, prawy, lewy). Przeznaczona dla szybkich konwojów autostradowych. Wyprzedzanie tylko środkiem. Radiowozy jadą asynchronicznie blisko siebie.', img: '/szachownica.png' },
                { title: 'Żółw', desc: 'Skondensowana formacja, w której radiowozy szczelnie otaczają pojazd transportowy ze wszystkich stron (przód, tył, prawy i lewy bok). Najwyższy poziom ochrony używany głównie podczas Kodu Czarnego lub w niebezpiecznych strefach przy niskiej prędkości.', img: '/zolw.png' }
              ].map((formation, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #3b82f6', display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#3b82f6' }}>{formation.title}</h4>
                  <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>{formation.desc}</p>
                  <div style={{ width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                    <img 
                      src={`${formation.img}?v=3`} 
                      alt={formation.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'zoom-in', transition: 'transform 0.3s ease' }} 
                      onClick={() => setLightboxImg(`${formation.img}?v=3`)}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        );

      case 'napady':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Banknote size={20} /> Limity Osób na Napadach (LSPD vs Przestępcy)
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                
                {/* Ogólne Starcia */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #3b82f6', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.05 }}><Crosshair size={100} /></div>
                  <h4 style={{ color: '#60a5fa', marginTop: 0, marginBottom: '0.25rem', fontSize: '1.2rem' }}>OGÓLNE STARCIA</h4>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1.5rem' }}>Podstawowe limity podczas strzelanin</span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Policja vs Crime</span>
                        <strong style={{ color: '#fff', fontSize: '1.1rem' }}><span style={{ color: '#60a5fa' }}>10</span> vs <span style={{ color: '#ef4444' }}>8</span></strong>
                     </div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Crime I vs Crime II</span>
                        <strong style={{ color: '#fff', fontSize: '1.1rem' }}><span style={{ color: '#ef4444' }}>8</span> vs <span style={{ color: '#f97316' }}>8</span></strong>
                     </div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>PD vs Crime I vs Crime II</span>
                        <strong style={{ color: '#fff', fontSize: '1.1rem' }}><span style={{ color: '#60a5fa' }}>10</span> vs <span style={{ color: '#ef4444' }}>8</span> vs <span style={{ color: '#f97316' }}>8</span></strong>
                     </div>
                  </div>
                </div>

                {/* Mniejsze Przestępstwa */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #10b981', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.05 }}><Banknote size={100} /></div>
                  <h4 style={{ color: '#10b981', marginTop: 0, marginBottom: '0.25rem', fontSize: '1.2rem' }}>MNIEJSZE PRZESTĘPSTWA</h4>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1.5rem' }}>Włamania i kradzieże mienia</span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Okradanie domów</span>
                        <strong style={{ color: '#fff', fontSize: '1.1rem' }}><span style={{ color: '#60a5fa' }}>4</span> vs <span style={{ color: '#ef4444' }}>2</span></strong>
                     </div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Trucker / Napad na kasetkę</span>
                        <strong style={{ color: '#fff', fontSize: '1.1rem' }}><span style={{ color: '#60a5fa' }}>5</span> vs <span style={{ color: '#ef4444' }}>3</span></strong>
                     </div>
                  </div>
                </div>

                {/* Duże Akcje Specjalne */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #eab308', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.05 }}><ShieldAlert size={100} /></div>
                  <h4 style={{ color: '#eab308', marginTop: 0, marginBottom: '0.25rem', fontSize: '1.2rem' }}>DUŻE AKCJE (KONWOJE)</h4>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1.5rem' }}>Transport i odbijanie więźniów</span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(234, 179, 8, 0.3)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Konwoje (PD vs Crime)</span>
                        <strong style={{ color: '#fff', fontSize: '1.1rem' }}><span style={{ color: '#60a5fa' }}>12</span> vs <span style={{ color: '#ef4444' }}>15</span></strong>
                     </div>
                     <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Konwój to akcja o najwyższym stopniu ryzyka. Przestępcy otrzymują delikatną przewagę ze względu na specyfikę odbijania z rąk Departamentu.</p>
                  </div>
                </div>

              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #f97316' }}>
              <h3 style={{ color: '#f97316', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={24} /> ⏱ KONIEC LIMITÓW (ZASADA 10 MINUT)
              </h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                Po upływie <strong>10 minut</strong> od pierwszego oddanego strzału w kierunku funkcjonariusza (KOD 0) na napadzie, siły LSPD przestają obowiązywać limity. SV może wezwać wszystkie dostępne na służbie jednostki do pacyfikacji.
              </p>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Map size={20} /> Rozstawienie Jednostek i Taktyka
              </h3>
              <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: '1.8', fontSize: '1.05rem' }}>
                W przypadku braku wystarczającej liczby jednostek na miejscu napadu (Jubiler, Fleeca Kwadraciak, Urzędnicza, Vinewood, Rockford), to <strong>Supervisor (SV)</strong> uzupełnia luki wedle własnego uznania i wydaje polecenia na radiu taktycznym. Zalecane miejsca rozstawień i osłon są udostępniane odprawą przed lub w trakcie działań taktycznych. Zachowanie odpowiedniego dystansu od wyjść z placówek oraz kategoryczne ubezpieczenie <em>"pleców"</em> jest kluczowe na każdej akcji, aby nie dać się zajść od tyłu.
              </p>
            </motion.div>
          </motion.div>
        );

      case 'miranda':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              
              {/* Left Side: Visual / Title */}
              <motion.div variants={itemVariant} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '4rem 2rem', background: 'linear-gradient(to bottom right, rgba(234, 179, 8, 0.05), rgba(0,0,0,0.5))', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '2rem', borderRadius: '50%', marginBottom: '2rem', boxShadow: '0 0 50px rgba(234, 179, 8, 0.2)' }}>
                  <ShieldAlert size={80} color="var(--gold)" />
                </div>
                <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0', color: '#fff', textTransform: 'uppercase', letterSpacing: '2px' }}>Prawa <span style={{ color: 'var(--gold)' }}>Mirandy</span></h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '300px', lineHeight: '1.6' }}>
                  Oficjalna formułka zatrzymania departamentu Los Santos.
                </p>
              </motion.div>

              {/* Right Side: The Rights */}
              <motion.div variants={itemVariant} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { id: 1, text: 'Masz prawo zachować milczenie. Wszystko, co powiesz, może i zostanie wykorzystane przeciwko Tobie w sądzie.' },
                  { id: 2, text: 'Masz prawo do adwokata. Jeśli Cię na niego nie stać, zostanie Ci takowy przydzielony z urzędu, o ile jest dostępny w mieście.' },
                  { id: 3, text: 'Masz prawo do telefonu w obecności funkcjonariusza. Trwa on maksymalnie 2,5 minuty, ilość połączeń nieograniczona, funkcjonariusz musi słyszeć rozmowę.' },
                  { id: 4, text: 'Jeśli będziesz obrażał funkcjonariuszy, Twoje prawa zostaną Ci odebrane.', color: '#ef4444' }
                ].map((right, idx) => (
                  <div key={idx} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', borderLeft: `4px solid ${right.color || 'var(--gold)'}`, background: right.color ? 'rgba(239, 68, 68, 0.05)' : undefined }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: right.color ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.2)', lineHeight: '1' }}>
                      0{right.id}
                    </div>
                    <p style={{ margin: 0, color: '#e2e8f0', fontSize: '1.1rem', lineHeight: '1.6' }}>
                      {right.text}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <motion.div variants={itemVariant} className="glass-card" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem' }}>
              <AlertTriangle size={24} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#ef4444', display: 'block', marginBottom: '0.3rem', fontSize: '1.1rem' }}>Zasada poprawnego odczytania</strong>
                <p style={{ margin: 0, color: '#fca5a5', lineHeight: '1.6' }}>
                  Prawa Mirandy muszą zostać odczytane w sposób <strong>w pełni słyszalny i zrozumiały</strong> dla zatrzymanego, zanim zostaną mu zadane jakiekolwiek pytania mogące posłużyć jako dowód w sądzie.
                </p>
              </div>
            </motion.div>

          </motion.div>
        );

      case 'szkolenia': {
        const egzaminData = [
          {
            id: 'egzamin-officer',
            icon: '📝',
            title: 'Wiedza Podstawowa (Officer)',
            reqs: 'Los Santos Police Departament',
            available: true,
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--lspd-blue)' }}>
                  <h3 style={{ margin: '0 0 1rem 0', color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ClipboardList size={24} /> Standardy Wiedzy Oficerskiej</h3>
                  <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Każdy pełnoprawny Officer LSPD musi bezbłędnie opanować procedury teoretyczne i praktyczne związane z przeprowadzaniem kontroli drogowych, pościgów oraz transportu zatrzymanych. Wiedza ta stanowi fundament codziennej służby.
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                    <li><strong>Biegłość radiowa:</strong> Natychmiastowe rozpoznawanie i stosowanie kodów 10 oraz Statusów.</li>
                    <li><strong>Procedury zatrzymania:</strong> Ścisłe trzymanie się kroków podczas 10-38 oraz zachowanie maksymalnego bezpieczeństwa własnego.</li>
                    <li><strong>Transport i prawa:</strong> Poprawne egzekwowanie procedur transportowych (Status 7) i bezbłędne deklamowanie Praw Mirandy.</li>
                  </ul>
                </div>

                {/* KODY RADIOWE */}
                <div>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Podstawowe Kody Radiowe</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                    {[
                      ['10-1', 'Do wszystkich jednostek!'], ['Code 5', 'Omijać dany teren'],
                      ['Status 9', 'Procedury zatrzymania na komendzie'], ['10-81', 'Pościg zakończony powodzeniem'],
                      ['10-55', 'Naprawa pojazdu'], ['10-4', 'Zrozumiałem/am'],
                      ['10-6', 'Cisza na radiu!'], ['10-12', 'Teren czysty'],
                      ['Status 6', 'Patrol w toku / Powrót do patrolu'], ['Code 4', 'Zakończenie interwencji / Odwołanie jednostek'],
                      ['10-97', 'Status'], ['10-2', 'Potwierdzam'],
                      ['10-9', 'Powtórz ostatni komunikat'], ['Code 3', 'Wsparcie na sygnałach świetlnych i dźwiękowych'],
                      ['10-3', 'Odmawiam/Neguje'], ['Status 4', 'Wolna jednostka'],
                      ['10-71', 'Strzały'], ['10-5', 'W drodze'],
                      ['Status 2', 'Przerwa w służbie'], ['Code 0', 'Strzały w stronę FP'],
                      ['10-60', 'Proszę o autoryzację na...'], ['10-10', 'Powrót na komendę'],
                      ['10-23', 'Na miejscu/Dojechałem na miejsce'], ['10-50', 'Kolizja/Wypadek'],
                      ['Code 8', 'Odprawa na komendzie'], ['Status 5', 'Rozpoczęcie patrolu'],
                      ['10-8', 'Potrzebne wsparcie'], ['10-90', 'Napad'],
                      ['Status 7', 'Powrót z zatrzymanym na komendę'], ['10-13', 'Ranny Funkcjonariusz'],
                      ['Code 2', 'Wsparcie na sygnałach świetlnych'], ['10-20', 'Lokalizacja'],
                      ['10-72', 'Narkotyki'], ['10-82', 'Pościg zakończony niepowodzeniem'],
                      ['10-80', 'Pościg']
                    ].map(([code, desc], idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '4px', borderLeft: '2px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <strong style={{ color: '#fff', width: '70px' }}>{code}</strong>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', flex: 1 }}>{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KOMPENDIUM */}
                <div>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Kluczowa Wiedza Operacyjna</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      { q: "Skrót ETA", a: "Estimated Time to Arrive - Oszacowanie czasu przybycia na dane miejsce." },
                      { q: "Podjednostka HWP", a: "Highway Patrol - Patrolowanie autostrad, dróg szybkiego ruchu i pościgi wysokich prędkości." },
                      { q: "SuperVisor (SV)", a: "Osoba zarządzająca akcją (rozmieszczanie jednostek, polecenia, kontrola limitów)." },
                      { q: "Wyposażenie Funkcjonariusza", a: "Mundur, pałka, GPS, bodycam, panic button, kajdanki, broń palna, amunicja, taser, wkłady, radio, lornetka, latarka, pas taktyczny." },
                      { q: "Użycie tazera na pościgu pieszym", a: "Taser dopuszczony jest po 3 minutach trwania pościgu pieszego." },
                      { q: "Użycie broni palnej na pościgu pieszym", a: "Gdy napastnik wyciąga broń, stwarza bezpośrednie zagrożenie lub celuje w naszą stronę." },
                      { q: "Zatrzymanie 10-38 a handel narkotykami", a: "Nie strzelamy od razu do uciekających ze sprzedaży. Obowiązuje przeprowadzenie standardowego 10-38 z wezwaniem do poddania." },
                      { q: "Radiooperator (RTO)", a: "Funkcjonariusz na prawym fotelu. Odpowiada za zgłaszanie komunikatów radiowych i utrzymywanie łączności z dyspozycją." }
                    ].map((qa, idx) => (
                      <div key={idx} style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', padding: '1rem', borderRadius: '6px' }}>
                        <div style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{qa.q}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>{qa.a}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CZĘŚĆ PRAKTYCZNA */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                  
                  {/* 10-38 */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #3b82f6' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#3b82f6' }}>Teoria Zatrzymania Drogowego (10-38)</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Zatrzymanie drogowe to najbardziej powszechna, ale i nieprzewidywalna czynność. Kluczowe jest dbanie o bezpieczeństwo.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• <strong>Bezpieczny kąt:</strong> Radiowóz zawsze należy ustawiać pod lekkim kątem (tzw. offset), co tworzy bezpieczną strefę dla funkcjonariusza wychodzącego z pojazdu oraz oświetla wnętrze kontrolowanego auta nocą.</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• <strong>Podejście do pojazdu:</strong> Zawsze zatrzymujemy się tuż za słupkiem B (pomiędzy drzwiami kierowcy a pasażera z tyłu). Zapobiega to uderzeniu przez nagle otwierane drzwi i daje przewagę taktyczną, jeśli kierowca wyciągnąłby broń.</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• <strong>Gotowość:</strong> Tazer powinien być w pogotowiu (ale nie wycelowany), by w razie nagłego ataku móc szybko zareagować. Odznaka okazywana jest po nawiązaniu pierwszego kontaktu wzrokowego.</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• <strong>Komunikacja RTO:</strong> Przed wyjściem z radiowozu należy bezwzględnie zgłosić markę, rejestrację oraz dokładną lokalizację pojazdu. Jeśli kontakt się urwie, inne jednostki wiedzą, gdzie wysłać wsparcie.</div>
                    </div>
                  </div>

                  {/* 10-80 */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #ef4444' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#ef4444' }}>Zasady Pościgu Zmotoryzowanego (10-80)</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Wiedza teoretyczna dotycząca podejmowania i prowadzenia pościgów za uciekającym podejrzanym.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• <strong>Hierarchia w kolumnie:</strong> Jednostka będąca na pierwszej pozycji (Primary) skupia się wyłącznie na jeździe. RTO (pasażer) podaje komunikaty na radiu. Pozostałe jednostki pilnują formacji i nasłuchują.</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• <strong>Zmiana pozycji:</strong> Jeśli auto ulegnie uszkodzeniu lub kierowca popełni duży błąd, jednostka Primary natychmiast zjeżdża z linii pościgu, przepuszczając jednostkę Secondary.</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• <strong>Pościg pieszy:</strong> W momencie ucieczki na nogach nie używamy od razu środków przymusu. Dopiero po ignorowaniu wezwań (i po upływie 3 minut) dopuszczalne jest użycie paralizatora. Broń palna — tylko w odpowiedzi na śmiertelne zagrożenie.</div>
                    </div>
                  </div>

                  {/* STATUS 7 */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #facc15' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#facc15' }}>Teoria Transportu Więźnia (Status 7)</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• <strong>Zabezpieczenie:</strong> Zanim podejrzany trafi na tylne siedzenie, musi zostać pobieżnie przeszukany w celu pozbawienia go broni palnej, ostrej lub jakichkolwiek przedmiotów stanowiących bezpośrednie zagrożenie.</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• <strong>Prawa Mirandy:</strong> Zatrzymany musi zostać poinformowany o swoich prawach konstytucyjnych w pełni zrozumiałej formie (niezależnie czy się z nimi zgadza, czy nie). Bez ich podania, zeznania obywatela mogą zostać podważone przez papugę w sądzie.</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• <strong>Prędkość:</strong> Transport podejrzanego wymaga ostrożnej jazdy. Maksymalna prędkość operacyjna to przeważnie 70km/h w obszarze zabudowanym oraz do 140km/h na drogach szybkiego ruchu. Zbyt brawurowa jazda z zatrzymanym może skończyć się karą dyscyplinarną.</div>
                    </div>
                  </div>

                  {/* STATUS 9 */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #a855f7' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#a855f7' }}>Procedury na Komendzie (Status 9)</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• <strong>Cela zatrzymań:</strong> To tutaj obywatel zostaje pozbawiony sprzętu komunikacyjnego. Zdjęta zostaje również maska w celu weryfikacji tożsamości poprzez dowód lub odcisk palca w bazie AFIS.</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• <strong>Przeszukanie szczegółowe:</strong> Wykonywane bardzo skrupulatnie. Przedmioty nielegalne wędrują natychmiast do szafki dowodowej, natomiast przedmioty osobiste zatrzymanego umieszczane są w depozycie (tzw. oddanie pod komendą za pomocą odpowiednich komend).</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• <strong>Wyrok i negocjacje kary:</strong> Zatrzymany ma prawo wysłuchać swoich zarzutów. Jeżeli wykazuje współpracę, Officer może (ale nie musi) zezwolić na telefon do adwokata lub zredukować wyrok na podstawie taryfikatora współpracującego podejrzanego.</div>
                    </div>
                  </div>
                </div>

              </div>
            )
          }
        ];

        const szkoleniaData = [
          {
            id: 'rto',
            icon: '🎧',
            title: 'RTO — Radio Traffic Only',
            reqs: 'Wymagane na: Officer I',
            available: true,
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid var(--lspd-blue)' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Radio size={24} /> Komunikacja Radiowa (RTO)</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>Moduł ten kładzie całkowity nacisk na płynną, bezbłędną i profesjonalną komunikację radiową w stresowych sytuacjach. RTO jest rdzeniem koordynacji działań departamentu.</p>
                </div>

                <div>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Zasady Operacyjne RTO w Pościgu</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
                      <strong style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={16} color="var(--lspd-blue)"/> Priorytet Informacji</strong>
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>W trakcie roli RTO priorytetem jest stałe nadawanie kierunku, nazwy ulicy oraz ewentualnych punktów orientacyjnych, aby jednostki wspomagające mogły przewidzieć trasę pościgu.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
                      <strong style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Crosshair size={16} color="#10b981"/> Czytelność i Opanowanie</strong>
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Komunikaty muszą być krótkie i rzeczowe. Przekrzykiwanie się na radiu lub nadawanie zbędnych emocji stwarza zagrożenie dla skuteczności całej akcji.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
                      <strong style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Map size={16} color="var(--gold)"/> Znajomość Topografii</strong>
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Funkcjonariusz RTO ma bezwzględny obowiązek posługiwać się prawidłowymi nazwami dzielnic, ulic oraz kluczowych miejscówek bez zająknięcia.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{ color: 'var(--lspd-blue)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Standardy Weryfikacji (Trening)</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      "Trening odbywa się przy wykorzystaniu standardowej jednostki patrolowej.",
                      "Podczas treningu funkcjonariusz szkoleniowy utrzymuje stałe tempo ucieczki (np. do 150 km/h), by sprawdzić ciągłość narracji RTO.",
                      "Weryfikowana jest znajomość kluczowych lokacji na mapie miasta w formie ciągłego, pięciominutowego meldunku.",
                      "Przerwy w komunikacji nie mogą zakłócać ciągłości informacji o kierunku poruszania się uciekiniera."
                    ].map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', fontWeight: 'bold' }}>{idx + 1}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          },
          {
            id: 'nt',
            icon: '🤝',
            title: 'NT — Negocjator',
            reqs: 'Od stopnia: Officer I  ·  Wymagane na: Officer II',
            available: true,
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid var(--lspd-blue)', textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--lspd-blue)' }}>GŁOS LSPD (NEGOCJATOR)</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>Negocjator ratuje ludzkie życie. Jest łącznikiem między napastnikami a PD. Zawsze ubezpieczony, zawsze opanowany.</p>
                </div>

                {/* ETAP I - TEORIA */}
                <div>
                  <h3 style={{ color: 'var(--lspd-blue)', marginBottom: '1rem', borderBottom: '2px solid rgba(59, 130, 246, 0.3)', paddingBottom: '0.5rem' }}>ETAP I: Egzamin Teoretyczny</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Egzamin w formie testu. Z każdej tabeli (Zagadnień) zadajecie <strong>minimum 3 pytania</strong>. Dopuszczalna ilość błędów na pojedynczą tabelę: <strong>3</strong>.</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    
                    {/* Kryteria Negocjacji */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 'bold', color: '#fff', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>Kryteria Negocjacji</div>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <tbody style={{ textAlign: 'left', color: '#fff' }}>
                          <tr><td style={{ padding: '0.4rem' }}>Kultura na drodze</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>1 żądanie</td></tr>
                          <tr style={{ background: 'rgba(255,255,255,0.01)' }}><td style={{ padding: '0.4rem' }}>Wolny odjazd</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>1 żądanie</td></tr>
                          <tr><td style={{ padding: '0.4rem' }}>Wolny odjazd (poszukiwany)</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>2 żądania</td></tr>
                          <tr style={{ background: 'rgba(255,255,255,0.01)' }}><td style={{ padding: '0.4rem' }}>Brak Kolczatek (1km)</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>1 żądanie</td></tr>
                          <tr><td style={{ padding: '0.4rem' }}>Brak Eagle (Minuta)</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>1 żądanie</td></tr>
                          <tr style={{ background: 'rgba(255,255,255,0.01)' }}><td style={{ padding: '0.4rem' }}>Brak Eagle (Całkowity)</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>3 żądania</td></tr>
                          <tr><td style={{ padding: '0.4rem' }}>Naprawa (przed / w trakcie)</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>1 / 3 żądania</td></tr>
                          <tr style={{ background: 'rgba(255,255,255,0.01)' }}><td style={{ padding: '0.4rem' }}>Okup za zakładnika</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>Max 2000$</td></tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Ostrzeżenia */}
                    <div style={{ background: 'rgba(239, 68, 68, 0.05)', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(239, 68, 68, 0.1)', fontWeight: 'bold', color: '#ef4444', textAlign: 'center', background: 'rgba(0,0,0,0.1)' }}>Ostrzeżenia Negocjatorskie</div>
                      <ul style={{ margin: 0, padding: '1rem 1rem 1rem 2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <li>Nieprzestrzeganie zasad negocjacji</li>
                        <li>Brak kontaktu / chęci porozumienia</li>
                        <li>Groźby w stronę zakładników / FP</li>
                        <li>Nierealne żądania</li>
                        <li>Brak powagi na napadzie/akcji</li>
                        <li>Celowanie w stronę FP</li>
                      </ul>
                    </div>

                    {/* Zerwanie */}
                    <div style={{ background: 'rgba(239, 68, 68, 0.05)', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(239, 68, 68, 0.1)', fontWeight: 'bold', color: '#ef4444', textAlign: 'center', background: 'rgba(0,0,0,0.1)' }}>Zerwanie Negocjacji</div>
                      <ul style={{ margin: 0, padding: '1rem 1rem 1rem 2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <li><strong>Po wydaniu 3 ostrzeżeń</strong></li>
                        <li>Zakładnik został zraniony</li>
                        <li>Napastnicy opuszczają teren bez zgody</li>
                        <li>Zakładnicy są podstawieni (koledzy)</li>
                        <li>100% pewności bezpiecznego wjazdu siłowego</li>
                        <li>Strzały na terenie napadu</li>
                        <li>Wielokrotne wyzwiska/groźby w stronę FP</li>
                      </ul>
                    </div>
                  </div>

                  {/* Formułka */}
                  <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: '6px', borderLeft: '3px solid #10b981', marginBottom: '1.5rem' }}>
                    <strong style={{ color: '#10b981', display: 'block', marginBottom: '0.5rem' }}>Formułka Negocjatorska (Koniec Akcji)</strong>
                    <p style={{ margin: 0, color: '#fff', fontSize: '1rem', fontStyle: 'italic' }}>"Macie 30 sekund na rozkucie zakładników, wypuszczenie ich z terenu napadu/akcji, oraz wejście do pojazdu i oczekiwanie na zielone światło."</p>
                  </div>


                </div>

                {/* ETAP II - PRAKTYKA */}
                <div>
                  <h3 style={{ color: '#10b981', marginBottom: '1rem', borderBottom: '2px solid rgba(16, 185, 129, 0.3)', paddingBottom: '0.5rem', marginTop: '1rem' }}>Procedury Negocjacyjne (Praktyka)</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Standardy LSPD wymagają, aby Negocjator działał jako przedłużenie woli Supervisora (SV). Kluczem jest zabezpieczenie zakładników przy jednoczesnym kontrolowaniu emocji napastników.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '3px solid var(--lspd-blue)' }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--lspd-blue)' }}>Kluczowe Kroki i Komunikacja</h4>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                        <li>Bezpieczne wejście, okazanie odznaki i przedstawienie się.</li>
                        <li>Komunikacja Nego-SV (Przekazanie części I: liczba napastników/zakładników, stan zakładników).</li>
                        <li>Komunikacja Nego-SV (Przekazanie części II: Żądania X za X).</li>
                        <li>Przekazanie do SV precyzyjnej informacji o czasie końca rabunku (tzw. "przyklepanie").</li>
                        <li>Poprawne odklepanie formułki zabezpieczającej na sam koniec negocjacji.</li>
                      </ul>
                    </div>
                    
                    <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: '6px', borderLeft: '3px solid #ef4444' }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertTriangle size={18} /> Błędy Taktyczne</h4>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                        <li>Brak wstępnego zabezpieczenia własnego (wejście bez osłony).</li>
                        <li>Brak pytania o stan zdrowia zakładników!</li>
                        <li>Brak natychmiastowego poinformowania, że napastnicy celują do FP!</li>
                        <li>Wdawanie się w przekrzykiwania lub nieprofesjonalne dyskusje.</li>
                        <li>Zatajenie przed SV wyzwisk i gróźb kierowanych w stronę FP.</li>
                      </ul>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(250, 204, 21, 0.05)', padding: '1rem', borderRadius: '6px', borderLeft: '3px solid var(--gold)', marginTop: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--gold)' }}>Symulacje i Trening</h4>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>Jednostka szkoleniowa LSPD zaleca regularne przeprowadzanie "Symulacji Napadu" na wyznaczonych terenach operacyjnych w celu szlifowania umiejętności komunikacyjnych.</p>
                  </div>
                </div>

                {/* ZAKOŃCZENIE */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#fff', textAlign: 'center' }}>Podsumowanie Roli Negocjatora</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '4px', fontSize: '0.9rem' }}>
                      Bycie Negocjatorem wymaga opanowania wszystkich tabel wartości i limitów napadów. Tylko osoba w pełni świadoma zasad jest w stanie bezpiecznie zarządzać napiętą sytuacją.
                    </div>
                  </div>
                </div>

              </div>
            )
          },
          {
            id: 'sv',
            icon: '🎖️',
            title: 'SV — Supervisor',
            reqs: 'Od stopnia: Officer II  ·  Wymagane na: Officer III',
            available: true,
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                <div style={{ background: 'rgba(234, 179, 8, 0.05)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid var(--gold)', textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--gold)' }}>ANONIMOWOŚĆ SV TO PRIORYTET ABSOLUTNY</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>Supervisor to osoba dowodząca akcją. Jest to zawsze osoba najwyższa stopniem lub inicjująca pościg. Jego dane personalne absolutnie <strong>nie mogą zostać wyjawione</strong> nikomu spoza jednostki.</p>
                </div>

                {/* ETAP I - TEORIA */}
                <div>
                  <h3 style={{ color: 'var(--lspd-blue)', marginBottom: '1rem', borderBottom: '2px solid rgba(59, 130, 246, 0.3)', paddingBottom: '0.5rem' }}>Podstawy Teoretyczne (Tabele Operacyjne)</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Wiedza z poniższych tabel jest bezwzględnie wymagana. Supervisor podejmuje decyzje ułamkach sekund, opierając się na stałych wytycznych i limitach operacyjnych.</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    {/* Limity Napadów */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 'bold', color: '#fff', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>Limity Napadów</div>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                          <tr style={{ color: 'var(--text-muted)' }}>
                            <th style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}>Napad</th>
                            <th style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>LSPD</th>
                            <th style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>CRIME</th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center', color: '#fff' }}>
                          <tr><td style={{ padding: '0.4rem', textAlign: 'left' }}>Sklep / Bankomat / Kasetka / Trucker</td><td>4</td><td>2</td></tr>
                          <tr style={{ background: 'rgba(255,255,255,0.01)' }}><td style={{ padding: '0.4rem', textAlign: 'left' }}>Jubiler / Bank</td><td>10</td><td>8</td></tr>
                          <tr><td style={{ padding: '0.4rem', textAlign: 'left' }}>Humane Labs / Pacific</td><td>12</td><td>10</td></tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Wartości Zakładników */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 'bold', color: '#fff', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>Wartości Zakładników</div>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <tbody style={{ textAlign: 'left', color: '#fff' }}>
                          <tr><td style={{ padding: '0.4rem' }}>Cywil / Medyk / Adwokat</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>1 żądanie</td></tr>
                          <tr style={{ background: 'rgba(255,255,255,0.01)' }}><td style={{ padding: '0.4rem' }}>FP / LSPD</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>2 żądania</td></tr>
                          <tr><td style={{ padding: '0.4rem' }}>DTU / SWAT / HC EMS / DOJ</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>2 żądania</td></tr>
                          <tr style={{ background: 'rgba(255,255,255,0.01)' }}><td style={{ padding: '0.4rem' }}>Kapitan LSPD</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>3 żądania</td></tr>
                          <tr><td style={{ padding: '0.4rem' }}>HC LSPD</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>4 żądania</td></tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Rozpoczynanie Pościgu */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 'bold', color: '#fff', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>Rozpoczynanie Pościgu</div>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                          <tr style={{ color: 'var(--text-muted)' }}>
                            <th style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}>Kod Miasto</th>
                            <th style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'right' }}>Kod Pościgowy</th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: 'left', color: '#fff' }}>
                          <tr><td style={{ padding: '0.4rem', color: '#22c55e' }}>Zielony</td><td style={{ textAlign: 'right', color: '#22c55e' }}>Zielony</td></tr>
                          <tr style={{ background: 'rgba(255,255,255,0.01)' }}><td style={{ padding: '0.4rem', color: '#f97316' }}>Pomarańczowy</td><td style={{ textAlign: 'right', color: '#22c55e' }}>Zielony</td></tr>
                          <tr><td style={{ padding: '0.4rem', color: '#ef4444' }}>Czerwony</td><td style={{ textAlign: 'right', color: '#eab308' }}>Żółty</td></tr>
                          <tr style={{ background: 'rgba(255,255,255,0.01)' }}><td style={{ padding: '0.4rem', color: '#94a3b8' }}>Czarny</td><td style={{ textAlign: 'right', color: '#ef4444' }}>Czerwony</td></tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Kryteria Negocjacji */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 'bold', color: '#fff', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>Kryteria Negocjacji</div>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <tbody style={{ textAlign: 'left', color: '#fff' }}>
                          <tr><td style={{ padding: '0.4rem' }}>Kultura na drodze / Wolny odjazd</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>1 żądanie</td></tr>
                          <tr style={{ background: 'rgba(255,255,255,0.01)' }}><td style={{ padding: '0.4rem' }}>Wolny odjazd dla poszukiwanego</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>2 żądania</td></tr>
                          <tr><td style={{ padding: '0.4rem' }}>Brak Kolczatek (1km) / Brak Eagle (1 min)</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>1 żądanie</td></tr>
                          <tr style={{ background: 'rgba(255,255,255,0.01)' }}><td style={{ padding: '0.4rem' }}>Brak Eagle (Całkowity)</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>3 żądania</td></tr>
                          <tr><td style={{ padding: '0.4rem' }}>Naprawa pojazdu przed/w trakcie</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>1 / 3 żądania</td></tr>
                          <tr style={{ background: 'rgba(255,255,255,0.01)' }}><td style={{ padding: '0.4rem' }}>Okup za zakładnika</td><td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>Max 2000$</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--gold)' }}>Dodatkowa Wiedza Dowódcza</h5>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <li><strong style={{ color: '#fff' }}>Cechy Dobrego SV:</strong> Odwaga, pewność siebie, utrzymanie zimnej krwi, kontrola przebiegu akcji.</li>
                      <li><strong style={{ color: '#fff' }}>Główne Obowiązki:</strong> Wyznaczenie Nego i FP, ustalenie Unitów, nakładanie kodów pościgowych, wezwanie EMS (w razie potrzeby), wpisywanie poszukiwań i finalne rozwiązanie częstotliwości.</li>
                      <li><strong style={{ color: '#fff' }}>Zarządzanie Jednostkami:</strong> Absolutny zakaz odwoływania SEU / MERRY z powodu negocjacji.</li>
                      <li><strong style={{ color: '#fff' }}>Użycie Siły:</strong> PIT w mieście na kodzie czerwonym dozwolony do 60 km/h. Strzały w opony NIE SĄ automatyczne - wymagają wyraźnej autoryzacji od SV.</li>
                    </ul>
                  </div>
                </div>

                {/* ETAP II - PRAKTYKA */}
                <div>
                  <h3 style={{ color: '#10b981', marginBottom: '1rem', borderBottom: '2px solid rgba(16, 185, 129, 0.3)', paddingBottom: '0.5rem', marginTop: '1rem' }}>Standardy Dowodzenia (Praktyka)</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Supervisor zarządza każdym aspektem incydentu – od jego początku na miejscu zdarzenia aż po zwolnienie częstotliwości operacyjnej.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '3px solid var(--lspd-blue)' }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--lspd-blue)' }}>Kluczowe Działania</h4>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                        <li>Przestrzeganie Limitów (Złota zasada!).</li>
                        <li>Poprawna komunikacja na linii: SV - Nego, SV - Jednostki.</li>
                        <li>Rozstawienie FP (Zabezpieczenie terenu).</li>
                        <li>Rozstawienie Unitów na ucieczkę / do pościgu.</li>
                        <li>Nakładanie kodów (Pościgowych i Miejskich).</li>
                        <li>Nadawanie ostrzeżeń / Prawidłowe zerwanie negocjacji.</li>
                      </ul>
                    </div>
                    
                    <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: '6px', borderLeft: '3px solid #ef4444' }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertTriangle size={18} /> Zagrożenia Dowódcze</h4>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                        <li>Nieprzestrzeganie limitów lub łamanie regulaminu serwera.</li>
                        <li>Chaotyczne, niepoprawne rozstawienie FP i Unitów do pościgu.</li>
                        <li>Krytycznie błędna komunikacja radiowa i wprowadzanie zamieszania.</li>
                        <li>Błędne ostrzeżenia wydawane przez Nego lub nagłe, nieuzasadnione zerwanie negocjacji.</li>
                        <li>Brak nadawania kodów i kierunków dla reagujących jednostek.</li>
                      </ul>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(250, 204, 21, 0.05)', padding: '1rem', borderRadius: '6px', borderLeft: '3px solid var(--gold)', marginTop: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--gold)' }}>Trening Operacyjny</h4>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>Jednostki dowódcze powinny trenować scenariusze symulacyjne podczas braku aktywności w mieście, optymalizując zarządzanie zasobami departamentu.</p>
                  </div>
                </div>

                {/* ZAKOŃCZENIE */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#fff', textAlign: 'center' }}>Podsumowanie Roli SV</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '4px', fontSize: '0.9rem' }}>
                      Rola Supervisora jest najbardziej obciążającą odpowiedzialnością podczas incydentów. Wymaga chłodnej kalkulacji i natychmiastowego egzekwowania prawa.
                    </div>
                  </div>
                </div>

              </div>
            )
          },
          {
            id: 'pwc',
            icon: '📋',
            title: 'PWC — Patrol Watch Commander',
            reqs: 'Od stopnia: Officer III  ·  Wymagane na: Officer III+1',
            available: true,
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '8px', borderTop: '3px solid var(--lspd-blue)' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>Dowódca Dyspozycji (PWC / APWC)</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    PWC to dowódca i menedżer dyspozycji jednostek na ulicach Los Santos. <br/>
                    Kod wywoławczy: <strong style={{ color: 'var(--gold)', background: 'rgba(250, 204, 21, 0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>00</strong>. <br/>
                    <strong>PWC jest obowiązkowy</strong>, gdy na służbie przebywa powyżej 8 funkcjonariuszy.
                  </p>
                </div>

                <div>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Organizacja Pracy</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px' }}>
                      <div style={{ color: 'var(--lspd-blue)' }}><Users size={24} /></div>
                      <div>
                        <strong style={{ color: '#fff', display: 'block', marginBottom: '0.2rem' }}>Asystent (APWC)</strong>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>PWC ma obowiązek wyznaczyć swojego asystenta, który pomaga mu w zarządzaniu.</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px' }}>
                      <div style={{ color: 'var(--gold)' }}><Radio size={24} /></div>
                      <div>
                        <strong style={{ color: '#fff', display: 'block', marginBottom: '0.2rem' }}>Dispatch i Radio</strong>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>PWC ciągle pilnuje systemu dispatch, zarządza wysyłaniem jednostek do zgłoszeń i pilnuje porządku na radiu.</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                      <div style={{ color: '#ef4444' }}><ShieldAlert size={24} /></div>
                      <div>
                        <strong style={{ color: '#fff', display: 'block', marginBottom: '0.2rem' }}>Kody Czerwony/Czarny</strong>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>PWC dba o to, by przy wysokich kodach Kadeci zostawali na komendzie w ramach bezpieczeństwa.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          },
          {
            id: 'fac',
            icon: '🏥',
            title: 'FAC — Pierwsza Pomoc',
            reqs: 'Od stopnia: Officer I  ·  Wymagane na: Officer II',
            available: true,
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={24} /> Individual First Aid Course (IFAC)</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>Szkolenie medyczne przygotowujące do ratowania życia na miejscu zdarzenia przed przyjazdem EMS (Main: 9, Op: 11). <strong>Priorytet to zawsze bezpieczeństwo funkcjonariusza!</strong></p>
                </div>

                <div>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Złoty Standard Ratownictwa — ABCDE</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>A</div>
                      <div style={{ color: 'var(--text-muted)' }}><strong style={{ color: '#fff' }}>Airway</strong> (Drogi oddechowe) — Otwarcie dróg, sprawdzenie czy nie ma ciał obcych.</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>B</div>
                      <div style={{ color: 'var(--text-muted)' }}><strong style={{ color: '#fff' }}>Breathing</strong> (Oddech) — Kontrola oddechu metodą słyszę, widzę, czuję (przez 10s).</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: 'bold' }}>C</div>
                      <div style={{ color: 'var(--text-muted)' }}><strong style={{ color: '#ef4444' }}>Circulation</strong> (Krążenie) — Szybkie tamowanie <strong>masywnych</strong> krwotoków stazą CAT.</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>D</div>
                      <div style={{ color: 'var(--text-muted)' }}><strong style={{ color: '#fff' }}>Disability</strong> (Neurologia) — Ocena przytomności i reakcji pacjenta.</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>E</div>
                      <div style={{ color: 'var(--text-muted)' }}><strong style={{ color: '#fff' }}>Exposure</strong> (Ekspozycja) — Szybkie badanie urazowe całego ciała przed przyjazdem EMS.</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.25rem', borderRadius: '8px', borderTop: '3px solid #ef4444' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={18} /> NZK (Brak Pulsu/Oddechu)</h4>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Wykonujemy RKO (Resuscytacja krążeniowo-oddechowa). <br/><strong style={{ color: '#fff' }}>Tempo:</strong> 100-120 uciśnięć/min w stosunku <strong style={{ color: '#fff' }}>30 uciśnięć : 2 wdechy</strong>.<br/><br/>U topielców zawsze przed uciskami wykonujemy 5 wdechów ratowniczych po wyciągnięciu z wody.</p>
                  </div>
                  
                  <div style={{ background: 'rgba(250, 204, 21, 0.05)', padding: '1.25rem', borderRadius: '8px', borderTop: '3px solid var(--gold)' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldAlert size={18} /> Krwotoki i Złamania</h4>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <li style={{ marginBottom: '0.3rem' }}><strong>Staza taktyczna (CAT):</strong> Zakładana 3-5cm NAD raną przy obfitym krwotoku kończynowym. Zawsze pisakiem na stazie <strong>zapisujemy godzinę</strong>!</li>
                      <li style={{ marginBottom: '0.3rem' }}><strong>Postrzał w klatkę:</strong> Wymaga specjalnego opatrunku wentylowego (na odmę prężną).</li>
                      <li><strong>Złamania:</strong> Stabilizacja szyną Kramera w zastanej pozycji. <strong>Nigdy sami nie nastawiamy kości!</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          },
          {
            id: 'asu',
            icon: '🚁',
            title: 'ASU — Air Support Unit',
            reqs: 'Dostępne od: Officer III+1  ·  Szkolenie dodatkowe (Nieobowiązkowe)',
            available: true,
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid var(--lspd-blue)' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Pilot EAGLE (ASU) — Procedury Operacyjne</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>Szkolenie ma na celu przygotowanie pilota do trudnych manewrów w przestrzeni miejskiej, sprawdzając jego opanowanie maszyny w sytuacjach stresowych.</p>
                </div>



                {/* TEORIA MANEWROWA */}
                <div>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Ciekawostki i Teoria Lotnicza: "Ósemka"</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '2px solid var(--gold)' }}>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Manewr "Ósemki" to podstawowe ćwiczenie, które weryfikuje zdolność pilota do szybkiej zmiany wektora lotu wokół przeszkód urbanistycznych. <br/>
                        <strong>Praktyczna wskazówka:</strong> Podchodząc do ciasnych zakrętów między wieżowcami, pilot powinien kontrolować wychylenie ogona. Zbyt mocne użycie pedałów kierunkowych (yaw) przy dużym pochyleniu (pitch) może doprowadzić do nagłej utraty pułapu i uderzenia w budynek.
                      </p>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '6px' }}>
                      <strong style={{ color: '#fff' }}>Zadanie Operacyjne w Warunkach Miejskich:</strong> W centrum Los Santos gęstość budynków bywa myląca z powietrza. Umiejętność latania ciasnymi pętlami jest niezbędna, by utrzymać kontakt wzrokowy z uciekającym podejrzanym, który manewruje pomiędzy zaułkami.
                    </div>
                  </div>
                </div>

                {/* PRZELOT PRECYZYJNY */}
                <div>
                  <h4 style={{ color: 'var(--lspd-blue)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Ciekawostki i Teoria Lotnicza: Przelot Precyzyjny (Kanał Burzowy)</h4>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '2px solid var(--lspd-blue)' }}>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      Manewrowanie nad korytem kanału burzowego i pod mostami to sztuka przewidywania. Przelatując <strong>pod przeprawami drogowymi</strong>, pilot musi zważać na wiry powietrzne oraz gwałtowną zmianę oświetlenia, która może go zdekoncentrować.<br/><br/>
                      <strong>Praktyczna wskazówka:</strong> Kluczem do bezkolizyjnego lotu na niskim pułapie pod mostami jest "wyprzedzanie maszyny myślami". Jeśli pilot zauważy obniżające się przęsło, nie powinien wykonywać raptownych szarpnięć do góry, aby zapobiec uderzeniu łopatami wirnika głównego w sufit mostu. Płynne zniżanie pułapu kilkadziesiąt metrów wcześniej ułatwia prześwit.
                    </p>
                  </div>
                </div>

                {/* ETAP 3 */}
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.25rem', borderRadius: '8px', borderTop: '3px solid #ef4444' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={18} /> Manewry Zwinnościowe</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Podczas patrolowania miasta jednostka ASU musi błyskawicznie reagować na dyspozycje. Część szkolenia obejmuje wykonywanie nagłych manewrów w locie.
                  </p>
                  
                  <div style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <strong style={{ color: '#fff', fontSize: '0.85rem', textTransform: 'uppercase' }}>Przykładowe Procedury W Locie:</strong>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <li>Zawrócenie w kierunku wskazanym na kompasie.</li>
                      <li>Wylądowanie na trudnym dachu / helipadzie wskazanym na mapie.</li>
                      <li>Przelecenie pod konkretnymi mostami na trasie.</li>
                      <li>Utrzymanie pułapu równe 100m nad ziemią przez 1 minutę.</li>
                      <li>Precyzyjne okrążenie wybranego budynku 2 razy.</li>
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.75rem', borderRadius: '6px' }}>
                    <strong style={{ color: '#ef4444', display: 'block', marginBottom: '0.2rem' }}>BEZPIECZEŃSTWO LOTU</strong>
                    <span style={{ fontSize: '0.9rem', color: '#fff' }}>Każde zahaczenie łopatą lub płozą w terenie zabudowanym traktowane jest jako poważny błąd proceduralny. Należy utrzymywać maksymalną koncentrację.</span>
                  </div>
                </div>
              </div>
            )
          },
          {
            id: 'seu',
            icon: '🏎️',
            title: 'SEU — Speed Enforcement Unit',
            reqs: 'Dostępne od: Sergeant  ·  Szkolenie dodatkowe (Nieobowiązkowe)',
            available: true,
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(244, 63, 94, 0.05)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid #f43f5e' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Car size={24} /> Teoria SEU (Speed Enforcement Unit)</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>Jednostka wyspecjalizowana do podejmowania pościgów za autami o dużej mocy, wyposażona w sportowe modele radiowozów.</p>
                </div>



                {/* ZASADY I CIEKAWOSTKI */}
                <div>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Fundamenty Operacyjne SEU</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '2px solid var(--lspd-blue)' }}>
                      <strong style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={18} color="var(--lspd-blue)"/> Zgranie w kabinie</strong>
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Jednostki SEU operują z ekstremalnymi prędkościami. Od kierowcy wymaga się bezbłędnej jazdy i zaufania do RTO (radiooperatora), który w trakcie pościgu jest "oczami i uszami" całego Departamentu.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '2px solid #10b981' }}>
                      <strong style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={18} color="#10b981"/> Pościg vs Bezpieczeństwo</strong>
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Must win mentality (chęć wygrania za wszelką cenę) to największy wróg jednostek SEU. Często odpuszczenie zbyt niebezpiecznego skoku kaskaderskiego jest lepszym wyborem niż rozbicie wartego miliony radiowozu.</p>
                    </div>
                  </div>
                </div>

                {/* ZADANIA RTO */}
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.25rem', borderRadius: '8px', borderTop: '3px solid #ef4444' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertTriangle size={18} /> Kluczowe Zadania Pasażera (RTO)</h4>
                  <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Brak płynnej łączności to powód wielu oblanych treningów SEU. RTO musi:</p>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8' }}>
                    <li><strong style={{ color: '#fff' }}>Przewidywać ulice:</strong> Informować na radiu ułamek sekundy <em>przed</em> tym, jak podejrzany wejdzie w zakręt.</li>
                    <li><strong style={{ color: '#fff' }}>Zgłaszać utratę wizji natychmiast:</strong> Każda sekunda wahania ("Zaraz go znajdziemy") daje uciekinierowi przewagę kilkuset metrów. Trzeba od razu zgłosić "Zgubiliśmy wizję", by inne patrole rozwinęły poszukiwania.</li>
                    <li><strong style={{ color: '#fff' }}>Wspierać kierowcę:</strong> RTO jest nawigatorem. Jeżeli widzi potencjalne przeszkody w wąskich zaułkach, musi z wyprzedzeniem nakazać kierowcy hamowanie.</li>
                  </ul>
                </div>
              </div>
            )
          },
          {
            id: 'wu',
            icon: '🚤',
            title: 'WU — Water Unit',
            reqs: 'Dostępne od: Officer III  ·  Szkolenie dodatkowe (Nieobowiązkowe)',
            available: true,
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid #3b82f6' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#3b82f6' }}>Jednostka Wodna (WU)</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>Jednostka wyspecjalizowana do patrolowania akwenów wodnych przy użyciu łodzi OCEAN oraz profesjonalnego sprzętu nurkowego. Praca w WU wymaga doskonałej kondycji, pewności w wodzie i wybitnej odporności na lęk przed głębokością.</p>
                </div>

                <div>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Procedury Operacyjne i Taktyczne (Teoria)</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px' }}>
                      <div style={{ color: 'var(--gold)' }}><Map size={24} /></div>
                      <div>
                        <strong style={{ color: '#fff' }}>Ewakuacja podwodna (np. Humane Labs)</strong>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>W krytycznych sytuacjach nurkowie WU desantowani są bezpośrednio z maszyny EAGLE do wody. Kluczowe jest szybkie rozeznanie w terenie podwodnym, użycie latarek taktycznych i zachowanie spokoju w ciasnych tunelach jaskiniowych.</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px' }}>
                      <div style={{ color: 'var(--lspd-blue)' }}><Crosshair size={24} /></div>
                      <div>
                        <strong style={{ color: '#fff' }}>Poszukiwania na dnie oceanu</strong>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Poszukiwanie dowodów zbrodni (np. wyrzuconej broni) lub ciał ofiar wymaga metodycznego przeszukiwania sektorowego. Widoczność w brudnych wodach Los Santos bywa zerowa, dlatego nurek musi polegać na dotyku i skanerach sonaru.</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px' }}>
                      <div style={{ color: '#10b981' }}><Radio size={24} /></div>
                      <div>
                        <strong style={{ color: '#fff' }}>Prowadzenie łodzi OCEAN w rzekach</strong>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pływanie łodzią patrolową pod prąd w rzece Zancudo bywa zdradliwe z powodu wystających konarów i płycizn. Sternik musi błyskawicznie reagować na zmiany nurtu, by nie uszkodzić śruby napędowej.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(250, 204, 21, 0.05)', padding: '1.25rem', borderRadius: '8px', borderTop: '3px solid var(--gold)' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={18} /> Ratownictwo Wodne (Pomoc Topielcom)</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <strong style={{ color: '#fff' }}>Przytomny poszkodowany w panice:</strong><br/>
                    NIGDY nie podajemy mu dłoni z brzegu lub z pontonu — z powodu szoku poszkodowany wciągnie Cię do wody i może podtopić! Zawsze rzucajmy/podawajmy przedmioty (kij, lina, koło).<br/><br/>
                    <strong style={{ color: '#fff' }}>Osoba wyciągnięta i nieprzytomna:</strong><br/>
                    Gdy pacjent znajdzie się na twardym i płytkim gruncie, <strong>absolutnym priorytetem jest natychmiastowe podanie 5 oddechów ratowniczych</strong>. Jeśli po wdechach pacjent nadal nie odzyskał oddechu ani pulsu, natychmiastowo wdrażamy klasyczne RKO (30:2).
                  </p>
                </div>
              </div>
            )
          },
          {
            id: 'mary',
            icon: '🏍️',
            title: 'MARY — Jednostka Motocyklowa',
            reqs: 'Dostępne od: Officer II  ·  Szkolenie dodatkowe (Nieobowiązkowe)',
            available: true,
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(168, 85, 247, 0.05)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid #a855f7' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#a855f7', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>MARY — Teoria Motocyklowa LSPD</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>Jednostka MARY to rozwiązanie dla ciasnej miejskiej dżungli i wąskich szlaków terenowych. Szybka, zwrotna, ale obarczona wysokim ryzykiem wypadku.</p>
                </div>



                {/* ETAP I */}
                <div>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Zwinność Terenowa</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '2px solid var(--gold)' }}>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        W departamencie LSPD motocyklem podstawowym dla wymagających zadań terenowych jest <strong>Sanchez</strong>. Jego zawieszenie pozwala na szybkie pokonywanie pofałdowań w obszarze Vinewood Hills czy piaszczystych bezdroży Blaine County. <br/><br/>
                        <strong>Wskazówka od instruktorów:</strong> Podczas jazdy w terenie kluczem jest odpowiedni balans i dociążanie przedniego lub tylnego koła, by nie dopuścić do wywrotki przy lądowaniach. 
                      </p>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '6px' }}>
                      <strong style={{ color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Praktyka terenowa (co musisz potrafić):</strong> 
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Wyznaczanie własnych szlaków. Na motocyklu nie obowiązują Cię zablokowane autostrady, z łatwością przeciśniesz się przez korki lub zjedziesz na trawiasty skrót, zyskując ogromną przewagę nad uciekającym autem osobowym.</span>
                    </div>
                  </div>
                </div>

                {/* ETAP II */}
                <div style={{ marginTop: '0.5rem' }}>
                  <h4 style={{ color: 'var(--lspd-blue)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Pościg Miejski (Zakamarki i Alejki)</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '3px solid var(--lspd-blue)' }}>
                      <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--lspd-blue)' }}>Przewaga Manewrowa</h5>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        W gęstej tkance miasta (np. Davis, Little Seoul), radiowozy LSPD bywają zablokowane przez wąskie przejścia czy małe rampy na parkingach wielopoziomowych. Jednostka MARY potrafi "wcisnąć się" niemal wszędzie. Utrata wizji w motocyklu powinna być rzadkością dzięki niezwykłemu przyspieszeniu na prostych odcinkach.
                      </p>
                    </div>

                    <div style={{ background: 'rgba(250, 204, 21, 0.05)', padding: '1rem', borderRadius: '6px', borderLeft: '3px solid var(--gold)' }}>
                      <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--gold)' }}>Złota zasada bezpieczeństwa</h5>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                        <li><strong>Brak blach:</strong> Jesteś odsłonięty na strzały. Gdy podejrzany wyciąga broń automatyczną, motocykl musi odpuścić bezpośredni kontakt i wezwać jednostki pancerne.</li>
                        <li><strong>Awaryjność:</strong> Wjazd przy 150 km/h w słupek = śmierć i zniszczona maszyna. Jeździj szybko, ale rozważnie.</li>
                      </ul>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '6px', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '4px' }}><Activity size={16} color="#fff" /></div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}><strong>Zgłaszanie awarii:</strong> Motocykle są niezwykle podatne na defekty kół po trafieniu w dziurę lub krawężnik. Zawsze informuj na radiu (RTO motocykla podaje sam kierowca, więc masz podwójną robotę), gdy zmuszony jesteś do naprawy maszyny.</span>
                  </div>
                </div>
              </div>
            )
          }
        ];

        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #eab308' }}>
              <h3 style={{ color: '#eab308', marginTop: 0 }}>📚 Kompendium Szkoleniowe</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Sekcja jest w trakcie rozbudowy. Ukończenie wymaganych szkoleń jest obowiązkowe dla awansu.</p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <h4 style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>Egzamin oficerski</h4>
              {egzaminData.map((sz, idx) => (
                <motion.div key={sz.id} variants={itemVariant} className="glass-card" style={{ 
                  padding: 0, overflow: 'hidden', opacity: sz.available ? 1 : 0.6, cursor: sz.available ? 'pointer' : 'not-allowed', borderLeft: '4px solid #10b981'
                }}>
                  <div 
                    onClick={() => sz.available && setExpandedSzkolenie(expandedSzkolenie === sz.id ? null : sz.id)}
                    style={{ 
                      padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1.5rem',
                      background: expandedSzkolenie === sz.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{ fontSize: '2rem' }}>{sz.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>{sz.title}</h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{sz.reqs}</span>
                    </div>
                    <div>
                      {sz.available && (
                        <span style={{ 
                          padding: '0.25rem 0.75rem', background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', 
                          borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}>
                          MATERIAŁY
                          <ChevronDown size={16} style={{ transform: expandedSzkolenie === sz.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedSzkolenie === sz.id && sz.available && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                          {sz.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>Opcje Awansu (Wymagane)</h4>
              {szkoleniaData.filter(s => !s.reqs.includes('Nieobowiązkowe')).map((sz, idx) => (
                <motion.div key={sz.id} variants={itemVariant} className="glass-card" style={{ 
                  padding: 0, overflow: 'hidden', opacity: sz.available ? 1 : 0.6, cursor: sz.available ? 'pointer' : 'not-allowed', borderLeft: '4px solid #ef4444'
                }}>
                  <div 
                    onClick={() => sz.available && setExpandedSzkolenie(expandedSzkolenie === sz.id ? null : sz.id)}
                    style={{ 
                      padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1.5rem',
                      background: expandedSzkolenie === sz.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{ fontSize: '2rem' }}>{sz.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>{sz.title}</h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{sz.reqs}</span>
                    </div>
                    <div>
                      {sz.available ? (
                        <span style={{ 
                          padding: '0.25rem 0.75rem', background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', 
                          borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}>
                          DOSTĘPNE
                          <ChevronDown size={16} style={{ transform: expandedSzkolenie === sz.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                        </span>
                      ) : (
                        <span style={{ 
                          padding: '0.25rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', 
                          borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'
                        }}>NIEDOSTĘPNE</span>
                      )}
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedSzkolenie === sz.id && sz.available && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                          {sz.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
              <h4 style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>Dodatkowe Uprawnienia (Nieobowiązkowe)</h4>
              {szkoleniaData.filter(s => s.reqs.includes('Nieobowiązkowe')).map((sz, idx) => (
                <motion.div key={sz.id} variants={itemVariant} className="glass-card" style={{ 
                  padding: 0, overflow: 'hidden', opacity: sz.available ? 1 : 0.6, cursor: sz.available ? 'pointer' : 'not-allowed', borderLeft: '4px solid #3b82f6'
                }}>
                  <div 
                    onClick={() => sz.available && setExpandedSzkolenie(expandedSzkolenie === sz.id ? null : sz.id)}
                    style={{ 
                      padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1.5rem',
                      background: expandedSzkolenie === sz.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{ fontSize: '2rem' }}>{sz.icon}</div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>{sz.title}</h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{sz.reqs.replace(' (Nieobowiązkowe)', '')}</span>
                    </div>
                    <div>
                      {sz.available ? (
                        <span style={{ 
                          padding: '0.25rem 0.75rem', background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', 
                          borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}>
                          DOSTĘPNE
                          <ChevronDown size={16} style={{ transform: expandedSzkolenie === sz.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                        </span>
                      ) : (
                        <span style={{ 
                          padding: '0.25rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', 
                          borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'
                        }}>NIEDOSTĘPNE</span>
                      )}
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedSzkolenie === sz.id && sz.available && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                          {sz.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      }

      case 'antymustwin':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #ef4444', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.05, transform: 'rotate(15deg)' }}>
                <AlertTriangle size={150} color="#ef4444" />
              </div>
              <h3 style={{ marginTop: 0, color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', zIndex: 1, position: 'relative' }}>
                <AlertTriangle size={24} /> REGULAMIN ANTY MUSTWIN
              </h3>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #ef4444', marginBottom: '1.5rem', zIndex: 1, position: 'relative' }}>
                <strong style={{ color: '#fca5a5' }}>Czym różni się od kompendium?</strong>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)' }}>
                  Za nieprzestrzeganie zasad z kompendium wyciągane są konsekwencje In Character (IC). Za łamanie zasad z regulaminu <strong>ANTY MUSTWIN</strong>, wyciągane będą konsekwencje Out Of Character (OOC), włącznie z blokadą konta (ban za MUSTWIN).<br/><br/>
                  Regulamin ten będzie na bieżąco aktualizowany, a o zmianach będziecie informowani.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid rgba(234, 179, 8, 0.3)', paddingBottom: '0.5rem' }}>
                <Banknote size={20} /> Limity na Napady i Negocjacje
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                {[
                  {
                    title: 'Napad na kasetkę', limits: 'Limit 5 PD vs 3 Crime',
                    desc: 'Max. 2 jednostki pościgowe, zakaz pobierania EAGLE.',
                    negos: [
                      { t: 'Wolny odjazd', v: '1 zakładnik' },
                      { t: 'Wolny odjazd (poszukiwany pojazd)', v: '1 zakładnik' },
                      { t: 'Wolny odjazd (kod czerwony+)', v: '2 zakładników' },
                      { t: 'Brak kolczatek (całkowity)', v: '1 zakładnik' },
                      { t: 'Naprawa pojazdu/obrócenie', v: '2 zakładników' }
                    ]
                  },
                  {
                    title: 'Napad na Truckera', limits: 'Limit 5 PD vs 3 Crime',
                    rules: [
                      'Kategoryczny zakaz kampienia (wyjazdy, trasa, zwroty).',
                      'Wymagana standardowa próba zatrzymania drogowego.',
                      'Wspieramy dobre RP! Nie zawsze musisz od razu pitować.',
                      'Max. 2 jednostki pościgowe.',
                      'Zakaz wsparcia EAGLE oraz MARY.'
                    ]
                  },
                  {
                    title: 'Okradanie domów', limits: 'Limit 4 PD vs 2 Crime',
                    rules: [
                      'Zakaz kampienia na ośkach.',
                      'Nakaz podjęcia normalnej rozmowy (jeśli nie uciekają).',
                      'Kreatywne tłumaczenie = gramy w to. Odpuszczenie to nie grzech.',
                      'W razie pościgu: max. 2 jednostki pościgowe.',
                      'Zakaz wsparcia EAGLE oraz MARY.'
                    ]
                  },
                  {
                    title: 'Sprzedaż narkotyków', limits: 'Max. 10 FP (2 FP / osoba)',
                    desc: 'Od 1 do 5 jednostek. Zawsze staramy się porozmawiać, zamiast zatrzymania z tzw. "buta". Zamaskowanie = podstawa do przeszukania, ale to gra – odpuszczenie raz czy dwa z ziołem nikomu nie zaszkodzi. Gdy uciekają, procedurowo czekamy i dajemy szansę na pościg.'
                  },
                  {
                    title: 'Napad na bank Fleeca', limits: 'Limit 8 PD vs 5 Crime',
                    desc: 'Max. 4 jednostki pościgowe, max. 1 EAGLE.',
                    negos: [
                      { t: 'Wolny odjazd', v: '1 zakładnik' },
                      { t: 'Wolny odjazd (poszukiwany pojazd)', v: '2 zakładników' },
                      { t: 'Wolny odjazd (kod czerwony+)', v: '2 zakładników' },
                      { t: 'Brak kolczatek (całkowity)', v: '2 zakładników' },
                      { t: 'Brak kolczatek (za 1.5 minuty)', v: '1 zakładnik' },
                      { t: 'Naprawa pojazdu/obrócenie', v: '3 zakładników' },
                      { t: 'Całkowity brak EAGLE', v: '4 zakładników' },
                      { t: 'Brak EAGLE (za 1.5 minuty)', v: '1 zakładnik' }
                    ]
                  },
                  {
                    title: 'Napad na Jubiler', limits: 'Limit 12 PD vs 8 Crime',
                    desc: 'Max. 6 jednostek pościgowych, max. 1 EAGLE.',
                    negos: [
                      { t: 'Wolny odjazd', v: '1 zakładnik' },
                      { t: 'Wolny odjazd (poszukiwany pojazd)', v: '2 zakładników' },
                      { t: 'Wolny odjazd (kod czerwony+)', v: '2 zakładników' },
                      { t: 'Brak kolczatek (całkowity)', v: '3 zakładników' },
                      { t: 'Brak kolczatek (za 1.5 minuty)', v: '1 zakładnik' },
                      { t: 'Naprawa pojazdu/obrócenie', v: '4 zakładników' },
                      { t: 'Całkowity brak EAGLE', v: '5 zakładników' },
                      { t: 'Brak EAGLE (za 1.5 minuty)', v: '1 zakładnik' }
                    ]
                  },
                  {
                    title: 'Napad na Pacyfik', limits: 'Limit 12 PD vs 8 Crime',
                    desc: 'Max. 6 jednostek pościgowych, max. 2 EAGLE. Max. 4 operatorów S.W.A.T.',
                    negos: [
                      { t: 'Wolny odjazd', v: '2 zakładników' },
                      { t: 'Wolny odjazd (poszukiwany pojazd)', v: '3 zakładników' },
                      { t: 'Wolny odjazd (kod czerwony+)', v: '3 zakładników' },
                      { t: 'Brak kolczatek (całkowity)', v: '3 zakładników' },
                      { t: 'Brak kolczatek (za 1.5 minuty)', v: '1 zakładnik' },
                      { t: 'Naprawa pojazdu/obrócenie', v: '4 zakładników' },
                      { t: 'Całkowity brak EAGLE', v: '6 zakładników' },
                      { t: 'Brak EAGLE (za 1.5 minuty)', v: '1 zakładnik' }
                    ]
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(234, 179, 8, 0.2)', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                      <strong style={{ color: '#fff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertCircle size={18} color="var(--gold)" /> {item.title}</strong>
                      <span style={{ background: 'rgba(234, 179, 8, 0.1)', color: 'var(--gold)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', border: '1px solid rgba(234, 179, 8, 0.2)' }}>{item.limits}</span>
                    </div>
                    
                    {item.desc && <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>}
                    
                    {item.rules && (
                      <ul style={{ margin: item.desc ? '-0.5rem 0 1.5rem 0' : '0 0 1.5rem 0', paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {item.rules.map((rule, i) => (
                          <li key={i}><strong style={{ color: '#e2e8f0' }}>{rule}</strong></li>
                        ))}
                      </ul>
                    )}
                    
                    {item.negos && (
                      <div>
                        <strong style={{ display: 'block', color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Dopuszczalne negocjacje:</strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          {item.negos.map((n, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.6rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}>
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{n.t}</span>
                              <strong style={{ color: '#60a5fa', fontSize: '0.85rem', background: 'rgba(59, 130, 246, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{n.v}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid rgba(59, 130, 246, 0.3)', paddingBottom: '0.5rem' }}>
                <Car size={20} /> Procedury Pościgów w Pojazdach i na Patykach
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
                
                {/* Kody Pościgowe */}
                <div>
                  <h4 style={{ color: '#fff', marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Siren size={20} color="var(--lspd-blue)" /> Klasyfikacja Kodów Pościgowych
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                    
                    {/* ZIELONY */}
                    <div style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(0,0,0,0) 100%)', borderRadius: '12px', border: '1px solid rgba(34, 197, 94, 0.2)', overflow: 'hidden' }}>
                      <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderBottom: '1px solid rgba(34, 197, 94, 0.2)' }}>
                        <strong style={{ color: '#4ade80', fontSize: '1.2rem', letterSpacing: '1px' }}>KOD ZIELONY</strong>
                      </div>
                      <div style={{ padding: '1.2rem' }}>
                        <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Brak kodu. Pościg na etapie początkowym lub nie stwarza zagrożenia.</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.9rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '4px' }}>
                          <AlertCircle size={16} /> <strong>Zakaz jakichkolwiek manewrów!</strong>
                        </div>
                      </div>
                    </div>

                    {/* ŻÓŁTY */}
                    <div style={{ background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.05) 0%, rgba(0,0,0,0) 100%)', borderRadius: '12px', border: '1px solid rgba(234, 179, 8, 0.2)', overflow: 'hidden' }}>
                      <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '1rem', borderBottom: '1px solid rgba(234, 179, 8, 0.2)' }}>
                        <strong style={{ color: '#fde047', fontSize: '1.2rem', letterSpacing: '1px' }}>KOD ŻÓŁTY</strong>
                      </div>
                      <div style={{ padding: '1.2rem' }}>
                        <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Pościg trwa min. <strong>5 min</strong> i stwarza zagrożenie lub pojazd nagminnie łamie przepisy / 2x przekracza prędkość.</p>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> Blokady nieruchome (wszędzie)</li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> PIT/BOX/RAM (poza miastem do 80 km/h)</li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> Kolczatki (poza miastem)</li>
                        </ul>
                      </div>
                    </div>

                    {/* CZERWONY */}
                    <div style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(0,0,0,0) 100%)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', overflow: 'hidden' }}>
                      <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderBottom: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        <strong style={{ color: '#fca5a5', fontSize: '1.2rem', letterSpacing: '1px' }}>KOD CZERWONY</strong>
                      </div>
                      <div style={{ padding: '1.2rem' }}>
                        <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Po <strong>10 min</strong>, zmiana pojazdu, dosiada się pasażer. Realne zagrożenie (jazda po chodniku, strzały z pojazdu).</p>
                        <ul style={{ margin: '0 0 1rem 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> Blokady nieruchome (wszędzie)</li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> PIT/BOX/RAM (poza miastem do 160 km/h)</li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> PIT/BOX/RAM (w mieście do 80 km/h)</li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> Kolczatki (wszędzie)</li>
                        </ul>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fca5a5', fontSize: '0.85rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '4px' }}>
                          <AlertTriangle size={14} /> <strong>Strzały w opony — autoryzacja SV!</strong>
                        </div>
                      </div>
                    </div>

                    {/* CZARNY */}
                    <div style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(0,0,0,0) 100%)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.2)', overflow: 'hidden' }}>
                      <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                        <strong style={{ color: '#fff', fontSize: '1.2rem', letterSpacing: '1px' }}>KOD CZARNY</strong>
                      </div>
                      <div style={{ padding: '1.2rem' }}>
                        <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Potwierdzone strzały w FP. Celowe potrącenie pieszych/FP. Bezpośrednie zagrożenie życia.</p>
                        <ul style={{ margin: '0 0 1rem 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> Blokady (wszędzie)</li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> PIT/BOX/RAM (wszędzie bez limitu prędkości)</li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} color="#4ade80" /> Kolczatki (wszędzie)</li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Crosshair size={16} color="#ef4444" /> Strzały w kierunku kierowcy</li>
                        </ul>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', color: '#ef4444', fontSize: '0.85rem', background: '#000', border: '1px solid #333', padding: '0.5rem', borderRadius: '4px' }}>
                          <strong style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><AlertTriangle size={14} /> ZATRZYMAĆ ZA WSZELKĄ CENĘ</strong>
                          <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>(Nie oznacza gry non-RP czy taranowania)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr style={{ borderColor: 'rgba(255,255,255,0.05)', margin: '1rem 0' }} />

                {/* Pościg na patykach */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #3b82f6' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Activity size={18} /> Pościg na Patykach
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                      <li>Gdy uciekający ma broń palną, dajemy co najmniej 1 ostrzeżenie o jej schowaniu przed oddaniem strzałów.</li>
                      <li>Gdy ewidentnie uciekają w stronę tzw. "Tower Defensa", można oddać strzały od razu.</li>
                      <li>Podczas zwykłej gonitwy (bez zagrożenia życia), nie korzystamy z tazera. Należy obalić obywatela pałką policyjną lub (SHIFT + E).</li>
                      <li>Tazer używamy dopiero po upływie minimum <strong>5 minut</strong> pościgu.</li>
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #0ea5e9' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Siren size={18} /> Ucieczka do Wody
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                      <li>Niezależnie od akcji, <strong>kategoryczny zakaz oddawania strzałów</strong> w stronę uciekinierów w wodzie (chyba, że mieli już nałożony Kod Czarny).</li>
                      <li>Zakaz używania tazera w wodzie (wyjątek: pościg jest nużąco długi i brak innego planu ucieczki). Można użyć pięści w celu obezwładnienia.</li>
                      <li>Można pobrać <strong>EAGLE</strong> niezależnie od akcji i negocjacji.</li>
                      <li>Zalecane jest wezwanie jednostki <strong>Water Unit</strong> w celu pobrania łodzi.</li>
                    </ul>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="knowledge-container">
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div className="page-title">
          <h2>Kompendium LSPD</h2>
          <p>Oficjalna baza wiedzy, procedury i regulaminy wewnątrz departamentu</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', minHeight: '600px' }}>
        
        {/* SIDEBAR WIEDZY */}
        <div style={{ width: '280px', flexShrink: 0 }}>
          <div className="glass-card" style={{ padding: '1rem', position: 'sticky', top: '2rem', maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', paddingLeft: '1rem' }}>
              Nawigacja
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {SECTIONS.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.75rem 1rem', background: activeTab === sec.id ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    border: 'none', borderLeft: activeTab === sec.id ? '3px solid var(--lspd-blue)' : '3px solid transparent',
                    color: activeTab === sec.id ? '#fff' : 'var(--text-muted)',
                    textAlign: 'left', cursor: 'pointer', borderRadius: '0 4px 4px 0', transition: 'all 0.2s',
                    fontWeight: activeTab === sec.id ? 'bold' : 'normal', fontSize: '0.95rem'
                  }}
                >
                  <sec.icon size={18} color={activeTab === sec.id ? 'var(--lspd-blue)' : 'var(--text-muted)'} />
                  {sec.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KONTENT GŁÓWNY */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '4rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {lightboxImg && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'zoom-out' }} 
          onClick={() => setLightboxImg(null)}
        >
          <img src={lightboxImg} style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }} />
        </div>
      )}

    </motion.div>
  );
}

export default KnowledgeBase;
