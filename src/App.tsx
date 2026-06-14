import resume from "../resume.json";
import type { ResumeData } from "./types";
import { formatDate, getDuration, profileLabel } from "./utils";

const data = resume as ResumeData;

const keyTech = [
  "Kubernetes",
  "Terraform",
  "OpenTelemetry",
  "Grafana",
  "GitHub Actions",
  "Azure",
];

export default function App() {
  const { basics, work, skills, languages, awards } = data;

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="hero card">
        <div className="hero-content">
          <p className="eyebrow">Senior Reliability Engineer</p>
          <h1>{basics.name}</h1>
          <p className="headline">{basics.summary}</p>
          <div className="hero-cta-row">
            <a className="btn btn-primary" href={`mailto:${basics.email}`}>
              Contact Me
            </a>
            <a className="btn btn-ghost" href={basics.website} target="_blank" rel="noreferrer">
              Personal Site
            </a>
            <button className="btn btn-ghost no-print" onClick={() => window.print()}>
              Download PDF
            </button>
          </div>
          <ul className="badge-list" aria-label="Core technologies">
            {keyTech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>

        <aside className="profile-panel" aria-label="Contact details">
          <img className="avatar" src={basics.picture || "/me.png"} alt={basics.name} />
          <h2>{basics.label}</h2>
          <p>
            {basics.location.city}, {basics.location.region}
          </p>
          <ul>
            <li>
              <a href={`mailto:${basics.email}`}>{basics.email}</a>
            </li>
            <li>
              <a href={`tel:${basics.phone}`}>{basics.phone}</a>
            </li>
            <li>
              <a href={basics.website} target="_blank" rel="noreferrer">
                {basics.website.replace("https://", "")}
              </a>
            </li>
          </ul>
          <div className="social-grid">
            {basics.profiles
              .filter((profile) => profile.url)
              .map((profile) => (
                <a key={profileLabel(profile)} href={profile.url} target="_blank" rel="noreferrer">
                  {profileLabel(profile)}
                </a>
              ))}
          </div>
        </aside>
      </header>

      <main className="content-grid">
        <section className="card span-two">
          <div className="section-title-row">
            <h3>Experience</h3>
            <p>{work.length} roles</p>
          </div>
          <div className="timeline">
            {work.map((job) => (
              <article key={`${job.company}-${job.startDate}`} className="timeline-item">
                <div className="timeline-head">
                  <div>
                    <h4>{job.position}</h4>
                    <p>
                      {job.website ? (
                        <a href={job.website} target="_blank" rel="noreferrer">
                          {job.company}
                        </a>
                      ) : (
                        job.company
                      )}
                    </p>
                  </div>
                  <div className="timeline-meta">
                    <span>
                      {formatDate(job.startDate)} - {formatDate(job.endDate)}
                    </span>
                    <strong>{getDuration(job)}</strong>
                  </div>
                </div>
                <ul>
                  {job.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="section-title-row">
            <h3>Skills</h3>
            <p>Highlights</p>
          </div>
          <div className="skills-list">
            {skills.map((skill) => (
              <article key={skill.name} className="skill-card">
                <p className="skill-name">{skill.name}</p>
                <span>{skill.level}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="section-title-row">
            <h3>Credentials</h3>
            <p>Awards and language</p>
          </div>

          <div className="stack-list">
            {awards.map((award) => (
              <article key={award.title} className="stack-item">
                <p>{award.title}</p>
              </article>
            ))}
            {languages.map((lang) => (
              <article key={lang.language} className="stack-item">
                <p>
                  {lang.language} <span>{lang.fluency}</span>
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
