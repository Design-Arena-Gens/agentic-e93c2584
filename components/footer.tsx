export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-brand-dark/10 bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-brand-dark/60 md:flex-row md:items-center md:justify-between">
        <div>
          © {new Date().getFullYear()} Atelier Atlas. Built in Casablanca for Moroccan creators.
        </div>
        <div className="flex gap-4">
          <a href="mailto:production@atelieratlas.ma" className="hover:text-brand-primary">
            production@atelieratlas.ma
          </a>
          <a href="tel:+212661112233" className="hover:text-brand-primary">
            +212 6 61 11 12 33
          </a>
        </div>
      </div>
    </footer>
  );
};
