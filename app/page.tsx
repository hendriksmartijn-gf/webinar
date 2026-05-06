import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <RegisterSection />
      <SpeakersSection />
      <FooterSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-white text-center overflow-hidden"
      style={{ background: "var(--bg-dark)" }}
    >
      <Image
        src="https://og3kiehv6scpsqls.public.blob.vercel-storage.com/AI-webinar/AI-webinar-background"
        alt=""
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0" style={{ background: "rgba(10,8,20,0.72)" }} />
      {/* Content above the background image */}
      <div className="relative z-10 flex flex-col items-center">
      <span className="eyebrow mb-10" style={{ color: "var(--gf-purple-300)" }}>
        Goldfizh Webinar
      </span>

      <h1
        className="max-w-4xl mb-6"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 300,
          fontSize: "clamp(40px, 7vw, 80px)",
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
        }}
      >
        <span className="with-stop">
          AI & jouw organisatie —{" "}
          <span style={{ color: "rgba(255,255,255,0.5)" }}>
            wat verandert er, en wat doe je ermee
          </span>
        </span>
      </h1>

      <p
        className="mb-14"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          color: "var(--gf-purple-300)",
          letterSpacing: "0.04em",
        }}
      >
        Donderdag 29 mei &nbsp;·&nbsp; 12:00–13:00 &nbsp;·&nbsp; Google Meet
      </p>

      <a href="#register" className="btn-primary" style={{ minWidth: "220px" }}>
        Registreer →
      </a>
      </div>
    </section>
  );
}

function RegisterSection() {
  return (
    <section id="register" className="py-24 px-6" style={{ background: "#f2f1ed" }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="eyebrow mb-6 block" style={{ color: "var(--gf-slate-700)" }}>
            Register
          </span>
          <h2
            className="mb-8 with-stop"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--gf-ink)",
            }}
          >
            Wat je meeneemt
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              "Inzicht in wat AI nu al verandert voor jouw organisatie",
              "Concrete eerste stappen — geen theorie, wel actie",
              "Ruimte voor vragen en open discussie",
            ].map((item) => (
              <li
                key={item}
                style={{
                  fontSize: "18px",
                  color: "var(--gf-slate-700)",
                  lineHeight: 1.55,
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    marginTop: "9px",
                    width: "6px",
                    height: "6px",
                    background: "var(--gf-purple-600)",
                    borderRadius: "1px",
                    flexShrink: 0,
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <form
            action="https://formsubmit.co/events@goldfizh.nl"
            method="POST"
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <input type="hidden" name="_next" value="/bedankt" />
            <input type="hidden" name="_subject" value="Nieuwe registratie — Goldfizh Webinar 29 mei" />
            <input type="hidden" name="_captcha" value="false" />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <FormField name="voornaam" label="Voornaam" />
              <FormField name="achternaam" label="Achternaam" />
            </div>
            <FormField name="email" label="Werk e-mailadres" type="email" />
            <FormField name="bedrijf" label="Bedrijf" />
            <FormField name="functie" label="Functie" />

            <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "8px" }}>
              Registreer nu →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function FormField({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        htmlFor={name}
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "13px",
          color: "var(--gf-ink)",
        }}
      >
        {label}
      </label>
      <input id={name} name={name} type={type} required className="gf-input" />
    </div>
  );
}

function SpeakersSection() {
  const speakers = [
    { name: "Martijn Hendriks", title: "Tech Lead, Goldfizh", image: "https://og3kiehv6scpsqls.public.blob.vercel-storage.com/AI-webinar/Martijn-nieuwe-achtergrond-uitgeknipt%20%282%29.png" },
    { name: "Heidy Aartman", title: "Functietitel invullen", image: "https://og3kiehv6scpsqls.public.blob.vercel-storage.com/AI-webinar/Heidy_uitgeknipt.jpg" },
  ];

  return (
    <section className="py-24 px-6" style={{ background: "#e8e7e3" }}>
      <div className="max-w-5xl mx-auto">
        <span className="eyebrow mb-6 block" style={{ color: "var(--gf-slate-700)" }}>
          Sprekers
        </span>
        <h2
          className="mb-14 with-stop"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "clamp(28px, 4vw, 44px)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--gf-ink)",
          }}
        >
          Met wie je spreekt
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {speakers.map((s) => <SpeakerCard key={s.name} {...s} />)}
        </div>
      </div>
    </section>
  );
}

function SpeakerCard({ name, title, image }: { name: string; title: string; image: string }) {
  return (
    <div style={{ background: "#f2f1ed", overflow: "hidden", borderRadius: "4px" }}>
      <div className="relative w-full" style={{ aspectRatio: "4/3", background: "#d0cfc9" }}>
        <Image src={image} alt={name} fill className="object-cover object-top" />
      </div>
      <div style={{ padding: "24px" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "18px", color: "var(--gf-ink)", margin: 0 }}>
          {name}
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--gf-slate-700)", margin: "4px 0 0" }}>
          {title}
        </p>
      </div>
    </div>
  );
}

function FooterSection() {
  return (
    <footer className="py-12 px-6" style={{ background: "var(--bg-dark)" }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.02em", color: "#fff" }}>
          GOLD<span style={{ color: "var(--gf-purple-600)" }}>F</span>IZH
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--gf-slate-700)", margin: 0 }}>
          © 2025 Goldfizh &nbsp;·&nbsp; events@goldfizh.nl
        </p>
      </div>
    </footer>
  );
}
