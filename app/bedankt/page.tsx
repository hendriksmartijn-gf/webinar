export default function Bedankt() {
  return (
    <main className="bg-[#080808] min-h-screen flex flex-col items-center justify-center px-6 py-24 text-white text-center">
      <p className="text-xs tracking-[0.25em] uppercase text-white/50 mb-8">
        Goldfizh Webinar
      </p>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl mb-6">
        Bedankt voor je registratie!
      </h1>
      <p className="text-base md:text-lg text-white/60 mb-4 max-w-lg">
        We hebben je aanmelding ontvangen. Je ontvangt een bevestiging op het
        opgegeven e-mailadres.
      </p>
      <p className="text-base md:text-lg text-white/60 mb-14 max-w-lg">
        Donderdag 29 mei om 12:00 uur ontvang je de Google Meet-link in je
        inbox. Tot dan!
      </p>
      <a
        href="/"
        className="border border-white/30 text-white/70 text-sm py-3 px-8 hover:border-white hover:text-white transition-colors duration-200"
      >
        ← Terug naar home
      </a>
    </main>
  );
}
