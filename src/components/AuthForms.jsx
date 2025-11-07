import React, { useState } from 'react';

export function LoginForm({ onSubmit }) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="max-w-md w-full mx-auto bg-white/80 backdrop-blur rounded-xl p-6 shadow">
      <h2 className="text-2xl font-semibold mb-4">Log in</h2>
      <div className="space-y-3">
        <input
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          placeholder="Email or Mobile Number"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none"
        />
        <button
          onClick={() => onSubmit({ emailOrPhone, password })}
          className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export function SignupForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="max-w-md w-full mx-auto bg-white/80 backdrop-blur rounded-xl p-6 shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
      <div className="space-y-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Mobile Number"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none"
        />
        <button
          onClick={() => onSubmit({ email, phone, password })}
          className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
        >
          Create account
        </button>
      </div>
    </div>
  );
}
