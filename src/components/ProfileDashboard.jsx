import React from 'react';

function Donut({ correct = 0, wrong = 0 }) {
  const total = Math.max(correct + wrong, 1);
  const size = 160;
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const correctFrac = correct / total;
  const wrongFrac = wrong / total;

  const correctLen = circumference * correctFrac;
  const wrongLen = circumference * wrongFrac;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#eef2ff"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#34d399"
          strokeWidth={stroke}
          strokeDasharray={`${correctLen} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f87171"
          strokeWidth={stroke}
          strokeDasharray={`${wrongLen} ${circumference}`}
          strokeDashoffset={-correctLen}
          strokeLinecap="round"
        />
      </g>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-gray-800" style={{ fontWeight: 600 }}>
        {correct}/{total}
      </text>
    </svg>
  );
}

export default function ProfileDashboard({ user, stats, history }) {
  const total = (stats.correct || 0) + (stats.wrong || 0);

  return (
    <div className="max-w-5xl mx-auto w-full px-6 py-8">
      <h2 className="text-3xl font-semibold mb-6">Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white/80 backdrop-blur rounded-xl p-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-500">Name</div>
              <div className="text-lg font-medium text-gray-900">{user?.name || 'Learner'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="text-lg font-medium text-gray-900">{user?.email || '-'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Mobile</div>
              <div className="text-lg font-medium text-gray-900">{user?.phone || '-'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Attempted</div>
              <div className="text-lg font-medium text-gray-900">{total}</div>
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow flex flex-col items-center justify-center">
          <h3 className="font-medium mb-3 text-gray-900">Quiz performance</h3>
          <Donut correct={stats.correct || 0} wrong={stats.wrong || 0} />
          <div className="mt-3 text-sm text-gray-600 grid grid-cols-2 gap-3 w-full">
            <div className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-emerald-400" /> Correct</div>
            <div className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-rose-400" /> Wrong</div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white/80 backdrop-blur rounded-xl p-6 shadow">
        <h3 className="font-medium mb-3 text-gray-900">History</h3>
        <ul className="divide-y divide-gray-100">
          {history.length === 0 && (
            <li className="py-3 text-gray-500">No attempts yet.</li>
          )}
          {history.map((h, idx) => (
            <li key={idx} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{h.topic}</div>
                <div className="text-sm text-gray-500">Questions attempted: {h.attempted}</div>
              </div>
              <a href={h.link} className="text-indigo-600 hover:text-indigo-500">Open</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
