import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Shield, Users, Radio, AlertTriangle, Crosshair, Map, ShieldAlert, FileText, ChevronRight, Tablet, Car, HandMetal, AlertCircle, Banknote, HelpCircle, GraduationCap, ChevronDown, Activity, Siren, ClipboardList } from 'lucide-react';

const SECTIONS = [
  { id: 'zasady', title: 'Podstawowe Zasady', icon: Shield },
  { id: 'wewnetrzne', title: 'Zasady Wewnętrzne', icon: AlertCircle },
  { id: 'organizacja', title: 'Organizacja LSPD', icon: Users },
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
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
              <h3 style={{ color: '#ef4444', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle /> PRIORYTET ABSOLUTNY
              </h3>
              <p style={{ margin: 0, fontSize: '1.1rem' }}>
                <strong>KOD 0 to ŚWIĘTOŚĆ</strong> i ma zawsze NAJWYŻSZY PRIORYTET — rzucasz wszystko, nie ważne co robisz i reagujesz!
              </p>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldAlert size={20} /> Regulamin i Zachowanie</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                  <div style={{ color: '#10b981' }}><Shield size={18} /></div>
                  <span style={{ color: 'var(--text-muted)' }}><strong style={{ color: '#fff' }}>ZAWSZE</strong> oddawaj szacunek i wykonuj polecenia wyższego stopnia (nawet gdy się z tym nie zgadzasz).</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                  <div style={{ color: '#eab308' }}><HandMetal size={18} /></div>
                  <span style={{ color: 'var(--text-muted)' }}><strong style={{ color: '#fff' }}>SALUTOWANIE</strong>: Pamiętaj o salutowaniu do wyższego stopnia (salutujemy tylko do stopnia bezpośrednio wyżej).</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(239, 68, 68, 0.05)', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                  <div style={{ color: '#ef4444' }}><Users size={18} /></div>
                  <span style={{ color: 'var(--text-muted)' }}><strong style={{ color: '#fff' }}>NIGDY</strong> nie zostawiaj samego partnera przy zdarzeniu — miej go zawsze na widoku. Przy zatrzymaniu drogowym <strong>każdy wysiada z radiowozu!</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                  <div style={{ color: 'var(--lspd-blue)' }}><Book size={18} /></div>
                  <span style={{ color: 'var(--text-muted)' }}>Nie podważaj decyzji wyższej rangi. Nigdy nie wchodź w pół-zdania przełożonym.</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: '#eab308' }}>System Zgłaszania Pytań (Chain of Command)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                  <span><strong style={{ color: 'var(--lspd-blue)' }}>Officer I – III+1</strong></span>
                  <span style={{ color: 'var(--text-muted)' }}>zgłasza do ➔ <strong style={{ color: '#e2e8f0' }}>Sergeant</strong></span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                  <span><strong style={{ color: 'var(--lspd-blue)' }}>Sergeant / Staff / Master</strong></span>
                  <span style={{ color: 'var(--text-muted)' }}>zgłasza do ➔ <strong style={{ color: '#e2e8f0' }}>Lieutenant</strong></span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                  <span><strong style={{ color: 'var(--lspd-blue)' }}>Lieutenant I/II</strong></span>
                  <span style={{ color: 'var(--text-muted)' }}>zgłasza do ➔ <strong style={{ color: '#e2e8f0' }}>Captain</strong></span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                  <span><strong style={{ color: 'var(--lspd-blue)' }}>Captain</strong></span>
                  <span style={{ color: 'var(--text-muted)' }}>zgłasza do ➔ <strong style={{ color: '#e2e8f0' }}>Commander / Zarząd</strong></span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #eab308' }}>
              <h3 style={{ color: '#eab308', marginTop: 0 }}>KAMIZELKA / PISTOLET CIĘŻKI</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                Funkcjonariusz ze stopniem <strong>Porucznika II+</strong> może pobrać kamizelkę kuloodporną z wkładem balistycznym na regularny patrol. Pistolet ciężki może pobrać funkcjonariusz ze stopniem <strong>Kapitana+</strong> podczas poziomu zagrożenia terrorystycznego.
              </p>
            </motion.div>
          </motion.div>
        );

      case 'wewnetrzne':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>1. Kontrabanda i Skonfiskowane Przedmioty</h3>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', margin: 0 }}>
                <li>Nieopodatkowane pieniądze muszą trafić do depozytu pod stwierdzeniem "Wypierz pieniądze". <strong>Przywłaszczanie = postępowanie IAD.</strong></li>
                <li>Narkotyki MUSZĄ trafić do depozytu na komendzie. Nie wyrzucamy, nie przywłaszczamy.</li>
                <li>Broń krótka — do zbrojowni z 1 pociskiem. Broń długa — z ilością amunicji zebranej + wpis do ewidencji #zbrojownia.</li>
                <li>Modyfikacje broni (celownik, tłumik, magazynek) → zarzut "Modyfikacja broni palnej" (10 mies. + 25 000$).</li>
                <li>Rzeczy "lotne" bez właściciela mogą zostać sprzedane w Lombardzie.</li>
              </ul>
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', borderLeft: '3px solid var(--lspd-blue)' }}>
                <p style={{ margin: '0 0 1rem 0', color: '#e2e8f0' }}>
                  <strong style={{ color: 'var(--lspd-blue)' }}>Lokalizacja Magazynu:</strong> Magazyn dowodowy znajduje się w korytarzu między zbrojownią a szatnią z ubraniami, drugie drzwi z prawej.
                </p>
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src="/magazyn.png?v=3" 
                    alt="Szafka w magazynie dowodowym" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'zoom-in', transition: 'transform 0.3s ease' }} 
                    onClick={() => setLightboxImg('/magazyn.png?v=3')}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>2. Umundurowanie</h3>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', margin: 0 }}>
                <li>Modyfikacje munduru są kategorycznie zakazane bez autoryzacji Zarządu. Brak akceptacji = IAD.</li>
                <li>Mundur motocyklowy — tylko podczas poruszania się jednostką MARY.</li>
                <li>Mundur galowy — tylko na oficjalne apele/uroczystości.</li>
                <li>Dłuższe włosy muszą być spinane z tyłu głowy.</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
              <h3 style={{ color: '#ef4444', marginTop: 0 }}>ZAKAZ BEZWZGLĘDNY: ALKOHOL I NARKOTYKI</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                Wejście lub przebywanie na służbie pod wpływem alkoholu/narkotyków jest kategorycznie zakazane. Jednostka IAD ma prawo do narkotestów KAŻDEGO funkcjonariusza. Wykrycie = degradacja lub zwolnienie dyscyplinarne.
              </p>
            </motion.div>
          </motion.div>
        );

      case 'organizacja':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} /> Ścieżka Awansów (Rangi LSPD)
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Jednostka Los Santos Police Department podzielona jest na konkretne stopnie służbowe, z wyraźnym oddzieleniem szczebla dowodzenia od jednostek patrolowych.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                {/* Linia osi czasu */}
                <div style={{ position: 'absolute', left: '1.5rem', top: '1rem', bottom: '1rem', width: '2px', background: 'rgba(255,255,255,0.05)' }}></div>

                {[
                  { from: 'Officer I', to: 'Officer II' },
                  { from: 'Officer II', to: 'Officer III' },
                  { from: 'Officer III', to: 'Officer III+1' },
                  { from: 'Officer III+1', to: 'Sergeant' },
                  { from: 'Sergeant / Staff / Master', to: 'Lieutenant', isCommand: true },
                  { from: 'Lieutenant I/II', to: 'Captain', isCommand: true },
                  { from: 'Captain', to: 'Commander', isCommand: true },
                  { from: 'Commander', to: 'Deputy Chief', isCommand: true, top: true },
                  { from: 'Deputy Chief', to: 'Assistant Chief', isCommand: true, top: true },
                  { from: 'Assistant Chief', to: 'Chief of Police', isCommand: true, top: true },
                  { from: 'Chief of Police', to: 'Zarząd LSPD', isCommand: true, top: true }
                ].map((rank, idx) => (
                  <div key={idx} style={{ 
                    background: rank.top ? 'linear-gradient(90deg, rgba(234, 179, 8, 0.1), transparent)' : rank.isCommand ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.1), transparent)' : 'rgba(255,255,255,0.02)', 
                    borderLeft: rank.top ? '4px solid #eab308' : rank.isCommand ? '4px solid #3b82f6' : '4px solid #64748b',
                    padding: '1rem 1.5rem', borderRadius: '0 6px 6px 0', display: 'flex', alignItems: 'center', marginLeft: '3rem', position: 'relative'
                  }}>
                    {/* Kropka na osi */}
                    <div style={{ position: 'absolute', left: '-1.8rem', width: '12px', height: '12px', borderRadius: '50%', background: rank.top ? '#eab308' : rank.isCommand ? '#3b82f6' : '#64748b', border: '3px solid #0f172a' }}></div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                      <strong style={{ width: '200px', color: rank.top ? '#eab308' : rank.isCommand ? '#60a5fa' : '#e2e8f0', fontSize: '1.05rem' }}>{rank.from}</strong>
                      <ChevronRight size={18} color={rank.top ? 'var(--gold)' : 'var(--text-muted)'} />
                      <span style={{ color: 'var(--text-muted)' }}>Awansuje na: <strong style={{ color: '#fff' }}>{rank.to}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case 'struktura':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {[
              { tag: 'IAD', name: 'Internal Affairs Division', desc: 'Infiltrują i analizują działania funkcjonariuszy. Raporty rozpatrywane wewnętrznie.', icon: ShieldAlert, color: 'var(--lspd-blue)' },
              { tag: 'TD', name: 'Training Division', desc: 'Szkolenia, pilotaż helikoptera, pościgi SEU, procedury strzelania.', icon: GraduationCap, color: 'var(--lspd-blue)' },
              { tag: 'PD', name: 'Patrol Division', desc: 'Rozłożenie jednostek, patrole, pierwsze reagowanie, egzekwowanie prawa.', icon: Car, color: 'var(--lspd-blue)' },
              { tag: 'METRO', name: 'Metropolitan Division', special: true, desc: 'Powoływani w przypadku ataków terrorystycznych, Kodu Czarnego lub konwojów.', icon: Crosshair, color: '#eab308' },
              { tag: 'FIB', name: 'Federal Investigation Bureau', federal: true, desc: 'Rozpracowywanie grup przestępczych oraz infiltracja wewnętrzna.', icon: Shield, color: '#ef4444' },
              { tag: 'BCSO', name: 'Blaine County Sheriff Office', desc: 'Patrol Sandy Shores, Paleto Bay. Zarządza więzieniem Bolingbroke.', icon: Map, color: 'var(--lspd-blue)' },
              { tag: 'DTU', name: 'Detective Unit', federal: true, desc: 'Jednostka prowadząca szczegółowe dochodzenia kryminalne.', icon: Activity, color: '#ef4444' },
              { tag: 'USMS', name: 'United States Marshal Service', federal: true, desc: 'Ochrona świadków, poszukiwanie uciekinierów, transport więźniów.', icon: ShieldAlert, color: '#ef4444' },
              { tag: 'HWP', name: 'Highway Patrol', desc: 'Bezpieczeństwo na autostradach. Egzekwowanie przepisów ruchu drogowego.', icon: Siren, color: 'var(--lspd-blue)' }
            ].map((div, idx) => (
              <motion.div key={idx} variants={itemVariant} className="glass-card" style={{ 
                borderTop: `3px solid ${div.color}`,
                display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.05, transform: 'rotate(15deg)' }}>
                  <div.icon size={120} color={div.color} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{ background: `${div.color}20`, padding: '0.5rem', borderRadius: '8px' }}>
                    <div.icon size={20} color={div.color} />
                  </div>
                  <span style={{ color: div.color, fontWeight: 'bold', fontSize: '1rem', letterSpacing: '1px' }}>{div.tag}</span>
                </div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', zIndex: 1 }}>{div.name}</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', zIndex: 1 }}>{div.desc}</p>
              </motion.div>
            ))}
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
            <motion.div variants={itemVariant} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ background: 'rgba(30,95,196,0.15)', padding: '1rem', borderBottom: '1px solid rgba(30,95,196,0.2)' }}>
                <h3 style={{ margin: 0, color: 'var(--lspd-blue)' }}>Kody Pościgowe (Nadaje SV)</h3>
              </div>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ borderLeft: '3px solid #facc15', paddingLeft: '1rem' }}>
                  <strong style={{ color: '#facc15' }}>KOD ŻÓŁTY</strong>
                  <p style={{ margin: '0.5rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Po 5 minutach ucieczki lub jazda pod prąd / bardzo niebezpiecznie.</p>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>• Blokady nieruchome<br/>• PIT/BOX/RAM poza miastem do 80 km/h<br/>• Kolczatki poza miastem</p>
                </div>
                <div style={{ borderLeft: '3px solid #ef4444', paddingLeft: '1rem' }}>
                  <strong style={{ color: '#ef4444' }}>KOD CZERWONY</strong>
                  <p style={{ margin: '0.5rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Po 10 min, zmiana pojazdu, zabranie pasażera, chodnik, strzały z auta.</p>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>• Blokady wszędzie<br/>• PIT/BOX/RAM w mieście do 80 km/h, poza miastem do 160 km/h<br/>• Kolczatki wszędzie<br/>• Możliwość strzelania w opony</p>
                </div>
                <div style={{ borderLeft: '3px solid #991b1b', paddingLeft: '1rem' }}>
                  <strong style={{ color: '#991b1b' }}>KOD CZARNY</strong>
                  <p style={{ margin: '0.5rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Strzały do funkcjonariuszy/przechodniów, potrącenia. Zagrożenie życia.</p>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>• Blokady wszędzie<br/>• PIT/BOX/RAM bez limitu prędkości<br/>• Strzały do kierowcy (Zatrzymać za wszelką cenę)</p>
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
            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Kryteria Organizacji Konwoju</h3>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', margin: 0 }}>
                <li>Minimum 6 funkcjonariuszy na służbie.</li>
                <li>Obecność osoby kompetentnej (Sergeant+).</li>
                <li>Obywatel ma wyrok minimum 90 miesięcy.</li>
                <li>Każdy biorący udział ZAKŁADA kamizelkę kuloodporną (nie pytamy o autoryzację).</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
              <h3 style={{ color: '#ef4444', marginTop: 0 }}>⚠ KONWÓJ = RUCHOMY KOD CZARNY</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                Konwój jedzie stale ok. 80 km/h. Każde zagrożenie eliminujemy po 1 komunikacie. Pierwsze strzały w opony, drugie w kierowcę. U1 i Ostatnia jednostka włączają KOD 3, reszta KOD 2. Do więzienia wjeżdża TYLKO więźniarka.
              </p>
            </motion.div>

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
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {/* Małe Napady */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #10b981', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.05 }}><Banknote size={100} /></div>
                  <h4 style={{ color: '#10b981', marginTop: 0, marginBottom: '0.25rem', fontSize: '1.2rem' }}>MAŁE NAPADY</h4>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1.5rem' }}>Kasetki sklepowe, małe sklepy</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '6px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', textTransform: 'uppercase' }}>LSPD</span>
                      <strong style={{ fontSize: '1.8rem', color: '#3b82f6' }}>4</strong>
                    </div>
                    <span style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: 'bold' }}>VS</span>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', textTransform: 'uppercase' }}>Przestępcy</span>
                      <strong style={{ fontSize: '1.8rem', color: '#ef4444' }}>2</strong>
                    </div>
                  </div>
                </div>

                {/* Średnie Napady */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #eab308', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.05 }}><ShieldAlert size={100} /></div>
                  <h4 style={{ color: '#eab308', marginTop: 0, marginBottom: '0.25rem', fontSize: '1.2rem' }}>ŚREDNIE NAPADY</h4>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1.5rem' }}>Banki Fleeca</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '6px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', textTransform: 'uppercase' }}>LSPD</span>
                      <strong style={{ fontSize: '1.8rem', color: '#3b82f6' }}>8</strong>
                    </div>
                    <span style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: 'bold' }}>VS</span>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', textTransform: 'uppercase' }}>Przestępcy</span>
                      <strong style={{ fontSize: '1.8rem', color: '#ef4444' }}>5</strong>
                    </div>
                  </div>
                </div>

                {/* Duże Napady */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #ef4444', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.05 }}><AlertTriangle size={100} /></div>
                  <h4 style={{ color: '#ef4444', marginTop: 0, marginBottom: '0.25rem', fontSize: '1.2rem' }}>DUŻE NAPADY</h4>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1.5rem' }}>Jubiler, Humane Labs, Pacific Standard</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '6px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', textTransform: 'uppercase' }}>LSPD</span>
                      <strong style={{ fontSize: '1.8rem', color: '#3b82f6' }}>12</strong>
                    </div>
                    <span style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: 'bold' }}>VS</span>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', textTransform: 'uppercase' }}>Przestępcy</span>
                      <strong style={{ fontSize: '1.8rem', color: '#ef4444' }}>8</strong>
                    </div>
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
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.02, pointerEvents: 'none' }}>
                <FileText size={400} />
              </div>
              
              <ShieldAlert size={56} color="#eab308" style={{ margin: '0 auto 1.5rem', opacity: 0.9 }} />
              <h2 style={{ color: '#eab308', marginBottom: '2.5rem', fontSize: '2rem', letterSpacing: '1px' }}>Prawa Mirandy (Formułka Zatrzymania)</h2>
              
              <div style={{ position: 'relative', maxWidth: '850px', margin: '0 auto', textAlign: 'left' }}>
                <div style={{ position: 'absolute', top: '-20px', left: '-20px', fontSize: '6rem', color: 'rgba(255,255,255,0.05)', fontFamily: 'serif', lineHeight: '1' }}>"</div>
                
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '3.5rem', borderRadius: '12px', border: '1px solid rgba(234, 179, 8, 0.2)', borderLeft: '4px solid #eab308', backdropFilter: 'blur(10px)' }}>
                  <p style={{ fontSize: '1.4rem', lineHeight: '2.2', color: '#e2e8f0', fontStyle: 'italic', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Masz prawo zachować milczenie, wszystko co powiesz może i zostanie wykorzystane przeciwko Tobie w sądzie. <br /><br />
                    Masz prawo do adwokata, jeśli Cię na niego nie stać zostanie Ci takowy przydzielony z urzędu, o ile jest dostępny w mieście. <br /><br />
                    Masz prawo do telefonu w obecności funkcjonariusza policji który trwa maksymalnie 2,5 minuty, ilość połączeń nieograniczona, tak aby słyszał twoją rozmowę. <br /><br />
                    Jeśli będziesz obrażał funkcjonariuszy, prawa zostaną Ci odebrane.
                  </p>
                </div>
                
                <div style={{ position: 'absolute', bottom: '-40px', right: '-10px', fontSize: '6rem', color: 'rgba(255,255,255,0.05)', fontFamily: 'serif', lineHeight: '1' }}>"</div>
              </div>
              
              <p style={{ marginTop: '3rem', color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '3rem auto 0' }}>
                <strong style={{ color: '#ef4444' }}>Ważne:</strong> Prawa Mirandy muszą zostać odczytane w sposób w pełni słyszalny i zrozumiały dla zatrzymanego, zanim zostaną mu zadane jakiekolwiek pytania mogące posłużyć jako dowód w sądzie.
              </p>
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
                    <h4 style={{ margin: '0 0 1rem 0', color: '#3b82f6' }}>Procedura Zatrzymania Drogowego (10-38)</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Rutynowa kontrola nieposzukiwanego pojazdu wymaga ostrożności i systematyczności, aby zminimalizować ryzyko eskalacji.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {[
                        "Włączenie sygnalizacji świetlnej/dźwiękowej + 'LSPD, zjedź na pobocze'.",
                        "Poprawne, bezpieczne ustawienie radiowozu (kąt) i zgaszenie sygnałów dźwiękowych.",
                        "Instrukcja: 'Zgaś silnik, ręce na kierownicy, nie wysiadaj'.",
                        "Poprawne zgłoszenie na radiu (10-38, marka pojazdu, blachy, lokalizacja).",
                        "Wyjście z radiowozu z gotowym tazerem w dłoni.",
                        "Podejście do kontrolowanego pojazdu i ustawienie się za słupkiem B (bezpieczna pozycja).",
                        "Rozmowa: 'Obywatelu, proszę obniżyć szybkę'.",
                        "Okazanie odznaki, przedstawienie się stopniem i nazwiskiem, prośba o dokumenty.",
                        "Poprawne przyjęcie dokumentu (/do bierze dokument).",
                        "Powrót do radiowozu: 'Zaraz do Pana wrócę'.",
                        "Sprawdzenie bazy danych obywatela oraz pojazdu w tablecie policyjnym.",
                        "Powrót do obywatela, zapytanie o znajomość powodu zatrzymania.",
                        "Nałożenie mandatu i odegranie jego wystawienia na /do.",
                        "Zgoda na odjazd: 'Po zgaszeniu sygnalizacji może Pan odjechać'.",
                        "Koniec interwencji na radiu: 'kod 4 do 10-38, status 6'."
                      ].map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <div style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', minWidth: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>{idx + 1}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 10-80 */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #ef4444' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#ef4444' }}>Procedura Pościgowa (10-80)</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Standardy postępowania w przypadku eskalacji kontroli drogowej do pościgu zmotoryzowanego, a następnie pieszego.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {[
                        "Poprawne zgłoszenie 10-80 na radiu wraz z podaniem początkowego kierunku.",
                        "Ciągła, płynna komunikacja radiowa RTO (lokalizacje, kierunek, ulica, zachowanie kierowcy).",
                        "Informacja o wysiadce podejrzanego i zgłoszenie rozpoczęcia pościgu pieszego.",
                        "Bezpieczne zatrzymanie (użycie tazera po 3 minutach), zakucie w kajdanki.",
                        "Przeszukanie: odebranie broni, niebezpiecznych narzędzi, przelanie napojów."
                      ].map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', minWidth: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>{idx + 1}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* STATUS 7 */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #facc15' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#facc15' }}>Procedura Transportu (Status 7)</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {[
                        "Dokładne upewnienie się co do przeszukania przed wsadzeniem do radiowozu.",
                        "Umieszczenie zatrzymanego w pojeździe z narracją ('Wsadzam cię do radiowozu, zapinam pasy').",
                        "Upewnienie się o prawach: 'Znasz swoje prawa?'.",
                        "Bezbłędne odczytanie pełnej formułki Praw Mirandy.",
                        "Płynny, bezpieczny transport na komendę (Max 70km/h w mieście, 140km/h poza)."
                      ].map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <div style={{ background: 'rgba(250, 204, 21, 0.2)', color: '#facc15', minWidth: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>{idx + 1}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* STATUS 9 */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #a855f7' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#a855f7' }}>Osadzenie na Komendzie (Status 9)</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {[
                        "Wprowadzenie do celi, ponowne okazanie odznaki, konfiskata telefonu i urządzeń komunikacyjnych.",
                        "Instrukcja: 'To koniec przeszukania, proszę się nie odwracać'.",
                        "Odkucie zatrzymanego przez kraty po opuszczeniu celi.",
                        "Zażądanie dowodu tożsamości oraz zdjęcia maski.",
                        "Dokładne sprawdzenie poszukiwań i kartoteki w bazie danych LSPD.",
                        "Przedstawienie ostatecznego wyroku i pytanie, czy zatrzymany zgadza się z zarzutami.",
                        "Zaoferowanie praw (np. telefonu, adwokata) – jeśli zatrzymany współpracuje.",
                        "Ostateczne wystawienie wyroku w systemie.",
                        "Odstawienie legalnych rzeczy do depozytu lub oddanie podejrzanemu (/do).",
                        "Odłożenie nielegalnego sprzętu i dowodów do odpowiednich szafek dowodowych (/do)."
                      ].map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <div style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', minWidth: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>{idx + 1}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>{step}</div>
                        </div>
                      ))}
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

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--gold)' }}>Pytania z Wiedzy Ogólnej (Wymagane)</h5>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <li><strong style={{ color: '#fff' }}>Kim jest NT?</strong> Łącznik między napastnikami a PD. Zawsze druga najważniejsza osoba na akcji po SV.</li>
                      <li><strong style={{ color: '#fff' }}>Ilu NT może rozmawiać?</strong> Zawsze i tylko JEDEN. Nie może wchodzić sam (zawsze ubezpieczany).</li>
                      <li><strong style={{ color: '#fff' }}>Procedura (Kroki):</strong> Pierwszy kontakt → Legitymacja → Zbieranie info → Negocjacje → Odjazd → Zakończenie.</li>
                      <li><strong style={{ color: '#fff' }}>Wolny Odjazd:</strong> Odblokowanie dróg (500m), zdjęcie kolczatek, wejście do pojazdu, zakaz ognia w stronę odjeżdżającego.</li>
                      <li><strong style={{ color: '#fff' }}>Porwany FP:</strong> Kod czerwony, szukanie przez SV, priorytet to odzyskanie przez niego wyposażenia.</li>
                      <li><strong style={{ color: '#fff' }}>Ranny Zakładnik:</strong> Priorytet bezwzględny! Dążymy do jego uwolnienia i podania EMS.</li>
                      <li><strong style={{ color: '#fff' }}>Wydanie sprzętu PD:</strong> Absolutny zakaz (nie wydajemy radiowozów, broni, sprzętu).</li>
                    </ul>
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

                {/* ETAP 1 */}
                <div>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Manewr: Ósemka</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '2px solid var(--gold)' }}>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Wraz z osobą zdającą udajemy się na wspólną częstotliwość radiową i dokładnie omawiamy wszystkie etapy szkolenia. 
                        Po wyciągnięciu maszyn, dajemy zdającemu <strong>2-3 minuty na oswojenie się z helikopterem</strong>.
                        Następnie zdający wraca na helipad LSPD, FTO wsiada jako pasażer i obaj lecą nad wyznaczony punkt startowy.
                      </p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '140px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <img 
                          src="/szkolenia/asu_helipad.png?v=1" 
                          alt="ASU Helipad" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'zoom-in', transition: 'transform 0.3s ease' }} 
                          onClick={() => setLightboxImg('/szkolenia/asu_helipad.png?v=1')}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '140px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <img 
                          src="/szkolenia/asu_osemka.png?v=1" 
                          alt="ASU Osemka" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'zoom-in', transition: 'transform 0.3s ease' }} 
                          onClick={() => setLightboxImg('/szkolenia/asu_osemka.png?v=1')}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '6px' }}>
                      <strong style={{ color: '#fff' }}>Zadanie Operacyjne:</strong> Z wyznaczonego miejsca startowego pilot rozpoczyna tzw. <strong>"ósemkę"</strong>, przelatując pomiędzy wyznaczonymi budynkami, a na koniec ląduje z powrotem w miejscu startu.
                      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
                        <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Czas docelowy: ~1 Minuta</span>
                        <span style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Wymagane 100% sprawności maszyny</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ETAP 2 */}
                <div>
                  <h4 style={{ color: 'var(--lspd-blue)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Manewr: Przelot Precyzyjny (Kanał Burzowy)</h4>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '2px solid var(--lspd-blue)' }}>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      Po zaliczeniu etapu 1, przechodzicie do manewrów w kanale burzowym. Zadaniem jest przelot <strong>pod 3 mostami</strong> (zaczynając od strony północnej i lecąc na południe). <br/><br/>
                      Wylatując spod ostatniego mostu, należy od razu wzbić się stromo do góry i skierować prosto na helipad komendy LSPD, by na nim wylądować.
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '140px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <img 
                          src="/szkolenia/asu_most.png?v=1" 
                          alt="ASU Most" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'zoom-in', transition: 'transform 0.3s ease' }} 
                          onClick={() => setLightboxImg('/szkolenia/asu_most.png?v=1')}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '140px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <img 
                          src="/szkolenia/asu_trasa.png?v=1" 
                          alt="ASU Trasa" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'zoom-in', transition: 'transform 0.3s ease' }} 
                          onClick={() => setLightboxImg('/szkolenia/asu_trasa.png?v=1')}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>
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
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Car size={24} /> SEU (Speed Enforcement Unit)</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>Wyciągacie pojazdy pościgowe oraz wraz z osobą wyrabiającą szkolenie udajecie się na wspólne radio operacyjne.</p>
                </div>

                {/* ZDJĘCIA POJAZDÓW (PLACEHOLDERY FLOTY LSPD) */}
                <div>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Pojazdy Wykorzystywane w SEU</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                      <div style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.5)', position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1, fontSize: '0.8rem', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase' }}>SEU Interceptor (Buffalo)</div>
                      <img src="/fleet/buffalo.png" alt="Pojazd SEU" style={{ width: '100%', height: '140px', objectFit: 'contain', opacity: 0.9, marginTop: '20px', cursor: 'zoom-in', transition: 'transform 0.3s ease' }} onClick={(e) => { setLightboxImg('/fleet/buffalo.png'); e.stopPropagation(); }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                      <div style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.5)', position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1, fontSize: '0.8rem', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase' }}>SEU Interceptor (Torrence)</div>
                      <img src="/fleet/torrence.png" alt="Pojazd SEU" style={{ width: '100%', height: '140px', objectFit: 'contain', opacity: 0.9, marginTop: '20px', cursor: 'zoom-in', transition: 'transform 0.3s ease' }} onClick={(e) => { setLightboxImg('/fleet/torrence.png'); e.stopPropagation(); }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                    </div>
                  </div>
                </div>

                {/* ZASADY */}
                <div>
                  <h4 style={{ color: '#fff', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Zasady i Przebieg Szkolenia</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '2px solid var(--lspd-blue)' }}>
                      <strong style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={18} color="var(--lspd-blue)"/> Cel Szkolenia</strong>
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Szkolenie polega na <strong>5-minutowym pościgu</strong> z elementami kaskaderki oraz bezbłędną komunikacją radiową (RTO).</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '2px solid #10b981' }}>
                      <strong style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={18} color="#10b981"/> Warunek Skuteczności</strong>
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Funkcjonariusz musi bezbłędnie asystować w pościgu. Kluczem jest trzymanie się bardzo blisko uciekiniera bez utraty panowania nad pojazdem.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '2px solid var(--gold)' }}>
                      <strong style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertCircle size={18} color="var(--gold)"/> Utrata Wizji</strong>
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Funkcjonariusz powinien unikać częstej utraty wizji. W celach szkoleniowych przyjmuje się limit około <strong>3 zgubień wizji</strong> na jeden cykl treningowy.</p>
                    </div>
                  </div>
                </div>

                {/* BŁĘDY KATEGORYCZNE */}
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.25rem', borderRadius: '8px', borderTop: '3px solid #ef4444' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertTriangle size={18} /> Kategoryczne Błędy Proceduralne</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8' }}>
                    <li><strong style={{ color: '#fff' }}>Niepełna komunikacja radiowa</strong> (lub jej całkowity brak) - najważniejszy element pracy RTO!</li>
                    <li><strong style={{ color: '#fff' }}>Niezgłaszanie braku wizji</strong> (przedłużanie milczenia).</li>
                    <li><strong style={{ color: '#fff' }}>Niewykonywanie podstawowych manewrów i skoków</strong> (specjalne objeżdżanie miejsc, w których uciekinier wykonał bezpieczny skok, spowalniające pościg).</li>
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
                  <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Procedury Ratownictwa Taktycznego (Trening)</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px' }}>
                      <div style={{ color: 'var(--gold)' }}><Map size={24} /></div>
                      <div>
                        <strong style={{ color: '#fff' }}>1. Tunel Humane Labs</strong>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Wyskok z maszyny EAGLE do wody, dopłynięcie i pokonanie pełnego tunelu podziemnego w czasie szkoleniowym nie dłuższym niż <strong>4 minuty</strong>.</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px' }}>
                      <div style={{ color: 'var(--lspd-blue)' }}><Crosshair size={24} /></div>
                      <div>
                        <strong style={{ color: '#fff' }}>2. Poszukiwania na głębokości</strong>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Odnalezienie obiektu (np. zatopionego manekina/ofiary) pod wodą w wyznaczonym sektorze i jego bezpieczna ewakuacja na ląd. Limit szkoleniowy: <strong>5 minut</strong>.</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px' }}>
                      <div style={{ color: '#10b981' }}><Radio size={24} /></div>
                      <div>
                        <strong style={{ color: '#fff' }}>3. Tor Przeszkód Zancudo</strong>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Test opanowania łodzi morskiej (OCEAN). Pokonanie wyznaczonej na rzece Zancudo trasy omijając przeszkody pod prąd (sugerowany czas: <strong>1m 50s</strong>).</div>
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
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#a855f7', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Standardy Operacyjne (MARY / MERRY)</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>Szkolenie na jednostkę motocyklową LSPD sprawdza opanowanie maszyny, zwinność i refleks w ciasnych, miejskich warunkach. Składa się z dwóch części operacyjnych.</p>
                </div>

                {/* ETAP I */}
                <div>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Zadanie 1: Przeprawa Terenowa</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '2px solid var(--gold)' }}>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Na samym początku sprawdzamy, czy funkcjonariusz posiada <strong>prawo jazdy Kategorii A</strong>. <br/>
                        Następnie pobierany jest z garażu policyjny motocykl marki <strong>Sanchez</strong>.
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '140px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <img 
                          src="/szkolenia/mary_sanchez.png?v=1" 
                          alt="MARY Sanchez" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'zoom-in', transition: 'transform 0.3s ease' }} 
                          onClick={() => setLightboxImg('/szkolenia/mary_sanchez.png?v=1')}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '140px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <img 
                          src="/szkolenia/mary_mapa.png?v=1" 
                          alt="MARY Mapa" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'zoom-in', transition: 'transform 0.3s ease' }} 
                          onClick={() => setLightboxImg('/szkolenia/mary_mapa.png?v=1')}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '6px' }}>
                      <strong style={{ color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Przebieg Próby:</strong> 
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Udajecie się na miejsce wyznaczone na mapie. Startujecie z samego końca mostu. Wyznaczona trasa do mety musi zostać sprawnie pokonana.</span>
                      
                      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>Czas docelowy: ~1 Minuta 55 sekund</span>
                        <span style={{ background: 'rgba(250, 204, 21, 0.1)', color: 'var(--gold)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>Oczekiwana pełna sprawność</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ETAP II */}
                <div style={{ marginTop: '0.5rem' }}>
                  <h4 style={{ color: 'var(--lspd-blue)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Zadanie 2: Pościg Miejski</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', borderLeft: '3px solid var(--lspd-blue)' }}>
                      <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--lspd-blue)' }}>Cel i Trasa</h5>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Po powrocie do miasta rozpoczynacie <strong>5-minutowy pościg</strong> po ulicach Los Santos. <br/><br/>
                        Ważne by manewry odbywały się w terenie miejskim, obejmując ciasne uliczki, zakamarki i <strong>delikatne kaskaderki</strong>, by sprawdzić faktyczną przydatność jednostki w tego typu środowisku.
                      </p>
                    </div>

                    <div style={{ background: 'rgba(250, 204, 21, 0.05)', padding: '1rem', borderRadius: '6px', borderLeft: '3px solid var(--gold)' }}>
                      <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--gold)' }}>Zasady Utraty Wizji</h5>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                        <li>Jeśli kierowca straci wizję, FTO szkoleniowo zatrzymuje się, symulując odliczanie (ok. <strong>10 sekund na odnalezienie</strong>).</li>
                        <li>W warunkach treningowych dopuszcza się <strong>maksymalnie 2</strong> utraty wizji w jednym cyklu.</li>
                        <li>Po całkowitym zgubieniu pościgu, manewr treningowy powtarza się od początku.</li>
                      </ul>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '6px', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '4px' }}><Activity size={16} color="#fff" /></div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}><strong>Awaria pojazdu:</strong> Jeśli motocykl ulegnie awarii, priorytetem jest jego naprawa, jednak warunkiem jest wcześniejsze zachowanie pełnej wizji na pojazd uciekający (przekazanie informacji na radio).</span>
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
