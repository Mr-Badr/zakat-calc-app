import React from 'react';

// Placeholder subcomponents (to be implemented)
const Evidences = ({ evidences }) => (
  <section className="mb-6">
    <h2 className="text-xl font-semibold mb-2">Evidences</h2>
    <ul className="list-disc list-inside space-y-1">
      {evidences.map((ev, i) => (
        <li key={i}><span className="font-bold">[{ev.type}]</span> <span>{ev.text}</span> <span className="text-gray-500">({ev.reference})</span></li>
      ))}
    </ul>
  </section>
);
const Conditions = ({ conditions }) => (
  <section className="mb-6">
    <h2 className="text-xl font-semibold mb-2">Who is required to pay?</h2>
    <ul className="list-disc list-inside space-y-1">
      {conditions.map((cond, i) => <li key={i}>{cond}</li>)}
    </ul>
  </section>
);
const Calculation = ({ calculation, example }) => (
  <section className="mb-6">
    <h2 className="text-xl font-semibold mb-2">How to Calculate?</h2>
    <p className="mb-2 whitespace-pre-line">{calculation}</p>
    {example && (
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-2">
        <span className="block font-semibold mb-1">Example:</span>
        <span>{example}</span>
      </div>
    )}
  </section>
);
const MadhhabNotes = ({ notes }) => (
  <section className="mb-6">
    <h2 className="text-xl font-semibold mb-2">Madhhab Notes</h2>
    <ul className="list-disc list-inside space-y-1">
      {notes.map((note, i) => <li key={i}>{note}</li>)}
    </ul>
  </section>
);
const FAQ = ({ faq }) => (
  <section className="mb-6">
    <h2 className="text-xl font-semibold mb-2">FAQs</h2>
    <ul className="space-y-4">
      {faq.map((item, i) => (
        <li key={i} className="bg-white rounded-lg border border-blue-100 p-4 shadow-sm">
          <div className="font-semibold text-gray-800 mb-1">{item.q}</div>
          <div className="text-gray-600 text-sm">{item.a}</div>
        </li>
      ))}
    </ul>
  </section>
);
const Sources = ({ sources }) => (
  <section className="mb-6">
    <h2 className="text-xl font-semibold mb-2">Sources</h2>
    <ul className="list-disc list-inside space-y-1">
      {sources.map((src, i) => (
        <li key={i}><a href={src.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{src.name}</a></li>
      ))}
    </ul>
  </section>
);
const CTA = ({ cta, type }) => (
  <div className="my-8 text-center">
    <a
      href={`/?type=${type}`}
      className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg text-lg font-bold shadow hover:bg-amber-600 transition-all duration-200"
    >
      {cta || 'Calculate Now'}
    </a>
  </div>
);

const GoldZakatPage = ({ content, type }) => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Hero/Intro */}
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">🥇 {content.name || 'Gold & Silver Zakat'}</h1>
      <p className="mb-6 text-lg text-gray-700">{content.intro}</p>
      <Evidences evidences={content.evidences || []} />
      <Conditions conditions={content.conditions || []} />
      <Calculation calculation={content.calculation} example={content.example} />
      <MadhhabNotes notes={content.madhhabNotes || []} />
      <FAQ faq={content.faq || []} />
      <Sources sources={content.sources || []} />
      <CTA cta={content.cta} type={type} />
    </div>
  );
};

export default GoldZakatPage; 