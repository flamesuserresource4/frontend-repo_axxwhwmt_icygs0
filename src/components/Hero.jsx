import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero({ value, setValue, onSubmit }) {
  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-2xl w-full px-6">
        <h1 className="text-center text-4xl md:text-5xl font-semibold tracking-tight text-white drop-shadow">Your AI Study Buddy</h1>
        <p className="mt-3 text-center text-white/90">Explain. Practice. Quiz. Plan your learning with an intelligent assistant.</p>
        <div className="mt-8 bg-white/80 backdrop-blur rounded-xl p-2 shadow-lg">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter your Topic"
              className="flex-1 px-4 py-3 rounded-lg bg-white/70 placeholder:opacity-60 focus:outline-none"
            />
            <button
              onClick={onSubmit}
              className="px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0b17] opacity-80" />
    </section>
  );
}
