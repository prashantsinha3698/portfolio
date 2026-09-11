import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import StoryTimeline from "@/components/sections/StoryTimeline";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Prashant Sinha",
  description: "Personal background, operational experiments, engineering career at TCS, and how I approach building software.",
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-canvas)", color: "var(--ink-primary)" }}>
      <Navigation />

      <main style={{ flex: 1, width: "100%", maxWidth: "100%", padding: "3rem clamp(1.25rem, 4vw, 4.5rem) 6rem" }}>
        <PageHeader
          sectionNumber="05"
          category="BACKGROUND AND PERSPECTIVE"
          title="About"
          description="A short introduction to who I am, how my background evolved, and how I approach building software."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          
          {/* Section 1: Introduction */}
          <section className="about-section">
            <SectionLabel number="01" label="INTRODUCTION" />
            
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                margin: "0.5rem 0 1.25rem",
              }}
            >
              Who I Am
            </h2>

            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "1rem", color: "var(--ink-secondary)", lineHeight: 1.75, maxWidth: 820 }}>
              <p style={{ marginBottom: "1rem" }}>
                I am a software developer based in Raipur, India. I spent three years at Tata Consultancy Services working as a Salesforce developer and System Engineer, building automation, maintaining XML data integrations with manufacturing systems, and resolving production defects.
              </p>

              <p style={{ marginBottom: "1rem" }}>
                My undergraduate degree was in Electronics and Telecommunication Engineering. Learning how microcontrollers, analog signals, and communication protocols work under hardware limits gave me a solid mental foundation for how computing systems operate.
              </p>

              <p>
                Outside enterprise work, I build personal software projects like OnyxFlow and Quantfolio to explore backend systems, data feeds, and mathematical models.
              </p>
            </div>
          </section>

          {/* Section 2: Chronological Background and Journey (Interactive Deep Timeline) */}
          <StoryTimeline />

          {/* Section 3: What I Enjoy Learning */}
          <section className="about-section">
            <SectionLabel number="03" label="CURIOSITY" />

            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                margin: "0.5rem 0 1.25rem",
              }}
            >
              What I Enjoy Learning
            </h2>

            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.98rem", color: "var(--ink-secondary)", lineHeight: 1.75, maxWidth: 820 }}>
              <p style={{ marginBottom: "1rem" }}>
                I enjoy learning how technical systems function under the hood. In Salesforce, that means understanding how governor limits, transaction boundaries, and database locking behave during batch updates. In general software, that means exploring how data pipelines maintain integrity when network connections drop.
              </p>

              <p>
                I also find macroeconomics, supply chain logistics, and business operations fascinating. Experiencing frontline retail at SUTO Cafe and researching factory feasibility gave me appreciation for how software supports real world physical operations.
              </p>
            </div>
          </section>

          {/* Section 4: How I Approach Projects */}
          <section className="about-section">
            <SectionLabel number="04" label="METHODOLOGY" />

            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                margin: "0.5rem 0 1.25rem",
              }}
            >
              How I Approach Projects
            </h2>

            <div className="about-approach-grid">
              <div style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.25rem", boxSizing: "border-box" }}>
                <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "1rem", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "0.4rem" }}>
                  Understand Data Flow First
                </h3>
                <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.86rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  Before writing code, I trace the exact payload shapes, entry points, and edge cases. Clear mental models save hours of refactoring.
                </p>
              </div>

              <div style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.25rem", boxSizing: "border-box" }}>
                <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "1rem", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "0.4rem" }}>
                  Defensive Engineering
                </h3>
                <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.86rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  External services will fail, schemas will drift, and network calls will time out. Handling errors with clear logging makes recovery predictable.
                </p>
              </div>

              <div style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.25rem", boxSizing: "border-box" }}>
                <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "1rem", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "0.4rem" }}>
                  AI Assisted Iteration
                </h3>
                <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.86rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  I use modern AI tools like Codex and Claude Code to accelerate boilerplate, run tests, and explore libraries, while retaining full personal ownership of system design.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: What I Want to Explore Next */}
          <section className="about-section">
            <SectionLabel number="05" label="FUTURE FOCUS" />

            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                margin: "0.5rem 0 1.25rem",
              }}
            >
              What I Want to Explore Next
            </h2>

            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.98rem", color: "var(--ink-secondary)", lineHeight: 1.75, maxWidth: 820 }}>
              <p style={{ marginBottom: "1rem" }}>
                Looking ahead, I want to take on roles where I can combine my enterprise Salesforce development foundation with broader backend engineering. I am interested in building robust API integrations, containerized microservices, and reliable event driven pipelines.
              </p>

              <p>
                I also plan to complete my Salesforce Platform Developer I certification and continue refining my hands on knowledge of Docker, Linux tooling, and distributed data systems.
              </p>
            </div>
          </section>

          {/* Action Links */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", borderTop: "1px solid var(--border-primary)", paddingTop: "1.5rem" }}>
            <Link href="/experience" className="btn-tactile-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span>VIEW WORK EXPERIENCE</span>
              <ArrowRight size={14} />
            </Link>
            <Link href="/projects" className="btn-tactile-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span>VIEW PROJECTS</span>
              <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="btn-tactile-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span>GET IN TOUCH</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </main>

      <Footer />

      <style>{`
        .about-section {
          background: var(--bg-surface);
          border: 1px solid var(--border-primary);
          box-shadow: var(--shadow-tactile);
          padding: 2.5rem 2.25rem;
          box-sizing: border-box;
          width: 100%;
        }
        .about-approach-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
          gap: 1.25rem;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          main {
            padding: 2rem 0.85rem 4rem !important;
          }
          .about-section {
            padding: 1.35rem 0.95rem !important;
          }
          .about-approach-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
