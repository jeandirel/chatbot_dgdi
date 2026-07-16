import { useEffect, useRef, useState } from 'react';

const suggestions = ['État de ma demande de visa', 'Renouvellement passeport'];
const quickActions = [
  { icon: '▤', tone: 'green', title: 'Renouveler mon passeport', text: 'Lancez la procédure de renouvellement de votre titre de voyage gabonais.', action: 'Commencer', prompt: 'Comment renouveler mon passeport ?' },
  { icon: '▣', tone: 'blue', title: 'Demander une CNIE', text: "Demande de Carte Nationale d'Identité Électronique pour les citoyens.", action: 'Démarrer', prompt: 'Comment demander une CNIE ?' },
  { icon: '◎', tone: 'gold', title: 'Suivre ma demande', text: "Consultez l'avancement de vos dossiers administratifs en temps réel.", action: 'Consulter', prompt: 'Je souhaite suivre ma demande.' },
  { icon: '✈', tone: 'dark', title: 'Visa & Immigration', text: "Informations sur l'E-visa et les conditions d'entrée au Gabon.", action: 'Explorer', prompt: "Quelles sont les conditions d'entrée au Gabon ?" },
];

function Mark({ small = false }) {
  return <div className={`mark ${small ? 'small' : ''}`} aria-label="DGDI Gabon"><span>DGDI</span><i /></div>;
}

function OfficialLogo() {
  return <img className="official-logo" src="/logo-edgdi.svg" alt="e-DGDI — République Gabonaise" />;
}

function Header({ page, onHome, onChat }) {
  return <header className="topbar">
    <button className="brand-button" onClick={onHome} aria-label="Accueil e-DGDI"><OfficialLogo /></button>
    <nav aria-label="Navigation principale">
      <button>Services</button><button>Suivi</button>
      <button className={page === 'chat' ? 'active' : ''} onClick={onChat}>AI Chat</button>
      <button>Support</button>
    </nav>
    <div className="header-tools"><button aria-label="Langue">◎</button><button aria-label="Notifications">♧</button><div className="avatar">JN</div></div>
  </header>;
}

function Home({ startChat }) {
  const [value, setValue] = useState('');
  const submit = (event) => { event?.preventDefault(); if (value.trim()) startChat(value.trim()); };
  return <main className="home">
    <section className="hero">
      <p className="eyebrow">ASSISTANT NUMÉRIQUE OFFICIEL</p>
      <h1>Bonjour, comment puis-je vous <em>aider</em><br /> aujourd’hui&nbsp;?</h1>
      <p className="subtitle">Obtenez instantanément des réponses concernant vos documents administratifs, vos demandes de passeport, votre CNIE, votre carte de séjour, vos visas ou le suivi de votre dossier.</p>
      <form className="hero-search" onSubmit={submit}>
        <span className="bot-icon">♙</span>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Posez votre question ici…" aria-label="Votre question" />
        <button type="submit" aria-label="Envoyer">➤</button>
      </form>
      <div className="suggestions"><b>Suggestions :</b>{suggestions.map((item) => <button key={item} onClick={() => startChat(item)}>{item}</button>)}</div>
    </section>
    <section className="actions" aria-label="Démarches fréquentes">
      {quickActions.map((item) => <button className="action-card" key={item.title} onClick={() => startChat(item.prompt)}>
        <span className={`action-icon ${item.tone}`}>{item.icon}</span><h2>{item.title}</h2><p>{item.text}</p><strong>{item.action} <span>→</span></strong>
      </button>)}
    </section>
    <footer className="trust"><div><span>♢ Service gouvernemental certifié</span><span>♙ Connexion sécurisée</span><span>◈ Conformité DGDI</span></div><p>© 2026 DGDI République Gabonaise. Tous droits réservés.</p></footer>
  </main>;
}

function StatusCard() {
  return <div className="status-card"><p>Certainement. J’ai localisé votre dossier <strong>#GAB-2024-8892</strong>. Voici son état d’avancement :</p>
    <div className="timeline">
      <div className="done"><i /><span><b>SOUMIS</b><small>12 janvier 2024 • Site de Libreville</small></span></div>
      <div className="done"><i /><span><b>VÉRIFIÉ</b><small>14 janvier 2024 • Validation biométrique</small></span></div>
      <div className="current"><i /><span><b>EN PRODUCTION</b><small>Impression sécurisée en cours…</small></span></div>
      <div><i /><span><b>DISPONIBLE</b><small>Estimation communiquée prochainement</small></span></div>
    </div>
    <p className="status-question">Souhaitez-vous recevoir une notification SMS dès que le document est prêt&nbsp;?</p>
  </div>;
}

function Chat({ initialQuestion, onHome }) {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState(() => initialQuestion ? [{ role: 'user', text: initialQuestion }] : []);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  const send = (event) => {
    event.preventDefault(); const text = value.trim(); if (!text) return;
    setMessages((list) => [...list, { role: 'user', text }, { role: 'assistant', text: 'Votre demande a bien été prise en compte. Cette démonstration sera connectée au moteur RAG et aux services DGDI lors de la phase d’intégration.' }]); setValue('');
  };
  return <main className="chat-layout">
    <aside className="leftbar"><button className="new-chat" onClick={() => setMessages([])}>＋ Nouvelle discussion</button><div className="menu active">♙ <span>AI Chat</span></div><div className="menu">▦ <span>Tableau de bord</span></div><div className="menu">▤ <span>Services</span></div><div className="menu">? <span>Support</span></div><p className="recent-title">RÉCENT</p><button className="recent">Suivi passeport #2024…</button><button className="recent">Documents de résidence</button><button className="recent">Visa touristique</button><div className="left-bottom"><button>⚙ Paramètres</button><button className="logout">↪ Déconnexion</button></div></aside>
    <section className="conversation">
      <div className="messages">
        <div className="message assistant"><Mark small /><div><div className="bubble">Bonjour. Je suis l’assistant IA de la DGDI. Comment puis-je vous aider dans vos démarches administratives aujourd’hui ?<div className="chips">{['Statut de mon passeport','Prendre RDV','Pièces à fournir'].map(x=><button key={x} onClick={()=>setValue(x)}>{x}</button>)}</div></div><small>Assistant DGDI</small></div></div>
        {messages.map((message, index) => <div className={`message ${message.role}`} key={`${message.role}-${index}`}><div className="person">{message.role === 'user' ? '♙' : <Mark small />}</div><div><div className="bubble">{message.text}</div><small>{message.role === 'user' ? 'Vous' : 'Assistant DGDI'}</small></div></div>)}
        {messages.length > 0 && /GAB-2024-8892|passeport/i.test(messages[0].text) && <div className="message assistant"><Mark small /><div><StatusCard /><small>Assistant DGDI</small></div></div>}
        <div ref={bottomRef} />
      </div>
      <form className="chat-input" onSubmit={send}><div className="input-tools">＋ ◉ ♫</div><textarea rows="1" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Posez votre question ici…" aria-label="Votre question" /><button>Envoyer ➤</button></form>
      <p className="disclaimer">L’IA peut faire des erreurs. Vérifiez les informations officielles sur le portail DGDI.</p>
    </section>
    <aside className="rightbar"><h3>ASSISTANCE RAPIDE</h3><button className="help-card"><b>▤ Passeport perdu</b><span>Procédure de déclaration et de renouvellement.</span></button><button className="help-card"><b>▣ Frais de timbre</b><span>Consulter les tarifs officiels en vigueur.</span></button><h3>DOCUMENTS RÉCENTS</h3><button className="document">▤ Quittance_Paiement.pdf</button><button className="document">▧ Photo_ID_Bio.jpg</button><button className="vault">Voir tout le coffre-fort</button><div className="support"><b>● SUPPORT DIRECT</b><p>Un agent humain est disponible pour une aide personnalisée.</p><button>Contacter un agent</button></div></aside>
    <button className="back-home" onClick={onHome}>⌂</button>
  </main>;
}

export default function App() {
  const [page, setPage] = useState('home');
  const [question, setQuestion] = useState('');
  const startChat = (text = '') => { setQuestion(text); setPage('chat'); };
  const goHome = () => { setQuestion(''); setPage('home'); };
  return <div className="app"><Header page={page} onHome={goHome} onChat={() => startChat()} />{page === 'home' ? <Home startChat={startChat} /> : <Chat key={question} initialQuestion={question} onHome={goHome} />}</div>;
}
