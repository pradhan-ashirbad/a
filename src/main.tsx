import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, useLocation } from "react-router-dom";
import { OperationPage, NotFoundPage } from "./components/OperationPage";
import { ContactInquiry } from "./components/ContactInquiry";
import { operations } from "./operations";
import { companyContact } from "./company";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
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
  Phone,
  Building2,
} from "lucide-react";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "./styles.css";
import "./pages.css";

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
    title: "Jonnagiri Gold Project",
    region: "Andhra Pradesh, India",
    type: "Mining",
    description:
      "A closer look at the journey from geological discovery to responsible gold development. Explore the landscape, the geology, and the people at the heart of the project.",
    position: "center 65%",
    number: "01",
    slug: "mining",
  },
  {
    title: "Gold Processing Plant",
    region: "From ore to opportunity",
    type: "Processing",
    description:
      "Processing connects the resource to its potential. Ore preparation, mineral recovery, and careful process control are all part of the journey from mined material to gold. Contact Geo Mysore for verified plant specifications and operational details.",
    position: "center",
    number: "02",
    slug: "gold-processing",
  },
  {
    title: "Exploration portfolio",
    region: "Southern India",
    type: "Exploration",
    description:
      "A systematic approach to understanding mineral potential. Field mapping, sampling, and geological interpretation guide each stage of exploration.",
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
    "Where is the Jonnagiri project located?",
    "The Jonnagiri Gold Project is located in Andhra Pradesh, India. Contact the company directly for current project details and operational updates.",
  ],
  [
    "How can I explore a partnership?",
    "Use “Get in touch” to prepare a partnership inquiry. This preview lets you download your inquiry; it does not send it to the company.",
  ],
];
const responsibilityPrinciples = [
  {
    title: "Respect for the environment",
    icon: Leaf,
    text: "Considering land, water, and the local environment is part of taking a longer view. Assessment, planning, and monitoring help make the trade-offs clearer.",
  },
  {
    title: "Connection with communities",
    icon: Globe2,
    text: "Listening to the people connected to a place helps build understanding. Clear communication and local perspectives belong in the conversation about development.",
  },
  {
    title: "A considered path forward",
    icon: Mountain,
    text: "People, technical knowledge, and careful decisions shape the journey. A responsible approach considers both what a project can deliver and what comes after it.",
  },
];
function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      className={`brand ${light ? "brand-light" : ""}`}
      to="/#home"
      aria-label="Geo Mysore home"
    >
      <svg viewBox="0 0 50 50" aria-hidden="true">
        <path d="M4 31 24 6l22 27-9 11H16Z" />
        <path d="m15 28 9-12 14 18H24l7 10" />
        <path d="m7 35 12-3" />
      </svg>
      <span>
        GEO MYSORE<small>EXPLORING POSSIBILITIES</small>
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
        <span className="status-dot" /> A new perspective on India’s mineral
        potential{" "}
        <span className="announcement-end">
          Grounded in discovery. Guided by purpose.
        </span>
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
              ["about", "About us"],
              ["projects", "Our operations"],
              ["processing", "Gold processing"],
              ["responsibility", "Responsibility"],
            ].map(([id, label]) => (
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
                {id === "projects" && <ChevronDown size={12} />}
              </Link>
            ))}
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
            <section className="hero" id="home">
              <div
                className={`hero-photo hero-slide-${heroSlide}`}
                style={{
                  backgroundImage:
                    heroSlide === 1
                      ? "url('/images/processing-plant.webp')"
                      : undefined,
                  backgroundPosition: heroSlide === 2 ? "left top" : undefined,
                  backgroundSize: heroSlide === 2 ? "auto 160%" : undefined,
                }}
              />
              <div className="hero-shade" />
              <div className="hero-contours" />
              <div className="hero-content container">
                <div className="eyebrow light">
                  <span /> ROOTED IN INDIA. REACHING FURTHER.
                </div>
                <h1>
                  {heroSlide === 0 ? (
                    <>
                      There’s more
                      <br />
                      beneath the <em>surface.</em>
                    </>
                  ) : heroSlide === 1 ? (
                    <>
                      From potential
                      <br />
                      to <em>possibility.</em>
                    </>
                  ) : (
                    <>
                      Every discovery
                      <br />
                      starts with <em>curiosity.</em>
                    </>
                  )}
                </h1>
                <p>
                  Exploration. Mining. Gold processing.
                  <br />
                  Turning potential into lasting value.
                </p>
                <div className="hero-actions">
                  <a className="button button-lime" href="#projects">
                    Explore our projects <ArrowUpRight size={19} />
                  </a>
                  <a className="text-link light-link" href="#about">
                    Discover Geo Mysore <ArrowRight size={17} />
                  </a>
                </div>
              </div>
              <div className="hero-bottom container">
                <div className="hero-location">
                  <MapPin size={15} />
                  <span>
                    {heroSlide === 0
                      ? "JONNAGIRI, ANDHRA PRADESH"
                      : heroSlide === 1
                        ? "GOLD PROCESSING & RECOVERY"
                        : "GEOLOGICAL EXPLORATION"}
                  </span>
                  <span className="hero-divider" /> INDIA
                </div>
                <a className="scroll-link" href="#about">
                  A deeper perspective <span>↓</span>
                </a>
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
                  </button>
                ))}
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
                  Discovering resources.
                  <br />
                  <span>Building possibilities.</span>
                </h2>
                <div className="about-copy">
                  <p>
                    Great discoveries begin with a deeper understanding. At Geo
                    Mysore, we connect geological insight, mining, and gold
                    processing to unlock the potential of India’s mineral
                    resources.
                  </p>
                  <p className="muted">
                    From the first field study to the processing plant, our
                    focus is on the bigger picture: the land, the people, and
                    the value we can create together.
                  </p>
                  <a className="text-link" href="#approach">
                    Get to know our approach <ArrowUpRight size={19} />
                  </a>
                </div>
              </div>
              <div className="capabilities">
                <div>
                  <span className="capability-number">01 /</span>
                  <h3>Explore with insight</h3>
                  <p>
                    Science-led exploration, grounded
                    <br className="desktop-br" /> in geological understanding.
                  </p>
                </div>
                <div>
                  <span className="capability-number">02 /</span>
                  <h3>Mine with purpose</h3>
                  <p>
                    Considered development, with
                    <br className="desktop-br" /> people and the land in mind.
                  </p>
                </div>
                <div>
                  <span className="capability-number">03 /</span>
                  <h3>Process for value</h3>
                  <p>
                    Bringing together technology
                    <br className="desktop-br" /> and mineral processing
                    expertise.
                  </p>
                </div>
              </div>
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
                    From the earth.
                    <br />
                    <span>Through expertise.</span>
                  </h2>
                </div>
                <div>
                  <p>
                    Discovery is just the beginning. Our gold processing
                    capability brings the next stage of the story to life —
                    connecting what we mine with the value it holds.
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
                  aria-label="Illustrative gold ore processing facility with tanks, conveyors, and steel walkways"
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
                          "Ore preparation brings mined material into a form suitable for the recovery stages that follow. Understanding the characteristics of the feed is the first step toward effective processing.",
                          "Mineral recovery brings engineering and geology together. The right process depends on the ore, with recovery performance and responsible resource use guiding the approach.",
                          "Monitoring, sampling, and process control help teams understand performance and make informed operating decisions. People and technical expertise remain central at every stage.",
                        ][processStage]
                      }
                    </p>
                  </div>
                  <span className="process-footnote">
                    A general introduction to gold processing. Plant details
                    available on inquiry.
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
                <span className="demo-label">DEMO CONTACT DETAILS</span>
                <div>
                  <Mail size={20} />
                  <div>
                    <span>EMAIL</span>
                    <p>{companyContact.email}</p>
                  </div>
                </div>
                <div>
                  <Phone size={20} />
                  <div>
                    <span>PHONE</span>
                    <p>{companyContact.phone}</p>
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
                  Sample details for this preview. Replace with approved company
                  contacts before launch.
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
                    Great possibilities start
                    <br />
                    with a conversation.
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
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Geo Mysore. Website redesign concept.
          </span>
          <span>Project details and imagery are illustrative.</span>
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
                    This is a website concept. Project scope, current status,
                    and technical information need confirmation from Geo Mysore
                    before publication.
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
