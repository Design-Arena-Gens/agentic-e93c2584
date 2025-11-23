const faqs = [
  {
    question: "Can customers pay with Moroccan cards?",
    answer:
      "Yes. Integrate with CMI, Payzone, or PayPal for CB/credit cards. Shopify handles FX & settlement to your Moroccan bank."
  },
  {
    question: "Do I get the design files?",
    answer:
      "Every order bundles the mockup PNG, the layered print zone (PDF), and customer notes. They are emailed + stored in Shopify."
  },
  {
    question: "Can I limit colors or placements?",
    answer:
      "You control available garments, colors, print sizes, and lock placements. Offer front-only DTG or add sleeves, back prints, etc."
  },
  {
    question: "How do deliveries work?",
    answer:
      "Generate a pickup label with Amana or Arame right from the order dashboard. Tracking is sent automatically in Arabic + French."
  }
];

export const FAQ = () => {
  return (
    <section className="space-y-8 rounded-3xl border border-brand-dark/10 bg-brand-dark text-brand-light p-8 shadow-xl shadow-brand-dark/20">
      <header className="space-y-2 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-primary/80">FAQ</span>
        <h2 className="text-3xl font-semibold text-white">Operational questions</h2>
        <p className="mx-auto max-w-2xl text-sm text-white/70">
          Built for Moroccan makers: tax-compliant checkout, Arabic/French notifications, and local courier integrations.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {faqs.map((faq) => (
          <article key={faq.question} className="space-y-2 rounded-3xl bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
            <p className="text-sm text-white/70">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
