import { ArrowUpRight } from "lucide-react";
import { contentSources } from "../contentSources";
const activities = [
  {
    title: "Education & opportunity",
    image: "/images/education.webp",
    alt: "School activities pictured on Geomysore’s website",
    text: "School transport, drinking-water support, educational staff, computer training, and improvements to school infrastructure are among the initiatives described by the company.",
  },
  {
    title: "Water for communities",
    image: "/images/water.webp",
    alt: "Village water-supply initiative pictured on Geomysore’s website",
    text: "The company describes drinking-water supply to surrounding villages, schools, and hospitals through borewells, tankers, water stalls, and a village pipeline.",
  },
  {
    title: "Growing a greener future",
    image: "/images/plantation.webp",
    alt: "Plantation activity pictured on Geomysore’s green initiatives page",
    text: "Plantation in and around the lease area, green cover enhancement, and tree translocation form part of the company’s published environmental initiatives.",
  },
];
export function CommunitySection() {
  return (
    <section className="community-section section" id="community">
      <div className="container">
        <div className="section-kicker">
          <span className="tiny-plus">06 /</span> PEOPLE & PLACE
        </div>
        <div className="section-heading">
          <h2>
            Shared progress.
            <br />
            <span>Stronger communities.</span>
          </h2>
          <a
            className="text-link"
            href={contentSources.home}
            target="_blank"
            rel="noreferrer"
          >
            Company’s CSR activities <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="community-grid">
          {activities.map((item) => (
            <article key={item.title}>
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                width="600"
                height="360"
              />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="company-source-note">
          Activities summarised from Geomysore’s published CSR and green
          initiatives pages. Photographs from the company website.
        </p>
      </div>
    </section>
  );
}
