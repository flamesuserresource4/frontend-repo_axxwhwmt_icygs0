import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { LoginForm, SignupForm } from './components/AuthForms';
import ProfileDashboard from './components/ProfileDashboard';
import ContentGenerator from './components/ContentGenerator';

function App() {
  const [route, setRoute] = useState('landing'); // landing | login | signup | home | profile | generate
  const [topic, setTopic] = useState('');
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  const stats = useMemo(() => {
    const correct = history.reduce((sum, h) => sum + (h.correct || 0), 0);
    const wrong = history.reduce((sum, h) => sum + (h.wrong || 0), 0);
    return { correct, wrong };
  }, [history]);

  function handleLoginSubmit(values) {
    const u = { name: 'Learner', email: values.emailOrPhone?.includes('@') ? values.emailOrPhone : 'user@example.com', phone: values.emailOrPhone?.includes('@') ? '' : values.emailOrPhone };
    setUser(u);
    setRoute('home');
  }

  function handleSignupSubmit(values) {
    const u = { name: 'Learner', email: values.email, phone: values.phone };
    setUser(u);
    setRoute('home');
  }

  function addHistory(entry) {
    setHistory((h) => {
      const link = '#';
      return [{ ...entry, link }, ...h];
    });
  }

  return (
    <div className="min-h-screen bg-[#0b0b17] text-white flex flex-col">
      <Header
        user={user}
        onLogin={() => setRoute('login')}
        onSignup={() => setRoute('signup')}
        onProfile={() => setRoute('profile')}
        onLogout={() => { setUser(null); setRoute('landing'); }}
      />

      {route === 'landing' && (
        <Hero value={topic} setValue={setTopic} onSubmit={() => setRoute(user ? 'generate' : 'login')} />
      )}

      {route === 'login' && (
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <LoginForm onSubmit={handleLoginSubmit} />
        </div>
      )}

      {route === 'signup' && (
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <SignupForm onSubmit={handleSignupSubmit} />
        </div>
      )}

      {route === 'home' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="max-w-2xl w-full px-6">
            <div className="bg-white/80 backdrop-blur rounded-xl p-2 shadow-lg">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your Topic"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/70 text-gray-900 placeholder:opacity-60 focus:outline-none"
                />
                <button
                  onClick={() => setRoute('generate')}
                  className="px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {route === 'generate' && (
        <ContentGenerator topic={topic || 'Your Topic'} onAddHistory={addHistory} />
      )}

      {route === 'profile' && (
        <ProfileDashboard user={user} stats={stats} history={history} />
      )}

      <footer className="mt-auto py-6 text-center text-white/50 text-sm">Built with ❤️ StudyBuddy AI</footer>
    </div>
  );
}

export default App;
