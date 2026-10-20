import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, useLocation } from "react-router-dom";
import { OperationPage, NotFoundPage } from "./components/OperationPage";
import { ContactInquiry } from "./components/ContactInquiry";
import { operations } from "./operations";
import { companyContact } from "./company";
import { contentSources } from "./contentSources";
import { CommunitySection } from "./components/CommunitySection";
import { OperationsMenu } from "./components/OperationsMenu";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Mountain,
  Compass,
  Leaf,
  Layers3,
  MapPin,
  Plus,
  Minus,
  Globe2,
  MoveUpRight,
  Mail,
  Building2,
} from "lucide-react";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "./styles.css";
import "./pages.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./theme.css";

type Project = {
  title: string;
  region: string;
  type: string;
  description: string;
  position: string;
  number: string;
  slug: string;
};
const projects: Project[] = [
  {
    title: "Swarnagiri Gold Project",
    region: "Andhra Pradesh, India",
    type: "Mining",
    description:
      "The Swarnagiri project in Kurnool District, Andhra Pradesh, connects a published 0.4 MTPA mining plan with integrated gold processing.",
    position: "center 65%",
    number: "01",
    slug: "mining",
  },
  {
    title: "Gold Processing Plant",
    region: "From ore to opportunity",
    type: "Processing",
    description:
      "Explore the published main-plant design: three-stage crushing, ball milling, gravity recovery, and carbon-in-leach treatment. The company also describes an established gravity-recovery pilot plant.",
    position: "center",
    number: "02",
    slug: "gold-processing",
  },
  {
    title: "Exploration portfolio",
    region: "Exploration across India",
    type: "Exploration",
    description:
      "Established in 1994, Geomysore and its associates have explored more than 35,000 square kilometres across India. Field mapping, geophysical surveys, and drilling inform its work.",
    position: "20% 80%",
    number: "03",
    slug: "exploration",
  },
];
const faqs = [
  [
    "What does Geo Mysore do?",
    "Geo Mysore works across gold exploration, mining, and processing in India. From understanding a mineral deposit to processing the ore, these activities connect each stage of the gold value chain.",
  ],
  [
    "Where is the Swarnagiri project located?",
    "The Swarnagiri Gold Project is located near Swarnagiri, Erragudi, and Pagadirayi villages in Tuggali Mandal, Kurnool District, Andhra Pradesh. The company publishes a mining lease area of 597.82 hectares.",
  ],
  [
    "How can I explore a partnership?",
    "Use “Get in touch” to prepare a partnership inquiry, then open an email draft addressed to reception@geomysore.com or download a copy. You review and send the email through your own email app.",
  ],
];
const responsibilityPrinciples = [
  {
    title: "Respect for the environment",
    icon: Leaf,
    text: "Geomysore’s green initiatives describe water recycling and conservation, solar power, low-emission transport, waste segregation, and plantation around operating areas.",
  },
  {
    title: "Connection with communities",
    icon: Globe2,
    text: "The company’s CSR work includes education support, health camps, drinking-water supply, village sanitation, and local skills training.",
  },
  {
    title: "A considered path forward",
    icon: Mountain,
    text: "The published sustainability approach includes repurposing waste rock into aggregates and manufactured sand, tailings-brick initiatives, reusing drilling roads, and land reclamation.",
  },
];
function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      className={`brand ${light ? "brand-light" : ""}`}
      to="/#home"
      aria-label="Geo Mysore home"
    >
      <img
        className="official-mark"
        src="/images/official-logo.png"
        alt=""
        width="314"
        height="335"
      />
      <span>
        GEOMYSORE<small>SERVICES INDIA PVT LTD</small>
      </span>
    </Link>
  );
}
function App() {
  const location = useLocation();
  const operation = operations.find(
    (item) => location.pathname === `/operations/${item.slug}`,
  );
  const isHome = location.pathname === "/";
  const [menu, setMenu] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [contactSubject, setContactSubject] = useState("General inquiry");
  const [filter, setFilter] = useState("All projects");
  const [project, setProject] = useState<Project | null>(null);
  const [contact, setContact] = useState(false);
  const [processStage, setProcessStage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openPrinciple, setOpenPrinciple] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState("home");
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const modalOpen = contact || !!project;
  useEffect(() => {
    if (!modalOpen) return;
    triggerRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContact(false);
        setProject(null);
      }
      if (event.key === "Tab") {
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(
            '[role="dialog"] button, [role="dialog"] input, [role="dialog"] select, [role="dialog"] textarea, [role="dialog"] a[href]',
          ),
        );
        const first = elements[0],
          last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", key);
      triggerRef.current?.focus();
    };
  }, [modalOpen]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);
  useEffect(() => {
    setMenu(false);
    setProject(null);
    setContact(false);
    document.title = operation
      ? `${operation.title} | Geo Mysore`
      : isHome
        ? "Geo Mysore — Grounded in discovery"
        : "Page not found | Geo Mysore";
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (description)
      description.content = operation
        ? operation.intro
        : "Explore Geo Mysore’s gold exploration, mining, and processing business in India.";
    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        document
          .getElementById(decodeURIComponent(location.hash.slice(1)))
          ?.scrollIntoView({ behavior: "instant" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, operation, isHome]);
  useEffect(() => {
    if (!menu) return;
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", closeMenu);
    return () => document.removeEventListener("keydown", closeMenu);
  }, [menu]);
  const showContact = (subject = "General inquiry") => {
    setMenu(false);
    setContactSubject(subject);
    setContact(true);
  };
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="announcement">
        <span className="announcement-location">
          <span className="status-dot" /> INDIA’S MINERAL POTENTIAL. A WORLD OF
          POSSIBILITY.
        </span>
        <a href={contentSources.company} target="_blank" rel="noreferrer">
          EXPLORING SINCE 1994 <ArrowUpRight size={11} />
        </a>
      </div>
      <header className="header">
        <div className="header-inner">
          <Logo />
          <nav
            className={menu ? "nav nav-open" : "nav"}
            aria-label="Main navigation"
          >
            {[
              ["home", "Home"],
              ["about", "Company"],
              ["projects", "Our operations"],
              ["processing", "Gold processing"],
              ["responsibility", "Responsibility"],
            ].map(([id, label]) =>
              id === "projects" ? (
                <OperationsMenu
                  key={id}
                  active={(!isHome && !!operation) || activeNav === "projects"}
                  onNavigate={() => setMenu(false)}
                />
              ) : (
                <Link
                  className={
                    (isHome && activeNav === id) ||
                    (!isHome && id === "projects" && operation)
                      ? "active"
                      : ""
                  }
                  aria-current={
                    isHome && activeNav === id ? "location" : undefined
                  }
                  key={id}
                  to={`/#${id}`}
                  onClick={() => setMenu(false)}
                >
                  {label}
                </Link>
              ),
            )}
            <button
              className="button nav-contact"
              onClick={() => showContact()}
            >
              Get in touch <ArrowUpRight size={17} />
            </button>
          </nav>
          <button
            className="menu-toggle"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        {operation ? (
          <OperationPage
            key={operation.slug}
            operation={operation}
            onInquiry={showContact}
          />
        ) : !isHome ? (
          <NotFoundPage />
        ) : (
          <>
            <section className="hero" id="home" data-slide={heroSlide}>
              <div
                className={`hero-photo hero-slide-${heroSlide}`}
                role="img"
                aria-label={
                  heroSlide === 0
                    ? "Swarnagiri open-pit mine, from the company website"
                    : heroSlide === 1
                      ? "Aerial photograph of the Geomysore project site"
                      : "Geomysore exploration drilling rig"
                }
                style={{
                  backgroundImage:
                    heroSlide === 1
                      ? "url('/images/site-aerial.webp')"
                      : heroSlide === 2
                        ? "url('/images/exploration-rig.jpg')"
                        : undefined,
                  backgroundPosition: heroSlide === 2 ? "center" : undefined,
                }}
              />
              <div className="hero-shade" />
              <div className="hero-contours" />
              <div className="hero-content container">
                <div className="eyebrow light">
                  <span /> A LONG VIEW. A LASTING DIFFERENCE.
                </div>
                <h1>
                  {heroSlide === 0 ? (
                    <>
                      A deeper
                      <br />
                      <em>perspective.</em>
                    </>
                  ) : heroSlide === 1 ? (
                    <>
                      Potential.
                      <br />
                      <em>Made possible.</em>
                    </>
                  ) : (
                    <>
                      Driven by
                      <br />
                      <em>discovery.</em>
                    </>
                  )}
                </h1>
                <p>
                  Exploration, mining and gold processing.
                  <br />
                  One connected vision for India’s resources.
                </p>
                <div className="hero-actions">
                  <a className="button button-lime" href="#projects">
                    Explore our projects <ArrowUpRight size={19} />
                  </a>
                  <a className="text-link light-link" href="#about">
                    Our story <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
              <Link
                className="hero-project-preview"
                to={`/operations/${["mining", "gold-processing", "exploration"][heroSlide]}`}
              >
                <span>
                  <small>
                    {heroSlide === 0
                      ? "FEATURED PROJECT"
                      : heroSlide === 1
                        ? "FROM SOURCE TO VALUE"
                        : "THE NEXT POSSIBILITY"}
                  </small>
                  <strong>
                    {heroSlide === 0
                      ? "Swarnagiri Gold Project"
                      : heroSlide === 1
                        ? "Gold processing"
                        : "Geological exploration"}
                  </strong>
                </span>
                <span className="round-arrow">
                  <ArrowUpRight size={24} />
                </span>
              </Link>
              <div className="hero-bottom">
                <div className="container hero-bottom-inner">
                  <div className="hero-location">
                    <MapPin size={15} />
                    <span>SWARNAGIRI, ANDHRA PRADESH</span>
                    <span className="hero-divider" /> INDIA
                  </div>
                  <div
                    className="hero-index"
                    role="group"
                    aria-label="Featured highlights"
                  >
                    {["Mining", "Processing", "Exploration"].map((name, i) => (
                      <button
                        key={name}
                        aria-label={`Show ${name.toLowerCase()} highlight`}
                        aria-pressed={heroSlide === i}
                        onClick={() => setHeroSlide(i)}
                      >
                        <span>0{i + 1}</span>
                        <strong>{name}</strong>
                        <ArrowUpRight size={15} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <div className="principles-strip">
              <div className="container">
                <span>EXPLORATION WITH INTENTION</span>
                <div>
                  <Compass size={17} /> From exploration to gold
                </div>
                <div>
                  <Leaf size={17} /> Responsible development
                </div>
                <div>
                  <Layers3 size={17} /> Long-term value
                </div>
              </div>
            </div>
            <section className="about section container" id="about">
              <div className="section-kicker">
                <span className="tiny-plus">+</span> THE GROUND WE STAND ON
              </div>
              <div className="about-grid">
                <h2>
                  Grounded in India.
                  <br />
                  <span>Looking further.</span>
                </h2>
                <div className="about-copy">
                  <p>
                    Geomysore Services India Pvt Ltd has explored and developed
                    India’s precious and base metal resources since 1994. The
                    company and its associates report exploration across more
                    than 35,000 square kilometres in eight Indian states.
                  </p>
                  <p className="muted">
                    At Swarnagiri in Andhra Pradesh, that experience connects
                    mineral exploration with open-pit mining, a gravity-recovery
                    pilot plant, and an integrated gold processing design.
                  </p>
                  <a className="text-link" href="#approach">
                    Get to know our approach <ArrowUpRight size={19} />
                  </a>
                </div>
              </div>
              <div
                className="company-facts"
                aria-label="Published company facts"
              >
                {[
                  ["1994", "Established"],
                  ["35,000+ km²", "Explored by company & associates"],
                  ["0.4 MTPA", "Published permitted mining capacity"],
                  ["0.3 MTPA", "Published processing capacity"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <p className="company-source-note">
                Figures published on the company’s website. Capacity is not a
                statement of current output.{" "}
                <a href={contentSources.home} target="_blank" rel="noreferrer">
                  View source <ArrowUpRight size={11} />
                </a>
              </p>
            </section>
            <section className="projects-section section" id="projects">
              <div className="container">
                <div className="section-kicker">
                  <span className="tiny-plus">+</span> WHERE POTENTIAL TAKES
                  SHAPE
                </div>
                <div className="section-heading">
                  <div>
                    <h2>
                      Our operations. <span>Connected by purpose.</span>
                    </h2>
                    <p>
                      From understanding the resource to unlocking its value.
                    </p>
                  </div>
                  <a className="text-link" href="#project-grid">
                    Discover our portfolio <ArrowUpRight size={19} />
                  </a>
                </div>
                <div
                  className="project-tabs"
                  role="group"
                  aria-label="Filter projects"
                >
                  {["All projects", "Mining", "Processing", "Exploration"].map(
                    (value) => (
                      <button
                        key={value}
                        aria-pressed={filter === value}
                        className={filter === value ? "selected" : ""}
                        onClick={() => setFilter(value)}
                      >
                        {value}
                        {value === "All projects" && <span>03</span>}
                      </button>
                    ),
                  )}
                </div>
                <div className="project-grid" id="project-grid">
                  {projects
                    .filter(
                      (p) => filter === "All projects" || p.type === filter,
                    )
                    .map((p) => (
                      <article className="project-tile" key={p.slug}>
                        <button
                          className={`project-card project-${p.number}`}
                          onClick={() => setProject(p)}
                        >
                          <div
                            className="project-image"
                            style={{ backgroundPosition: p.position }}
                          >
                            <span className="project-type">
                              <span />
                              {p.type === "Mining"
                                ? "FEATURED PROJECT"
                                : p.type.toUpperCase()}
                            </span>
                            <div className="project-image-lines" />
                            <span className="project-open">
                              <ArrowUpRight size={22} />
                            </span>
                          </div>
                          <div className="project-info">
                            <div className="project-location">
                              <MapPin size={12} />
                              {p.region}
                            </div>
                            <h3>{p.title}</h3>
                            <span className="project-subtitle">
                              {p.type === "Mining"
                                ? "Discover the story beneath the surface"
                                : p.type === "Processing"
                                  ? "Turning mineral potential into value"
                                  : "Mapping the possibilities ahead"}{" "}
                              <ArrowRight size={16} />
                            </span>
                          </div>
                        </button>
                        <Link
                          className="project-full-link"
                          to={`/operations/${p.slug}`}
                        >
                          Explore {p.type.toLowerCase()}{" "}
                          <ArrowUpRight size={14} />
                        </Link>
                      </article>
                    ))}
                </div>
                <p className="portfolio-note">
                  An introduction to our portfolio. Contact us for verified
                  project information and current updates.
                </p>
              </div>
            </section>
            <section
              className="processing-section section container"
              id="processing"
            >
              <div className="processing-header">
                <div>
                  <div className="section-kicker">
                    <span className="tiny-plus">+</span> THE NEXT CHAPTER IN THE
                    JOURNEY
                  </div>
                  <h2>
                    Ore. Expertise.
                    <br />
                    <span>Opportunity.</span>
                  </h2>
                </div>
                <div>
                  <p>
                    The published Swarnagiri processing design brings together
                    three-stage crushing, ball milling, gravity recovery, and
                    carbon-in-leach treatment. An established pilot plant uses
                    gravity recovery to develop practical process understanding.
                  </p>
                  <Link className="text-link" to="/operations/gold-processing">
                    Discover gold processing <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
              <div className="processing-feature">
                <div
                  className="plant-photo"
                  role="img"
                  aria-label="Processing equipment photographed in Geomysore’s original plant gallery"
                >
                  <span className="plant-caption">
                    GOLD PROCESSING <span>PRECISION. AT EVERY STAGE.</span>
                  </span>
                </div>
                <div className="process-panel">
                  <div className="section-kicker">A CONNECTED PROCESS</div>
                  <div
                    className="process-tabs"
                    role="tablist"
                    aria-label="Gold processing stages"
                  >
                    {["Prepare", "Recover", "Control"].map((stage, i) => (
                      <button
                        id={`stage-${i}`}
                        aria-controls="process-detail"
                        aria-selected={processStage === i}
                        role="tab"
                        tabIndex={processStage === i ? 0 : -1}
                        key={stage}
                        onClick={() => setProcessStage(i)}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                            e.preventDefault();
                            const next =
                              (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                            setProcessStage(next);
                            document.getElementById(`stage-${next}`)?.focus();
                          }
                        }}
                      >
                        <span>0{i + 1}</span>
                        {stage}
                      </button>
                    ))}
                  </div>
                  <div
                    id="process-detail"
                    role="tabpanel"
                    aria-labelledby={`stage-${processStage}`}
                    tabIndex={0}
                  >
                    <Layers3 size={32} strokeWidth={1} />
                    <h3>
                      {
                        [
                          "It starts with the ore.",
                          "Realising the potential.",
                          "Care in every detail.",
                        ][processStage]
                      }
                    </h3>
                    <p>
                      {
                        [
                          "The published main-plant design uses three-stage crushing followed by a ball mill in closed circuit with a hydrocyclone. Its nominal design basis is 1,000 tonnes per day at 50 tonnes per hour milling.",
                          "The main flowsheet describes gravity recovery and carbon-in-leach treatment, followed by carbon elution, electrowinning, and doré smelting. The pilot plant is described as a gravity-recovery circuit.",
                          "Published testwork covers grind size, reagent consumption, leach time, slurry density, settling, and detoxification. The main design includes tailings detoxification before disposal.",
                        ][processStage]
                      }
                    </p>
                  </div>
                  <span className="process-footnote">
                    Published plant design ·{" "}
                    <a
                      href={contentSources.processing}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read the company’s processing page ↗
                    </a>
                  </span>
                </div>
              </div>
            </section>
            <section className="responsibility section" id="responsibility">
              <div className="container responsibility-grid">
                <div className="responsibility-visual">
                  <div className="leaf-visual" />
                  <div className="visual-cross cross-one">+</div>
                  <div className="visual-cross cross-two">+</div>
                  <div className="image-caption">
                    <span className="status-dot" /> A LONG-TERM PERSPECTIVE
                  </div>
                  <div className="visual-stamp">
                    <Leaf size={27} />
                    <span>
                      OUR FUTURE.
                      <br />
                      OUR RESPONSIBILITY.
                    </span>
                  </div>
                </div>
                <div className="responsibility-copy">
                  <div className="section-kicker">
                    <span className="tiny-plus">+</span> RESPONSIBILITY AT OUR
                    CORE
                  </div>
                  <h2>
                    What we leave behind
                    <br />
                    matters as much as
                    <br />
                    <span>what we discover.</span>
                  </h2>
                  <p>
                    Progress means looking beyond the resource. It means
                    respecting the environment, listening to communities, and
                    putting people first.
                  </p>
                  <div className="responsibility-items">
                    {responsibilityPrinciples.map(
                      ({ title, icon: Icon, text }, index) => (
                        <div className="responsibility-item" key={title}>
                          <button
                            aria-expanded={openPrinciple === index}
                            aria-controls={`principle-${index}`}
                            onClick={() =>
                              setOpenPrinciple(
                                openPrinciple === index ? null : index,
                              )
                            }
                          >
                            <Icon size={21} />
                            <span>{title}</span>
                            {openPrinciple === index ? (
                              <Minus size={16} />
                            ) : (
                              <Plus size={16} />
                            )}
                          </button>
                          <p
                            id={`principle-${index}`}
                            hidden={openPrinciple !== index}
                          >
                            {text}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                  <a href="#approach" className="text-link">
                    Explore our guiding principles <ArrowUpRight size={19} />
                  </a>
                </div>
              </div>
            </section>
            <section className="approach section" id="approach">
              <div className="container">
                <div className="section-kicker">
                  <span className="tiny-plus">+</span> FROM POSSIBILITY TO
                  PERSPECTIVE
                </div>
                <div className="section-heading">
                  <h2>
                    A deeper understanding.
                    <br />
                    <span>At every step.</span>
                  </h2>
                  <p>
                    From discovery to processing, every
                    <br className="desktop-br" /> stage deserves the same care
                    and expertise.
                  </p>
                </div>
                <div className="approach-grid">
                  {[
                    [
                      "01",
                      "Explore",
                      "Understand the geology. Connect field observations with data to discover mineral potential.",
                    ],
                    [
                      "02",
                      "Develop",
                      "Evaluate the resource and plan with care for people, communities, and the landscape.",
                    ],
                    [
                      "03",
                      "Mine",
                      "Bring planning and on-ground expertise together to access the mineral resource.",
                    ],
                    [
                      "04",
                      "Process",
                      "Prepare the ore, recover its value, and put mineral processing expertise into practice.",
                    ],
                  ].map(([n, title, copy]) => (
                    <article key={n}>
                      <div className="approach-top">
                        <span>{n}</span>
                        <ArrowRight size={20} />
                      </div>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
            <CommunitySection />
            <section className="faq section container">
              <div>
                <div className="section-kicker">
                  <span className="tiny-plus">+</span> A LITTLE MORE PERSPECTIVE
                </div>
                <h2>
                  Good questions.
                  <br />
                  <span>Clearer answers.</span>
                </h2>
              </div>
              <div className="faq-list">
                {faqs.map(([q, a], i) => (
                  <div className="faq-item" key={q}>
                    <button
                      aria-expanded={openFaq === i}
                      aria-controls={`answer-${i}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {q}
                      {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                    <div id={`answer-${i}`} hidden={openFaq !== i}>
                      <p>{a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="contact-section section container" id="contact">
              <div>
                <div className="section-kicker">
                  <span className="tiny-plus">+</span> LET’S MAKE A CONNECTION
                </div>
                <h2>
                  People behind
                  <br />
                  <span>the possibilities.</span>
                </h2>
                <p>
                  Have a project question, a technical idea, or a partnership in
                  mind? Start a conversation with the team.
                </p>
                <div className="contact-person">
                  <span className="contact-avatar">PS</span>
                  <div>
                    <h3>{companyContact.name}</h3>
                    <span>{companyContact.role}</span>
                  </div>
                  <button
                    aria-label="Inquire with our business contact"
                    onClick={() => showContact("Business partnership")}
                  >
                    <ArrowUpRight size={22} />
                  </button>
                </div>
              </div>
              <div className="contact-details">
                <span className="demo-label">PUBLISHED COMPANY CONTACT</span>
                <div>
                  <Mail size={20} />
                  <div>
                    <span>EMAIL</span>
                    <p>
                      <a href={`mailto:${companyContact.email}`}>
                        {companyContact.email}
                      </a>
                    </p>
                  </div>
                </div>
                <div>
                  <Building2 size={20} />
                  <div>
                    <span>OFFICE</span>
                    <p>{companyContact.address}</p>
                  </div>
                </div>
                <p className="contact-demo-note">
                  Email and address from the{" "}
                  <a
                    href={companyContact.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    original contact page ↗
                  </a>
                  . The named contact person is a demo placeholder.
                </p>
              </div>
            </section>
            <section className="contact-banner">
              <div className="container">
                <div>
                  <div className="eyebrow light">
                    <span /> LET’S EXPLORE WHAT’S POSSIBLE
                  </div>
                  <h2>
                    A conversation today.
                    <br />
                    <span>A possibility tomorrow.</span>
                  </h2>
                </div>
                <button
                  className="button button-lime"
                  onClick={() => showContact()}
                >
                  Let’s connect <ArrowUpRight size={20} />
                </button>
                <div className="banner-orbit" />
              </div>
            </section>
          </>
        )}
      </main>
      <footer>
        <div className="container footer-main">
          <div>
            <Logo />
            <p>
              A deeper understanding.
              <br />A lasting difference.
            </p>
          </div>
          <div className="footer-links">
            <span>DISCOVER</span>
            <Link to="/#about">About Geo Mysore</Link>
            <Link to="/#projects">Our operations</Link>
            <Link to="/#processing">Gold processing</Link>
            <Link to="/#responsibility">Our responsibility</Link>
          </div>
          <div className="footer-links">
            <span>LET’S TALK</span>
            <button onClick={() => showContact()}>
              Business inquiries <ArrowUpRight size={14} />
            </button>
            <button onClick={() => showContact("Business partnership")}>
              Partnerships <ArrowUpRight size={14} />
            </button>
            <span className="footer-place">
              <MapPin size={14} /> India
            </span>
          </div>
          <div className="footer-motto">
            Grounded in
            <br />
            <em>discovery.</em>
            <MoveUpRight size={34} />
          </div>
        </div>
        <div className="container">
          <div className="footer-wordmark" aria-hidden="true">
            GEOMYSORE
            <span>
              <ArrowUpRight strokeWidth={0.85} />
            </span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Geo Mysore. Website redesign concept.
          </span>
          <span>
            Company information & photographs from{" "}
            <a href={contentSources.home} target="_blank" rel="noreferrer">
              geomysore.com ↗
            </a>
          </span>
          <Link to="/#home">Back to top ↑</Link>
        </div>
      </footer>
      {modalOpen && (
        <div
          className="modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setProject(null);
              setContact(false);
            }
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-toolbar">
              <button
                className="modal-close"
                aria-label="Close dialog"
                ref={closeRef}
                onClick={() => {
                  setContact(false);
                  setProject(null);
                }}
              >
                <X size={22} />
              </button>
            </div>
            {project ? (
              <>
                <div
                  className="modal-project-image"
                  style={{
                    backgroundPosition: project.position,
                    backgroundImage:
                      project.type === "Processing"
                        ? "url('/images/processing-plant.webp')"
                        : project.type === "Exploration"
                          ? "url('/images/exploration-rig.jpg')"
                          : undefined,
                  }}
                />
                <div className="modal-body">
                  <div className="section-kicker">
                    {project.type.toUpperCase()} ·{" "}
                    {project.region.toUpperCase()}
                  </div>
                  <h2 id="modal-title">{project.title}</h2>
                  <p>{project.description}</p>
                  <div className="project-quick-facts">
                    <span>OUR FOCUS</span>
                    {operations
                      .find((item) => item.slug === project.slug)
                      ?.focus.map((item) => (
                        <div key={item.title}>
                          <Layers3 size={15} />
                          {item.title}
                        </div>
                      ))}
                  </div>
                  <Link
                    className="text-link operation-detail-link"
                    to={`/operations/${project.slug}`}
                    onClick={() => setProject(null)}
                  >
                    Explore the full story <ArrowUpRight size={18} />
                  </Link>
                  <p className="notice">
                    Based on the company’s published website. Contact the team
                    for the latest operating status and technical updates.
                  </p>
                  <button
                    className="button"
                    onClick={() => {
                      setProject(null);
                      showContact(
                        project.type === "Processing"
                          ? "Gold processing"
                          : "Project information",
                      );
                    }}
                  >
                    Inquire about this project <ArrowUpRight size={18} />
                  </button>
                </div>
              </>
            ) : (
              <ContactInquiry subject={contactSubject} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
