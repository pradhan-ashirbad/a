import { useLayoutEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  Pencil,
} from "lucide-react";

type Draft = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};
export function ContactInquiry({ subject }: { subject: string }) {
  const initial = { name: "", email: "", company: "", subject, message: "" };
  const [draft, setDraft] = useState<Draft>(initial);
  const [review, setReview] = useState(false);
  const [error, setError] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const resetScroll = () =>
    contentRef.current
      ?.closest(".modal")
      ?.scrollTo({ top: 0, behavior: "instant" });
  useLayoutEffect(() => {
    resetScroll();
  }, []);
  const editInquiry = () => {
    setReview(false);
    requestAnimationFrame(() => {
      resetScroll();
      nameRef.current?.focus({ preventScroll: true });
    });
  };
  const update = (field: keyof Draft, value: string) => {
    setDraft((old) => ({ ...old, [field]: value }));
    setError("");
  };
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = Object.fromEntries(
      Object.entries(draft).map(([key, value]) => [key, value.trim()]),
    ) as Draft;
    if (!cleaned.message) {
      setError("Please add a message so we know how to help.");
      messageRef.current?.focus();
      return;
    }
    setDraft(cleaned);
    setError("");
    setReview(true);
    requestAnimationFrame(() => {
      resetScroll();
      headingRef.current?.focus({ preventScroll: true });
    });
  };
  const download = () => {
    const text = `GEO MYSORE — WEBSITE INQUIRY\n\nName: ${draft.name}\nEmail: ${draft.email}\n${draft.company ? `Company: ${draft.company}\n` : ""}Regarding: ${draft.subject}\n\n${draft.message}\n\nPrepared using the Geo Mysore website concept. This inquiry has not been submitted. Contact details on this site are demonstration placeholders.\n`;
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "geo-mysore-inquiry.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="modal-body contact-form" ref={contentRef}>
      <div className="section-kicker">
        <span className="tiny-plus">+</span> BEGIN A CONVERSATION
      </div>
      <div className="inquiry-progress" aria-label="Inquiry progress">
        <span className={review ? "complete" : "current"}>
          {review ? <Check size={11} /> : "01"} Details
        </span>
        <i />
        <span className={review ? "current" : ""}>02 Review</span>
      </div>
      <h2 id="modal-title" ref={headingRef} tabIndex={-1}>
        {review ? (
          <>
            A good conversation
            <br />
            <span>starts here.</span>
          </>
        ) : (
          <>
            Let’s explore
            <br />
            <span>what’s possible.</span>
          </>
        )}
      </h2>
      {review ? (
        <div className="inquiry-success">
          <div role="status">
            <span className="success-icon">
              <Check size={25} />
            </span>
            <h3>Your inquiry is ready, {draft.name.split(/\s+/)[0]}.</h3>
            <p>
              Review your details, then download a copy to share through your
              preferred contact channel.
            </p>
            <p className="notice">
              This preview has no connected submission service. Your inquiry has
              not been sent.
            </p>
          </div>
          <dl className="inquiry-review">
            <div>
              <dt>Name</dt>
              <dd>{draft.name}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{draft.email}</dd>
            </div>
            {draft.company && (
              <div>
                <dt>Company</dt>
                <dd>{draft.company}</dd>
              </div>
            )}
            <div>
              <dt>Regarding</dt>
              <dd>{draft.subject}</dd>
            </div>
            <div className="review-message">
              <dt>Message</dt>
              <dd>{draft.message}</dd>
            </div>
          </dl>
          <div className="review-actions">
            <button className="button" onClick={download}>
              Download inquiry <Download size={17} />
            </button>
            <button className="text-link edit-inquiry" onClick={editInquiry}>
              <Pencil size={14} /> Edit inquiry
            </button>
          </div>
          <button
            className="new-inquiry"
            onClick={() => {
              setDraft({
                ...initial,
                name: draft.name,
                email: draft.email,
                company: draft.company,
              });
              editInquiry();
            }}
          >
            Start another inquiry <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <p>Tell us a little about yourself and what you have in mind.</p>
          <div className="form-row">
            <label>
              Your name
              <input
                ref={nameRef}
                name="name"
                required
                autoComplete="name"
                placeholder="Full name"
                maxLength={100}
                pattern=".*\S.*"
                title="Please enter your name."
                value={draft.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                maxLength={200}
                value={draft.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </label>
          </div>
          <label>
            Company <span className="optional-label">optional</span>
            <input
              name="company"
              autoComplete="organization"
              placeholder="Organisation or business name"
              maxLength={160}
              value={draft.company}
              onChange={(e) => update("company", e.target.value)}
            />
          </label>
          <label>
            I’m interested in
            <select
              name="subject"
              value={draft.subject}
              onChange={(e) => update("subject", e.target.value)}
            >
              {[
                "General inquiry",
                "Project information",
                "Gold processing",
                "Business partnership",
                "Careers",
                "Media inquiry",
              ].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Your message
            <textarea
              ref={messageRef}
              name="message"
              required
              placeholder="How can we work together?"
              rows={4}
              maxLength={5000}
              value={draft.message}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={!!error}
              aria-describedby={error ? "inquiry-error" : undefined}
            />
          </label>
          {error && (
            <p id="inquiry-error" className="form-error" role="alert">
              {error}
            </p>
          )}
          <p className="form-notice">
            Concept preview: prepare and download your inquiry. Nothing is sent
            or stored on a server.
          </p>
          <button type="submit" className="button">
            Prepare inquiry <ArrowUpRight size={18} />
          </button>
        </form>
      )}
    </div>
  );
}
