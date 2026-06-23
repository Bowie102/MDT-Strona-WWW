import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Shield, Users, Radio, AlertTriangle, Crosshair, Map, ShieldAlert, FileText, ChevronRight, Tablet, Car, HandMetal, AlertCircle, Banknote, HelpCircle, GraduationCap, ChevronDown, Activity, Siren } from 'lucide-react';

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
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Regulamin i Zachowanie</h3>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', margin: 0 }}>
                <li><strong>ZAWSZE</strong> oddawaj szacunek do wyższego stopnia.</li>
                <li><strong>ZAWSZE</strong> wykonuj polecenia wyższego stopnia, nawet gdy wewnętrznie się z tym nie zgadzasz.</li>
                <li><strong>ZAWSZE</strong> pamiętaj o salutowaniu do wyższego stopnia (salutujemy tylko do stopnia bezpośrednio wyżej).</li>
                <li><strong>NIGDY</strong> nie zostawiaj samego partnera przy zdarzeniu — miej go zawsze na widoku.</li>
                <li>Przy zatrzymaniu drogowym <strong>każdy wysiada z radiowozu!</strong></li>
                <li>Nie podważaj decyzji innej (szczególnie wyższej) rangi. Nigdy nie wchodź w pół-zdania z wyższym rangą.</li>
                <li>Jeżeli chcesz zwrócić uwagę FP, zrób to sam-na-sam z kulturą i poszanowaniem.</li>
                <li>Staraj się zawsze być lojalny wobec innych, a przede wszystkim do swoich przełożonych.</li>
              </ul>
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
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Ścieżka Awansów (Rangi LSPD)</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Jednostka Los Santos Police Department podzielona jest na konkretne stopnie służbowe. Poniżej przedstawiony został podział stopni.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { from: 'Officer I', to: 'Officer II' },
                  { from: 'Officer II', to: 'Officer III' },
                  { from: 'Officer III', to: 'Officer III+1' },
                  { from: 'Officer III+1', to: 'Sergeant' },
                  { from: 'Sergeant / Staff / Master', to: 'Lieutenant' },
                  { from: 'Lieutenant I/II', to: 'Captain' },
                  { from: 'Captain', to: 'Commander' },
                  { from: 'Commander', to: 'Deputy Chief', top: true },
                  { from: 'Deputy Chief', to: 'Assistant Chief', top: true },
                  { from: 'Assistant Chief', to: 'Chief of Police', top: true },
                  { from: 'Chief of Police', to: 'Najwyższy szczebel', top: true }
                ].map((rank, idx) => (
                  <div key={idx} style={{ 
                    background: rank.top ? 'linear-gradient(90deg, rgba(200,168,75,0.15), transparent)' : 'rgba(0,0,0,0.2)', 
                    borderLeft: rank.top ? '3px solid #eab308' : '1px solid rgba(255,255,255,0.05)',
                    padding: '1rem', borderRadius: '4px', display: 'flex', alignItems: 'center' 
                  }}>
                    <strong style={{ width: '250px', color: rank.top ? '#eab308' : '#e2e8f0' }}>{rank.from}</strong>
                    <ChevronRight size={16} color="var(--text-muted)" style={{ margin: '0 1rem' }} />
                    <span style={{ color: 'var(--text-muted)' }}>{rank.to}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case 'struktura':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { tag: 'IAD', name: 'Internal Affairs Division', desc: 'Infiltrują i analizują działania funkcjonariuszy. Raporty rozpatrywane wewnętrznie.' },
              { tag: 'TD', name: 'Training Division', desc: 'Szkolenia, pilotaż helikoptera, pościgi SEU, procedury strzelania.' },
              { tag: 'PD', name: 'Patrol Division', desc: 'Rozłożenie jednostek, patrole, pierwsze reagowanie, egzekwowanie prawa.' },
              { tag: 'SWAT', name: 'Special Weapons and Tactics', special: true, desc: 'Powoływani w przypadku ataków terrorystycznych, Kodu Czarnego lub konwojów.' },
              { tag: 'FIB', name: 'Federal Investigation Bureau', federal: true, desc: 'Rozpracowywanie grup przestępczych oraz infiltracja wewnętrzna.' },
              { tag: 'SO', name: 'Sheriff Office', desc: 'Patrol Sandy Shores, Paleto Bay. Zarządza więzieniem Bolingbroke.' },
              { tag: 'DTU', name: 'Detective Unit', federal: true, desc: 'Jednostka prowadząca szczegółowe dochodzenia kryminalne.' },
              { tag: 'USMS', name: 'United States Marshal Service', federal: true, desc: 'Ochrona świadków, poszukiwanie uciekinierów, transport więźniów.' },
              { tag: 'HWP', name: 'Highway Patrol', desc: 'Bezpieczeństwo na autostradach. Egzekwowanie przepisów ruchu drogowego.' }
            ].map((div, idx) => (
              <motion.div key={idx} variants={itemVariant} className="glass-card" style={{ 
                borderTop: div.special ? '3px solid #eab308' : div.federal ? '3px solid #ef4444' : '3px solid var(--lspd-blue)',
                display: 'flex', flexDirection: 'column'
              }}>
                <span style={{ 
                  color: div.special ? '#eab308' : div.federal ? '#ef4444' : 'var(--lspd-blue)', 
                  fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' 
                }}>{div.tag}</span>
                <h4 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>{div.name}</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{div.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'radio':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card" style={{ background: 'rgba(200,168,75,0.06)', borderColor: 'rgba(200,168,75,0.2)' }}>
              <h3 style={{ color: '#eab308', marginTop: 0, marginBottom: '0.5rem' }}>Konfiguracja — Częstotliwości</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: '1.8' }}>
                Masz radio na częstotliwości <strong>MAIN</strong>.<br/>
                Zmiana częstotliwości: <strong>SHIFT + STRZAŁKA LEWO/PRAWO</strong> (np. TAC #1).
              </p>
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderLeft: '3px solid var(--lspd-blue)', borderRadius: '4px' }}>
                <p style={{ margin: 0, color: '#e2e8f0' }}>
                  <strong>SV (Supervisor)</strong> — bezpośredni przełożony na służbie odpowiadający za przebieg akcji.<br/>
                  <strong>PWC (Patrol Watch Commander)</strong> — osoba dowodząca dyżurem patrolowym na dzielnicy.
                </p>
              </div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
              <motion.div variants={itemVariant} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ background: 'rgba(30,95,196,0.15)', padding: '1rem', borderBottom: '1px solid rgba(30,95,196,0.2)' }}>
                  <h4 style={{ margin: 0, color: 'var(--lspd-blue)' }}>KODY 10-X</h4>
                </div>
                <div style={{ padding: '0.5rem' }}>
                  {[
                    ['10-1', 'Do wszystkich jednostek'], ['10-2', 'Potwierdzam'], ['10-3', 'Odmawiam'],
                    ['10-4', 'Zrozumiałem'], ['10-5', 'W drodze'], ['10-8', 'Potrzebne wsparcie'],
                    ['10-9', 'Powtórz komunikat'], ['10-12', 'Teren czysty'], ['10-13A', 'Ranny funkcjonariusz (osoby trzecie)'],
                    ['10-13B', 'Ranny funkcjonariusz (z własnej winy)'], ['10-20', 'Lokalizacja'], ['10-23', 'Dojechałem na miejsce'],
                    ['10-50', 'Wypadek/kolizja'], ['10-71', 'Strzały'], ['10-72', 'Sprzedaż narkotyków'],
                    ['10-80', 'Rozpoczynam pościg'], ['10-81', 'Pościg udany'], ['10-82', 'Pościg nieudany'], ['10-90', 'Napad']
                  ].map(([code, desc], idx) => (
                    <div key={idx} style={{ display: 'flex', padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      <strong style={{ width: '80px', color: 'var(--lspd-blue)' }}>{code}</strong>
                      <span style={{ color: 'var(--text-muted)' }}>{desc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariant} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ background: 'rgba(30,95,196,0.15)', padding: '1rem', borderBottom: '1px solid rgba(30,95,196,0.2)' }}>
                    <h4 style={{ margin: 0, color: 'var(--lspd-blue)' }}>KODY CODE</h4>
                  </div>
                  <div style={{ padding: '0.5rem' }}>
                    {[
                      ['Code 0', 'Strzały w kierunku funkcjonariusza!', '#ef4444'],
                      ['Code 1', 'Brak sygnałów świetlnych i dźwiękowych', ''],
                      ['Code 2', 'Wsparcie na sygnałach (tylko świetlne)', ''],
                      ['Code 3', 'Wsparcie na sygnałach świetlnych i dźwiękowych', ''],
                      ['Code 4', 'Zakończenie interwencji', ''],
                      ['Code 6', 'Interwencja poza pojazdem', ''],
                      ['Code 6J', 'Prośba o wsparcie na Felony Traffic Stop', ''],
                      ['Code 8', 'Zebranie (Roll Call)', ''],
                      ['Code 100', 'Cisza na radiu', '']
                    ].map(([code, desc, color], idx) => (
                      <div key={idx} style={{ display: 'flex', padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <strong style={{ width: '80px', color: color || 'var(--lspd-blue)' }}>{code}</strong>
                        <span style={{ color: color || 'var(--text-muted)', fontWeight: color ? 'bold' : 'normal' }}>{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ background: 'rgba(30,95,196,0.15)', padding: '1rem', borderBottom: '1px solid rgba(30,95,196,0.2)' }}>
                    <h4 style={{ margin: 0, color: 'var(--lspd-blue)' }}>STATUSY SŁUŻBOWE</h4>
                  </div>
                  <div style={{ padding: '0.5rem' }}>
                    {[
                      ['Status 1', 'Rozpoczęcie służby'],
                      ['Status 2', 'Przerwa w służbie'],
                      ['Status 3', 'Zakończenie służby'],
                      ['Status 4', 'Wolna jednostka'],
                      ['Status 5', 'Rozpoczęcie patrolu'],
                      ['Status 6', 'W trakcie patrolu'],
                      ['Status 7', 'Zatrzymanie poza komendą'],
                      ['Status 8', 'Zatrzymanie na komendzie'],
                      ['Status 9', 'Czynności służbowe na komendzie']
                    ].map(([code, desc], idx) => (
                      <div key={idx} style={{ display: 'flex', padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <strong style={{ width: '80px', color: 'var(--lspd-blue)' }}>{code}</strong>
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
            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
              <h3 style={{ color: '#ef4444', marginTop: 0 }}>⚠ UWAGA WAŻNE!</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>NIGDY NIE ŁĄCZYMY WYKROCZEŃ DROGOWYCH Z WYKROCZENIAMI KARNYMI!</p>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #eab308' }}>
              <h3 style={{ color: '#eab308', marginTop: 0 }}>💡 PRZELICZNIK KAUCJI</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}><strong>1 miesiąc = 2 000$</strong> — obowiązuje przy zamianie miesięcy na pieniądze lub odwrotnie.</p>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Funkcje Tabletu</h3>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', margin: 0 }}>
                <li><strong>Statusy:</strong> Na stronie głównej ustawiamy swój aktualny status służbowy.</li>
                <li><strong>Dispatch (Patrole):</strong> Wypisujemy patrol przydzielony przez PWC. Na napadach używamy zakładek Akcja 1, Akcja 2 itd.</li>
                <li><strong>Kartoteka:</strong> Wyszukiwanie po imieniu, nazwisku lub rejestracji pojazdu. 
                  <ul>
                    <li>Zakładka Notatki — wpisywanie poszukiwań (nie zapomnij usunąć po złapaniu).</li>
                    <li>Więzienie — historia odsiadek.</li>
                    <li>Oznaczenia — poszukiwany / niebezpieczny.</li>
                  </ul>
                </li>
                <li><strong>Wystawianie Mandatów i Wyroków:</strong>
                  <ul>
                    <li>Opłata: Powód (opis wykroczenia/przestępstwa)</li>
                    <li>Więzienie: Liczba miesięcy (wpisz 0 dla samego mandatu)</li>
                    <li>Grzywna: Kwota do zapłaty</li>
                  </ul>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        );

      case 'zatrzymanie':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Normal Traffic Stop (NTS)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--lspd-blue)' }}>1.</strong> <span style={{ color: 'var(--text-muted)' }}>Włączamy KOD 3, z prośbą przez megafon o zjazd na pobocze. Zatrzymujemy radiowóz za autem.</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--lspd-blue)' }}>2.</strong> <span style={{ color: 'var(--text-muted)' }}>Zmieniamy KOD 3 na KOD 2. Prośba o gaszenie silnika i ręce na kierownicy.</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--lspd-blue)' }}>3.</strong> <span style={{ color: 'var(--text-muted)' }}>RO zgłasza na radiu (CODE 6). Kierowca (SV) podchodzi do auta. RO ubezpiecza zza bagażnika.</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--lspd-blue)' }}>4.</strong> <span style={{ color: 'var(--text-muted)' }}>Przedstawienie się: Ranga, Imię i Nazwisko. Pytamy czy powód zatrzymania jest znany. Pobieramy dokumenty.</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--lspd-blue)' }}>5.</strong> <span style={{ color: 'var(--text-muted)' }}>Weryfikacja w kartotece. <strong>Nigdy nie mów o powodzie przed wzięciem dokumentów!</strong></span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--lspd-blue)' }}>6.</strong> <span style={{ color: 'var(--text-muted)' }}>Wypisanie mandatu / pouczenie. Obywatel może odjechać po zgaszeniu KOD 2.</span></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
              <h3 style={{ color: '#ef4444', marginTop: 0 }}>Felony Traffic Stop (FTS)</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Zatrzymanie wysokiego ryzyka. Nasze zdrowie jest najważniejsze.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: '#ef4444' }}>1.</strong> <span style={{ color: 'var(--text-muted)' }}>KOD 3 i megafon. Zatrzymanie z bezpiecznej odległości.</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: '#ef4444' }}>2.</strong> <span style={{ color: 'var(--text-muted)' }}>Wezwanie wsparcia (CODE 6J). Oczekujemy na <strong>min. 2 dodatkowe radiowozy (6 osób łącznie)</strong>.</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: '#ef4444' }}>3.</strong> <span style={{ color: 'var(--text-muted)' }}>Wsparcie ustawia się obok pod kątem (ochrona silnika). SV nakazuje wyciągnięcie kluczyków i wyrzucenie przez okno.</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: '#ef4444' }}>4.</strong> <span style={{ color: 'var(--text-muted)' }}>Wszyscy FP wychodzą osłaniając się za drzwiami, celując. Jeden patrzy na "plecy".</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: '#ef4444' }}>5.</strong> <span style={{ color: 'var(--text-muted)' }}>Rozkaz: "Lewą ręką otwórz drzwi, wyjdź, krok w bok, podwiń koszulkę, obrót 360".</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: '#ef4444' }}>6.</strong> <span style={{ color: 'var(--text-muted)' }}>Zakucie na ziemi. Min. 3 FP sprawdza bagażnik. Holownik. Konwój na komendę.</span></div>
              </div>
            </motion.div>
          </motion.div>
        );

      case 'use_of_force':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Skala Zachowań Podejrzanego</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderLeft: '3px solid #3b82f6', borderRadius: '4px' }}>
                  <strong style={{ color: '#3b82f6' }}>WSPÓŁPRACA:</strong> Osoba stosuje się do poleceń, nie stawia oporu.
                </div>
                <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderLeft: '3px solid #f59e0b', borderRadius: '4px' }}>
                  <strong style={{ color: '#f59e0b' }}>OPÓR BIERNY:</strong> Osoba nie współpracuje, ale nie ucieka i nie atakuje (np. udaje nieprzytomną, trzyma się płotu).
                </div>
                <div style={{ padding: '1rem', background: 'rgba(249, 115, 22, 0.1)', borderLeft: '3px solid #f97316', borderRadius: '4px' }}>
                  <strong style={{ color: '#f97316' }}>OPÓR AKTYWNY:</strong> Osoba wyrywa się lub próbuje uciec, bez agresji w stronę funkcjonariusza.
                </div>
                <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '3px solid #ef4444', borderRadius: '4px' }}>
                  <strong style={{ color: '#ef4444' }}>OPÓR AGRESYWNY:</strong> Osoba chce zrobić krzywdę (np. kopanie, bicie pięścią).
                </div>
                <div style={{ padding: '1rem', background: 'rgba(153, 27, 27, 0.2)', borderLeft: '3px solid #991b1b', borderRadius: '4px' }}>
                  <strong style={{ color: '#991b1b' }}>OPÓR ZAOSTRZONY:</strong> Bezpośrednie zagrożenie dla życia lub zdrowia (broń palna, nóż, niebezpieczne przedmioty).
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Poziomy Użycia Siły</h3>
              
              <div style={{ marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '4px' }}>
                <div style={{ padding: '0.5rem 1rem', background: 'rgba(59, 130, 246, 0.15)', fontWeight: 'bold' }}>POZIOM 1: Lekkie Użycie Siły (Opór Bierny/Aktywny)</div>
                <div style={{ padding: '1rem', color: 'var(--text-muted)' }}>Obecność, komunikacja werbalna, powalenie na ziemię, kajdanki, popychanie, blokowanie, K-9 (bez gryzienia).</div>
              </div>

              <div style={{ marginBottom: '1.5rem', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '4px' }}>
                <div style={{ padding: '0.5rem 1rem', background: 'rgba(249, 115, 22, 0.15)', fontWeight: 'bold' }}>POZIOM 2: Intermediate Force (Opór Agresywny)</div>
                <div style={{ padding: '1rem', color: 'var(--text-muted)' }}>Kopnięcia, uderzenia pięścią/pałką, gaz pieprzowy, Bean Bag, Taser, K-9 (z gryzieniem), PIT do 120 km/h.</div>
              </div>

              <div style={{ border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '4px' }}>
                <div style={{ padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.15)', fontWeight: 'bold', color: '#ef4444' }}>POZIOM 3: Deadly Force (Zagrożenie Życia)</div>
                <div style={{ padding: '1rem', color: 'var(--text-muted)' }}>Użycie broni palnej, pałka na głowę/szyję/kręgosłup, PIT pow. 120 km/h, duszenie, wjechanie autem.</div>
              </div>
            </motion.div>
          </motion.div>
        );

      case 'strzelanina':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Czynności po Strzelaninie</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--lspd-blue)' }}>1.</strong> <span style={{ color: 'var(--text-muted)' }}>Podchodzimy do rannego obywatela, zabieramy ewentualną broń leżącą przy nim lub ją odkopujemy.</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--lspd-blue)' }}>2.</strong> <span style={{ color: 'var(--text-muted)' }}>Zapewniamy pierwszą pomoc (rana postrzałowa kończyny — staza taktyczna, którą każdy FP posiada przy pasie).</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--lspd-blue)' }}>3.</strong> <span style={{ color: 'var(--text-muted)' }}>Szukamy dowodu osobistego i zbieramy próbkę prochu (np. bibułką) z dłoni lub rękawiczek.</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--lspd-blue)' }}>4.</strong> <span style={{ color: 'var(--text-muted)' }}>Konfiskujemy wszystkie niebezpieczne narzędzia (tasery, broń palną, białą).</span></div>
                <div style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--lspd-blue)' }}>5.</strong> <span style={{ color: 'var(--text-muted)' }}>Zapisujemy informacje w dispatchu/notesie. Dopiero po wpisaniu personaliów i posiadanych przedmiotów — przekazujemy do EMS.</span></div>
              </div>
            </motion.div>
            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #eab308' }}>
              <h3 style={{ color: '#eab308', marginTop: 0 }}>⚠ PRIORYTET EMS</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Jeżeli obywatel wymaga natychmiastowej pomocy EMS — odpuszczamy wszelkie czynności i wykonujemy je dopiero po udzieleniu pomocy przez medyka. Wszystko z głową!</p>
            </motion.div>
          </motion.div>
        );

      case 'zagrozenia':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Poziomy Zagrożenia</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(249, 115, 22, 0.1)', borderLeft: '3px solid #f97316', borderRadius: '4px' }}>
                  <strong style={{ color: '#f97316' }}>KOD POMARAŃCZOWY</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)' }}>Zastosowanie gdy uzyskano informacje o możliwości wystąpienia zdarzenia terrorystycznego lub odnotowuje się zwiększoną aktywność gangów.</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '3px solid #ef4444', borderRadius: '4px' }}>
                  <strong style={{ color: '#ef4444' }}>KOD CZERWONY</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)' }}>Zaistniało konkretne zdarzenie terrorystyczne lub gangi znacznie zachwiały równowagę. <strong>Policja ma prawo zatrzymać i wylegitymować KAŻDEGO obywatela.</strong></p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(17, 24, 39, 0.8)', borderLeft: '3px solid #000', borderRadius: '4px' }}>
                  <strong style={{ color: '#fff' }}>KOD CZARNY</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)' }}>Poważne zdarzenia terrorystyczne powodujące zagrożenie bezpieczeństwa. <strong>Policja ma prawo zatrzymać, wylegitymować i przeszukać KAŻDEGO obywatela, oraz otworzyć ogień w kierunku osoby z wyciągniętą bronią bez ostrzeżenia.</strong></p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Jednostki Patrolowe</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {[
                  ['ADAM', 'Podstawowa jednostka patrolowa'], ['DAVID', 'Jednostka uderzeniowa (SWAT)'],
                  ['EAGLE', 'Jednostka powietrzna'], ['KILO', 'Jednostka detektywistyczna (Unmarked)'],
                  ['EDWARD', 'Jednostka pościgowa'], ['MARY', 'Jednostka motocyklowa'],
                  ['BIKE', 'Jednostka rowerowa'], ['HENRY', 'Jednostka Offroad'],
                  ['TOM', 'Holownik'], ['CANINE', 'Jednostka K-9'],
                  ['FRANK-BOY', 'Patrol pieszy'], ['OCEAN', 'Patrol na wodzie'],
                  ['QUEEN', 'Jednostka opancerzona'], ['TURTLE', 'Czołg']
                ].map(([name, desc], idx) => (
                  <div key={idx} style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                    <strong style={{ color: 'var(--lspd-blue)', display: 'block', marginBottom: '0.25rem' }}>{name}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{desc}</span>
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
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>• Blokady wszędzie<br/>• PIT/BOX/RAM w mieście do 80 km/h, poza miastem do 160 km/h<br/>• Kolczatki wszędzie</p>
                </div>
                <div style={{ borderLeft: '3px solid #991b1b', paddingLeft: '1rem' }}>
                  <strong style={{ color: '#991b1b' }}>KOD CZARNY</strong>
                  <p style={{ margin: '0.5rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Strzały do funkcjonariuszy/przechodniów, potrącenia. Zagrożenie życia.</p>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>• Blokady wszędzie<br/>• PIT/BOX/RAM bez limitu prędkości<br/>• Strzały do kierowcy (Zatrzymać za wszelką cenę)</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div className="glass-card">
                <h4 style={{ color: 'var(--lspd-blue)', marginTop: 0 }}>BOX</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Zablokowanie "w pudełku" przez 4 jednostki. Zaciągnięcie hamulca ręcznego po zablokowaniu.</p>
              </div>
              <div className="glass-card">
                <h4 style={{ color: 'var(--lspd-blue)', marginTop: 0 }}>STRZAŁKA</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>3 radiowozy: dwa pod kątem 45 stopni od tyłu, trzeci dociska z przodu drogę ucieczki.</p>
              </div>
              <div className="glass-card">
                <h4 style={{ color: 'var(--lspd-blue)', marginTop: 0 }}>RAM</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Zablokowanie przód/tył. U1 zwalnia przed maską, U2 dojeżdża z tyłu. Zaciągamy hamulec ręczny.</p>
              </div>
              <div className="glass-card">
                <h4 style={{ color: 'var(--lspd-blue)', marginTop: 0 }}>PIT</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Zepchnięcie uderzając w tylną oś pojazdu. Wykonywane w miejscach bezpiecznych, poza terenem zabudowanym.</p>
              </div>
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
                <li>Obywatel ma wyrok minimum 60 miesięcy.</li>
                <li>Każdy biorący udział ZAKŁADA kamizelkę kuloodporną (nie pytamy o autoryzację).</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
              <h3 style={{ color: '#ef4444', marginTop: 0 }}>⚠ KONWÓJ = RUCHOMY KOD CZARNY</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                Konwój jedzie stale ok. 80 km/h. Każde zagrożenie eliminujemy po 1 komunikacie. Pierwsze strzały w opony, drugie w kierowcę. U1 i Ostatnia jednostka włączają KOD 3, reszta KOD 2. Do więzienia wjeżdża TYLKO więźniarka.
              </p>
            </motion.div>

            <motion.div variants={itemVariant} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="glass-card" style={{ textAlign: 'center' }}>
                <strong style={{ color: 'var(--gold)' }}>KOLUMNA</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Używana w mieście. Auta jadą 5 metrów za sobą na jednym pasie.</p>
              </div>
              <div className="glass-card" style={{ textAlign: 'center' }}>
                <strong style={{ color: 'var(--gold)' }}>SZACHOWNICA</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Używana na autostradzie. Auta jadą na zmianę pasami ruchu.</p>
              </div>
              <div className="glass-card" style={{ textAlign: 'center' }}>
                <strong style={{ color: 'var(--gold)' }}>ŻÓŁW</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Używana w razie ataku/odbicia. Auta otaczają więźniarkę i funkcjonariusze się bunkrują.</p>
              </div>
            </motion.div>
          </motion.div>
        );

      case 'napady':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ color: 'var(--gold)', marginTop: 0, marginBottom: '0.5rem' }}>MAŁE NAPADY</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>Kasetki / Sklepy</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}><span style={{ color: '#3b82f6' }}>4</span> <span style={{ color: '#64748b', fontSize: '1rem' }}>VS</span> <span style={{ color: '#ef4444' }}>2</span></div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ color: 'var(--gold)', marginTop: 0, marginBottom: '0.5rem' }}>ŚREDNIE NAPADY</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>Banki Fleeca</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}><span style={{ color: '#3b82f6' }}>8</span> <span style={{ color: '#64748b', fontSize: '1rem' }}>VS</span> <span style={{ color: '#ef4444' }}>5</span></div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ color: 'var(--gold)', marginTop: 0, marginBottom: '0.5rem' }}>DUŻE NAPADY</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>Jubiler / Human / Pacyfik</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}><span style={{ color: '#3b82f6' }}>12</span> <span style={{ color: '#64748b', fontSize: '1rem' }}>VS</span> <span style={{ color: '#ef4444' }}>8</span></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #eab308' }}>
              <h3 style={{ color: '#eab308', marginTop: 0 }}>⏱ KONIEC LIMITÓW</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                Po upływie <strong>10 minut</strong> od pierwszego kodu 0 na napadzie, funkcjonariuszy LSPD przestają obowiązywać limity.
              </p>
            </motion.div>

            <motion.div variants={itemVariant} className="glass-card">
              <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Rozstawienie Jednostek</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: '1.8' }}>W przypadku braku wystarczającej liczby jednostek na miejscu napadu (Jubiler, Fleeca Kwadraciak, Urzędnicza, Vinewood, Rockford), <strong>Supervisor (SV)</strong> uzupełnia luki wedle własnego uznania. Zalecane miejsca rozstawień i osłon są udostępniane odprawą przed lub w trakcie działań taktycznych. Zachowanie odpowiedniego dystansu od wyjść z placówek oraz ubezpieczenie <em>"pleców"</em> jest kluczowe na każdej akcji.</p>
            </motion.div>
          </motion.div>
        );

      case 'miranda':
        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <ShieldAlert size={48} color="var(--eab308)" style={{ margin: '0 auto 1.5rem', opacity: 0.8 }} />
              <h2 style={{ color: '#eab308', marginBottom: '2rem' }}>Formułka Zatrzymania (Prawa Mirandy)</h2>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '3rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
                <p style={{ fontSize: '1.4rem', lineHeight: '2', color: '#e2e8f0', fontStyle: 'italic', margin: 0 }}>
                  "Masz prawo zachować milczenie. Wszystko, co powiesz, może i zostanie użyte przeciwko tobie w sądzie. <br /><br />
                  Masz prawo do adwokata. Jeśli cię na niego nie stać, zostanie ci przydzielony z urzędu. <br /><br />
                  Czy rozumiesz prawa, które ci przedstawiłem?"
                </p>
              </div>
            </motion.div>
          </motion.div>
        );

      case 'szkolenia':
        const szkoleniaData = [
          {
            id: 'nt',
            icon: '🤝',
            title: 'NT — Negocjator',
            reqs: 'Od stopnia: Officer I  ·  Wymagane na: Officer II',
            available: true,
            content: (
              <>
                <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Kim jest Negocjator?</h3>
                <p style={{ color: 'var(--text-muted)' }}>Ratuje ludzkie życie i zdrowie w sytuacjach kryzysowych. Nie okazuj zdenerwowania, bądź pewny siebie i stanowczy.</p>
                <h4 style={{ color: 'var(--gold)' }}>Procedura — Krok po Kroku</h4>
                <ol style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  <li><strong>Pierwszy kontakt</strong> — zbliżamy się na odległość słyszalności.</li>
                  <li><strong>Legitymacja</strong> — odznaka, imię, nazwisko, stopień.</li>
                  <li><strong>Zbieranie informacji</strong> — liczba napastników, zakładników, stan zdrowia.</li>
                  <li><strong>Negocjacje</strong> — pytamy o żądania. Decyduje zawsze SV.</li>
                  <li><strong>Odjazd napastników</strong> — pytamy SV o zgodę na wypuszczenie.</li>
                </ol>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderLeft: '3px solid #ef4444', borderRadius: '4px', marginTop: '1rem' }}>
                  <strong style={{ color: '#ef4444' }}>Ostrzeżenia i Zerwanie</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Max 3 ostrzeżenia. Zerwanie gdy zakładnik ranny, napastnicy uciekają bez zgody, podstawieni zakładnicy.
                  </p>
                </div>
              </>
            )
          },
          {
            id: 'sv',
            icon: '🎖️',
            title: 'SV — Supervisor',
            reqs: 'Od stopnia: Officer II  ·  Wymagane na: Officer III',
            available: true,
            content: (
              <>
                <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Czym jest SV?</h3>
                <p style={{ color: 'var(--text-muted)' }}>Najwyższy stopniem na akcji. Dowodzi i decyduje. Anonimowość SV jest bezwzględnym priorytetem.</p>
                <h4 style={{ color: 'var(--gold)' }}>Obowiązki na Akcji</h4>
                <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  <li>Wyznaczenie negocjatora i ubezpieczenia.</li>
                  <li>Zabezpieczenie terenu.</li>
                  <li>Nakładanie kodów pościgowych.</li>
                  <li>Wezwanie EMS.</li>
                  <li>Ustalenie częstotliwości taktycznej.</li>
                </ul>
              </>
            )
          },
          {
            id: 'pwc',
            icon: '📋',
            title: 'PWC — Patrol Watch Commander',
            reqs: 'Od stopnia: Officer III  ·  Wymagane na: Officer III+1',
            available: true,
            content: (
              <>
                <h3 style={{ marginTop: 0, color: 'var(--lspd-blue)' }}>Kim jest PWC / APWC?</h3>
                <p style={{ color: 'var(--text-muted)' }}>Osoba dowodząca dyspozycją jednostek na dzielnicy. Kod radiowy: <strong>00</strong>. Powyżej 8 osób na służbie PWC jest wymagany.</p>
                <h4 style={{ color: 'var(--gold)' }}>Zasady</h4>
                <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  <li>Każdy PWC wyznacza sobie Asystenta (APWC).</li>
                  <li>PWC pilnuje dispatchu, przydziela zgłoszenia, nadzoruje radio.</li>
                  <li>Kadeci zostają na komendzie przy kodzie Czerwonym i Czarnym.</li>
                </ul>
              </>
            )
          },
          {
            id: 'fac',
            icon: '🏥',
            title: 'FAC — Pierwsza Pomoc',
            reqs: 'Od stopnia: Officer I  ·  Wymagane na: Officer II',
            available: false,
            content: null
          }
        ];

        return (
          <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div variants={itemVariant} className="glass-card" style={{ borderLeft: '4px solid #eab308' }}>
              <h3 style={{ color: '#eab308', marginTop: 0 }}>📚 Kompendium Szkoleniowe</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Sekcja jest w trakcie rozbudowy. Ukończenie wymaganych szkoleń jest obowiązkowe dla awansu.</p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {szkoleniaData.map((sz, idx) => (
                <motion.div key={sz.id} variants={itemVariant} className="glass-card" style={{ 
                  padding: 0, overflow: 'hidden', opacity: sz.available ? 1 : 0.6, cursor: sz.available ? 'pointer' : 'not-allowed'
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
    </motion.div>
  );
}

export default KnowledgeBase;
