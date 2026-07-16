import { useState } from 'react';

const suggestions = ['État de ma demande de visa', 'Renouvellement passeport'];
const quickActions = [
  { icon: '▤', tone: 'green', title: 'Passeport biométrique', text: 'Première demande, renouvellement, perte ou vol de votre titre de voyage gabonais.', action: 'Consulter', prompt: 'Je souhaite connaître la procédure pour un passeport biométrique.' },
  { icon: '▣', tone: 'blue', title: 'CNIE', text: "Toutes les étapes pour demander ou renouveler votre Carte Nationale d'Identité Électronique.", action: 'Découvrir', prompt: 'Comment demander ou renouveler une CNIE ?' },
  { icon: '◇', tone: 'gold', title: 'Carte de séjour', text: 'Conditions, pièces nécessaires et procédure destinée aux résidents étrangers au Gabon.', action: 'Préparer', prompt: 'Quelle est la procédure pour obtenir une carte de séjour ?' },
  { icon: '◎', tone: 'dark', title: 'Suivre ma demande', text: "Consultez l'avancement de votre dossier après vérification sécurisée de votre identité.", action: 'Suivre', prompt: 'Je souhaite suivre ma demande.' },
];

function OfficialLogo() {
  return <img className="official-logo" src="/logo-edgdi.svg" alt="e-DGDI — République Gabonaise" />;
}

function Header({ page, onHome, onChat }) {
  return <header className="topbar">
    <div className="gov-strip"><span>◈ Site officiel de la République Gabonaise</span><span>Service public numérique sécurisé</span></div>
    <div className="main-nav">
      <button className="brand-button" onClick={onHome} aria-label="Accueil e-DGDI"><OfficialLogo /></button>
      <nav aria-label="Navigation principale">
        <button>Services</button><button>Suivi</button>
        <button className={page === 'chat' ? 'active' : ''} onClick={onChat}>Assistant e-DGDI</button>
        <button>Support</button>
      </nav>
      <div className="header-tools"><button aria-label="Langue">◎ FR</button><button aria-label="Notifications">♧</button><div className="avatar">JN</div></div>
    </div>
  </header>;
}

function Home({ startChat }) {
  const [value, setValue] = useState('');
  const submit = (event) => { event?.preventDefault(); if (value.trim()) startChat(value.trim()); };
  return <main className="home">
    <section className="hero">
      <div className="sovereign-badge">◈ ASSISTANT NUMÉRIQUE e-DGDI</div>
      <h1>Bonjour, comment puis-je vous <em>aider</em><br /> aujourd’hui&nbsp;?</h1>
      <p className="subtitle">Obtenez instantanément des réponses concernant vos documents administratifs, vos demandes de passeport, votre CNIE, votre carte de séjour, vos visas ou le suivi de votre dossier.</p>
      <form className="hero-search" onSubmit={submit}>
        <span className="bot-icon">♙</span>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Posez votre question ici…" aria-label="Votre question" />
        <button type="submit" aria-label="Envoyer">➤</button>
      </form>
      <div className="suggestions"><b>Suggestions :</b>{suggestions.map((item) => <button key={item} onClick={() => startChat(item)}>{item}</button>)}</div>
      <div className="gabon-ribbon" aria-hidden="true"><i /><i /><i /></div>
    </section>
    <section className="actions" aria-label="Démarches fréquentes">
      {quickActions.map((item) => <button className="action-card" key={item.title} onClick={() => startChat(item.prompt)}>
        <span className={`action-icon ${item.tone}`}>{item.icon}</span><h2>{item.title}</h2><p>{item.text}</p><strong>{item.action} <span>→</span></strong>
      </button>)}
    </section>
    <footer className="trust"><div><span>♢ Service public gabonais</span><span>♙ Connexion chiffrée</span><span>◈ Données protégées</span></div><p>© 2026 DGDI — République Gabonaise</p></footer>
  </main>;
}

const demoAnswers = {
  passeport: "Pour une demande de passeport biométrique, préparez une copie légalisée de l’acte de naissance, une pièce d’identité, des photos conformes et le justificatif de paiement. Présentez-vous ensuite au service DGDI compétent pour l’enrôlement biométrique. Les pièces et tarifs définitifs devront être confirmés par la DGDI.",
  cnie: "Pour demander ou renouveler une CNIE, vous devrez constituer votre dossier d’état civil, fournir votre ancienne pièce en cas de renouvellement, puis effectuer l’enrôlement biométrique auprès du service habilité. Les exigences exactes seront confirmées par la DGDI.",
  séjour: "La carte de séjour concerne les ressortissants étrangers autorisés à résider au Gabon. Le dossier comprend notamment le passeport, le visa ou titre d’entrée, les justificatifs de résidence et d’activité, ainsi que les pièces demandées selon votre situation.",
  suivi: "Pour suivre votre demande, munissez-vous du numéro de dossier figurant sur votre récépissé. Dans la version finale, la vérification sécurisée permettra d’afficher les étapes : dossier soumis, vérifié, en production puis disponible.",
  visa: "La procédure de visa dépend de votre nationalité, du motif et de la durée du séjour. Préparez au minimum un passeport valide, une photo, un justificatif de voyage et les documents liés au motif du séjour."
};

function getDemoAnswer(question) {
  const text = question.toLowerCase();
  if (text.includes('passeport')) return demoAnswers.passeport;
  if (text.includes('cnie') || text.includes('identité')) return demoAnswers.cnie;
  if (text.includes('séjour')) return demoAnswers.séjour;
  if (text.includes('suiv') || text.includes('état') || text.includes('dossier')) return demoAnswers.suivi;
  if (text.includes('visa')) return demoAnswers.visa;
  return "Votre demande a bien été reçue. Pour ce démonstrateur, je peux vous accompagner sur le passeport biométrique, la CNIE, la carte de séjour, les visas et le suivi d’un dossier.";
}

function EmbeddedAssistant({ context, onBack }) {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState(() => context ? [
    { role: 'user', text: context },
    { role: 'assistant', text: getDemoAnswer(context) }
  ] : [{ role: 'assistant', text: "Bonjour, je suis l’Assistant e-DGDI. Comment puis-je vous accompagner dans vos démarches aujourd’hui ?" }]);

  const send = (event) => {
    event.preventDefault();
    const question = value.trim();
    if (!question) return;
    setMessages((current) => [...current, { role: 'user', text: question }, { role: 'assistant', text: getDemoAnswer(question) }]);
    setValue('');
  };

  return <main className="assistant-page">
    <div className="assistant-heading">
      <div>
        <span className="sovereign-badge">◈ SERVICE NUMÉRIQUE e-DGDI</span>
        <h1>Assistant e-DGDI</h1>
        {context && <p>Votre demande : <strong>{context}</strong></p>}
      </div>
      <button className="assistant-back" onClick={onBack}>← Retour à l’accueil</button>
    </div>
    <div className="assistant-frame-shell demo-chat">
      <div className="demo-chat-header"><OfficialLogo /><div><strong>Assistant e-DGDI</strong><span><i /> Service disponible</span></div></div>
      <div className="demo-messages">
        {messages.map((message, index) => <div className={`demo-message ${message.role}`} key={index}>
          {message.role === 'assistant' && <span className="demo-avatar">e</span>}
          <div><p>{message.text}</p><small>{message.role === 'assistant' ? 'Assistant e-DGDI' : 'Vous'}</small></div>
        </div>)}
      </div>
      <div className="demo-suggestions">{['Passeport biométrique', 'Demander une CNIE', 'Carte de séjour', 'Suivre mon dossier'].map((item) => <button key={item} onClick={() => { setMessages((current) => [...current, { role: 'user', text: item }, { role: 'assistant', text: getDemoAnswer(item) }]); }}>{item}</button>)}</div>
      <form className="demo-input" onSubmit={send}><input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Posez votre question sur une démarche DGDI…" aria-label="Votre message" /><button type="submit">Envoyer ➤</button></form>
      <p className="demo-footer">Assistant e-DGDI • Direction Générale de la Documentation et de l’Immigration</p>
    </div>
  </main>;
}

export default function App() {
  const [page, setPage] = useState('home');
  const [context, setContext] = useState('');
  const openAssistant = (question = '') => { setContext(question); setPage('chat'); };
  const goHome = () => { setPage('home'); setContext(''); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return <div className="app">
    <Header page={page} onHome={goHome} onChat={() => openAssistant()} />
    {page === 'home' ? <Home startChat={openAssistant} /> : <EmbeddedAssistant context={context} onBack={goHome} />}
  </div>;
}
