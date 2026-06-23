import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, FileText, AlertTriangle, Crosshair, ChevronDown, CheckCircle2, DollarSign, Scale, HelpCircle } from 'lucide-react';

const containerVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariant = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

const AccordionItem = ({ title, children, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ 
      marginBottom: '0.75rem', 
      border: '1px solid rgba(59, 130, 246, 0.2)', 
      borderRadius: '8px', 
      overflow: 'hidden',
      background: isOpen ? 'rgba(15, 23, 42, 0.8)' : 'rgba(15, 23, 42, 0.4)',
      transition: 'background 0.3s'
    }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          padding: '1.25rem', background: 'transparent', border: 'none', color: '#f8fafc', 
          cursor: 'pointer', fontSize: '1.05rem', fontWeight: '500' 
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {Icon && <Icon size={20} color="var(--lspd-blue)" />}
          {title}
        </span>
        <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', color: 'var(--lspd-blue)' }} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            style={{ overflow: 'hidden' }}
          >
            <div style={{ 
              padding: '0 1.25rem 1.25rem 1.25rem', 
              color: '#94a3b8', 
              lineHeight: '1.8',
              fontSize: '0.95rem',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              marginTop: '0.5rem',
              paddingTop: '1rem'
            }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Badge = ({ children, color = '#3b82f6', bg = 'rgba(59, 130, 246, 0.1)' }) => (
  <span style={{ 
    display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
    background: bg, color: color, padding: '0.2rem 0.6rem', 
    borderRadius: '999px', fontSize: '0.85rem', fontWeight: 'bold', border: `1px solid ${color}40`
  }}>
    {children}
  </span>
);

const StepBox = ({ number, title, cost, children }) => (
  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', position: 'relative' }}>
    <div style={{ 
      width: '40px', height: '40px', borderRadius: '50%', background: 'var(--lspd-blue)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', 
      fontWeight: 'bold', fontSize: '1.2rem', flexShrink: 0, boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' 
    }}>
      {number}
    </div>
    <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#e2e8f0' }}>{title}</h4>
        {cost && <Badge color="#10b981" bg="rgba(16, 185, 129, 0.1)"><DollarSign size={14}/> Koszt: ${cost.toLocaleString()}</Badge>}
      </div>
      <div style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '0.95rem' }}>
        {children}
      </div>
    </div>
  </div>
);

function WeaponLicense() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="page-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <div className="page-title">
          <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={32} color="var(--lspd-blue)" /> Licencja na Broń (CCW)
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#64748b', marginTop: '0.5rem' }}>Oficjalne zasady i baza wiedzy Departamentu Sprawiedliwości & LSPD</p>
        </div>
      </div>

      <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Sekcja: PRAWO I ZASADY OGÓLNE */}
        <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.3rem', color: '#e2e8f0', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <Scale size={24} color="#a855f7" /> Prawo, Kary i Wymogi Ogólne
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h4 style={{ color: '#cbd5e1', marginBottom: '0.75rem' }}>Podstawowe Informacje</h4>
              <ul style={{ paddingLeft: '1.2rem', color: '#94a3b8', lineHeight: '1.8' }}>
                <li><strong>Wydawca:</strong> Departament Sprawiedliwości (DOJ).</li>
                <li><strong>Limit Broni:</strong> Standardowo <Badge color="#f59e0b">MAX 2 sztuki</Badge>. Wyjątkowo DOJ może zwiększyć limit.</li>
                <li><strong>Utrata Broni:</strong> Obowiązek powiadomienia LSPD w ciągu <Badge color="#ef4444">1 godziny</Badge>.</li>
                <li><strong>Przechowywanie:</strong> Sejf (broń rozładowana, zabezpieczona, odłączony magazynek).</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#cbd5e1', marginBottom: '0.75rem' }}>Przestępstwa i Złamania Zasad</h4>
              <ul style={{ paddingLeft: '1.2rem', color: '#94a3b8', lineHeight: '1.8' }}>
                <li>Posiadanie / handel bez uprawnień = <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Przestępstwo Zbrojne</span>.</li>
                <li>Zabronione jest noszenie jawne oraz demonstracyjne z bronią białą. Obowiązuje <Badge color="#3b82f6">Noś Ukrycie</Badge>.</li>
                <li>Użycie Broni: traktowane jest jako <strong>każde wzięcie jej do ręki</strong>.</li>
                <li>Broń wojskowa/automatyczna oraz materiały wybuchowe wymagają oddzielnych zezwoleń od DOJ.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Sekcja: PROCEDURA WYRABIANIA LICENCJI */}
        <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.3rem', color: '#e2e8f0', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <ShieldCheck size={24} color="#10b981" /> Procedura Wyrabiania Licencji (Krok po Kroku)
          </h3>
          
          <div style={{ marginLeft: '1rem', borderLeft: '2px dashed rgba(59, 130, 246, 0.3)', paddingLeft: '2rem' }}>
            <StepBox number="1" title="Weryfikacja LSPD (Niekaralność)" cost={40000}>
              <p style={{ margin: '0 0 0.5rem 0' }}>Sprawdzenie kartoteki obywatela. Aby zostać dopuszczonym do dalszych etapów, obywatel <strong>nie może być karany przez ostatnie 14 dni</strong> ani figurować jako poszukiwany.</p>
              <p style={{ margin: 0 }}>
                Mandat z dopiskiem: <em>"Zaświadczenie o niekaralności"</em>. Wpis wykonujemy na kanale <Badge bg="rgba(255,255,255,0.05)" color="#cbd5e1">📇┃zaświadczenie-o-niekaralności</Badge>.
              </p>
            </StepBox>

            <StepBox number="2" title="Badania Psychologiczne" cost={40000}>
              <p style={{ margin: 0 }}>Obywatel udaje się do kliniki psychologicznej na ocenę stabilności emocjonalnej. Opłata uiszczana jest bezpośrednio na rzecz wyznaczonego psychologa.</p>
            </StepBox>

            <StepBox number="3" title="Badania EMS (Wzrok)" cost={40000}>
              <p style={{ margin: 0 }}>Wizyta w szpitalu w celu weryfikacji wady wzroku i sprawności fizycznej. Opłata uiszczana jest bezpośrednio na rzecz jednostki ratowniczej (EMS).</p>
            </StepBox>

            <StepBox number="4" title="Egzamin LSPD i Wydanie Licencji" cost={40000}>
              <ul style={{ margin: '0 0 1rem 0', paddingLeft: '1.2rem' }}>
                <li><strong>Przeszukanie:</strong> Przed wpuszczeniem na teren komendy, przedstaw się i przeszukaj obywatela. Wykrycie nielegalnych przedmiotów skutkuje zatrzymaniem.</li>
                <li><strong>Wymagania zaliczenia:</strong> Maksymalnie <strong>2/3 błędy</strong> z pytań testowych. (Kolejne podejście możliwe za 3 dni).</li>
              </ul>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1rem', borderRadius: '6px' }}>
                <p style={{ margin: '0 0 0.5rem 0', color: '#10b981', fontWeight: 'bold' }}>Po zdaniu egzaminu (+ $10,000 za wydanie dokumentu):</p>
                <p style={{ margin: 0 }}>Wystawiasz mandat na 10k z dopiskiem <em>"Wydanie licencji na broń"</em>, a następnie nadajesz licencję w tablecie i logujesz to na kanale <Badge bg="rgba(255,255,255,0.05)" color="#cbd5e1">📇┃wydane</Badge>.</p>
              </div>
            </StepBox>
          </div>
        </motion.div>

        {/* Sekcja: ZASADY WEWNĘTRZNE */}
        <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.3rem', color: '#ef4444', marginBottom: '1.5rem', borderBottom: '1px solid rgba(239, 68, 68, 0.2)', paddingBottom: '1rem' }}>
            <AlertTriangle size={24} color="#ef4444" /> Cofnięcie i Zabrane Uprawnienia
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: '1 1 300px' }}>
              <p style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>Kiedy konfiskujemy uprawnienia?</p>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', color: '#fca5a5' }}>
                <strong>Każde przestępstwo z użyciem broni palnej</strong> = natychmiastowe odebranie licencji. Obywatel w takim przypadku musi natychmiast przekazać nam całą broń i amunicję.
              </div>
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <p style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>Uprawnienia funkcjonariuszy</p>
              <ul style={{ paddingLeft: '1.2rem', color: '#94a3b8', lineHeight: '1.8', margin: 0 }}>
                <li><strong>Wystawianie licencji:</strong> Dozwolone tylko od rangi <Badge color="#eab308">Sergeant</Badge> w górę.</li>
                <li><strong>Odbieranie licencji:</strong> Mają prawo wszystkie rangi LSPD (z wyjątkiem <Badge color="#94a3b8">Cadet</Badge>).</li>
                <li>Wpisujemy konfiskatę na kanale <Badge bg="rgba(255,255,255,0.05)" color="#cbd5e1">📇┃zabrane</Badge>.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Sekcja: BAZA WIEDZY - AKORDEON */}
        <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.3rem', color: '#e2e8f0', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <HelpCircle size={24} color="#3b82f6" /> Pytania Teoretyczne na Egzamin
          </h3>
          
          <AccordionItem title="Czym jest BLOS?" icon={CheckCircle2}>
            <p style={{ marginBottom: '1rem' }}>Akronim od czterech głównych zasad bezpieczeństwa podczas obchodzenia się z bronią palną:</p>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>B jak Broń:</strong> Traktuj każdą broń tak, jakby była załadowana, niezależnie od zapewnień innych.</li>
              <li><strong>L jak Lufa:</strong> Zawsze kieruj lufę w stronę celu, kulochwytu, ziemi (pod kątem ok. 45°) lub w powietrze. Nigdy na siebie ani inne osoby.</li>
              <li><strong>O jak Otoczenie:</strong> Zanim oddasz strzał, upewnij się, co znajduje się przed i za celem, by uniknąć rykoszetów i zagrożenia osób postronnych.</li>
              <li><strong>S jak Spust:</strong> Trzymaj palec poza językiem spustowym i kładź go tam dopiero, gdy jesteś gotów oddać strzał.</li>
            </ul>
          </AccordionItem>

          <AccordionItem title="Strefy Celowania" icon={Crosshair}>
            <p>W przypadku, gdy jesteśmy zmuszeni do użycia broni palnej, celujemy <strong>WYŁĄCZNIE W KLATKĘ PIERSIOWĄ</strong> (środek masy).</p>
            <p><strong>Zabronione jest celowanie w nogi</strong> ze względu na gigantyczne ryzyko trafienia w tętnicę udową i spowodowania śmiertelnego wykrwawienia przed przyjazdem EMS.</p>
          </AccordionItem>

          <AccordionItem title="Z czego składa się Łuska?" icon={HelpCircle}>
            <p>Łuska to metalowa "obudowa" (najczęściej mosiężna, rzadziej stalowa), która trzyma wszystkie elementy naboju w całości.</p>
            <p style={{ marginTop: '0.5rem' }}>Trzy główne części łuski:</p>
            <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
              <li><strong>Szyjka</strong> – miejsce, w którym osadzony jest pocisk.</li>
              <li><strong>Korpus</strong> – główna, środkowa część łuski.</li>
              <li><strong>Denko</strong> – dolna część zawierająca gniazdo spłonki i wyżłobienie dla wyciągacza.</li>
            </ol>
          </AccordionItem>

          <AccordionItem title="Czym jest Spłonka i Proch?" icon={HelpCircle}>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem', margin: 0 }}>
              <li><strong>Spłonka:</strong> mały zapłonnik umieszczony w dnie łuski. Po uderzeniu iglicy pistoletu, spłonka wytwarza iskrę i zapala ładunek prochowy.</li>
              <li><strong>Proch:</strong> ładunek miotający (najczęściej proch bezdymny - nitroceluloza). Powstające gazy wypychają pocisk z lufy. Ilość i rodzaj prochu decyduje o ciśnieniu i prędkości pocisku.</li>
            </ul>
          </AccordionItem>

          <AccordionItem title="Rodzaje Pocisków (Typy Amunicji)" icon={HelpCircle}>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0 }}>
              <li><strong>FMJ (Pełnopłaszczowe):</strong> standardowa amunicja używana głównie w strzelectwie sportowym i wojsku. Bardzo dobra przebijalność.</li>
              <li><strong>HP (Hollow Point / Puste wierzchołki):</strong> używane często w obronie osobistej. Grzybkują w ciele, oddając całą energię celowi (wysoka siła obalająca), dzięki czemu nie przelatują przez ciało na wylot i są bezpieczniejsze dla otoczenia.</li>
              <li><strong>SP (Półpłaszczowe):</strong> pociski myśliwskie charakteryzujące się ogromną siłą rażenia i potężnymi obrażeniami tkanek.</li>
            </ul>
          </AccordionItem>

        </motion.div>

      </motion.div>
    </motion.div>
  );
}

export default WeaponLicense;
