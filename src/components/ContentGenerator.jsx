import React, { useMemo, useState } from 'react';

function buildOutline(topic) {
  const base = topic || 'Sample Topic';
  const subs = [
    { key: 'intro', title: `${base} Basics` },
    { key: 'practice', title: `${base} Practice` },
    { key: 'quiz', title: `${base} Quiz` },
  ];
  return subs;
}

const sampleQuestions = (topic) => ([
  { q: `What is ${topic}?`, options: ['Definition A', 'Definition B', 'Definition C', 'Definition D'], answer: 1 },
  { q: `Which is true about ${topic}?`, options: ['X', 'Y', 'Z', 'W'], answer: 0 },
  { q: `Where is ${topic} used?`, options: ['Field 1', 'Field 2', 'Field 3', 'Field 4'], answer: 2 },
]);

export default function ContentGenerator({ topic, onAddHistory }) {
  const outline = useMemo(() => buildOutline(topic), [topic]);
  const [active, setActive] = useState(outline[0].key);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = useMemo(() => sampleQuestions(topic), [topic]);

  const explanationPages = [
    {
      title: `${topic} Overview`,
      body: `${topic} is explained here in simple terms with analogies and step-by-step reasoning.`,
    },
    {
      title: `${topic} Deeper Concepts`,
      body: `We now explore intermediate ideas around ${topic} with small mental models.`,
    },
  ];

  const practicePages = [
    { title: 'Examples', body: `Worked examples related to ${topic}.` },
    { title: 'Questionaries', body: `Try answering these small questions to reinforce ${topic}.` },
  ];

  const isQuiz = active === 'quiz';
  const totalPages = isQuiz ? 1 : (active === 'intro' ? explanationPages.length : practicePages.length);

  function navNext() {
    if (page < totalPages - 1) setPage((p) => p + 1);
  }
  function navPrev() {
    if (page > 0) setPage((p) => p - 1);
  }

  function submitQuiz() {
    let correct = 0;
    questions.forEach((q, i) => {
      if (selected[i] === q.answer) correct += 1;
    });
    const wrong = questions.length - correct;
    setSubmitted(true);
    onAddHistory?.({ topic, attempted: questions.length, correct, wrong });
  }

  return (
    <div className="max-w-5xl mx-auto w-full px-6 py-8">
      <div className="flex flex-wrap gap-2 mb-6">
        {outline.map((s) => (
          <button
            key={s.key}
            onClick={() => { setActive(s.key); setPage(0); setSubmitted(false); }}
            className={`px-4 py-2 rounded-lg border transition ${active === s.key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-200 hover:border-indigo-300'}`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow min-h-[300px]">
        {!isQuiz && active === 'intro' && (
          <div>
            <h3 className="text-2xl font-semibold mb-2">{explanationPages[page].title}</h3>
            <p className="text-gray-700">{explanationPages[page].body}</p>
          </div>
        )}

        {!isQuiz && active === 'practice' && (
          <div>
            <h3 className="text-2xl font-semibold mb-2">{practicePages[page].title}</h3>
            <p className="text-gray-700">{practicePages[page].body}</p>
          </div>
        )}

        {isQuiz && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick Quiz on {topic}</h3>
            <div className="space-y-4">
              {questions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-lg border">
                  <div className="font-medium mb-2">{idx + 1}. {q.q}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((opt, oidx) => (
                      <label key={oidx} className={`flex items-center gap-2 p-2 rounded border cursor-pointer ${selected[idx] === oidx ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}>
                        <input
                          type="radio"
                          name={`q-${idx}`}
                          checked={selected[idx] === oidx}
                          onChange={() => setSelected((s) => ({ ...s, [idx]: oidx }))}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={submitQuiz} className="mt-4 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500">Submit</button>
            {submitted && (
              <div className="mt-3 text-green-700 font-medium">Results saved to profile. Great job!</div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      {!isQuiz && (
        <div className="mt-4 flex items-center justify-between">
          <button onClick={navPrev} disabled={page === 0} className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50">Previous</button>
          <div className="text-sm text-gray-500">Page {page + 1} / {totalPages}</div>
          <button onClick={navNext} disabled={page === totalPages - 1} className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
}
