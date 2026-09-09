"use client";

import { useEffect, useRef, useState } from "react";
import { Award, GraduationCap, ChevronDown, Cpu } from "lucide-react";
import { educationData, verifiedCredentials, vocationalTrainings } from "@/data/skills";

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [eduOpen, setEduOpen] = useState(false);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="credentials"
      ref={sectionRef}
      style={{
        padding: "5.5rem 0 6rem",
        borderTop: "var(--border-thin)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          className="reveal"
          style={{
            marginBottom: "3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                color: "var(--accent-primary)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                marginBottom: "0.5rem",
              }}
            >
              07 // CREDENTIALS & EDUCATION
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 2.75rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Education & Certifications
            </h2>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: "0.8rem",
              color: "var(--ink-muted)",
              maxWidth: "380px",
              lineHeight: 1.5,
            }}
          >
            Verified engineering qualifications, intensive technical trainings, and official Salesforce credentials.
          </div>
        </div>

        {/* Compact Grid: Education & Trainings Left + Certifications Right */}
        <div
          className="reveal edu-cred-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Left Column: Education & Technical Trainings */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {/* Formal Academic Foundation */}
            <div
              className="edu-card"
              style={{
                background: "var(--surface)",
                border: "var(--border-medium)",
                padding: "1.75rem",
                boxShadow: "4px 4px 0 var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <GraduationCap size={18} style={{ color: "var(--accent-primary)" }} />
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--ink-muted)",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  FORMAL ACADEMIC FOUNDATION
                </span>
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: "1.35rem",
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.35rem",
                  wordBreak: "break-word",
                }}
              >
                {educationData.institution}
              </h3>

              <div
                className="font-mono"
                style={{
                  fontSize: "0.86rem",
                  color: "var(--ink-secondary)",
                  fontWeight: 600,
                  marginBottom: "0.65rem",
                  wordBreak: "break-word",
                }}
              >
                {educationData.degree} · {educationData.field}
              </div>

              <div
                className="font-mono"
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  fontSize: "0.8rem",
                  color: "var(--ink-muted)",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid var(--border-light)",
                  marginBottom: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <span>{educationData.period}</span>
                <span>·</span>
                <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>
                  {educationData.cgpa}
                </span>
              </div>

              {/* Expandable Achievements & Activities */}
              <div>
                <button
                  onClick={() => setEduOpen(!eduOpen)}
                  className="font-mono"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.75rem",
                    color: "var(--ink-primary)",
                    fontWeight: 600,
                    padding: "0.25rem 0",
                    cursor: "pointer",
                  }}
                >
                  <span>{eduOpen ? "[ HIDE ACTIVITIES & HONORS ]" : "[ VIEW HONORS & ACTIVITIES ]"}</span>
                  <ChevronDown
                    size={15}
                    style={{
                      transform: eduOpen ? "rotate(180deg)" : "none",
                      transition: "transform var(--motion-fast)",
                    }}
                  />
                </button>

                {eduOpen && (
                  <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                    <div>
                      <div
                        className="font-mono"
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--accent-primary)",
                          fontWeight: 700,
                          marginBottom: "0.35rem",
                        }}
                      >
                        COLLEGE HONORS & RECOGNITION
                      </div>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                        {educationData.achievements.map((item, i) => (
                          <li key={i} style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.4, wordBreak: "break-word" }}>
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div
                        className="font-mono"
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--ink-muted)",
                          fontWeight: 700,
                          marginBottom: "0.35rem",
                        }}
                      >
                        ACTIVITIES & ROLES
                      </div>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                        {educationData.activities.map((item, i) => (
                          <li key={i} style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.4, wordBreak: "break-word" }}>
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Internship & Vocational Training */}
            <div
              className="edu-card"
              style={{
                background: "var(--surface)",
                border: "var(--border-medium)",
                padding: "1.75rem",
                boxShadow: "4px 4px 0 var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.25rem",
                }}
              >
                <Cpu size={18} style={{ color: "var(--accent-primary)" }} />
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--ink-muted)",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  INTERNSHIP & VOCATIONAL TRAINING
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {vocationalTrainings.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      borderTop: index > 0 ? "1px solid var(--border-light)" : "none",
                      paddingTop: index > 0 ? "1.25rem" : 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: "0.4rem",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <h4
                        className="font-display"
                        style={{
                          fontSize: "1.1rem",
                          color: "var(--ink-primary)",
                          fontWeight: 700,
                          margin: 0,
                          wordBreak: "break-word",
                        }}
                      >
                        {item.title}
                      </h4>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--ink-muted)",
                          fontWeight: 600,
                        }}
                      >
                        {item.period}
                      </span>
                    </div>

                    <div
                      className="font-mono"
                      style={{
                        fontSize: "0.76rem",
                        color: "var(--ink-secondary)",
                        fontWeight: 600,
                        marginBottom: "0.4rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span style={{ color: "var(--ink-primary)" }}>{item.provider}</span>
                      {item.location && (
                        <>
                          <span style={{ color: "var(--border)" }}>·</span>
                          <span>{item.location}</span>
                        </>
                      )}
                      <span style={{ color: "var(--border)" }}>·</span>
                      <span
                        style={{
                          background: "var(--surface-alt)",
                          border: "1px solid var(--border-light)",
                          padding: "0.1rem 0.4rem",
                          fontSize: "0.68rem",
                          color: "var(--accent-primary)",
                          fontWeight: 700,
                        }}
                      >
                        {item.certification}
                      </span>
                      {item.rating && (
                        <span
                          style={{
                            background: "var(--surface-alt)",
                            border: "1px solid var(--border-light)",
                            padding: "0.1rem 0.4rem",
                            fontSize: "0.68rem",
                            color: "var(--status-online)",
                            fontWeight: 700,
                          }}
                        >
                          {item.rating}
                        </span>
                      )}
                    </div>

                    <div
                      className="font-mono"
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--accent-primary)",
                        fontWeight: 600,
                        marginBottom: "0.45rem",
                      }}
                    >
                      [{item.programType}]
                    </div>

                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--ink-secondary)",
                        lineHeight: 1.45,
                        margin: "0.3rem 0 0.55rem",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.summary}
                    </p>

                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 0 0.65rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                      }}
                    >
                      {item.keyLearnings.map((learning, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--ink-muted)",
                            lineHeight: 1.35,
                            wordBreak: "break-word",
                          }}
                        >
                          • {learning}
                        </li>
                      ))}
                    </ul>

                    {/* Skill Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono"
                          style={{
                            fontSize: "0.68rem",
                            padding: "0.12rem 0.45rem",
                            background: "var(--surface-alt)",
                            border: "1px solid var(--border-light)",
                            color: "var(--ink-secondary)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Salesforce Verified Credentials */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                color: "var(--ink-muted)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                marginBottom: "0.25rem",
              }}
            >
              VERIFIED ECOSYSTEM CERTIFICATIONS
            </div>

            {verifiedCredentials.map((cert) => {
              const isProgress = cert.status === "IN PROGRESS";
              return (
                <div
                  key={cert.id}
                  className="cert-card"
                  style={{
                    background: isProgress ? "var(--surface-alt)" : "var(--surface)",
                    border: isProgress ? "1px dashed var(--border)" : "var(--border-thin)",
                    padding: "1.25rem 1.5rem",
                    boxShadow: isProgress ? "none" : "3px 3px 0 var(--border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: "0.7rem",
                        color: isProgress ? "var(--accent-yellow)" : "var(--status-online)",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        marginBottom: "0.25rem",
                      }}
                    >
                      [{cert.status}]
                    </div>
                    <div
                      className="font-display"
                      style={{
                        fontSize: "1.05rem",
                        color: "var(--ink-primary)",
                        fontWeight: 700,
                        wordBreak: "break-word",
                      }}
                    >
                      {cert.title}
                    </div>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: "0.74rem",
                        color: "var(--ink-muted)",
                        marginTop: "0.2rem",
                        wordBreak: "break-word",
                      }}
                    >
                      Issuer: {cert.issuer}
                    </div>
                  </div>

                  <Award
                    size={22}
                    style={{
                      color: isProgress ? "var(--accent-yellow)" : "var(--accent-primary)",
                      flexShrink: 0,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .edu-cred-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 640px) {
          .edu-card,
          .cert-card {
            padding: 1.25rem 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
