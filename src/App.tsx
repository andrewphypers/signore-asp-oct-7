import { useState, useEffect } from "react";

type Page = "home" | "team" | "practice" | "contact" | "criminal" | "family" | "wills" | "injury" | "civil" | "farm" | "domestic" | "realestate" | "epo" | "dependent";

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Practice Areas", page: "practice" },
  { label: "Our Team", page: "team" },
  { label: "Contact", page: "contact" },
];

function ScalesMark({ size = 48, color = "#C4883D" }: { size?: number; color?: string }) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const half = s * 0.38;
  const sw = s * 0.028;

  // Dagger proportions — taller, fills more of the vertical space
  const tipY    = cy - half * 0.88;   // blade tip — higher
  const guardY  = cy + half * 0.14;   // crossguard
  const pommelY = cy + half * 0.78;   // pommel — lower

  // Blade — slender double-edged leaf, widest just below midpoint of blade
  const bladeW  = half * 0.13;
  const bladePath = [
    `M ${cx} ${tipY}`,
    `C ${cx + bladeW * 0.5} ${tipY + (guardY - tipY) * 0.25}`,
    `  ${cx + bladeW} ${tipY + (guardY - tipY) * 0.6}`,
    `  ${cx + bladeW * 0.35} ${guardY}`,
    `L ${cx} ${guardY + (pommelY - guardY) * 0.08}`,
    `L ${cx - bladeW * 0.35} ${guardY}`,
    `C ${cx - bladeW} ${tipY + (guardY - tipY) * 0.6}`,
    `  ${cx - bladeW * 0.5} ${tipY + (guardY - tipY) * 0.25}`,
    `  ${cx} ${tipY} Z`,
  ].join(' ');

  // Crossguard — slim horizontal bar, slightly tapered ends
  const guardHalf = half * 0.42;
  const guardThick = sw * 0.85;

  // Grip — thin rectangle between guard and pommel
  const gripW = sw * 0.7;

  // Pommel — small filled circle
  const pommelR = sw * 1.1;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" aria-hidden>
      {/* Blade */}
      <path d={bladePath} fill={color} opacity={0.95} />
      {/* Crossguard */}
      <line
        x1={cx - guardHalf} y1={guardY}
        x2={cx + guardHalf} y2={guardY}
        stroke={color} strokeWidth={guardThick} strokeLinecap="round"
      />
      {/* Grip */}
      <line
        x1={cx} y1={guardY + guardThick / 2}
        x2={cx} y2={pommelY - pommelR}
        stroke={color} strokeWidth={gripW} strokeLinecap="round"
      />
      {/* Pommel */}
      <circle cx={cx} cy={pommelY} r={pommelR} fill={color} />
    </svg>
  );
}

function Logo({ onClick, dark = false }: { onClick: () => void; dark?: boolean }) {
  const text = dark ? "text-[#0B0A09]" : "text-[#F5EFE4]";
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center leading-none group gap-0 mt-7"
      aria-label="Signore & Asp — home"
    >
      <span
        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.16em" }}
        className={`text-[15px] font-[600] ${text} uppercase`}
      >
        Signore
      </span>
      <div className="flex items-center gap-[8px] my-[3px]">
        <span className="h-[1.5px] w-7 bg-[#C4883D]" />
        <ScalesMark size={38} color="#C4883D" />
        <span className="h-[1.5px] w-7 bg-[#C4883D]" />
      </div>
      <span
        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.16em" }}
        className={`text-[15px] font-[600] ${text} uppercase`}
      >
        &amp; Asp
      </span>
      <span
        style={{ letterSpacing: "0.22em" }}
        className="text-[8px] font-[600] text-[#C4883D] uppercase mt-[2px]"
      >
        LLP
      </span>
    </button>
  );
}

/* Full portrait logo card — used in standalone contexts */
function LogoCard({ light = false }: { light?: boolean }) {
  const bg = light ? "bg-[#F5EFE4]" : "bg-[#141210]";
  const text = light ? "text-[#0B0A09]" : "text-[#F5EFE4]";
  return (
    <div className={`${bg} flex flex-col items-center justify-center px-12 py-10 gap-4`}>
      <ScalesMark size={88} color="#C4883D" />
      <div className="text-center mt-2">
        <p style={{ fontFamily: "var(--font-display)" }} className={`text-[22px] font-[400] ${text}`}>
          Signore &amp; Asp <span className="text-[#C4883D] text-[14px]">LLP</span>
        </p>
        <p style={{ letterSpacing: "0.18em" }} className="text-[9px] uppercase text-[#C4883D] font-[600] mt-1">
          Barristers &amp; Solicitors
        </p>
        <p style={{ letterSpacing: "0.14em" }} className="text-[9px] uppercase text-[#6B6258] font-[500] mt-1">
          Wetaskiwin, Alberta
        </p>
      </div>
    </div>
  );
}

function Navbar({
  current,
  onNavigate,
}: {
  current: Page;
  onNavigate: (p: Page) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0B0A09]/95 backdrop-blur-sm border-b border-[#2C2620]" : "bg-transparent"}`}
    >
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 flex items-center justify-between h-[96px]">
        <Logo onClick={() => onNavigate("home")} />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              style={{ letterSpacing: "0.1em" }}
              className={`text-[11px] uppercase font-[500] transition-colors duration-200 ${current === page ? "text-[#C4883D]" : "text-[#B8AFA0] hover:text-[#F5EFE4]"}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <span className="text-[11px] text-[#6B6258] tracking-wider">
            1(866)915-1877
          </span>
          <button
            onClick={() => onNavigate("contact")}
            className="px-5 py-2 bg-[#C4883D] text-[#0B0A09] text-[11px] uppercase font-[600] tracking-[0.12em] hover:bg-[#D4A055] transition-colors duration-200"
          >
            Free Consult
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#B8AFA0] p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <path
                d="M4 4L18 18M18 4L4 18"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            ) : (
              <>
                <path
                  d="M3 6H19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M3 11H19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M3 16H19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0B0A09] border-t border-[#2C2620] px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => {
                onNavigate(page);
                setOpen(false);
              }}
              style={{ letterSpacing: "0.1em" }}
              className={`text-left text-[12px] uppercase font-[500] ${current === page ? "text-[#C4883D]" : "text-[#B8AFA0]"}`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => {
              onNavigate("contact");
              setOpen(false);
            }}
            className="mt-2 px-5 py-3 bg-[#C4883D] text-[#0B0A09] text-[11px] uppercase font-[600] tracking-[0.12em] text-center"
          >
            Free Consultation
          </button>
        </div>
      )}
    </header>
  );
}

function GoldButton({
  children,
  onClick,
  outline,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  outline?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{ letterSpacing: "0.12em" }}
      className={`px-7 py-3 text-[11px] uppercase font-[600] transition-all duration-200 ${
        outline
          ? "border border-[#C4883D] text-[#C4883D] hover:bg-[#C4883D] hover:text-[#0B0A09]"
          : "bg-[#C4883D] text-[#0B0A09] hover:bg-[#D4A055]"
      }`}
    >
      {children}
    </button>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="w-8 h-px bg-[#C4883D]" />
      <span className="w-1 h-1 rounded-full bg-[#C4883D]" />
    </div>
  );
}

/* ─────────────────────────── HOME PAGE ─────────────────────────── */
function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="bg-[#0B0A09]">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-[96px]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center py-20 md:py-28">
          {/* Left */}
          <div>
            <p
              style={{ letterSpacing: "0.14em" }}
              className="text-[10px] uppercase text-[#C4883D] font-[600] mb-5"
            >
              Barristers &amp; Solicitors — Wetaskiwin, Alberta
            </p>
            <h1
              style={{ fontFamily: "var(--font-display)", lineHeight: 1.12 }}
              className="text-[42px] md:text-[56px] lg:text-[64px] font-[400] text-[#F5EFE4] mb-6"
            >
              We Are a Full{" "}
              <em className="not-italic text-[#C4883D]">Service</em> Law Firm.
            </h1>
            <p className="text-[14px] text-[#8A8070] leading-relaxed mb-10 max-w-[440px]">
              Commanding advocates with decades of combined trial and
              transactional experience. Rooted in the community. Committed in
              the courtroom.
            </p>
            <div className="flex flex-wrap gap-4">
              <GoldButton onClick={() => onNavigate("contact")}>
                Free Consultation
              </GoldButton>
              <GoldButton outline onClick={() => onNavigate("practice")}>
                Practice Areas
              </GoldButton>
            </div>
          </div>

          {/* Right — hero image */}
          <div className="relative h-[340px] md:h-[520px] bg-[#161412] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1674658780913-4bc61805bafb?w=900&h=700&fit=crop&auto=format"
              alt="Peace Hills near Wetaskiwin, Alberta"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0B0A09]/40" />
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS GRID */}
      <section className="border-t border-[#2C2620]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <SectionDivider />
              <h2
                style={{ fontFamily: "var(--font-display)", lineHeight: 1.18 }}
                className="text-[32px] md:text-[40px] font-[400] text-[#F5EFE4]"
              >
                Practice Areas
              </h2>
            </div>
            <button
              onClick={() => onNavigate("practice")}
              style={{ letterSpacing: "0.1em" }}
              className="text-[11px] uppercase text-[#C4883D] hover:text-[#D4A055] font-[600] transition-colors"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#2C2620]">
            {[
              {
                title: "Family Law",
                page: "family" as Page,
                primary: true,
                desc: "Divorce, custody, support, and property division guided by compassion and strategic clarity. We stand with families through their most difficult transitions.",
              },
              {
                title: "Criminal Defence",
                page: "criminal" as Page,
                primary: true,
                desc: "Competent, principled defence across the full spectrum of criminal charges — from bail through trial. Your record and your future deserve nothing less.",
              },
              {
                title: "Wills & Estates",
                page: "wills" as Page,
                desc: "Planning for the unforeseen protects everything you've built. Don't leave your family without guidance when they need it most.",
              },
              {
                title: "Real Estate",
                page: "realestate" as Page,
                desc: "Buying or selling — we have you covered. Our experienced conveyancing team removes the confusion and guides you through every step with confidence.",
              },
              {
                title: "Personal Injury",
                page: "injury" as Page,
                desc: "When an injury changes everything, you deserve a lawyer who fights to make it right. We pursue full, fair compensation so you can focus on recovery.",
              },
              {
                title: "Civil Litigation",
                page: "civil" as Page,
                desc: "Experienced representation in breach of contract, employment disputes, wrongful death, and complex civil matters — where attention to detail wins cases.",
              },
              {
                title: "Farm & Agricultural Disputes",
                page: "farm" as Page,
                desc: "Cattle, equipment, land, and buildings — we understand what a farm is worth and what's at stake when a dispute or marital breakdown puts it all on the table.",
              },
              {
                title: "Domestic Abuse Civil Claims",
                page: "domestic" as Page,
                desc: "Survivors of domestic abuse may be entitled to civil compensation from their abuser — independent of any criminal proceedings. You deserve justice on your own terms.",
              },
              {
                title: "Emergency Protection Orders",
                page: "epo" as Page,
                desc: "When safety cannot wait, an Emergency Protection Order can remove an abuser from the home immediately. We provide careful, compassionate assistance at every step.",
              },
              {
                title: "Dependent Adult Applications",
                page: "dependent" as Page,
                desc: "When a family member can no longer make decisions for themselves, we guide families through the guardianship and trusteeship process with clarity and compassion.",
              },
            ].map((area) => (
              <div
                key={area.title}
                className={`${area.primary ? "bg-[#0F0D0C]" : "bg-[#0B0A09]"} p-8 md:p-10 group cursor-pointer hover:bg-[#141210] transition-colors duration-300`}
                onClick={() => area.page && onNavigate(area.page)}
              >
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[22px] md:text-[26px] font-[400] text-[#F5EFE4] mb-4 group-hover:text-[#C4883D] transition-colors duration-300"
                >
                  {area.title}
                </h3>
                <p className="text-[13px] text-[#6B6258] leading-relaxed mb-6">
                  {area.desc}
                </p>
                <span
                  style={{ letterSpacing: "0.1em" }}
                  className="text-[10px] uppercase text-[#C4883D] font-[600] group-hover:underline"
                >
                  Learn more →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK IMAGE + QUOTE */}
      <section className="relative h-[420px] md:h-[560px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&h=700&fit=crop&auto=format"
          alt="Law library interior"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A09]/90 via-[#0B0A09]/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1180px] mx-auto px-6 md:px-10 w-full">
            <blockquote className="max-w-[560px]">
              <span
                style={{ fontFamily: "var(--font-display)" }}
                className="text-[#C4883D] text-[48px] leading-none select-none"
              >
                &ldquo;
              </span>
              <p
                style={{ fontFamily: "var(--font-display)", lineHeight: 1.5 }}
                className="text-[18px] md:text-[22px] font-[400] text-[#F5EFE4] italic mt-[-12px]"
              >
                Law is not merely a collection of rules, but an instrument of
                order, protection, and community trust. We are rooted in this
                community and are here to serve our neighbours.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="border-t border-[#2C2620]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start mb-16">
            <div>
              <SectionDivider />
              <h2
                style={{ fontFamily: "var(--font-display)", lineHeight: 1.18 }}
                className="text-[32px] md:text-[40px] font-[400] text-[#F5EFE4]"
              >
                Commanding advocates, proven across trial &amp; transaction
              </h2>
            </div>
            <div className="pt-2 md:pt-8">
              <p className="text-[14px] text-[#8A8070] leading-relaxed mb-8">
                Our team brings together complementary expertise across criminal
                defence, family matters, and civil disputes — all grounded in
                local knowledge and genuine care for every client's outcome.
              </p>
              <GoldButton outline onClick={() => onNavigate("team")}>
                Meet the Team
              </GoldButton>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#2C2620]">
            {ATTORNEYS.map((a) => (
              <div
                key={a.name}
                className="bg-[#0B0A09] group cursor-pointer"
                onClick={() => onNavigate("team")}
              >
                <div className="relative h-[320px] md:h-[380px] overflow-hidden bg-[#161412]">
                  <img
                    src={a.photo}
                    alt={a.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09]/80 via-transparent to-transparent" />
                </div>
                <div className="p-6 md:p-8">
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-[20px] font-[400] text-[#F5EFE4] mb-1"
                  >
                    {a.name}
                  </h3>
                  <p className="text-[11px] text-[#C4883D] uppercase tracking-widest font-[500] mb-3">
                    {a.title}
                  </p>
                  <p className="text-[12px] text-[#6B6258] leading-relaxed">
                    {a.short}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL REPRESENTATION SECTION */}
      <section className="bg-[#0F0D0C] border-t border-b border-[#2C2620]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <SectionDivider />
            <h2
              style={{ fontFamily: "var(--font-display)", lineHeight: 1.18 }}
              className="text-[32px] md:text-[40px] font-[400] text-[#F5EFE4] mb-6"
            >
              Local representation backed by exceptional outcomes
            </h2>
            <p className="text-[14px] text-[#8A8070] leading-relaxed mb-6">
              Our commitment to Wetaskiwin and the surrounding communities means
              we treat every client like a neighbour. We lend our combined
              resources to every matter, no matter how complex.
            </p>
            <p className="text-[14px] text-[#8A8070] leading-relaxed">
              From first consultation to final resolution, you'll have direct
              access to your counsel — not a paralegal, not an assistant.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <p className="text-[14px] text-[#8A8070] leading-relaxed">
              Whether you are facing a criminal charge, navigating a separation,
              or closing on a property — you deserve counsel who knows this
              community, understands what is at stake, and will be in your corner
              from start to finish.
            </p>
            <GoldButton onClick={() => onNavigate("contact")}>
              Speak with a Lawyer
            </GoldButton>
          </div>
        </div>
      </section>

      {/* RETAIN CTA */}
      <section>
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
          <SectionDivider />
          <h2
            style={{ fontFamily: "var(--font-display)", lineHeight: 1.18 }}
            className="text-[36px] md:text-[52px] font-[400] text-[#F5EFE4] mb-6 max-w-[700px] mx-auto"
          >
            Retain Signore &amp; Asp for{" "}
            <em className="not-italic text-[#C4883D]">strategic protection</em>
          </h2>
          <p className="text-[14px] text-[#8A8070] max-w-[520px] mx-auto mb-10 leading-relaxed">
            Schedule a free, confidential consultation to discuss your matter.
            No obligation. No judgment. Just answers.
          </p>
          <GoldButton onClick={() => onNavigate("contact")}>
            Book Your Free Consultation
          </GoldButton>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

/* ─────────────────────────── TEAM PAGE ─────────────────────────── */
const ATTORNEYS = [
  {
    name: "Andrea Signore",
    title: "Partner",
    short: "Lead counsel in family and civil matters with a decade of courtroom experience.",
    bio: "Andrea Signore founded the practice with a conviction that smaller communities deserve the same calibre of legal representation found in major centres. Her practice spans contested divorces, complex property disputes, and civil litigation. She is known for her composed courtroom presence and her ability to build genuine trust with clients navigating their most difficult moments. Andrea understands the needs of rural communities and the difficulties when a family farm experiences a divorce or relationship breakdown. She is happy to assist in the preparation of cohabitation agreements prior to marriage to protect pre-relationship assets, and offers experienced guidance for addressing claims to divide the farm. Andrea has devoted her entire career to Wetaskiwin, Leduc, Camrose, Ponoka, and the surrounding rural communities — and proudly lives and raises her family here.",
    photo: "/assets/andrea-signore.jpg",
    teamPhoto: "/assets/andrea-signore-team.jpg",
    areas: ["Family Law", "Civil Litigation", "Real Estate", "Farm & Agricultural Disputes", "Wills & Estates", "Domestic Abuse Civil Claims"],
  },
  {
    name: "Joshua Asp",
    title: "Partner",
    short: "Criminal defence specialist with an exceptional record across trial and appeal.",
    bio: "Joshua Asp built his reputation in Alberta courtrooms defending individuals against charges ranging from assault to major indictable offences. His methodical preparation, command of evidentiary law, and persuasive advocacy have resulted in acquittals and favourable resolutions across hundreds of cases. He brings the same rigour to every file regardless of charge severity.",
    photo: "/assets/joshua-asp.jpg",
    areas: ["Criminal Defence", "Bail Hearings", "Appeals"],
  },
  {
    name: "Andrew Phypers",
    title: "Partner",
    short: "Criminal defence counsel committed to protecting the rights of every client from first appearance through trial.",
    bio: "Andrew Phypers focuses exclusively on criminal defence, representing individuals facing charges across the full spectrum of the Criminal Code of Canada. He brings meticulous preparation and a principled approach to every matter — from bail hearings and Charter applications to contested trials. Andrew is committed to ensuring every client receives a thorough, fearless defence regardless of the charge.",
    photo: "/assets/andrew-phypers.jpg",
    areas: ["Criminal Defence", "Bail Hearings", "Charter Applications", "Appeals"],
  },
];

function TeamPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="bg-[#0B0A09] pt-[96px]">
      {/* Hero */}
      <section className="border-b border-[#2C2620]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionDivider />
          <div className="grid md:grid-cols-2 gap-12 items-end">
            <h1
              style={{ fontFamily: "var(--font-display)", lineHeight: 1.1 }}
              className="text-[40px] md:text-[58px] font-[400] text-[#F5EFE4]"
            >
              Commanding Advocates.{" "}
              <em className="not-italic text-[#C4883D]">
                Uncompromising Trust.
              </em>
            </h1>
            <div>
              <p className="text-[14px] text-[#8A8070] leading-relaxed mb-4">
                Every member of our team is a practitioner first. You will work
                directly with your counsel from intake through resolution.
              </p>
              <p className="text-[14px] text-[#8A8070] leading-relaxed">
                We deliberately keep our practice lean so every client receives
                our full attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Attorneys */}
      {ATTORNEYS.map((a, i) => (
        <section
          key={a.name}
          className={`border-b border-[#2C2620] ${i % 2 === 1 ? "bg-[#0F0D0C]" : ""}`}
        >
          <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div
              className={`relative h-[400px] md:h-[520px] bg-[#161412] overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}
            >
              <img
                src={(a as any).teamPhoto ?? a.photo}
                alt={a.name}
                className="w-full h-full object-cover object-top grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09]/50 via-transparent to-transparent" />
            </div>
            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <p className="text-[11px] uppercase text-[#C4883D] tracking-widest font-[600] mb-3">
                {a.title}
              </p>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-[34px] md:text-[44px] font-[400] text-[#F5EFE4] mb-6"
              >
                {a.name}
              </h2>
              <p className="text-[14px] text-[#8A8070] leading-relaxed mb-8">
                {a.bio}
              </p>
              <div className="mb-8">
                <p
                  style={{ letterSpacing: "0.1em" }}
                  className="text-[10px] uppercase text-[#6B6258] font-[600] mb-3"
                >
                  Areas of Practice
                </p>
                <div className="flex flex-wrap gap-2">
                  {a.areas.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 border border-[#2C2620] text-[11px] text-[#B8AFA0]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <GoldButton onClick={() => onNavigate("contact")}>
                Schedule a Consultation
              </GoldButton>
            </div>
          </div>
        </section>
      ))}

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

/* ─────────────────────────── PRACTICE PAGE ─────────────────────────── */
function PracticePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const areas = [
    {
      title: "Family Law",
      page: "family" as Page,
      sub: "Divorce · Custody · Support · Property division",
      desc: "Family disputes require both legal precision and human sensitivity. We guide clients through separation, divorce, parenting arrangements, and support determinations with clarity and care — resolving matters efficiently where possible, and advocating firmly when contested.",
      img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop&auto=format",
    },
    {
      title: "Criminal Defence",
      page: "criminal" as Page,
      sub: "Assault · Impaired driving · Drug offences · Fraud · Major indictables",
      desc: "We provide vigorous, principled defence against the full spectrum of criminal charges in Alberta. From bail hearings to jury trials, our criminal counsel combines forensic preparation with courtroom authority to protect your liberty and your record.",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop&auto=format",
    },
    {
      title: "Wills & Estates",
      page: "wills" as Page,
      sub: "Wills · Powers of Attorney · Personal Directives · Estate Administration",
      desc: "A will is the most important document you will ever sign. We help individuals and families put proper plans in place so that if the unforeseen happens, their wishes are carried out and their loved ones are protected — not left to navigate the courts without direction.",
      img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop&auto=format",
    },
    {
      title: "Real Estate",
      page: "realestate" as Page,
      sub: "Buying · Selling · Conveyancing · Title · Disputes",
      desc: "Whether you are buying or selling, we have you covered. Our experienced conveyancing team removes the confusion from every transaction — reviewing titles, preparing documents, and guiding you through closing with confidence and clarity.",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop&auto=format",
    },
    {
      title: "Personal Injury",
      page: "injury" as Page,
      sub: "Motor Vehicle Accidents · Slip & Fall · Workplace Injuries · Wrongful Death",
      desc: "An injury can upend your income, your health, and your family's future in an instant. Insurance adjusters work to minimise what you receive — we work to make sure you are fully and fairly compensated for every loss, present and future.",
      img: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=500&fit=crop&auto=format",
    },
    {
      title: "Civil Litigation",
      page: "civil" as Page,
      sub: "Contract Disputes · Employment · Wrongful Death · Domestic Abuse Claims",
      desc: "When informal resolution fails, you need a litigator who can build a compelling case and see it through. We represent individuals and businesses in civil proceedings from statement of claim through trial, with a record of efficient, favourable results.",
      img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop&auto=format",
    },
    {
      title: "Farm & Agricultural Disputes",
      page: "farm" as Page,
      sub: "Marital Breakdown · Cattle · Equipment · Land & Buildings",
      desc: "Agricultural operations are among the most complex assets to divide or defend. We bring first-hand understanding of farm valuations — cattle herds, machinery, outbuildings, and working land — to every dispute we handle.",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop&auto=format",
    },
    {
      title: "Domestic Abuse Civil Claims",
      page: "domestic" as Page,
      sub: "Assault · Intentional Infliction of Distress · Financial Abuse · Compensation",
      desc: "Survivors of domestic abuse have the right to pursue civil compensation from their abuser — separate from any criminal process. We handle these claims with complete confidentiality and unwavering support.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop&auto=format",
    },
    {
      title: "Emergency Protection Orders",
      page: "epo" as Page,
      sub: "Immediate Safety · EPO Applications · Variation & Review · Long-Term Protection",
      desc: "When safety cannot wait, an Emergency Protection Order can remove an abuser from the home the same day. We provide careful, compassionate legal assistance so you and your family are protected.",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop&auto=format",
    },
    {
      title: "Dependent Adult Applications",
      page: "dependent" as Page,
      sub: "Guardianship · Trusteeship · Aging Parents · Cognitive Impairment",
      desc: "When a loved one can no longer manage their own affairs, families need clarity and a steady hand. We guide you through the guardianship and trusteeship process so your family member is protected.",
      img: "https://images.unsplash.com/photo-1749087869560-1f00fe44b58e?w=800&h=500&fit=crop&auto=format",
    },
  ];

  return (
    <div className="bg-[#0B0A09] pt-[96px]">
      <section className="border-b border-[#2C2620]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionDivider />
          <h1
            style={{ fontFamily: "var(--font-display)", lineHeight: 1.1 }}
            className="text-[40px] md:text-[58px] font-[400] text-[#F5EFE4] max-w-[700px]"
          >
            The full scope of our legal practice
          </h1>
        </div>
      </section>

      {areas.map((area, i) => (
        <section
          key={area.title}
          className={`border-b border-[#2C2620] ${i % 2 === 1 ? "bg-[#0F0D0C]" : ""}`}
        >
          <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-5 gap-12 items-center">
            <div className={`md:col-span-3 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <p
                style={{ letterSpacing: "0.1em" }}
                className="text-[10px] uppercase text-[#6B6258] font-[600] mb-2"
              >
                {area.sub}
              </p>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-[32px] md:text-[44px] font-[400] text-[#F5EFE4] mb-6"
              >
                {area.title}
              </h2>
              <p className="text-[14px] text-[#8A8070] leading-relaxed mb-8">
                {area.desc}
              </p>
              <div className="flex flex-wrap gap-4">
                {area.page && (
                  <GoldButton onClick={() => onNavigate(area.page!)}>
                    Learn More
                  </GoldButton>
                )}
                <GoldButton outline onClick={() => onNavigate("contact")}>
                  Free Consultation
                </GoldButton>
              </div>
            </div>
            <div
              className={`md:col-span-2 h-[260px] md:h-[340px] bg-[#161412] overflow-hidden ${i % 2 === 1 ? "md:order-1" : ""}`}
            >
              <img
                src={area.img}
                alt={area.title}
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
        </section>
      ))}

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

/* ─────────────────────────── CRIMINAL PAGE ─────────────────────────── */
function CriminalPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="bg-[#0B0A09] pt-[96px]">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&h=800&fit=crop&auto=format"
          alt="Courtroom interior"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/50 to-transparent" />
        <div className="relative max-w-[1180px] mx-auto px-6 md:px-10 w-full pb-16 md:pb-24">
          <SectionDivider />
          <h1
            style={{ fontFamily: "var(--font-display)", lineHeight: 1.1 }}
            className="text-[38px] md:text-[60px] font-[400] text-[#F5EFE4] max-w-[760px]"
          >
            Criminal{" "}
            <em className="not-italic text-[#C4883D]">Defence</em> in Canada
          </h1>
          <p className="text-[14px] text-[#8A8070] mt-5 max-w-[520px] leading-relaxed">
            When your liberty, record, and reputation are on the line, you need
            counsel who is prepared, principled, and fully committed from the
            first phone call to the final verdict.
          </p>
        </div>
      </section>

      <section className="border-t border-[#2C2620]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-3 gap-12 md:gap-16">
          {/* Main content */}
          <div className="md:col-span-2 space-y-10">

            <div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-[26px] md:text-[32px] font-[400] text-[#F5EFE4] mb-5"
              >
                What is at Stake When You Face a Criminal Charge
              </h2>
              <p className="text-[14px] text-[#8A8070] leading-relaxed mb-4">
                A criminal charge in Canada carries consequences that extend far
                beyond the courtroom. A conviction can mean incarceration, a
                lasting criminal record, restrictions on travel, loss of
                employment, and impacts on immigration status. Even charges that
                are ultimately withdrawn leave a mark if not handled promptly
                and decisively.
              </p>
              <p className="text-[14px] text-[#8A8070] leading-relaxed">
                The Crown prosecutes vigorously. You deserve counsel who matches
                that commitment — someone who reviews every piece of disclosure,
                challenges every assumption, and fights for the best possible
                outcome regardless of the charge you face.
              </p>
            </div>

            <div className="border-l-2 border-[#C4883D] pl-6 py-2">
              <p
                style={{ fontFamily: "var(--font-display)" }}
                className="text-[17px] text-[#F5EFE4] italic leading-relaxed"
              >
                "A charge is not a conviction. Our job begins the moment you
                call us and does not end until the matter is fully resolved in
                your favour."
              </p>
              <p className="text-[11px] text-[#6B6258] mt-3 uppercase tracking-wider">
                — Joshua Asp, Partner
              </p>
            </div>

            <div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-[26px] md:text-[32px] font-[400] text-[#F5EFE4] mb-3"
              >
                Charges We Defend
              </h2>
              <p className="text-[14px] text-[#8A8070] leading-relaxed mb-6">
                We represent individuals facing the full range of criminal
                charges under the Criminal Code of Canada and related statutes,
                including but not limited to:
              </p>
              <div className="grid sm:grid-cols-2 gap-px bg-[#2C2620] mb-2">
                {[
                  "Assault & domestic assault",
                  "Impaired driving & over 80",
                  "Drug possession & trafficking",
                  "Theft, fraud & property offences",
                  "Weapons offences",
                  "Sexual offences",
                  "Mischief & breach of court orders",
                  "Major indictable & hybrid offences",
                ].map((charge) => (
                  <div key={charge} className="bg-[#0B0A09] px-5 py-4 flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-[#C4883D] flex-shrink-0" />
                    <span className="text-[13px] text-[#B8AFA0]">{charge}</span>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-[#6B6258] mt-3 italic">
                If your charge is not listed above, contact us — we will tell
                you honestly whether we can help and direct you to the right
                counsel if we cannot.
              </p>
            </div>

            <div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-[26px] md:text-[32px] font-[400] text-[#F5EFE4] mb-5"
              >
                How We Build Your Defence
              </h2>
              <div className="grid sm:grid-cols-2 gap-px bg-[#2C2620]">
                {[
                  {
                    n: "01",
                    t: "Bail & Release Conditions",
                    d: "Immediate intervention to secure your release on the most favourable terms and challenge unreasonable bail conditions.",
                  },
                  {
                    n: "02",
                    t: "Full Disclosure Review",
                    d: "Thorough analysis of police reports, witness statements, recordings, and all Crown disclosure for weaknesses and inconsistencies.",
                  },
                  {
                    n: "03",
                    t: "Charter Rights",
                    d: "Identifying and arguing any breach of your rights under the Canadian Charter — unlawful searches, improper detention, denied right to counsel.",
                  },
                  {
                    n: "04",
                    t: "Trial Advocacy",
                    d: "Commanding courtroom presence with the cross-examination skill and legal argument to hold the Crown to its burden of proof.",
                  },
                  {
                    n: "05",
                    t: "Negotiation & Resolution",
                    d: "Where appropriate, negotiating with the Crown for stays, withdrawals, or reduced charges before trial to protect your record.",
                  },
                  {
                    n: "06",
                    t: "Sentencing & Appeals",
                    d: "If convicted, advocating for the most proportionate sentence and pursuing appeal where grounds exist to challenge the outcome.",
                  },
                ].map((item) => (
                  <div key={item.n} className="bg-[#0B0A09] p-6 md:p-8">
                    <p className="text-[12px] text-[#C4883D] font-mono mb-3">
                      {item.n}
                    </p>
                    <h3
                      style={{ fontFamily: "var(--font-display)" }}
                      className="text-[18px] font-[400] text-[#F5EFE4] mb-3"
                    >
                      {item.t}
                    </h3>
                    <p className="text-[13px] text-[#6B6258] leading-relaxed">
                      {item.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="border border-[#2C2620] p-6">
              <h3
                style={{ fontFamily: "var(--font-display)" }}
                className="text-[20px] font-[400] text-[#F5EFE4] mb-4"
              >
                Retain Signore &amp; Asp for strategic protection
              </h3>
              <p className="text-[13px] text-[#6B6258] leading-relaxed mb-6">
                Time is critical after a criminal charge. Contact us immediately
                for a free, confidential consultation.
              </p>
              <GoldButton onClick={() => onNavigate("contact")}>
                Book Consultation
              </GoldButton>
            </div>

            <div className="border border-[#2C2620] p-6 space-y-4">
              <p
                style={{ letterSpacing: "0.1em" }}
                className="text-[10px] uppercase text-[#6B6258] font-[600]"
              >
                Secure Contacts Initiative
              </p>
              {[
                {
                  label: "Direct Line",
                  val: "1(866)915-1877",
                },
                {
                  label: "Email",
                  val: "info@signore-asplaw.com",
                },
              ].map((c) => (
                <div key={c.label} className="border-b border-[#2C2620] pb-4 last:border-0 last:pb-0">
                  <p className="text-[11px] text-[#6B6258] mb-1">{c.label}</p>
                  <p className="text-[13px] text-[#B8AFA0]">{c.val}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Counsel section */}
      <section className="bg-[#0F0D0C] border-t border-[#2C2620]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionDivider />
          <h2
            style={{ fontFamily: "var(--font-display)", lineHeight: 1.18 }}
            className="text-[32px] md:text-[44px] font-[400] text-[#F5EFE4] mb-12"
          >
            Commanding counsel representing your future
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#2C2620]">
            {ATTORNEYS.slice(0, 2).map((a) => (
              <div
                key={a.name}
                className="bg-[#0F0D0C] flex gap-6 p-6 md:p-8 group cursor-pointer"
                onClick={() => onNavigate("team")}
              >
                <div className="w-[90px] h-[110px] flex-shrink-0 overflow-hidden bg-[#161412]">
                  <img
                    src={a.photo}
                    alt={a.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-[20px] font-[400] text-[#F5EFE4] mb-1"
                  >
                    {a.name}
                  </h3>
                  <p className="text-[11px] text-[#C4883D] uppercase tracking-widest font-[500] mb-3">
                    {a.name === "Joshua Asp" ? "Criminal Lead" : a.title}
                  </p>
                  <p className="text-[12px] text-[#6B6258] leading-relaxed">
                    {a.short}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

/* ─────────────────────────── FAMILY PAGE ─────────────────────────── */
function FamilyPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="bg-[#0B0A09] pt-[96px]">
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&h=800&fit=crop&auto=format"
          alt="Family"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/50 to-transparent" />
        <div className="relative max-w-[1180px] mx-auto px-6 md:px-10 w-full pb-16 md:pb-24">
          <SectionDivider />
          <h1
            style={{ fontFamily: "var(--font-display)", lineHeight: 1.1 }}
            className="text-[38px] md:text-[60px] font-[400] text-[#F5EFE4] max-w-[700px]"
          >
            Compassionate Family Law Counsel Through Life's{" "}
            <em className="not-italic text-[#C4883D]">Most Difficult Transitions</em>
          </h1>
        </div>
      </section>

      <section className="border-t border-[#2C2620]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20">
            <div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-[28px] md:text-[38px] font-[400] text-[#F5EFE4] mb-6"
              >
                Family Law Services We Provide
              </h2>
              <p className="text-[14px] text-[#8A8070] leading-relaxed mb-6">
                Family law matters touch every part of your life. Whether you're
                navigating a separation, a high conflict parenting dispute, or
                ensuring fair division of shared assets, we bring both legal
                rigor and genuine empathy to your matter.
              </p>
              <p className="text-[14px] text-[#8A8070] leading-relaxed">
                Our goal is always the most efficient resolution that protects
                your interests and, where children are involved, their
                wellbeing above all.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#2C2620] mb-16">
            {[
              {
                area: "Marital Dissolution &amp; Separation",
                desc: "Negotiating separation agreements and guiding clients through the dissolution process with clarity and efficiency.",
              },
              {
                area: "Child Support",
                desc: "Ensuring Federal Child Support Guidelines are correctly applied and enforced in every matter involving children.",
              },
              {
                area: "Spousal Support",
                desc: "Calculating, negotiating, and litigating entitlement, quantum, and duration of spousal support.",
              },
              {
                area: "Family Separation",
                desc: "Helping clients navigate high conflict parenting disputes and establishing workable, child-centred parenting schedules and agreements.",
              },
            ].map((item) => (
              <div key={item.area} className="bg-[#0B0A09] p-6 md:p-8">
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[20px] font-[400] text-[#F5EFE4] mb-3"
                  dangerouslySetInnerHTML={{ __html: item.area }}
                />
                <p className="text-[13px] text-[#6B6258] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Empathy section */}
          <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center border-t border-[#2C2620] pt-16">
            <div className="md:col-span-2 h-[320px] md:h-[420px] bg-[#161412] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=700&h=600&fit=crop&auto=format"
                alt="Family walking outdoors"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="md:col-span-3">
              <SectionDivider />
              <h2
                style={{ fontFamily: "var(--font-display)", lineHeight: 1.18 }}
                className="text-[28px] md:text-[38px] font-[400] text-[#F5EFE4] mb-6"
              >
                Empathy for Your Family. Strength in Court.
              </h2>
              <p className="text-[14px] text-[#8A8070] leading-relaxed mb-6">
                We understand that behind every file there is a family in
                transition. We combine sensitive client counsel with assertive
                legal advocacy to achieve outcomes that let you move forward.
              </p>
              <p className="text-[14px] text-[#8A8070] leading-relaxed mb-8">
                Andrea Signore leads our family law practice and brings a decade
                of experience helping clients reach fair, durable resolutions —
                in mediation and in court.
              </p>
              <GoldButton onClick={() => onNavigate("contact")}>
                Your Family Deserves Strong Representation
              </GoldButton>
            </div>
          </div>

          {/* Team */}
          <div className="mt-20 border-t border-[#2C2620] pt-16">
            <SectionDivider />
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-[28px] md:text-[36px] font-[400] text-[#F5EFE4] mb-10"
            >
              Dedicated Family Representation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#2C2620]">
              {ATTORNEYS.slice(0, 2).map((a) => (
                <div
                  key={a.name}
                  className="bg-[#0B0A09] flex gap-6 p-6 md:p-8 group cursor-pointer"
                  onClick={() => onNavigate("team")}
                >
                  <div className="w-[90px] h-[110px] flex-shrink-0 overflow-hidden bg-[#161412]">
                    <img
                      src={a.photo}
                      alt={a.name}
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <h3
                      style={{ fontFamily: "var(--font-display)" }}
                      className="text-[20px] font-[400] text-[#F5EFE4] mb-1"
                    >
                      {a.name}
                    </h3>
                    <p className="text-[11px] text-[#C4883D] uppercase tracking-widest font-[500] mb-3">
                      {a.name === "Andrea Signore" ? "Family Lead" : a.title}
                    </p>
                    <p className="text-[12px] text-[#6B6258] leading-relaxed">
                      {a.short}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

/* ─────────────────────────── DEPENDENT ADULT PAGE ─────────────────────────── */
function DependentAdultPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <main className="min-h-screen bg-[#0B0A09]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1749087869560-1f00fe44b58e?w=1600&q=80')",
            filter: "blur(3px) brightness(0.7)",
            transform: "scale(1.04)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/70 to-[#0B0A09]/20" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
          <p
            style={{ letterSpacing: "0.18em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4"
          >
            Practice Areas — Dependent Adult Applications
          </p>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-4xl md:text-6xl font-[400] text-[#F5EFE4] leading-[1.1] max-w-3xl"
          >
            Protecting those who can no longer{" "}
            <em className="text-[#C4883D]">protect themselves.</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-[400] text-[#F5EFE4] leading-snug mb-6"
            >
              One of the most difficult decisions a family will ever face.
            </h2>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              Watching a parent age beyond the point where they can safely
              manage their own affairs — or caring for a family member whose
              cognitive impairment has left them vulnerable — is a deeply
              painful experience. Families often struggle for months or years
              before recognising that legal protection is necessary. When
              that moment comes, the process should feel like help, not an
              additional burden.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              Under Alberta's <em className="text-[#D4A055]">Adult Guardianship and Trusteeship Act</em>,
              a court can appoint a guardian to make personal decisions —
              such as healthcare, housing, and daily care — and a trustee
              to manage financial affairs on behalf of a dependent adult.
              These appointments are a legal safeguard, not a taking-away
              of dignity. Their purpose is to ensure your family member
              is protected, cared for, and not exploited.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed">
              We guide families through the application process from start
              to finish — explaining what is required, gathering the
              necessary medical and personal information, preparing the
              court documents, and representing you at the hearing. We
              move carefully because we understand what is at stake.
            </p>
          </div>

          <div className="space-y-6">
            <p
              style={{ letterSpacing: "0.15em" }}
              className="text-[10px] uppercase text-[#C4883D] font-[600]"
            >
              How we assist
            </p>
            {[
              {
                title: "Guardianship Applications",
                body: "We prepare and file applications for full or partial guardianship, covering personal decisions such as medical treatment, residence, and daily care for an adult who can no longer make those decisions safely.",
              },
              {
                title: "Trusteeship Applications",
                body: "When a dependent adult can no longer manage their finances, a trustee is appointed to handle banking, bills, government benefits, and asset protection. We guide you through every step of the application.",
              },
              {
                title: "Co-Decision-Making Orders",
                body: "Where a person retains some decision-making capacity, a co-decision-making order allows a trusted family member to support rather than replace their decision-making — a less restrictive alternative to full guardianship.",
              },
              {
                title: "Supported Decision-Making",
                body: "For adults who need assistance but retain meaningful capacity, supported decision-making authorizations provide a formal framework that respects their autonomy while ensuring they have guidance.",
              },
              {
                title: "Reviews & Variations",
                body: "Guardianship and trusteeship orders are not permanent. As circumstances change — for better or worse — we assist families in applying to vary, renew, or terminate existing orders.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="border-l-2 border-[#C4883D] pl-5">
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[16px] font-[500] text-[#F5EFE4] mb-1"
                >
                  {title}
                </h3>
                <p className="text-[13px] text-[#8A8070] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who this applies to */}
      <section className="bg-[#0F0D0C] border-y border-[#2C2620]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p
            style={{ letterSpacing: "0.15em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4 text-center"
          >
            Common situations
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-[400] text-[#F5EFE4] text-center mb-14 max-w-2xl mx-auto"
          >
            Families come to us from many different circumstances.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                heading: "Aging parents with dementia",
                text: "Alzheimer's disease and other forms of dementia can progress to a point where a parent can no longer safely manage finances or healthcare decisions. A guardianship and trusteeship application provides a legal framework to protect them.",
              },
              {
                heading: "Cognitive or developmental impairment",
                text: "A family member with a significant intellectual disability, acquired brain injury, or other cognitive impairment may require formal legal protection as they enter adulthood or as a parent's ability to care for them diminishes.",
              },
              {
                heading: "Mental illness affecting capacity",
                text: "Certain psychiatric conditions can affect a person's ability to make safe decisions about their own welfare or finances. Where capacity is impaired and the person cannot accept voluntary supports, a court order may be necessary.",
              },
            ].map(({ heading, text }) => (
              <div key={heading}>
                <div className="w-8 h-px bg-[#C4883D] mb-5" />
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[18px] font-[500] text-[#F5EFE4] mb-3"
                >
                  {heading}
                </h3>
                <p className="text-[13px] text-[#8A8070] leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dignity note */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="border border-[#2C2620] p-8 md:p-10 grid md:grid-cols-[auto_1fr] gap-8 items-start">
          <div className="w-[3px] self-stretch bg-[#C4883D] rounded-full hidden md:block" />
          <div>
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="text-[20px] font-[500] text-[#F5EFE4] mb-3"
            >
              A process built around dignity and the least restrictive intervention.
            </h3>
            <p className="text-[13px] text-[#B8AFA0] leading-relaxed mb-3">
              Alberta's guardianship legislation is designed to protect adults
              while preserving as much of their autonomy as possible. Courts
              will only grant the authority that is genuinely necessary —
              which means we always consider whether a less restrictive option,
              such as a supported decision-making authorization or an enduring
              power of attorney, might better serve your family member's needs.
            </p>
            <p className="text-[13px] text-[#B8AFA0] leading-relaxed">
              We approach these applications with the seriousness and
              sensitivity they deserve. We take the time to understand your
              family member's situation, explain the options honestly, and
              help you choose the path that is right for them — not just
              the most straightforward one for the courts.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20 text-center">
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="text-3xl md:text-4xl font-[400] text-[#F5EFE4] mb-5"
        >
          We can help your family find the right path forward.
        </h2>
        <p className="text-[14px] text-[#8A8070] max-w-xl mx-auto mb-10">
          These applications take time and care to do properly. The sooner
          you speak with us, the more options you have. Contact our
          Wetaskiwin office to arrange a consultation.
        </p>
        <button
          onClick={() => onNavigate("contact")}
          className="px-8 py-3 bg-[#C4883D] text-[#0B0A09] text-[13px] font-[600] uppercase tracking-widest hover:bg-[#D4A055] transition-colors"
          style={{ letterSpacing: "0.12em" }}
        >
          Schedule a Consultation
        </button>
      </section>

      <Footer onNavigate={onNavigate} />
    </main>
  );
}

/* ─────────────────────────── EMERGENCY PROTECTION ORDERS PAGE ─────────────────────────── */
function EPOPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <main className="min-h-screen bg-[#0B0A09]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/80 to-[#0B0A09]/30" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
          <p
            style={{ letterSpacing: "0.18em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4"
          >
            Practice Areas — Emergency Protection Orders
          </p>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-4xl md:text-6xl font-[400] text-[#F5EFE4] leading-[1.1] max-w-3xl"
          >
            When safety cannot wait —{" "}
            <em className="text-[#C4883D]">the law can act today.</em>
          </h1>
        </div>
      </section>

      {/* Safety notice */}
      <div className="bg-[#1A1108] border-b border-[#C4883D]/40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="w-1 h-8 bg-[#C4883D] shrink-0 rounded-full" />
          <p className="text-[12px] text-[#D4A055]">
            <strong>If you are in immediate danger, call 911.</strong> Alberta Family Violence Info Line:{" "}
            <strong>310‑1818</strong> (24 hours). Everything you discuss with our office is strictly confidential.
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-[400] text-[#F5EFE4] leading-snug mb-6"
            >
              Family violence is one of the most difficult situations a person can face. You do not have to navigate it alone.
            </h2>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              Living with family violence — physical, psychological, or
              financial — is isolating and frightening. The decision to
              seek legal protection takes courage, and the process can feel
              overwhelming when you are already under enormous stress. A
              lawyer's role is to carry as much of that burden as possible:
              to know the law, to know the process, and to guide you
              through every step with patience and care.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              Alberta's <em className="text-[#D4A055]">Protection Against Family Violence Act</em> allows
              a court to grant an Emergency Protection Order on the same
              day it is applied for — without the abuser being present.
              The order can require an abuser to vacate the family home,
              surrender firearms, stay away from you and your children,
              and cease all contact immediately.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed">
              We assist clients through every stage: assessing whether an
              EPO is the right step, preparing the application, attending
              with you before the Justice of the Peace, and managing the
              follow-up King's Bench hearing that reviews the order within
              nine days.
            </p>
          </div>

          <div className="space-y-6">
            <p
              style={{ letterSpacing: "0.15em" }}
              className="text-[10px] uppercase text-[#C4883D] font-[600]"
            >
              How we help
            </p>
            {[
              {
                title: "EPO Applications",
                body: "We prepare the sworn information required for the application, explain what the Justice of the Peace will need to hear, and can attend with you in person or by telephone — including after hours in urgent situations.",
              },
              {
                title: "King's Bench Review Hearing",
                body: "Every EPO must be reviewed by a Court of King's Bench judge within nine days. We represent you at that hearing to ensure the order is confirmed, varied to better protect you, or transitioned into a long-term King's Bench Protection Order.",
              },
              {
                title: "Long-Term Protection Orders",
                body: "Where the situation warrants ongoing protection, we pursue a King's Bench Protection Order with terms tailored to your circumstances — including provisions for children, the family home, and ongoing contact restrictions.",
              },
              {
                title: "Variation & Enforcement",
                body: "If circumstances change or an order is breached, we act quickly — applying to vary the order's terms or assisting you in reporting a breach to police and seeking enforcement through the court.",
              },
              {
                title: "Coordinated Family Law Advice",
                body: "An EPO is often the first step in a broader separation. We connect EPO proceedings with parenting, child support, property, and divorce matters so your legal protection and your long-term future are addressed together.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="border-l-2 border-[#C4883D] pl-5">
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[16px] font-[500] text-[#F5EFE4] mb-1"
                >
                  {title}
                </h3>
                <p className="text-[13px] text-[#8A8070] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What an EPO can do */}
      <section className="bg-[#0F0D0C] border-y border-[#2C2620]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p
            style={{ letterSpacing: "0.15em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4 text-center"
          >
            What an EPO can require
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-[400] text-[#F5EFE4] text-center mb-14 max-w-2xl mx-auto"
          >
            Immediate, legally enforceable protection — the same day.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                heading: "Remove the abuser",
                text: "The abuser can be ordered to vacate the family home immediately, even if they are on the title or lease.",
              },
              {
                heading: "Prohibit contact",
                text: "All direct and indirect contact — in person, by phone, through third parties — can be prohibited.",
              },
              {
                heading: "Surrender firearms",
                text: "The abuser can be required to surrender all firearms and weapons to police.",
              },
              {
                heading: "Protect children",
                text: "The order can include provisions restricting access to children and directing where children are to reside.",
              },
            ].map(({ heading, text }) => (
              <div key={heading}>
                <div className="w-8 h-px bg-[#C4883D] mb-5" />
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[16px] font-[500] text-[#F5EFE4] mb-2"
                >
                  {heading}
                </h3>
                <p className="text-[12px] text-[#8A8070] leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careful assistance note */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="border border-[#2C2620] p-8 md:p-10 grid md:grid-cols-[auto_1fr] gap-8 items-start">
          <div className="w-[3px] self-stretch bg-[#C4883D] rounded-full hidden md:block" />
          <div>
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="text-[20px] font-[500] text-[#F5EFE4] mb-3"
            >
              Our approach: careful, confidential, and at your pace.
            </h3>
            <p className="text-[13px] text-[#B8AFA0] leading-relaxed mb-3">
              We understand that reaching out for legal help in a situation of
              family violence takes strength. We do not rush clients, we do not
              judge, and we do not pressure anyone into a course of action they
              are not ready to take. Our role is to explain your options
              clearly, help you understand the likely outcomes, and stand
              beside you when you are ready to move forward.
            </p>
            <p className="text-[13px] text-[#B8AFA0] leading-relaxed">
              All communications with our office are strictly confidential.
              We can advise on safe ways to contact us if you are concerned
              about your communications being monitored.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20 text-center">
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="text-3xl md:text-4xl font-[400] text-[#F5EFE4] mb-5"
        >
          We are here when you need us.
        </h2>
        <p className="text-[14px] text-[#8A8070] max-w-xl mx-auto mb-10">
          Contact our office to speak with a lawyer confidentially. There
          is no obligation, no judgment, and no pressure. Just honest,
          careful advice from people who take your safety seriously.
        </p>
        <button
          onClick={() => onNavigate("contact")}
          className="px-8 py-3 bg-[#C4883D] text-[#0B0A09] text-[13px] font-[600] uppercase tracking-widest hover:bg-[#D4A055] transition-colors"
          style={{ letterSpacing: "0.12em" }}
        >
          Contact Us Confidentially
        </button>
      </section>

      <Footer onNavigate={onNavigate} />
    </main>
  );
}

/* ─────────────────────────── REAL ESTATE PAGE ─────────────────────────── */
function RealEstatePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <main className="min-h-screen bg-[#0B0A09]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/72 to-[#0B0A09]/20" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
          <p
            style={{ letterSpacing: "0.18em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4"
          >
            Practice Areas — Real Estate
          </p>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-4xl md:text-6xl font-[400] text-[#F5EFE4] leading-[1.1] max-w-3xl"
          >
            Buying or selling —{" "}
            <em className="text-[#C4883D]">we have you covered.</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-[400] text-[#F5EFE4] leading-snug mb-6"
            >
              An experienced conveyancing team that removes the confusion.
            </h2>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              Real estate transactions involve significant sums, tight
              timelines, and a stack of documents most people see only once
              in their lives. A missed condition, an unchecked title
              encumbrance, or an ambiguous clause in a purchase agreement can
              create problems that follow you long after keys are exchanged.
              Our conveyancing team makes sure none of that happens.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              Whether you are purchasing your first home, selling an
              investment property, or navigating a commercial transaction,
              we review every document, explain every step in plain language,
              and coordinate with your realtor, lender, and the other side
              to ensure closing goes smoothly.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed">
              Clients leave our office knowing exactly what they signed,
              what they own, and that their interests were protected at every
              stage.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Residential Purchases",
                body: "We act for buyers on all residential transactions — reviewing the contract of purchase and sale, conducting title searches, resolving encumbrances, and completing the transfer with care and precision.",
              },
              {
                title: "Residential Sales",
                body: "Sellers face their own set of obligations and deadlines. We prepare discharge documents, satisfy outstanding conditions, and ensure the proceeds reach you cleanly and on time.",
              },
              {
                title: "Title Review & Title Insurance",
                body: "A clear title is the foundation of any property transaction. We examine title thoroughly and advise on title insurance options so you are protected against defects that surface after closing.",
              },
              {
                title: "Commercial Real Estate",
                body: "Commercial transactions carry additional complexity — zoning, environmental considerations, lease assumptions, and financing structures. We manage that complexity so the deal closes on schedule.",
              },
              {
                title: "Property Disputes",
                body: "Boundary disputes, easement conflicts, adverse possession claims, and disagreements between co-owners. When a property matter turns contentious, we provide clear-headed, strategic representation.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="border-l-2 border-[#C4883D] pl-5">
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[16px] font-[500] text-[#F5EFE4] mb-1"
                >
                  {title}
                </h3>
                <p className="text-[13px] text-[#8A8070] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="bg-[#0F0D0C] border-y border-[#2C2620]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p
            style={{ letterSpacing: "0.15em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4 text-center"
          >
            What to expect
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-[400] text-[#F5EFE4] text-center mb-14"
          >
            No surprises. No confusion. Just a clean close.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                heading: "Plain-language guidance",
                text: "We translate legal documents into straightforward explanations so you know exactly what you are agreeing to before you sign anything.",
              },
              {
                heading: "Thorough title searches",
                text: "We search title for liens, caveats, encumbrances, and any registered interests that could affect your ownership — and we resolve them before closing.",
              },
              {
                heading: "Coordinated closing",
                text: "We liaise with your realtor, mortgage lender, and opposing counsel to keep the transaction on track and ensure funds and documents are exchanged without delay.",
              },
            ].map(({ heading, text }) => (
              <div key={heading}>
                <div className="w-8 h-px bg-[#C4883D] mb-5" />
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[18px] font-[500] text-[#F5EFE4] mb-3"
                >
                  {heading}
                </h3>
                <p className="text-[13px] text-[#8A8070] leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="text-3xl md:text-4xl font-[400] text-[#F5EFE4] mb-5"
        >
          Ready to move forward?
        </h2>
        <p className="text-[14px] text-[#8A8070] max-w-xl mx-auto mb-10">
          Contact our Wetaskiwin office early in your transaction — the sooner
          we are involved, the more smoothly everything runs. We offer
          straightforward, fixed-fee conveyancing for most residential files.
        </p>
        <button
          onClick={() => onNavigate("contact")}
          className="px-8 py-3 bg-[#C4883D] text-[#0B0A09] text-[13px] font-[600] uppercase tracking-widest hover:bg-[#D4A055] transition-colors"
          style={{ letterSpacing: "0.12em" }}
        >
          Contact Us
        </button>
      </section>

      <Footer onNavigate={onNavigate} />
    </main>
  );
}

/* ─────────────────────────── DOMESTIC ABUSE CIVIL CLAIMS PAGE ─────────────────────────── */
function DomesticAbusePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <main className="min-h-screen bg-[#0B0A09]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/80 to-[#0B0A09]/30" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
          <p
            style={{ letterSpacing: "0.18em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4"
          >
            Practice Areas — Domestic Abuse Civil Claims
          </p>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-4xl md:text-6xl font-[400] text-[#F5EFE4] leading-[1.1] max-w-3xl"
          >
            What was done to you was wrong.{" "}
            <em className="text-[#C4883D]">The law can hold them accountable.</em>
          </h1>
        </div>
      </section>

      {/* Safety notice */}
      <div className="bg-[#1A1108] border-b border-[#C4883D]/40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="w-1 h-8 bg-[#C4883D] shrink-0 rounded-full" />
          <p className="text-[12px] text-[#D4A055]">
            <strong>Your safety is the priority.</strong> If you are in immediate danger, call 911.
            If you need support, the 24‑hour Alberta Family Violence Info Line is{" "}
            <strong>310‑1818</strong>. Everything you discuss with our office is strictly confidential.
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-[400] text-[#F5EFE4] leading-snug mb-6"
            >
              You have the right to pursue justice — on your own terms, in your own time.
            </h2>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              Domestic abuse leaves deep marks — physical, emotional, and financial.
              Many survivors never see their abuser face meaningful consequences.
              The criminal justice system can feel slow, uncertain, and out of
              your control. A civil lawsuit is different: <em className="text-[#D4A055]">you</em> decide
              whether to proceed, the standard of proof is lower than in a
              criminal trial, and the outcome can include financial compensation
              paid directly to you.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              Alberta courts have consistently recognized the right of domestic
              abuse survivors to bring civil claims against their abusers.
              Criminal charges do not need to have been laid. A conviction is
              not required. What matters is what happened to you, and whether
              the evidence supports a civil finding of liability.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed">
              At Signore &amp; Asp, we handle these matters with complete
              sensitivity and confidentiality. We move at your pace, explain
              every step clearly, and ensure you are never pressured into a
              decision you are not ready to make.
            </p>
          </div>

          <div className="space-y-6">
            <p
              style={{ letterSpacing: "0.15em" }}
              className="text-[10px] uppercase text-[#C4883D] font-[600]"
            >
              What you may be able to claim
            </p>
            {[
              {
                title: "Assault & Battery",
                body: "Any intentional physical contact — hitting, pushing, strangling, or any other physical act — gives rise to a civil claim. You do not need to have sustained visible injuries.",
              },
              {
                title: "Intentional Infliction of Emotional Distress",
                body: "Prolonged psychological abuse, threats, humiliation, coercive control, and harassment can form the basis of a civil claim where the conduct was extreme and caused recognisable harm.",
              },
              {
                title: "Sexual Abuse",
                body: "Civil claims for sexual assault and coercion are independent of any criminal proceeding. Courts have awarded significant damages to survivors who brought their claims forward.",
              },
              {
                title: "Financial Abuse & Property Loss",
                body: "Theft of wages, forced financial dependence, destruction of property, and interference with employment are compensable harms. Lost income and financial harm are quantifiable and recoverable.",
              },
              {
                title: "Ongoing Stalking & Harassment",
                body: "Where abuse has continued after separation — through surveillance, repeated contact, or intimidation — civil remedies including damages and injunctive orders are available.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="border-l-2 border-[#C4883D] pl-5">
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[16px] font-[500] text-[#F5EFE4] mb-1"
                >
                  {title}
                </h3>
                <p className="text-[13px] text-[#8A8070] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How civil differs from criminal */}
      <section className="bg-[#0F0D0C] border-y border-[#2C2620]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p
            style={{ letterSpacing: "0.15em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4 text-center"
          >
            Civil vs. criminal process
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-[400] text-[#F5EFE4] text-center mb-14 max-w-2xl mx-auto"
          >
            A civil claim gives you something the criminal system cannot.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                heading: "You are in control",
                text: "A civil lawsuit belongs to you. You decide when to start, whether to settle, and when to stop. Unlike criminal proceedings, the Crown does not make those decisions — you do.",
              },
              {
                heading: "Lower burden of proof",
                text: "Civil cases are decided on the balance of probabilities — more likely than not. This is a significantly lower threshold than the criminal standard of proof beyond a reasonable doubt.",
              },
              {
                heading: "Financial compensation",
                text: "A successful civil judgment can include general damages for pain and suffering, special damages for financial losses, and in serious cases, aggravated or punitive damages paid by your abuser.",
              },
            ].map(({ heading, text }) => (
              <div key={heading}>
                <div className="w-8 h-px bg-[#C4883D] mb-5" />
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[18px] font-[500] text-[#F5EFE4] mb-3"
                >
                  {heading}
                </h3>
                <p className="text-[13px] text-[#8A8070] leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limitation period notice */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="border border-[#2C2620] p-8 md:p-10 grid md:grid-cols-[auto_1fr] gap-8 items-start">
          <div className="w-[3px] self-stretch bg-[#C4883D] rounded-full hidden md:block" />
          <div>
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="text-[20px] font-[500] text-[#F5EFE4] mb-3"
            >
              Time limits apply — but the law makes allowances for survivors.
            </h3>
            <p className="text-[13px] text-[#B8AFA0] leading-relaxed mb-3">
              Alberta's <em className="text-[#D4A055]">Limitations Act</em> generally requires civil
              claims to be brought within two years of the date the claim was
              discovered. For domestic abuse, however, the courts have
              recognised that discovery can be delayed by trauma, coercion,
              and the complexity of abuse dynamics. Extended limitation periods
              have been applied in many survivor cases.
            </p>
            <p className="text-[13px] text-[#B8AFA0] leading-relaxed">
              Even if you are uncertain whether the time limit has passed,
              speak with us. Do not assume it is too late without getting
              advice first.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20 text-center">
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="text-3xl md:text-4xl font-[400] text-[#F5EFE4] mb-5"
        >
          You don't have to face this alone.
        </h2>
        <p className="text-[14px] text-[#8A8070] max-w-xl mx-auto mb-10">
          A confidential consultation costs you nothing. We will listen
          carefully, explain your options honestly, and let you decide what
          you want to do — with no pressure and no judgment.
        </p>
        <button
          onClick={() => onNavigate("contact")}
          className="px-8 py-3 bg-[#C4883D] text-[#0B0A09] text-[13px] font-[600] uppercase tracking-widest hover:bg-[#D4A055] transition-colors"
          style={{ letterSpacing: "0.12em" }}
        >
          Book a Confidential Consultation
        </button>
      </section>

      <Footer onNavigate={onNavigate} />
    </main>
  );
}

/* ─────────────────────────── FARM & AGRICULTURAL DISPUTES PAGE ─────────────────────────── */
function FarmPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <main className="min-h-screen bg-[#0B0A09]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/72 to-[#0B0A09]/20" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
          <p
            style={{ letterSpacing: "0.18em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4"
          >
            Practice Areas — Farm &amp; Agricultural Disputes
          </p>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-4xl md:text-6xl font-[400] text-[#F5EFE4] leading-[1.1] max-w-3xl"
          >
            Your land, your herd, your livelihood.{" "}
            <em className="text-[#C4883D]">Defended by people who understand it.</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-[400] text-[#F5EFE4] leading-snug mb-6"
            >
              Agricultural disputes require more than legal knowledge — they require context.
            </h2>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              A farm is not a line item on a balance sheet. It is a cattle
              operation built over generations, equipment purchased and
              maintained with care, outbuildings positioned for function,
              and land whose value can't be captured in a municipal
              assessment. When that operation is caught in a dispute —
              whether a marital breakdown, a partnership dissolution, a
              neighbour conflict, or a contract gone wrong — you need a
              legal team that understands what you're actually protecting.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              Signore &amp; Asp has advised farm families and agricultural
              operators across central Alberta. We know how to value a
              cattle herd, how to approach the division of working
              machinery, and how to protect an operation's viability while
              a legal matter is resolved. We work methodically, move at the
              right pace, and fight hard when the situation requires it.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed">
              Based in Wetaskiwin — the heart of Alberta's agricultural
              corridor — we serve farm families throughout the region.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Cattle & Livestock",
                body: "Herd valuation, ownership disputes, purchase and sale agreements, agistment contracts, and livestock losses. We understand breeding stock, market cattle, and everything in between.",
              },
              {
                title: "Farm Equipment & Tools",
                body: "Combines, tractors, implements, and specialised tools represent significant capital. We handle ownership disputes, financing conflicts, and equipment division with an accurate understanding of real-world values.",
              },
              {
                title: "Land & Buildings",
                body: "Farmland title disputes, lease and crop-share agreements, right-of-way conflicts, outbuilding ownership, and the complex treatment of improvements made to jointly held or inherited property.",
              },
              {
                title: "Marital Breakdown & Family Assets",
                body: "The division of a farm on relationship breakdown is one of the most difficult legal problems in Alberta family law. We protect the farm's operational continuity while ensuring our client's share is fully and fairly accounted for.",
              },
              {
                title: "Partnership & Succession Disputes",
                body: "Multi-generation farms and family partnerships can fracture over succession, buyout terms, or management disagreements. We help resolve those disputes before they damage the operation irreparably.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="border-l-2 border-[#C4883D] pl-5">
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[16px] font-[500] text-[#F5EFE4] mb-1"
                >
                  {title}
                </h3>
                <p className="text-[13px] text-[#8A8070] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we value */}
      <section className="bg-[#0F0D0C] border-y border-[#2C2620]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p
            style={{ letterSpacing: "0.15em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4 text-center"
          >
            What we bring to the table
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-[400] text-[#F5EFE4] text-center mb-14 max-w-2xl mx-auto"
          >
            We know what a farm operation is actually worth.
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: "🐄",
                label: "Cattle & Livestock",
                text: "Breeding value, market weight, herd composition — assessed accurately, not guessed.",
              },
              {
                icon: "🚜",
                label: "Equipment & Machinery",
                text: "Current replacement cost, depreciation, financing encumbrances, and working condition all factor in.",
              },
              {
                icon: "🏚",
                label: "Buildings & Structures",
                text: "Grain bins, shops, barns, and corrals are appraised on their functional contribution to the operation.",
              },
              {
                icon: "🌾",
                label: "Land & Improvements",
                text: "Title, crop history, drainage, fencing, and any improvements that affect value — documented and argued.",
              },
            ].map(({ icon, label, text }) => (
              <div key={label} className="text-center">
                <div className="text-3xl mb-4">{icon}</div>
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[15px] font-[500] text-[#F5EFE4] mb-2"
                >
                  {label}
                </h3>
                <p className="text-[12px] text-[#8A8070] leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marital breakdown callout */}
      <section className="border-b border-[#2C2620]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <div className="w-10 h-[2px] bg-[#C4883D] mb-6" />
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-2xl md:text-3xl font-[400] text-[#F5EFE4] leading-snug"
              >
                Farm division on marital breakdown
              </h2>
            </div>
            <div>
              <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-4">
                Alberta's <em className="text-[#D4A055]">Matrimonial Property Act</em> creates
                specific rules around exempt property, pre-marital contributions, and inherited
                assets — but applying those rules to a working farm is rarely straightforward.
                Determining what portion of an operation is exempt, what constitutes a family
                asset, and how to divide without forcing a sale requires careful legal and
                financial analysis.
              </p>
              <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-4">
                We work with agricultural appraisers, accountants, and financial analysts to
                build a complete picture of the operation's value and structure a resolution
                that recognises every party's contribution — without unnecessarily destroying
                what took decades to build.
              </p>
              <p className="text-[14px] text-[#B8AFA0] leading-relaxed">
                Whether you are the spouse who built the farm or the one who supported it,
                we ensure your interests are clearly represented and that the final outcome
                is fair to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="text-3xl md:text-4xl font-[400] text-[#F5EFE4] mb-5"
        >
          Protecting what you've built.
        </h2>
        <p className="text-[14px] text-[#8A8070] max-w-xl mx-auto mb-10">
          If your agricultural operation is caught in a legal dispute, contact
          our office. We'll sit down with you, understand the full picture, and
          tell you plainly what your options are.
        </p>
        <button
          onClick={() => onNavigate("contact")}
          className="px-8 py-3 bg-[#C4883D] text-[#0B0A09] text-[13px] font-[600] uppercase tracking-widest hover:bg-[#D4A055] transition-colors"
          style={{ letterSpacing: "0.12em" }}
        >
          Schedule a Consultation
        </button>
      </section>

      <Footer onNavigate={onNavigate} />
    </main>
  );
}

/* ─────────────────────────── CIVIL LITIGATION PAGE ─────────────────────────── */
function CivilPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <main className="min-h-screen bg-[#0B0A09]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1589216532372-1c2a367900d9?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/72 to-[#0B0A09]/20" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
          <p
            style={{ letterSpacing: "0.18em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4"
          >
            Practice Areas — Civil Litigation
          </p>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-4xl md:text-6xl font-[400] text-[#F5EFE4] leading-[1.1] max-w-3xl"
          >
            Detail-driven advocacy.{" "}
            <em className="text-[#C4883D]">Cases built to be won.</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-[400] text-[#F5EFE4] leading-snug mb-6"
            >
              Civil disputes demand precision — not assumptions.
            </h2>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              Civil litigation is won or lost on preparation. Every contract
              clause, every email exchange, every payroll record is a potential
              thread that can unravel — or reinforce — a case. At Signore &amp;
              Asp, we approach every file with the same disciplined attention to
              detail: we read everything, identify leverage early, and build
              arguments that hold up under cross-examination and judicial
              scrutiny.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              We represent individuals, families, and small businesses across
              central Alberta in proceedings from King's Bench to the Court of
              King's Bench of Alberta, including summary trials, contested
              motions, and full trials on the merits.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed">
              Whether you are pursuing a claim or defending one, we tell you
              honestly what your case is worth and what it will take to see it
              through — then we get to work.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                title: "Contract Disputes",
                body: "Breached agreements cost real money. We analyse the contract, document the breach, quantify losses, and pursue the full remedy available — including damages, specific performance, or injunctive relief.",
              },
              {
                title: "Employment Disputes",
                body: "Wrongful dismissal, constructive dismissal, unpaid wages, and human rights violations in the workplace. We hold employers accountable and secure the compensation employees are owed.",
              },
              {
                title: "Wrongful Death",
                body: "When negligence or wrongful conduct takes a life, surviving family members may have a claim for the full extent of their loss. We pursue those claims with care and conviction.",
              },
              {
                title: "Debt Recovery",
                body: "Unpaid invoices, loans, and judgments that need enforcing. We move quickly and methodically to recover what is owed.",
              },
              {
                title: "Negligence & Property Damage",
                body: "Where the carelessness of another party caused you measurable harm, we build the evidentiary record needed to establish liability and recover damages.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="border-l-2 border-[#C4883D] pl-5">
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[16px] font-[500] text-[#F5EFE4] mb-1"
                >
                  {title}
                </h3>
                <p className="text-[13px] text-[#8A8070] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domestic abuse civil claim — callout */}
      <section className="border-y border-[#C4883D]/30 bg-[#110D08]">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
            <div>
              <div className="w-10 h-[2px] bg-[#C4883D] mb-6" />
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-2xl md:text-3xl font-[400] text-[#F5EFE4] leading-snug"
              >
                Are you a victim of domestic abuse?
              </h2>
            </div>
            <div>
              <p className="text-[15px] text-[#C4883D] font-[500] mb-4">
                You may be entitled to civil compensation — beyond what the
                criminal courts can provide.
              </p>
              <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-4">
                Alberta law allows survivors of domestic abuse to bring a civil
                claim against an abuser for assault, battery, intentional
                infliction of emotional distress, and related harms. A civil
                judgment can provide financial recognition of what was done to
                you, help cover the costs of rebuilding your life, and hold an
                abuser accountable in a forum where you control the process —
                independent of whether criminal charges were ever laid.
              </p>
              <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-8">
                We handle these matters with the seriousness, confidentiality,
                and sensitivity they require. Every step is on your terms and
                at your pace. There is no obligation in speaking with us.
              </p>
              <button
                onClick={() => onNavigate("contact")}
                className="px-7 py-3 bg-[#C4883D] text-[#0B0A09] text-[12px] font-[600] uppercase hover:bg-[#D4A055] transition-colors"
                style={{ letterSpacing: "0.12em" }}
              >
                Speak with a Lawyer Confidentially
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why detail matters */}
      <section className="bg-[#0F0D0C] border-b border-[#2C2620]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p
            style={{ letterSpacing: "0.15em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4 text-center"
          >
            Our approach
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-[400] text-[#F5EFE4] text-center mb-14"
          >
            Attention to detail is not a slogan — it is how cases are won.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                heading: "We read everything",
                text: "Contracts, correspondence, pay stubs, records of employment — we review the complete paper trail before forming a view of your case, because the decisive detail is rarely where you expect it.",
              },
              {
                heading: "We quantify every loss",
                text: "Courts award what you can prove. We work methodically to put a number to every head of damages — economic and non-economic — so nothing is left on the table.",
              },
              {
                heading: "We are candid with you",
                text: "We tell you the strengths and the weaknesses of your position, the realistic range of outcomes, and the cost of pursuing each path. Informed clients make better decisions.",
              },
            ].map(({ heading, text }) => (
              <div key={heading}>
                <div className="w-8 h-px bg-[#C4883D] mb-5" />
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[18px] font-[500] text-[#F5EFE4] mb-3"
                >
                  {heading}
                </h3>
                <p className="text-[13px] text-[#8A8070] leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="text-3xl md:text-4xl font-[400] text-[#F5EFE4] mb-5"
        >
          Ready to pursue what you are owed?
        </h2>
        <p className="text-[14px] text-[#8A8070] max-w-xl mx-auto mb-10">
          Contact our Wetaskiwin office to discuss your civil matter. We'll
          assess the merits of your claim and explain what pursuing it would
          look like in practical terms — no jargon, no pressure.
        </p>
        <button
          onClick={() => onNavigate("contact")}
          className="px-8 py-3 bg-[#C4883D] text-[#0B0A09] text-[13px] font-[600] uppercase tracking-widest hover:bg-[#D4A055] transition-colors"
          style={{ letterSpacing: "0.12em" }}
        >
          Schedule a Consultation
        </button>
      </section>

      <Footer onNavigate={onNavigate} />
    </main>
  );
}

/* ─────────────────────────── PERSONAL INJURY PAGE ─────────────────────────── */
function PersonalInjuryPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <main className="min-h-screen bg-[#0B0A09]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/72 to-[#0B0A09]/20" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
          <p
            style={{ letterSpacing: "0.18em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4"
          >
            Practice Areas — Personal Injury
          </p>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-4xl md:text-6xl font-[400] text-[#F5EFE4] leading-[1.1] max-w-3xl"
          >
            Your injury is real.{" "}
            <em className="text-[#C4883D]">Your compensation should be too.</em>
          </h1>
        </div>
      </section>

      {/* Opening statement */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-10">
        <div className="max-w-2xl">
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-[400] text-[#F5EFE4] leading-snug mb-6"
          >
            An injury changes everything. Get a lawyer in your corner.
          </h2>
          <p className="text-[15px] text-[#B8AFA0] leading-relaxed mb-5">
            A serious injury can strip away your income, your independence, and
            your sense of the future — in seconds. Medical bills pile up. Work
            stops. Your family absorbs the impact alongside you. And on the
            other side of the table, insurance companies have experienced
            adjusters whose job is to pay you as little as possible.
          </p>
          <p className="text-[15px] text-[#B8AFA0] leading-relaxed">
            At Signore &amp; Asp, we even that imbalance. We investigate your
            claim thoroughly, document every loss — past wages, future earning
            capacity, pain and suffering, out-of-pocket expenses — and pursue
            the full amount you are entitled to under Alberta law. You
            concentrate on healing. We handle the fight.
          </p>
        </div>
      </section>

      {/* What we recover */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-14">
          <div>
            <p
              style={{ letterSpacing: "0.15em" }}
              className="text-[10px] uppercase text-[#C4883D] font-[600] mb-6"
            >
              What we pursue for you
            </p>
            <div className="space-y-5">
              {[
                {
                  label: "Medical expenses",
                  detail:
                    "Hospital stays, surgery, physiotherapy, rehabilitation, prescription medication, and any ongoing care your injury demands.",
                },
                {
                  label: "Lost income & earning capacity",
                  detail:
                    "Wages lost while you recover, and compensation for a long-term reduction in your ability to work and earn.",
                },
                {
                  label: "Pain and suffering",
                  detail:
                    "Non-economic losses — the physical pain, emotional distress, and diminished quality of life that statistics cannot fully capture.",
                },
                {
                  label: "Out-of-pocket costs",
                  detail:
                    "Travel to appointments, home modifications, personal care assistance, and other direct expenses flowing from the injury.",
                },
                {
                  label: "Family member losses",
                  detail:
                    "In serious cases, compensation for the impact on a spouse or dependants, including loss of guidance and companionship.",
                },
              ].map(({ label, detail }) => (
                <div key={label} className="border-l-2 border-[#C4883D] pl-5">
                  <p
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-[15px] font-[500] text-[#F5EFE4] mb-1"
                  >
                    {label}
                  </p>
                  <p className="text-[13px] text-[#8A8070] leading-relaxed">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{ letterSpacing: "0.15em" }}
              className="text-[10px] uppercase text-[#C4883D] font-[600] mb-6"
            >
              Cases we handle
            </p>
            <div className="space-y-4">
              {[
                "Motor vehicle accidents — cars, trucks, motorcycles",
                "Slip, trip &amp; fall on private or public property",
                "Workplace injuries and industrial accidents",
                "Dog bites and animal attacks",
                "Product liability and defective equipment",
                "Wrongful death claims on behalf of surviving family",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-[6px] w-[5px] h-[5px] rounded-full bg-[#C4883D] shrink-0" />
                  <p
                    className="text-[13px] text-[#B8AFA0] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 border border-[#2C2620] p-7">
              <p
                style={{ fontFamily: "var(--font-display)" }}
                className="text-[17px] font-[400] italic text-[#C4883D] leading-snug mb-3"
              >
                "Insurance companies don't volunteer fair offers. They make them
                when they know you have someone who will hold them to account."
              </p>
              <p className="text-[11px] text-[#6B6258] uppercase tracking-widest">
                Signore &amp; Asp — Personal Injury Counsel
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The difficulty section */}
      <section className="bg-[#0F0D0C] border-y border-[#2C2620]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p
            style={{ letterSpacing: "0.15em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4 text-center"
          >
            The reality of injury claims
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-[400] text-[#F5EFE4] text-center mb-14 max-w-2xl mx-auto"
          >
            The losses go far deeper than the medical bills.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                heading: "The financial toll",
                text: "Lost wages, mounting treatment costs, and the lasting impact on your career can create financial stress that outlasts the physical injury itself. Every dollar of compensation matters.",
              },
              {
                heading: "The personal toll",
                text: "Chronic pain, anxiety, and the loss of activities you once took for granted are real injuries — even when invisible. We make sure those losses are documented and argued, not dismissed.",
              },
              {
                heading: "The clock is ticking",
                text: "Alberta's Limitations Act places strict deadlines on personal injury claims. The sooner you speak with a lawyer, the stronger the evidence we can gather and the more options you have.",
              },
            ].map(({ heading, text }) => (
              <div key={heading}>
                <div className="w-8 h-px bg-[#C4883D] mb-5" />
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[18px] font-[500] text-[#F5EFE4] mb-3"
                >
                  {heading}
                </h3>
                <p className="text-[13px] text-[#8A8070] leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="text-3xl md:text-4xl font-[400] text-[#F5EFE4] mb-5"
        >
          Don't negotiate alone.
        </h2>
        <p className="text-[14px] text-[#8A8070] max-w-xl mx-auto mb-10">
          A consultation costs you nothing and tells you exactly where you
          stand. We'll review the facts, explain your rights, and let you decide
          your next step — with no pressure and no obligation.
        </p>
        <button
          onClick={() => onNavigate("contact")}
          className="px-8 py-3 bg-[#C4883D] text-[#0B0A09] text-[13px] font-[600] uppercase tracking-widest hover:bg-[#D4A055] transition-colors"
          style={{ letterSpacing: "0.12em" }}
        >
          Book a Free Consultation
        </button>
      </section>

      <Footer onNavigate={onNavigate} />
    </main>
  );
}

/* ─────────────────────────── WILLS PAGE ─────────────────────────── */
function WillsPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <main className="min-h-screen bg-[#0B0A09]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/70 to-[#0B0A09]/20" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
          <p
            style={{ letterSpacing: "0.18em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4"
          >
            Practice Areas — Wills &amp; Estates
          </p>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-4xl md:text-6xl font-[400] text-[#F5EFE4] leading-[1.1] max-w-3xl"
          >
            Plan for the unforeseen.{" "}
            <em className="text-[#C4883D]">Protect the ones you love.</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-[400] text-[#F5EFE4] leading-snug mb-6"
            >
              Don't leave your family without guidance.
            </h2>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              None of us can predict what tomorrow holds. A properly drafted
              will, a clear power of attorney, and a thoughtful estate plan are
              among the most important gifts you can leave the people who depend
              on you. They eliminate uncertainty at the hardest possible moment.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed mb-5">
              At Signore &amp; Asp we guide individuals and families through
              every stage of estate planning — from a first will to complex
              multi-generational arrangements. Our goal is to make sure your
              wishes are honoured, your assets are protected, and your loved
              ones are spared unnecessary conflict or delay.
            </p>
            <p className="text-[14px] text-[#B8AFA0] leading-relaxed">
              We serve clients across central Alberta from our Wetaskiwin
              office, and we take the time to understand your full picture
              before drafting a single document.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                title: "Wills",
                body: "A valid, clearly written will is the cornerstone of any estate plan. We draft documents that accurately reflect your intentions and withstand scrutiny.",
              },
              {
                title: "Powers of Attorney",
                body: "Enduring powers of attorney for property and personal care decisions ensure that a trusted person can act on your behalf if you become incapacitated.",
              },
              {
                title: "Personal Directives",
                body: "Sometimes called a living will, a personal directive sets out your healthcare and personal-care wishes so they are respected when you cannot speak for yourself.",
              },
              {
                title: "Estate Administration",
                body: "We assist executors with the probate process, asset distribution, creditor claims, and the many administrative steps that follow the passing of a loved one.",
              },
              {
                title: "Trusts",
                body: "Trusts can protect assets, provide for minors or dependants with special needs, and reduce the tax burden on your estate. We help structure them to fit your goals.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="border-l-2 border-[#C4883D] pl-5">
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[16px] font-[500] text-[#F5EFE4] mb-1"
                >
                  {title}
                </h3>
                <p className="text-[13px] text-[#8A8070] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why plan now */}
      <section className="bg-[#0F0D0C] border-y border-[#2C2620]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p
            style={{ letterSpacing: "0.15em" }}
            className="text-[10px] uppercase text-[#C4883D] font-[600] mb-4 text-center"
          >
            Why act now
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-[400] text-[#F5EFE4] text-center mb-14"
          >
            The best time to plan is before you need to.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                heading: "Protect your family",
                text: "Without a will, Alberta's intestacy rules determine who inherits. Those rules may not reflect your wishes — and they can create hardship for a surviving spouse or common-law partner.",
              },
              {
                heading: "Avoid probate delays",
                text: "A well-structured estate can pass to beneficiaries with minimal court involvement, sparing your family months of waiting and thousands in unnecessary fees.",
              },
              {
                heading: "Provide for dependants",
                text: "Minor children, a dependent parent, or a family member with special needs all require careful planning. A trust or specific bequest ensures they are cared for on your terms.",
              },
            ].map(({ heading, text }) => (
              <div key={heading}>
                <div className="w-8 h-px bg-[#C4883D] mb-5" />
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[18px] font-[500] text-[#F5EFE4] mb-3"
                >
                  {heading}
                </h3>
                <p className="text-[13px] text-[#8A8070] leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="text-3xl md:text-4xl font-[400] text-[#F5EFE4] mb-5"
        >
          Start the conversation today.
        </h2>
        <p className="text-[14px] text-[#8A8070] max-w-xl mx-auto mb-10">
          Estate planning doesn't have to be complicated. A single meeting is
          often all it takes to put a solid plan in place. Contact our office
          in Wetaskiwin and we'll walk you through your options.
        </p>
        <button
          onClick={() => onNavigate("contact")}
          className="px-8 py-3 bg-[#C4883D] text-[#0B0A09] text-[13px] font-[600] uppercase tracking-widest hover:bg-[#D4A055] transition-colors"
          style={{ letterSpacing: "0.12em" }}
        >
          Schedule a Consultation
        </button>
      </section>

      <Footer onNavigate={onNavigate} />
    </main>
  );
}

/* ─────────────────────────── CONTACT PAGE ─────────────────────────── */
function ContactPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    matter: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(
        "https://levbxgicxwfriubnczld.supabase.co/functions/v1/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
    } catch {
      setError("Something went wrong. Please call us directly at 1(866)915-1877.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0B0A09] pt-[96px]">
      <section className="border-b border-[#2C2620]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <SectionDivider />
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h1
                style={{ fontFamily: "var(--font-display)", lineHeight: 1.1 }}
                className="text-[40px] md:text-[58px] font-[400] text-[#F5EFE4] mb-6"
              >
                Authority, Precision{" "}
                <em className="not-italic text-[#C4883D]">&amp; Discretion</em>
              </h1>
              <p className="text-[14px] text-[#8A8070] leading-relaxed mb-10">
                Every consultation is strictly confidential. We listen first and
                advise second — no pressure, no obligation.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  { label: "Main Office", val: "5211 50th Avenue, Wetaskiwin, Alberta T9A 0S7" },
                  { label: "Phone", val: "1(866)915-1877" },
                  { label: "Email", val: "info@signore-asplaw.com" },
                  { label: "Office Hours", val: "Mon–Fri 8:30 am – 5:00 pm" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex gap-8 border-b border-[#2C2620] pb-6 last:border-0"
                  >
                    <p
                      style={{ letterSpacing: "0.08em" }}
                      className="text-[10px] uppercase text-[#6B6258] font-[600] w-28 flex-shrink-0 pt-0.5"
                    >
                      {item.label}
                    </p>
                    <p className="text-[13px] text-[#B8AFA0]">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              {sent ? (
                <div className="border border-[#C4883D]/30 p-8 text-center">
                  <div className="w-12 h-12 border border-[#C4883D] flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="text-[#C4883D]"
                    >
                      <path
                        d="M3 10L8 15L17 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-[24px] font-[400] text-[#F5EFE4] mb-3"
                  >
                    Message received
                  </h3>
                  <p className="text-[13px] text-[#6B6258] leading-relaxed mb-6">
                    We'll respond within one business day. For urgent criminal
                    matters, please call our after-hours line directly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-[11px] text-[#C4883D] uppercase tracking-wider hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { name: "name", label: "Full Name", type: "text" },
                    { name: "email", label: "Email Address", type: "email" },
                    { name: "phone", label: "Phone Number", type: "tel" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label
                        style={{ letterSpacing: "0.08em" }}
                        className="block text-[10px] uppercase text-[#6B6258] font-[600] mb-2"
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={form[field.name as keyof typeof form]}
                        onChange={(e) =>
                          setForm({ ...form, [field.name]: e.target.value })
                        }
                        className="w-full bg-[#161412] border border-[#2C2620] px-4 py-3 text-[13px] text-[#F5EFE4] placeholder-[#3A3530] focus:outline-none focus:border-[#C4883D] transition-colors"
                        required
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      style={{ letterSpacing: "0.08em" }}
                      className="block text-[10px] uppercase text-[#6B6258] font-[600] mb-2"
                    >
                      Type of Matter
                    </label>
                    <select
                      value={form.matter}
                      onChange={(e) =>
                        setForm({ ...form, matter: e.target.value })
                      }
                      className="w-full bg-[#161412] border border-[#2C2620] px-4 py-3 text-[13px] text-[#F5EFE4] focus:outline-none focus:border-[#C4883D] transition-colors"
                      required
                    >
                      <option value="" disabled>
                        Select a practice area
                      </option>
                      <option>Family Law</option>
                      <option>Criminal Defence</option>
                      <option>Wills &amp; Estates</option>
                      <option>Personal Injury</option>
                      <option>Real Estate</option>
                      <option>Civil Litigation</option>
                      <option>Farm &amp; Agricultural Disputes</option>
                      <option>Domestic Abuse Civil Claims</option>
                      <option>Emergency Protection Orders</option>
                      <option>Dependent Adult Applications</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{ letterSpacing: "0.08em" }}
                      className="block text-[10px] uppercase text-[#6B6258] font-[600] mb-2"
                    >
                      Brief Description
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      rows={5}
                      className="w-full bg-[#161412] border border-[#2C2620] px-4 py-3 text-[13px] text-[#F5EFE4] placeholder-[#3A3530] focus:outline-none focus:border-[#C4883D] transition-colors resize-none"
                      placeholder="Briefly describe your matter…"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{ letterSpacing: "0.12em" }}
                    className="w-full bg-[#C4883D] text-[#0B0A09] py-4 text-[11px] uppercase font-[600] hover:bg-[#D4A055] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending…" : "Send Confidential Message"}
                  </button>

                  {error && (
                    <p className="text-[12px] text-red-400 text-center">{error}</p>
                  )}

                  <p className="text-[11px] text-[#3A3530] text-center">
                    Submission of this form does not create a solicitor-client
                    relationship.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────── */
function Footer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <footer className="border-t border-[#2C2620] bg-[#0B0A09]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Logo onClick={() => onNavigate("home")} />
            <p className="text-[12px] text-[#6B6258] leading-relaxed mt-5 max-w-[220px]">
              Commanding advocates serving Wetaskiwin and surrounding
              communities across Alberta.
            </p>
          </div>

          <div>
            <p
              style={{ letterSpacing: "0.1em" }}
              className="text-[10px] uppercase text-[#6B6258] font-[600] mb-4"
            >
              Practice
            </p>
            <ul className="space-y-3">
              {[
                { label: "Family Law", page: "family" as Page },
                { label: "Criminal Defence", page: "criminal" as Page },
                { label: "Wills & Estates", page: "wills" as Page },
                { label: "Personal Injury", page: "injury" as Page },
                { label: "Real Estate", page: "realestate" as Page },
                { label: "Civil Litigation", page: "civil" as Page },
                { label: "Farm & Agricultural Disputes", page: "farm" as Page },
                { label: "Domestic Abuse Civil Claims", page: "domestic" as Page },
                { label: "Emergency Protection Orders", page: "epo" as Page },
                { label: "Dependent Adult Applications", page: "dependent" as Page },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="text-[12px] text-[#8A8070] hover:text-[#C4883D] transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              style={{ letterSpacing: "0.1em" }}
              className="text-[10px] uppercase text-[#6B6258] font-[600] mb-4"
            >
              Firm
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-[12px] text-[#8A8070] hover:text-[#C4883D] transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              style={{ letterSpacing: "0.1em" }}
              className="text-[10px] uppercase text-[#6B6258] font-[600] mb-4"
            >
              Contact
            </p>
            <ul className="space-y-3">
              <li className="text-[12px] text-[#8A8070]">
                5211 50th Avenue, Wetaskiwin, Alberta T9A 0S7
              </li>
              <li className="text-[12px] text-[#8A8070]">1(866)915-1877</li>
              <li className="text-[12px] text-[#8A8070]">
                info@signore-asplaw.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2C2620] pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-[11px] text-[#3A3530]">
            © {new Date().getFullYear()} Signore &amp; Asp LLP. All rights
            reserved.
          </p>
          <p className="text-[11px] text-[#3A3530]">
            Licensed to practise law in the Province of Alberta.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── APP ROOT ─────────────────────────── */
export default function App() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="min-h-screen bg-[#0B0A09]">
      <Navbar current={page} onNavigate={navigate} />

      {page === "home" && <HomePage onNavigate={navigate} />}
      {page === "team" && <TeamPage onNavigate={navigate} />}
      {page === "practice" && <PracticePage onNavigate={navigate} />}
      {page === "criminal" && <CriminalPage onNavigate={navigate} />}
      {page === "family" && <FamilyPage onNavigate={navigate} />}
      {page === "wills" && <WillsPage onNavigate={navigate} />}
      {page === "injury" && <PersonalInjuryPage onNavigate={navigate} />}
      {page === "civil" && <CivilPage onNavigate={navigate} />}
      {page === "farm" && <FarmPage onNavigate={navigate} />}
      {page === "domestic" && <DomesticAbusePage onNavigate={navigate} />}
      {page === "realestate" && <RealEstatePage onNavigate={navigate} />}
      {page === "epo" && <EPOPage onNavigate={navigate} />}
      {page === "dependent" && <DependentAdultPage onNavigate={navigate} />}
      {page === "contact" && <ContactPage onNavigate={navigate} />}
    </div>
  );
}
