const steps = [
  {
    id: "01",
    title: "Customer designs",
    description: "They pick a garment, customize with logos or Arabic typography, and approve the live mockup."
  },
  {
    id: "02",
    title: "Secure checkout",
    description: "They pay online or request an invoice. You receive the order file + print-ready assets instantly."
  },
  {
    id: "03",
    title: "Local production",
    description: "Print or embroider in Casablanca using your DTG / DTF / embroidery workflow."
  },
  {
    id: "04",
    title: "Delivery",
    description: "Ship nationwide with Amana or Arame in 24-72h. Tracking is emailed automatically."
  }
];

export const Workflow = () => {
  return (
    <section className="space-y-8 rounded-3xl border border-brand-dark/10 bg-white/70 p-8 shadow-lg shadow-brand-dark/5">
      <header className="space-y-2 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Workflow</span>
        <h2 className="text-3xl font-semibold text-brand-dark">Amazon KDP style for Moroccan apparel</h2>
        <p className="mx-auto max-w-2xl text-sm text-brand-dark/70">
          Automated files, local fulfilment, and courier-ready tracking. You keep production in-house while the
          storefront handles the rest.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-4">
        {steps.map((step) => (
          <article
            key={step.id}
            className="flex h-full flex-col gap-3 rounded-3xl border border-brand-dark/10 bg-brand-light/60 p-5"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-primary/70">{step.id}</span>
            <h3 className="text-lg font-semibold text-brand-dark">{step.title}</h3>
            <p className="text-sm text-brand-dark/70">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
