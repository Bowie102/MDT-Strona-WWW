import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, FileText, AlertTriangle, Crosshair, ChevronDown } from 'lucide-react';

const containerVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariant = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

// Zwijany komponent akordeonu dla sekcji pytań
const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ marginBottom: '0.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: 'none', color: '#e2e8f0', cursor: 'pointer', fontWeight: 'bold' }}
      >
        <span>{title}</span>
        <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            style={{ overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}
          >
            <div style={{ padding: '1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function WeaponLicense() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="page-header">
        <div className="page-title">
          <h2>Licencja na Broń (CCW)</h2>
          <p>Procedury, zasady egzaminowania i baza wiedzy dla LSPD</p>
        </div>
      </div>

      <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        
        {/* Kolumna 1: Procedury i Prawo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <motion.div variants={itemVariant} className="glass-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--lspd-blue)' }}>
              <FileText size={20} /> Procedura Wyrabiania Licencji od A do Z
            </h3>
            <ol style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text-muted)', lineHeight: '1.7' }}>
              <li style={{ marginBottom: '0.5rem' }}>Wydanie <strong>Zaświadczenia o niekaralności</strong> (Sprawdzenie kartoteki). Opłata: <strong style={{ color: '#10b981' }}>$40,000</strong> (Mandat: "Zaświadczenie o niekaralności"). Wpis na kanale <code style={{ fontSize: '0.8rem' }}>📇┃zaświadczenie-o-niekaralności</code>.</li>
              <li style={{ marginBottom: '0.5rem' }}>Obywatel udaje się na <strong>badania psychologiczne</strong>. Koszt: <strong style={{ color: '#10b981' }}>$40,000</strong> (Płatne do psychologów).</li>
              <li style={{ marginBottom: '0.5rem' }}>Badania wzroku i sprawności <strong>EMS</strong>. Koszt: <strong style={{ color: '#10b981' }}>$40,000</strong> (Płatne do EMS).</li>
              <li>Egzamin teoretyczno-praktyczny z budowy i obsługi broni <strong>(LSPD)</strong>. Koszt podejścia: <strong style={{ color: '#10b981' }}>$40,000</strong>. Przy pozytywnym wyniku wystawienie licencji: <strong style={{ color: '#10b981' }}>+$10,000</strong> (Mandat: "Wydanie licencji na broń"). Nadanie licencji w tablecie.</li>
            </ol>
          </motion.div>

          <motion.div variants={itemVariant} className="glass-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#eab308' }}>
              <ShieldCheck size={20} /> Przeprowadzanie Egzaminu
            </h3>
            <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text-muted)', lineHeight: '1.7' }}>
              <li><strong>Przeszukanie:</strong> Przed wpuszczeniem obywatela należy się przedstawić i go przeszukać. Nielegalne przedmioty = zatrzymanie obywatela i anulowanie egzaminu.</li>
              <li><strong>Kartoteka:</strong> Obywatel nie może być karany przez ostatnie 14 dni. Status poszukiwany = zatrzymanie.</li>
              <li><strong>Dokumenty:</strong> Weryfikacja badań (Psycholog i EMS).</li>
              <li><strong>Zaliczenie:</strong> Egzamin można zdać mając <strong>maksymalnie 2/3 błędy</strong>.</li>
              <li><strong>Brak zaliczenia:</strong> Kolejne podejście najwcześniej za 3 dni.</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariant} className="glass-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <AlertTriangle size={20} color="var(--danger-color, #ef4444)" /> Zasady Wewnętrzne & Odbieranie
            </h3>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #ef4444', marginBottom: '1rem' }}>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#ef4444' }}>ZASADA GŁÓWNA:</p>
              <p style={{ margin: '0.5rem 0 0 0', color: '#e2e8f0' }}>Każde przestępstwo z użyciem broni palnej = natychmiastowe odebranie licencji.</p>
            </div>
            <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text-muted)', lineHeight: '1.7' }}>
              <li><strong>Nadawanie:</strong> Wyłącznie od rangi <strong>Sergeant</strong> wzwyż.</li>
              <li><strong>Odbieranie:</strong> Każdy funkcjonariusz (z wyjątkiem Cadet).</li>
              <li><strong>Rejestracja:</strong> Wydane/zabrane licencje wpisywane na odpowiednich kanałach Discord.</li>
              <li><strong>Zwrot broni:</strong> Przy cofnięciu uprawnień obywatel musi natychmiast przekazać broń i amunicję funkcjonariuszom LSPD.</li>
            </ul>
          </motion.div>
        </div>

        {/* Kolumna 2: Teoria i Pytania */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <motion.div variants={itemVariant} className="glass-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#a855f7' }}>
              <Crosshair size={20} /> Teoria: Prawo i Kary
            </h3>
            <div style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              <p><strong>Wydawca:</strong> Departament Sprawiedliwości (DOJ).</p>
              <p><strong>Limit:</strong> Max 2 sztuki (DOJ może wyjątkowo zwiększyć limit).</p>
              <p><strong>Przestępstwo Zbrojne:</strong> Posiadanie/handel bez uprawnień, zatarte numery, broń wojskowa bez zezwolenia (wymaga zgody DOJ).</p>
              <p><strong>Utrata:</strong> Obowiązek zgłoszenia LSPD do 1 godziny od stwierdzenia utraty.</p>
              <p><strong>Użycie Broni:</strong> "Użyciem" nazywamy <strong>każde wzięcie jej do ręki</strong>. Noszenie jawne (w tym demonstracyjne noszenie broni białej) jest zakazane - obowiązuje noszenie w ukryciu.</p>
              <p><strong>Obrona Konieczna:</strong> Dopiero, gdy atak na życie/mienie jest bezprawny i bezpośredni. Działanie musi być proporcjonalne.</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariant} className="glass-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#3b82f6' }}>
              <FileText size={20} /> Pytania Egzaminacyjne
            </h3>
            
            <AccordionItem title="Czym jest BLOS?">
              <p>BLOS to akronim od czterech zasad bezpieczeństwa podczas obchodzenia się z bronią palną:</p>
              <ul>
                <li><strong>B jak Broń:</strong> Traktuj każdą broń tak, jakby była załadowana.</li>
                <li><strong>L jak Lufa:</strong> Zawsze kieruj lufę w bezpieczną stronę (cel, kulochwyt, ziemia pod kątem 45°, powietrze). Nigdy na siebie/innych.</li>
                <li><strong>O jak Otoczenie:</strong> Zanim oddasz strzał upewnij się co jest przed i za celem.</li>
                <li><strong>S jak Spust:</strong> Trzymaj palec poza językiem spustowym, dopóki nie jesteś gotów do strzału.</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Strefy celowania">
              <p>W przypadku zmuszenia do użycia broni palnej celujemy <strong>tylko w klatkę piersiową</strong>.</p>
              <p>Nigdy nie celujemy w nogi – za duże ryzyko trafienia w tętnicę.</p>
            </AccordionItem>

            <AccordionItem title="Z czego składa się łuska?">
              <p>Łuska to metalowa (zazwyczaj mosiężna) "obudowa" trzymająca wszystkie elementy w całości.</p>
              <p>Składa się z:</p>
              <ul>
                <li><strong>Szyjki:</strong> gdzie osadzony jest pocisk.</li>
                <li><strong>Korpusu:</strong> główna część.</li>
                <li><strong>Denka:</strong> z gniazdem spłonki i wyżłobieniem dla wyciągacza.</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Czym jest spłonka i proch?">
              <p><strong>Spłonka:</strong> mały zapłonnik umieszczony w dnie łuski. Po uderzeniu iglicy zapala ładunek prochowy.</p>
              <p><strong>Proch:</strong> ładunek miotający (najczęściej proch bezdymny - nitroceluloza). Jego ilość decyduje o prędkości pocisku.</p>
            </AccordionItem>

            <AccordionItem title="Wymień rodzaje pocisków">
              <ul>
                <li><strong>FMJ (Pełnopłaszczowe):</strong> używane w wojsku i strzelectwie sportowym.</li>
                <li><strong>HP:</strong> puste wierzchołki, wysoka siła obalająca (grzybkują), używane w obronie osobistej i myślistwie.</li>
                <li><strong>SP (Półpłaszczowe):</strong> pociski myśliwskie o dużej sile rażenia.</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Gdzie przechowujemy broń?">
              W sejfie - broń musi być rozładowana, zabezpieczona, a magazynek odłączony. Należy ją nosić wyłącznie przy sobie, zawsze <strong>w ukryciu</strong>.
            </AccordionItem>

          </motion.div>
        </div>

      </motion.div>
    </motion.div>
  );
}

export default WeaponLicense;
