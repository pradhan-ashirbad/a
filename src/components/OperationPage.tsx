import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Compass,
  Layers3,
  Mountain,
} from "lucide-react";
import { operations, type Operation } from "../operations";

export function OperationPage({
  operation,
  onInquiry,
}: {
  operation: Operation;
  onInquiry: (subject: string) => void;
}) {
  const [stage, setStage] = useState(0);
  const selected = operation.journey[stage];
  return (
    <>
      <section className="operation-hero" id="operation-top">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <Link to="/#projects">Our operations</Link>
            <ChevronRight size={12} />
            <span aria-current="page">{operation.title}</span>
          </nav>
          <div className="operation-hero-grid">
            <div>
              <div className="section-kicker">
                <span className="tiny-plus">+</span>
                {operation.category}
              </div>
              <h1>
                {operation.headline}
                <br />
                <span>{operation.accent}</span>
              </h1>
              <p>{operation.intro}</p>
              <a className="button" href="#operation-journey">
                Explore the journey <ArrowRight size={18} />
              </a>
            </div>
            <div
              className="operation-hero-image"
              style={{
                backgroundImage: `url('${operation.image}')`,
                backgroundPosition: operation.imagePosition,
              }}
              role="img"
              aria-label={operation.imageAlt}
            >
              <div className="operation-image-label">
                <span className="status-dot" />
                {operation.category}
                <span>GEO MYSORE</span>
              </div>
            </div>
          </div>
        </div>
        <div className="operation-subnav">
          <div className="container">
            <span>{operation.title}</span>
            <a href="#operation-overview">Overview</a>
            <a href="#operation-journey">The journey</a>
            <a href="#operation-inquiry">
              Talk to our team <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>
      <section
        className="section container operation-overview"
        id="operation-overview"
      >
        <div className="section-kicker">
          <span className="tiny-plus">+</span> A CONNECTED PERSPECTIVE
        </div>
        <div className="operation-overview-heading">
          <h2>{operation.overviewHeading}</h2>
          <p>{operation.overview}</p>
        </div>
        <div
          className="operation-specifications"
          aria-label="Published project specifications"
        >
          {operation.specifications.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <p className="operation-source-note">
          {operation.sourceNote}{" "}
          <a href={operation.source} target="_blank" rel="noreferrer">
            Company source <ArrowUpRight size={12} />
          </a>
        </p>
        <div className="operation-focus-grid">
          {operation.focus.map((item, index) => {
            const Icon = [Compass, Mountain, Layers3][index];
            return (
              <article key={item.title}>
                <Icon size={28} strokeWidth={1.2} />
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="operation-journey section" id="operation-journey">
        <div className="container">
          <div className="section-kicker">
            <span className="tiny-plus">+</span> ONE STAGE INFORMS THE NEXT
          </div>
          <div className="section-heading">
            <h2>
              {operation.slug === "gold-processing"
                ? "The processing journey."
                : operation.slug === "mining"
                  ? "From resource to operation."
                  : "A journey of discovery."}
              <br />
              <span>Explore each stage.</span>
            </h2>
            <p>Select a stage to take a closer look.</p>
          </div>
          <div className="operation-journey-layout">
            <div
              className="journey-tabs"
              role="tablist"
              aria-label={`${operation.title} journey`}
              aria-orientation="vertical"
            >
              {operation.journey.map((item, index) => (
                <button
                  key={item.title}
                  role="tab"
                  id={`journey-tab-${index}`}
                  aria-selected={stage === index}
                  aria-controls="journey-panel"
                  tabIndex={stage === index ? 0 : -1}
                  onClick={() => setStage(index)}
                  onKeyDown={(event) => {
                    let next: number | undefined;
                    if (event.key === "ArrowDown" || event.key === "ArrowRight")
                      next = (index + 1) % 4;
                    if (event.key === "ArrowUp" || event.key === "ArrowLeft")
                      next = (index + 3) % 4;
                    if (event.key === "Home") next = 0;
                    if (event.key === "End") next = 3;
                    if (next !== undefined) {
                      event.preventDefault();
                      setStage(next);
                      document.getElementById(`journey-tab-${next}`)?.focus();
                    }
                  }}
                >
                  <span>0{index + 1}</span>
                  {item.title}
                  <ArrowUpRight size={19} />
                </button>
              ))}
            </div>
            <div
              className="journey-panel"
              role="tabpanel"
              tabIndex={0}
              id="journey-panel"
              aria-labelledby={`journey-tab-${stage}`}
            >
              <div className="journey-panel-top">
                <Layers3 size={35} strokeWidth={1} />
                <span>STAGE 0{stage + 1} / 04</span>
              </div>
              <h3>{selected.heading}</h3>
              <p>{selected.text}</p>
              <ul>
                {selected.points.map((point) => (
                  <li key={point}>
                    <Check size={14} />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="journey-next">
                <span>
                  {stage === 3
                    ? "A connected journey, from the beginning."
                    : "Keep exploring the process."}
                </span>
                <button
                  aria-label={
                    stage === 3 ? "Return to first stage" : "Next stage"
                  }
                  onClick={() => setStage((stage + 1) % 4)}
                >
                  {stage === 3 ? (
                    <ArrowLeft size={20} />
                  ) : (
                    <ArrowRight size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <p className="journey-note">
            Based on the company’s published{" "}
            {operation.slug === "gold-processing"
              ? "processing design"
              : operation.slug === "mining"
                ? "mining plan"
                : "exploration information"}
            . Confirm the latest operating details with the company.
          </p>
          {operation.slug === "gold-processing" && (
            <figure className="processing-flowsheet">
              <div>
                <span className="section-kicker">
                  THE PUBLISHED MAIN-PLANT FLOWSHEET
                </span>
                <a
                  className="text-link"
                  href="/images/process-flow.png"
                  target="_blank"
                  rel="noreferrer"
                >
                  View full-size diagram <ArrowUpRight size={16} />
                </a>
              </div>
              <a
                href="/images/process-flow.png"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/images/process-flow.png"
                  alt="Published Swarnagiri process diagram showing crushing, milling, gravity recovery, CIL tanks, elution, electrowinning, smelting, and tailings treatment"
                  width="1024"
                  height="722"
                  loading="lazy"
                />
              </a>
              <figcaption>
                Process diagram from Geomysore’s processing page, labelled “NI
                43-101-FS-Jonnagiri Gold Mine Project” in the original. It
                describes the published design.
              </figcaption>
            </figure>
          )}
        </div>
      </section>
      <section
        className="section container operation-inquiry"
        id="operation-inquiry"
      >
        <div>
          <div className="section-kicker">
            <span className="tiny-plus">+</span> TAKE THE CONVERSATION FURTHER
          </div>
          <h2>
            Interested in
            <br />
            <span>the finer details?</span>
          </h2>
          <p>
            Our team is the starting point for current project information and
            specific technical questions.
          </p>
          <button
            className="button"
            onClick={() => onInquiry(operation.inquirySubject)}
          >
            Ask about{" "}
            {operation.slug === "gold-processing"
              ? "processing"
              : operation.slug === "mining"
                ? "this project"
                : "exploration"}
            <ArrowUpRight size={18} />
          </button>
        </div>
        <div className="inquiry-topics">
          <span>LET’S TALK ABOUT</span>
          {operation.questions.map((question) => (
            <div key={question}>
              <Check size={17} />
              {question}
            </div>
          ))}
          <p>
            Prepare a focused inquiry and let us know the information you’re
            looking for.
          </p>
        </div>
      </section>
      <section className="operation-related section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="section-kicker">
                <span className="tiny-plus">+</span> PART OF A BIGGER PICTURE
              </div>
              <h2>
                The story <span>continues.</span>
              </h2>
            </div>
            <Link className="text-link" to="/#projects">
              All operations
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="related-grid">
            {operations
              .filter((item) => item.slug !== operation.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  className="related-card"
                  to={`/operations/${item.slug}`}
                >
                  <div
                    className="related-image"
                    style={{
                      backgroundImage: `url('${item.image}')`,
                      backgroundPosition: item.imagePosition,
                    }}
                  />
                  <div>
                    <span>{item.category}</span>
                    <h3>{item.title}</h3>
                    <ArrowUpRight size={23} />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function NotFoundPage() {
  return (
    <section className="section container not-found">
      <span className="section-kicker">404 / A DIFFERENT PATH</span>
      <h1>
        Let’s get back
        <br />
        <span>on solid ground.</span>
      </h1>
      <p>
        We couldn’t find this page. Explore our operations or return to the
        homepage.
      </p>
      <Link className="button" to="/">
        Return home <ArrowRight size={18} />
      </Link>
    </section>
  );
}
