import Image from "next/image";

function Arrow() {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="0" y1="5" x2="18" y2="5" stroke="white" strokeWidth="1"/>
      <polyline points="13,1 19,5 13,9" stroke="white" strokeWidth="1" fill="none" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AgendaAndRegisterSection />
      <FooterSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section
      className="hero-grain relative min-h-screen flex flex-col justify-end px-8 md:px-16 pb-20 pt-32 text-white overflow-hidden"
    >
      {/* Subtle purple glow, bottom-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          left: "-5%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(99,49,244,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-6xl">
        <span style={{
          display: "block",
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--gf-purple-300)",
          marginBottom: "40px",
        }}>
          Goldfizh Webinar
        </span>

        <h1
          className="with-stop mb-10"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "clamp(44px, 7.5vw, 96px)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            maxWidth: "14ch",
          }}
        >
          AI & jouw organisatie —{" "}
          <span style={{ color: "rgba(255,255,255,0.4)" }}>
            wat verandert er, en wat doe je ermee
          </span>
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap", marginBottom: "48px" }}>
          <a href="#register" className="btn-primary">
            Registreer <Arrow />
          </a>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "#ffffff",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Donderdag 29 mei &nbsp;/&nbsp; 12:00–13:00 &nbsp;/&nbsp; Google Meet
          </p>
        </div>

        {/* Speaker avatars */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
            Met
          </span>
          {[
            { name: "Martijn Hendriks", role: "Tech Lead", img: "https://og3kiehv6scpsqls.public.blob.vercel-storage.com/AI-webinar/Martijn-nieuwe-achtergrond-uitgeknipt%20%282%29.png" },
            { name: "Heidy Aartman", role: "Goldfizh", img: "https://og3kiehv6scpsqls.public.blob.vercel-storage.com/AI-webinar/Heidy_uitgeknipt.jpg" },
          ].map((s) => (
            <div key={s.name} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)", flexShrink: 0, position: "relative" }}>
                <Image src={s.img} alt={s.name} fill style={{ objectFit: "cover", objectPosition: "top" }} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500, color: "#fff", margin: 0, lineHeight: 1.2 }}>{s.name}</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", margin: 0, textTransform: "uppercase" }}>{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const agenda = [
  { time: "12:00", topic: "Welkom & introductie", desc: "Kort overzicht van de sessie en de sprekers." },
  { time: "12:10", topic: "Wat AI nu al verandert", desc: "Concrete voorbeelden van AI-impact op organisaties zoals die van jou." },
  { time: "12:30", topic: "Eerste stappen zetten", desc: "Geen theorie — een praktisch kader om morgen mee te beginnen." },
  { time: "12:45", topic: "Q&A / open discussie", desc: "Jouw vragen, live beantwoord door Martijn en Heidy." },
  { time: "13:00", topic: "Afsluiting", desc: "" },
];

function AgendaAndRegisterSection() {
  return (
    <section id="register" className="px-8 md:px-16" style={{ paddingTop: "96px", paddingBottom: "96px" }}>
      <div style={{ maxWidth: "72rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>

        {/* Left — agenda */}
        <div>
          <h2
            className="with-stop"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: "40px",
            }}
          >
            Wat we bespreken
          </h2>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {agenda.map((item, i) => (
              <div key={item.time} style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: "20px", padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", alignItems: "start" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.06em", color: i === agenda.length - 1 ? "rgba(255,255,255,0.2)" : "var(--gf-purple-300)", paddingTop: "2px" }}>
                  {item.time}
                </span>
                <div>
                  <p style={{ fontFamily: "var(--font-sans)", fontWeight: item.desc ? 500 : 400, fontSize: "15px", color: i === agenda.length - 1 ? "rgba(255,255,255,0.25)" : "#fff", margin: "0 0 3px", letterSpacing: "-0.01em" }}>
                    {item.topic}
                  </p>
                  {item.desc && (
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.38)", margin: 0, lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div>
          <h2
            className="with-stop"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: "40px",
            }}
          >
            Registreer je
          </h2>
          <form
            action="https://formsubmit.co/events@goldfizh.nl"
            method="POST"
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            <input type="hidden" name="_next" value="/bedankt" />
            <input type="hidden" name="_subject" value="Nieuwe registratie — Goldfizh Webinar 29 mei" />
            <input type="hidden" name="_captcha" value="false" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
              <FormField name="voornaam" label="Voornaam" />
              <FormField name="achternaam" label="Achternaam" />
            </div>
            <FormField name="email" label="Werk e-mailadres" type="email" />
            <FormField name="bedrijf" label="Bedrijf" />
            <FormField name="functie" label="Functie" />
            <div style={{ paddingTop: "8px" }}>
              <button type="submit" className="btn-form-submit">
                Registreer nu →
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}

function FormField({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label htmlFor={name} className="form-label">{label}</label>
      <input id={name} name={name} type={type} required className="form-input" />
    </div>
  );
}


function FooterSection() {
  return (
    <footer className="py-12 px-8 md:px-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4" style={{ maxWidth: "72rem" }}>
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
