import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, FileText, AlertTriangle, Crosshair, ChevronDown, CheckCircle2, DollarSign, Scale, HelpCircle, Check, AlertCircle } from 'lucide-react';

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
    background: bg, color: color, padding: '0.3rem 0.8rem', 
    borderRadius: '999px', fontSize: '0.85rem', fontWeight: 'bold', border: `1px solid ${color}40`
  }}>
    {children}
  </span>
);

const StepBox = ({ number, title, cost, children }) => (
  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', position: 'relative' }}>
    <div style={{ 
      width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--lspd-blue), #1e3a8a)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', 
      fontWeight: 'bold', fontSize: '1.3rem', flexShrink: 0, boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
      border: '2px solid rgba(255,255,255,0.1)'
    }}>
      {number}
    </div>
    <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
        <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#e2e8f0' }}>{title}</h4>
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
          <p style={{ fontSize: '1.1rem', color: '#64748b', marginTop: '0.5rem' }}>Oficjalne zasady i przepisy Departamentu Sprawiedliwości oraz LSPD</p>
        </div>
      </div>

      <motion.div variants={containerVariant} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Sekcja: PRAWO I ZASADY OGÓLNE */}
        <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem', background: 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.05), rgba(0,0,0,0.2))', borderTop: '3px solid #a855f7' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.4rem', color: '#e2e8f0', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <Scale size={26} color="#a855f7" /> Prawo, Kary i Wymogi Ogólne
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            <div>
              <h4 style={{ color: '#cbd5e1', marginBottom: '0.75rem', fontSize: '1.15rem' }}>Podstawowe Informacje i Uprawnienia</h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: '0 0 1.5rem 0' }}>
                Licencja wydawana jest przez <strong>Departament Sprawiedliwości (DOJ)</strong> po złożeniu stosownego wniosku i spełnieniu rygorystycznych wymogów, takich jak niekaralność oraz stabilność psychiczna (brak hospitalizacji psychiatrycznej w ciągu ostatnich 6 miesięcy). Uprawnia ona do zakupu, posiadania i noszenia zarejestrowanej broni palnej oraz dedykowanej do niej amunicji.
              </p>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8', lineHeight: '1.6' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                  <Check size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Limit broni:</strong> Standardowo dozwolone jest posiadanie maksymalnie <Badge color="#f59e0b">2 sztuk</Badge>. W wyjątkowych sytuacjach DOJ może zezwolić na większą ilość.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                  <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Zgłoszenie utraty:</strong> Właściciel ma obowiązek zgłosić zagubienie lub kradzież broni do LSPD w ciągu <Badge color="#ef4444">1 godziny</Badge> od stwierdzenia utraty.</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#cbd5e1', marginBottom: '0.75rem', fontSize: '1.15rem' }}>Przestępstwa i Noszenie Broni</h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: '0 0 1.5rem 0' }}>
                Nielegalne posiadanie, w tym posiadanie broni i amunicji bez licencji, przekroczenie limitu sztuk, posiadanie amunicji do innej broni niż zarejestrowana, broń ze zdartymi numerami czy broń wojskowa bez pozwolenia kończy się konfiskatą, grzywną oraz więzieniem. Handel bronią bez uprawnień traktowany jest jako <strong>przestępstwo zbrojne</strong> zagrożone bardzo surowymi karami.
              </p>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8', lineHeight: '1.6' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                  <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Sposób noszenia:</strong> Broń palna musi być zawsze przenoszona w ukryciu. Jej jawne noszenie jest surowo karane. Demonstracyjne noszenie broni białej jest zabronione.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                  <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Użycie broni:</strong> Przez "użycie" rozumiemy <strong>każde wzięcie broni do ręki</strong>. Nieuprawnione manipulowanie bronią lub stwarzanie nią zagrożenia jest karane.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem', borderTop: '3px solid #f59e0b' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.4rem', color: '#e2e8f0', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <AlertTriangle size={26} color="#f59e0b" /> Uzasadnienie Użycia Broni (Defensywa)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px' }}>
              <h4 style={{ color: '#cbd5e1', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="#10b981" /> Obrona konieczna</h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: 0 }}>
                Użycie broni jest dopuszczalne wyłącznie wtedy, gdy jest to działanie <strong>proporcjonalne</strong> do bezpośredniego i bezprawnego ataku na życie, zdrowie lub mienie obywatela. Konieczne jest późniejsze udokumentowanie sytuacji oraz zachowanie odpowiedniego terminu na zgłoszenie incydentu.
              </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px' }}>
              <h4 style={{ color: '#cbd5e1', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><HelpCircle size={18} color="#3b82f6" /> Stan wyższej konieczności / Błąd faktu</h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: 0 }}>
                W przypadku wystąpienia stanu wyższej konieczności lub błędu faktu, obywatel ma obowiązek złożyć wniosek do odpowiednich organów ścigania w ciągu 7 dni, dołączając stosowne dowody potwierdzające jego wersję wydarzeń.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sekcja: PROCEDURA WYRABIANIA LICENCJI */}
        <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem', borderTop: '3px solid #10b981' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.4rem', color: '#e2e8f0', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <ShieldCheck size={26} color="#10b981" /> Procedura Wyrabiania Licencji od A do Z
          </h3>
          
          <div style={{ marginLeft: '1rem', borderLeft: '2px dashed rgba(59, 130, 246, 0.4)', paddingLeft: '2.5rem' }}>
            <StepBox number="1" title="Zaświadczenie o niekaralności (DOJ)" cost={20000}>
              <p style={{ margin: 0 }}>
                Wszystko zaczyna się od wyrobienia zaświadczenia o niekaralności w Departamencie Sprawiedliwości (DOJ). Dokument ten jest przepustką do dalszych etapów.
              </p>
            </StepBox>

            <StepBox number="2" title="Badania psychologiczne" cost={20000}>
              <p style={{ margin: 0 }}>
                W kolejnym kroku obywatel musi udać się do specjalisty na pełne badania psychologiczne, za które również będzie musiał uiścić opłatę u wybranego psychologa.
              </p>
            </StepBox>

            <StepBox number="3" title="Badania EMS (sprawnościowe)" cost={20000}>
              <p style={{ margin: 0 }}>
                Następnie należy poddać się badaniom w jednostce EMS. Obejmują one badanie wzroku oraz inne testy kwalifikacyjne. Opłata wpłacana jest na rzecz EMS.
              </p>
            </StepBox>

            <StepBox number="4" title="Egzamin na komendzie LSPD" cost={20000}>
              <p style={{ margin: '0 0 1.5rem 0' }}>
                W ostatnim kroku obywatel zgłasza się na komendę LSPD, aby zdać test z budowy i obsługi broni palnej. Opłata pobierana przez LSPD ma dopisek <em>"Egzamin - pozwolenie na broń"</em>.
              </p>
              
              <ul style={{ padding: 0, margin: '0 0 1.5rem 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                  <Check size={20} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ lineHeight: '1.6' }}><strong>Czynności wstępne:</strong> Kulturalnie przedstaw się obywatelowi i obowiązkowo go przeszukaj. Znalezienie nielegalnych przedmiotów natychmiast przerywa egzamin i skutkuje zatrzymaniem.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                  <Check size={20} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ lineHeight: '1.6' }}><strong>Weryfikacja:</strong> Upewnij się, że ma badania (Psycholog i EMS) oraz sprawdź tablet. Obywatel nie może być poszukiwany ani karany przez <strong>ostatnie 14 dni</strong>.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                  <Check size={20} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ lineHeight: '1.6' }}><strong>Zasady zaliczenia:</strong> Egzamin można zaliczyć popełniając <strong>maks. 2-3 błędy</strong> (pytania na kanale 📇┃pytania). Przy wyniku negatywnym kolejny termin to minimum 3 dni (bez dodatkowej opłaty).</span>
                </li>
              </ul>
              
              <div style={{ background: 'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(0,0,0,0.2))', borderLeft: '4px solid #10b981', padding: '1.2rem', borderRadius: '8px' }}>
                <p style={{ margin: '0 0 0.5rem 0', color: '#10b981', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={20} /> Zakończenie sukcesem (+ $10,000 za licencję)
                </p>
                <p style={{ margin: 0, lineHeight: '1.6' }}>Po pozytywnym wyniku pobierasz dodatkowo 10.000 $ (<em>"Wydanie licencji na broń"</em>). Nadajesz licencję w tablecie i raportujesz na kanale <Badge bg="rgba(255,255,255,0.05)" color="#cbd5e1">📇┃wydane</Badge>.</p>
              </div>
            </StepBox>
          </div>
        </motion.div>

        {/* Sekcja: ZASADY WEWNĘTRZNE */}
        <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem', borderTop: '3px solid #ef4444', background: 'linear-gradient(to bottom right, rgba(239, 68, 68, 0.03), rgba(0,0,0,0.2))' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.4rem', color: '#ef4444', marginBottom: '2rem', borderBottom: '1px solid rgba(239, 68, 68, 0.2)', paddingBottom: '1rem' }}>
            <AlertTriangle size={26} color="#ef4444" /> Odbieranie i Cofanie Uprawnień
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            <div>
              <p style={{ color: '#e2e8f0', fontSize: '1.15rem', fontWeight: 'bold', margin: '0 0 1.5rem 0' }}>Główna zasada konfiskaty</p>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1.5rem', borderRadius: '8px', color: '#fca5a5', lineHeight: '1.7', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <AlertCircle size={28} style={{ flexShrink: 0 }} />
                <div>
                  <strong>Każde popełnione przestępstwo z użyciem broni palnej wiąże się z bezwzględnym odebraniem licencji.</strong> Przy cofnięciu licencji obywatel ma obowiązek natychmiastowego przekazania broni oraz całej amunicji funkcjonariuszom LSPD.
                </div>
              </div>
            </div>
            <div>
              <p style={{ color: '#e2e8f0', fontSize: '1.15rem', fontWeight: 'bold', margin: '0 0 1.5rem 0' }}>Uprawnienia departamentowe</p>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8', lineHeight: '1.6' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                  <Check size={20} color="#10b981" />
                  <span>Wystawianie nowych licencji: tylko <Badge color="#eab308">Sergeant+</Badge>.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                  <Check size={20} color="#10b981" />
                  <span>Odbieranie licencji: Wszyscy funkcjonariusze oprócz <Badge color="#94a3b8">Cadet</Badge>.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                  <FileText size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Każde cofnięcie musi być wpisane na kanale <Badge bg="rgba(255,255,255,0.05)" color="#cbd5e1">📇┃zabrane</Badge>.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Sekcja: BAZA WIEDZY - AKORDEON */}
        <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem', borderTop: '3px solid #3b82f6' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.4rem', color: '#e2e8f0', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <HelpCircle size={26} color="#3b82f6" /> Baza Wiedzy (Pytania Egzaminacyjne)
          </h3>
          
          <AccordionItem title="Czym jest BLOS?" icon={CheckCircle2}>
            <p style={{ marginBottom: '1.5rem' }}>BLOS to akronim od czterech podstawowych zasad bezpieczeństwa, których przestrzeganie jest fundamentalne dla każdego posiadacza broni palnej:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--lspd-blue)', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>B jak Broń</strong>
                Traktuj każdą broń tak, jakby była załadowana, niezależnie od tego, czy ktoś przed chwilą zapewniał cię, że jest ona rozładowana.
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--lspd-blue)', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>L jak Lufa</strong>
                Zawsze kieruj wylot lufy w bezpieczną stronę. Nigdy nie celuj w siebie ani w inne osoby.
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--lspd-blue)', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>O jak Otoczenie</strong>
                Zanim oddasz strzał, upewnij się dokładnie co znajduje się przed twoim celem i za nim.
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--lspd-blue)', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>S jak Spust</strong>
                Zawsze trzymaj palec całkowicie poza językiem spustowym aż do momentu gotowości do strzału.
              </div>
            </div>
          </AccordionItem>

          <AccordionItem title="Kiedy jesteśmy zmuszeni do użycia broni palnej, w jakie części ciała celujemy?" icon={Crosshair}>
            <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
              <p style={{ marginTop: 0 }}>Pamiętaj, że w sytuacji wymagającej użycia ostatecznej siły, celujemy <strong>wyłącznie w klatkę piersiową</strong>, ze względu na to, że jest to największy punkt na ciele (tzw. środek masy).</p>
              <p style={{ marginBottom: 0 }}><strong>Kategorycznie unikamy celowania w nogi.</strong> Przypadkowe postrzelenie w tętnicę udową wiąże się ze śmiertelnym wykrwawieniem w przeciągu zaledwie kilku chwil.</p>
            </div>
          </AccordionItem>

          <AccordionItem title="Z czego składa się łuska i jaką pełni rolę?" icon={HelpCircle}>
            <p style={{ marginBottom: '1.5rem' }}>Łuska to zewnętrzna metalowa "obudowa", której główną rolą jest trzymanie wszystkich elementów naboju w jednej całości. Dzieli się na trzy główne części:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--lspd-blue)', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                <div><strong>Szyjka</strong> – zwężona część, w której ciasno osadzony jest pocisk.</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--lspd-blue)', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                <div><strong>Korpus</strong> – główna komora mieszcząca w sobie ładunek prochowy.</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--lspd-blue)', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                <div><strong>Denko</strong> – dolna, spłaszczona część łuski z wbudowanym gniazdem na spłonkę.</div>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem title="Czym jest spłonka i czym jest proch?" icon={HelpCircle}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #f59e0b' }}>
                <strong style={{ color: '#f59e0b', fontSize: '1.1rem', display: 'block', marginBottom: '0.8rem' }}>Spłonka</strong>
                Niewielki zapłonnik umiejscowiony na samym dnie łuski. W momencie uderzenia przez iglicę broni, spłonka wytwarza błyskawiczną iskrę, która zapala ładunek prochowy.
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', borderTop: '3px solid #10b981' }}>
                <strong style={{ color: '#10b981', fontSize: '1.1rem', display: 'block', marginBottom: '0.8rem' }}>Proch</strong>
                Główny ładunek miotający. Energia rozprężających się gazów powstających w wyniku jego spalania jest na tyle duża, że wypycha pocisk z lufy z ogromną prędkością.
              </div>
            </div>
          </AccordionItem>

          <AccordionItem title="Wymień rodzaje pocisków i ich zastosowanie" icon={HelpCircle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px' }}>
                <strong style={{ color: '#cbd5e1', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>Pociski Pełnopłaszczowe (FMJ)</strong>
                <p style={{ margin: 0 }}>Standardowa amunicja. Stosowana głównie przez wojsko oraz podczas treningów strzeleckich. Charakteryzuje się dużą penetracją i przenikalnością materiałów.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px' }}>
                <strong style={{ color: '#cbd5e1', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>Pociski z pustym wierzchołkiem (HP)</strong>
                <p style={{ margin: 0 }}>Specjalistyczna amunicja używana często do obrony osobistej. Natychmiastowe "grzybkowanie" przy trafieniu oddaje ogromną energię i zapobiega przelatywaniu pocisku na wylot.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px' }}>
                <strong style={{ color: '#cbd5e1', fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>Pociski Półpłaszczowe (SP)</strong>
                <p style={{ margin: 0 }}>Typowa amunicja myśliwska. Przeznaczona do wywoływania rozległych i masywnych uszkodzeń tkanek wewnątrz celu, dysponująca potężną siłą rażenia.</p>
              </div>
            </div>
          </AccordionItem>

        </motion.div>

      </motion.div>
    </motion.div>
  );
}

export default WeaponLicense;
