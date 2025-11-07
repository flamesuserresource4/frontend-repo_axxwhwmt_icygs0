import React from 'react';

export default function Header({ user, onLogin, onSignup, onProfile, onLogout }) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400" />
        <span className="font-semibold text-lg tracking-tight">StudyBuddy AI</span>
      </div>
      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <button onClick={onLogin} className="px-4 py-2 text-sm rounded-md bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 transition">
              Log in
            </button>
            <button onClick={onSignup} className="px-4 py-2 text-sm rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition">
              Sign up
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <button onClick={onProfile} className="px-4 py-2 text-sm rounded-md bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 transition">
              My profile
            </button>
            <button onClick={onLogout} className="px-3 py-2 text-sm rounded-md text-red-300 hover:text-red-200 hover:bg-white/10 transition">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
