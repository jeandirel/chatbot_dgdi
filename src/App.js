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

function EmbeddedAssistant({ context, onBack }) {
  return <main className="assistant-page">
    <div className="assistant-heading">
      <div>
        <span className="sovereign-badge">◈ SERVICE NUMÉRIQUE e-DGDI</span>
        <h1>Assistant e-DGDI</h1>
        {context && <p>Votre demande : <strong>{context}</strong></p>}
      </div>
      <button className="assistant-back" onClick={onBack}>← Retour à l’accueil</button>
    </div>
    <div className="assistant-frame-shell">
      <iframe
        title="Assistant conversationnel e-DGDI"
        src="https://www.chatbase.co/chatbot-iframe/swl1m-D24lc9j8MQopU09"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="microphone"
      />
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
