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
          <p style={{ fontSize: '1.1rem', color: '#64748b', marginTop: '0.5rem' }}>Oficjalne zasady i przepisy Departamentu Sprawiedliwości oraz LSPD</p>
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
              <h4 style={{ color: '#cbd5e1', marginBottom: '0.75rem' }}>Podstawowe Informacje i Uprawnienia</h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: '0 0 1rem 0' }}>
                Licencja wydawana jest przez <strong>Departament Sprawiedliwości (DOJ)</strong> po złożeniu stosownego wniosku i spełnieniu rygorystycznych wymogów, takich jak niekaralność oraz stabilność psychiczna (brak hospitalizacji psychiatrycznej w ciągu ostatnich 6 miesięcy). Uprawnia ona do zakupu, posiadania i noszenia zarejestrowanej broni palnej oraz dedykowanej do niej amunicji.
              </p>
              <ul style={{ paddingLeft: '1.2rem', color: '#94a3b8', lineHeight: '1.8' }}>
                <li><strong>Limit broni:</strong> Standardowo dozwolone jest posiadanie maksymalnie <Badge color="#f59e0b">2 sztuk</Badge>. W wyjątkowych sytuacjach DOJ może zezwolić na większą ilość.</li>
                <li><strong>Zgłoszenie utraty:</strong> Właściciel ma obowiązek zgłosić zagubienie lub kradzież broni do LSPD w ciągu <Badge color="#ef4444">1 godziny</Badge> od stwierdzenia utraty.</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#cbd5e1', marginBottom: '0.75rem' }}>Przestępstwa i Noszenie Broni</h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: '0 0 1rem 0' }}>
                Nielegalne posiadanie, w tym posiadanie broni i amunicji bez licencji, przekroczenie limitu sztuk, posiadanie amunicji do innej broni niż zarejestrowana, broń ze zdartymi numerami czy broń wojskowa bez pozwolenia kończy się konfiskatą, grzywną oraz więzieniem. Handel bronią bez uprawnień traktowany jest jako <strong>przestępstwo zbrojne</strong> zagrożone bardzo surowymi karami.
              </p>
              <ul style={{ paddingLeft: '1.2rem', color: '#94a3b8', lineHeight: '1.8' }}>
                <li><strong>Sposób noszenia:</strong> Broń palna musi być zawsze przenoszona w ukryciu. Jej jawne noszenie jest surowo karane. Ponadto demonstracyjne noszenie broni białej (traktowane jako prowokacja) jest zabronione.</li>
                <li><strong>Użycie broni:</strong> Przez "użycie" rozumiemy <strong>każde wzięcie broni do ręki</strong>. Nieuprawnione manipulowanie bronią lub stwarzanie nią zagrożenia jest karane.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.3rem', color: '#e2e8f0', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <AlertTriangle size={24} color="#f59e0b" /> Uzasadnienie Użycia Broni (Defensywa)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h4 style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>Obrona konieczna</h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: 0 }}>
                Użycie broni jest dopuszczalne wyłącznie wtedy, gdy jest to działanie <strong>proporcjonalne</strong> do bezpośredniego i bezprawnego ataku na życie, zdrowie lub mienie obywatela. Konieczne jest późniejsze udokumentowanie sytuacji oraz zachowanie odpowiedniego terminu na zgłoszenie incydentu.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>Stan wyższej konieczności / Błąd faktu</h4>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: 0 }}>
                W przypadku wystąpienia stanu wyższej konieczności lub błędu faktu, obywatel ma obowiązek złożyć wniosek do odpowiednich organów ścigania w ciągu 7 dni, dołączając stosowne dowody potwierdzające jego wersję wydarzeń.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sekcja: PROCEDURA WYRABIANIA LICENCJI */}
        <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.3rem', color: '#e2e8f0', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <ShieldCheck size={24} color="#10b981" /> Procedura Wyrabiania Licencji od A do Z
          </h3>
          
          <div style={{ marginLeft: '1rem', borderLeft: '2px dashed rgba(59, 130, 246, 0.3)', paddingLeft: '2rem' }}>
            <StepBox number="1" title="Zaświadczenie o niekaralności (DOJ)" cost={20000}>
              <p style={{ margin: 0 }}>
                Wszystko zaczyna się od wyrobienia zaświadczenia o niekaralności w Departamencie Sprawiedliwości (DOJ). Koszt jego uzyskania to 20.000 $. Dokument ten jest przepustką do dalszych etapów.
              </p>
            </StepBox>

            <StepBox number="2" title="Badania psychologiczne" cost={20000}>
              <p style={{ margin: 0 }}>
                W kolejnym kroku obywatel musi udać się do specjalisty na pełne badania psychologiczne, za które również będzie musiał uiścić opłatę u wybranego psychologa.
              </p>
            </StepBox>

            <StepBox number="3" title="Badania EMS (sprawnościowe)" cost={20000}>
              <p style={{ margin: 0 }}>
                Następnie należy poddać się badaniom w jednostce EMS. Obejmują one badanie wzroku oraz inne, wewnętrznie ustalone przez medyków testy kwalifikacyjne. Opłata wpłacana jest na rzecz EMS.
              </p>
            </StepBox>

            <StepBox number="4" title="Egzamin na komendzie LSPD" cost={20000}>
              <p style={{ margin: '0 0 1rem 0' }}>
                W ostatnim kroku obywatel zgłasza się na komendę LSPD, aby zdać test z budowy i obsługi broni palnej. Opłata za samo przystąpienie do egzaminu jest pobierana przez LSPD z dopiskiem <em>"Egzamin - pozwolenie na broń"</em>.
              </p>
              <ul style={{ margin: '0 0 1rem 0', paddingLeft: '1.2rem', color: '#94a3b8' }}>
                <li><strong>Czynności wstępne:</strong> Przed wpuszczeniem na teren komendy, musisz się kulturalnie przedstawić obywatelowi i obowiązkowo go przeszukać. Jeśli znajdziesz przy nim jakiekolwiek niebezpieczne lub nielegalne przedmioty, musisz odstąpić od egzaminu i natychmiast zatrzymać taką osobę.</li>
                <li><strong>Weryfikacja:</strong> Upewnij się, że osoba posiada komplet badań (Psycholog i EMS). Sprawdź również jej dane w tablecie – aby przystąpić do egzaminu, nie może być ona karana przez <strong>ostatnie 14 dni</strong> ani być poszukiwana.</li>
                <li><strong>Zasady zaliczenia:</strong> Egzamin można zaliczyć popełniając <strong>maksymalnie 2 do 3 błędów</strong> z listy pytań (które znajdziesz na kanale discordowym 📇┃pytania). W przypadku wyniku negatywnego wyznaczasz termin kolejnego podejścia najwcześniej za 3 dni (i nie pobierasz opłaty za wydanie!).</li>
              </ul>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1rem', borderRadius: '6px' }}>
                <p style={{ margin: '0 0 0.5rem 0', color: '#10b981', fontWeight: 'bold' }}>Zakończenie sukcesem (+ $10,000 za licencję):</p>
                <p style={{ margin: 0 }}>Po pozytywnym wyniku egzaminu pobierasz dodatkową opłatę w wysokości 10.000 $ jako koszt wystawienia dokumentu (z dopiskiem <em>"Wydanie licencji na broń"</em>). Nadajesz licencję w tablecie i wpisujesz ten fakt na kanale <Badge bg="rgba(255,255,255,0.05)" color="#cbd5e1">📇┃wydane</Badge>.</p>
              </div>
            </StepBox>
          </div>
        </motion.div>

        {/* Sekcja: ZASADY WEWNĘTRZNE */}
        <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.3rem', color: '#ef4444', marginBottom: '1.5rem', borderBottom: '1px solid rgba(239, 68, 68, 0.2)', paddingBottom: '1rem' }}>
            <AlertTriangle size={24} color="#ef4444" /> Odbieranie i Cofanie Uprawnień
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: '1 1 300px' }}>
              <p style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>Główna zasada konfiskaty</p>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', color: '#fca5a5', lineHeight: '1.7' }}>
                <strong>Każde popełnione przestępstwo z użyciem broni palnej wiąże się z bezwzględnym odebraniem licencji na jej posiadanie.</strong> Przy cofnięciu licencji obywatel ma obowiązek natychmiastowego przekazania broni oraz całej amunicji funkcjonariuszom LSPD.
              </div>
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <p style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>Uprawnienia wewnątrz departamentu</p>
              <ul style={{ paddingLeft: '1.2rem', color: '#94a3b8', lineHeight: '1.8', margin: 0 }}>
                <li>Do wystawiania nowych licencji uprawnieni są wyłącznie funkcjonariusze posiadający rangę <Badge color="#eab308">Sergeant</Badge> lub wyższą.</li>
                <li>Prawa do konfiskowania uprawnień przysługują wszystkim funkcjonariuszom w departamencie, z wyłączeniem stopnia <Badge color="#94a3b8">Cadet</Badge>.</li>
                <li>Każde cofnięcie uprawnień musi zostać starannie udokumentowane i wpisane według obowiązującego wzoru na kanale <Badge bg="rgba(255,255,255,0.05)" color="#cbd5e1">📇┃zabrane</Badge>.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Sekcja: BAZA WIEDZY - AKORDEON */}
        <motion.div variants={itemVariant} className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.3rem', color: '#e2e8f0', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <HelpCircle size={24} color="#3b82f6" /> Baza Wiedzy (Pytania Egzaminacyjne)
          </h3>
          
          <AccordionItem title="Czym jest BLOS?" icon={CheckCircle2}>
            <p style={{ marginBottom: '1rem' }}>BLOS to akronim od czterech podstawowych zasad bezpieczeństwa, których przestrzeganie jest fundamentalne dla każdego posiadacza broni palnej:</p>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>B jak Broń:</strong> Traktuj każdą broń tak, jakby była załadowana, absolutnie niezależnie od tego, czy ktoś przed chwilą zapewniał cię, że jest ona rozładowana.</li>
              <li><strong>L jak Lufa:</strong> Zawsze kieruj wylot lufy w bezpieczną stronę – w stronę wyznaczonego celu, kulochwytu, prosto w ziemię (pod kątem ok. 45 stopni) lub w powietrze. Nigdy nie celuj w siebie ani w inne osoby.</li>
              <li><strong>O jak Otoczenie:</strong> Zanim zdecydujesz się na oddanie strzału, upewnij się dokładnie co znajduje się przed twoim celem i tuż za nim. Pomoże to uniknąć śmiertelnego zagrożenia dla osób postronnych.</li>
              <li><strong>S jak Spust:</strong> Zawsze trzymaj palec całkowicie poza językiem spustowym. Możesz położyć go na spuście dopiero wtedy, gdy wycelujesz i będziesz gotów oddać strzał.</li>
            </ul>
          </AccordionItem>

          <AccordionItem title="Kiedy jesteśmy zmuszeni do użycia broni palnej, w jakie części ciała celujemy?" icon={Crosshair}>
            <p>Pamiętaj, że w sytuacji wymagającej użycia ostatecznej siły, celujemy <strong>wyłącznie w klatkę piersiową</strong>, ze względu na to, że jest to największy punkt na ciele (tzw. środek masy).</p>
            <p><strong>Kategorycznie unikamy celowania w nogi.</strong> Jest to zbyt duże ryzyko ze względu na obecność tętnicy udowej – przypadkowe postrzelenie w tętnicę wiąże się ze śmiertelnym wykrwawieniem w przeciągu zaledwie kilku chwil.</p>
          </AccordionItem>

          <AccordionItem title="Z czego składa się łuska i jaką pełni rolę?" icon={HelpCircle}>
            <p>Łuska to zewnętrzna metalowa "obudowa" (najczęściej wykonana z mosiądzu, rzadziej ze stali lub aluminium), której główną rolą jest trzymanie wszystkich elementów naboju w jednej całości.</p>
            <p style={{ marginTop: '0.5rem' }}>Konstrukcja łuski dzieli się na trzy główne części:</p>
            <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
              <li><strong>Szyjka</strong> – zwężona część, w której ciasno osadzony jest pocisk.</li>
              <li><strong>Korpus</strong> – główna komora mieszcząca w sobie ładunek prochowy.</li>
              <li><strong>Denko</strong> – dolna, spłaszczona część łuski z wbudowanym gniazdem na spłonkę i specjalnym wyżłobieniem ułatwiającym pracę wyciągacza łusek.</li>
            </ol>
          </AccordionItem>

          <AccordionItem title="Czym jest spłonka i czym jest proch?" icon={HelpCircle}>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem', margin: 0 }}>
              <li><strong>Spłonka:</strong> Jest to niewielki zapłonnik umiejscowiony na samym dnie łuski. W momencie uderzenia przez iglicę broni, spłonka wytwarza błyskawiczną iskrę, która zapala ładunek prochowy.</li>
              <li><strong>Proch:</strong> To główny ładunek miotający (w nowoczesnej broni jest to najczęściej proch bezdymny z nitrocelulozy). Energia rozprężających się gazów powstających w wyniku jego spalania jest na tyle duża, że wypycha pocisk z lufy. Rodzaj prochu i jego ilość decydują o ostatecznym ciśnieniu i prędkości wyrzutu.</li>
            </ul>
          </AccordionItem>

          <AccordionItem title="Wymień rodzaje pocisków i ich zastosowanie" icon={HelpCircle}>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0 }}>
              <li><strong>Pociski Pełnopłaszczowe (FMJ):</strong> Standardowa amunicja. Stosowana głównie przez wojsko oraz podczas treningów strzeleckich. Charakteryzuje się dużą penetracją i przenikalnością materiałów.</li>
              <li><strong>Pociski z pustym wierzchołkiem (HP):</strong> Specjalistyczna amunicja używana często do obrony osobistej. Konstrukcja pozwala pociskowi na natychmiastowe "grzybkowanie" przy trafieniu w ciało, oddając ogromną energię (bardzo wysoka siła obalająca) i zapobiegając przelatywaniu pocisku na wylot.</li>
              <li><strong>Pociski Półpłaszczowe (SP):</strong> Typowa amunicja myśliwska. Przeznaczona do wywoływania rozległych i masywnych uszkodzeń tkanek wewnątrz celu, dysponująca potężną siłą rażenia.</li>
            </ul>
          </AccordionItem>

        </motion.div>

      </motion.div>
    </motion.div>
  );
}

export default WeaponLicense;
