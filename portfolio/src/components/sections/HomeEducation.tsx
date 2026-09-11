"use client";

import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { ArrowRight, GraduationCap, Award, Cpu, BookOpen } from "lucide-react";

export default function HomeEducation() {
  return (
    <section
      id="education"
      aria-label="Education Overview"
      style={{
        padding: "5rem 0 5.5rem",
        borderBottom: "1px solid var(--border-primary)",
        background: "var(--bg-surface-subtle)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <div>
            <SectionLabel number="04" label="EDUCATION" />
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Education & Credentials
            </h2>
          </div>

          <p
            style={{
              fontFamily: "var(--font-ibm-plex-sans), sans-serif",
              fontSize: "0.95rem",
              color: "var(--ink-secondary)",
              maxWidth: "460px",
              lineHeight: 1.6,
            }}
          >
            Formal engineering degree, vocational embedded systems training, and verified Salesforce credentials.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Degree */}
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-primary)",
              boxShadow: "var(--shadow-tactile-sm)",
              padding: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <GraduationCap size={18} color="var(--accent-primary)" />
              <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600 }}>
                2015 - 2019
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "0.35rem" }}>
              B.E. in Electronics & Telecom
            </h3>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.85rem", color: "var(--ink-secondary)", marginBottom: "0.75rem" }}>
              Government College of Engineering, Raipur
            </div>
            <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.82rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
              Core mathematics, digital electronics, microprocessors, and communications theory.
            </p>
          </div>

          {/* Technical Training */}
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-primary)",
              boxShadow: "var(--shadow-tactile-sm)",
              padding: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Cpu size={18} color="var(--accent-primary)" />
              <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600 }}>
                VOCATIONAL
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "0.35rem" }}>
              Embedded Systems & IoT
            </h3>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.85rem", color: "var(--ink-secondary)", marginBottom: "0.75rem" }}>
              TechnoScripts Pune (ISO 9001:2015)
            </div>
            <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.82rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
              Hands on training in embedded C, ARM microcontroller architecture, and sensors.
            </p>
          </div>

          {/* Hardware Labs */}
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-primary)",
              boxShadow: "var(--shadow-tactile-sm)",
              padding: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <BookOpen size={18} color="var(--accent-primary)" />
              <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600 }}>
                ACADEMIC LABS
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "0.35rem" }}>
              Hardware Lab Exposure
            </h3>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.85rem", color: "var(--ink-secondary)", marginBottom: "0.75rem" }}>
              Practical laboratory work
            </div>
            <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.82rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
              Prototyping on microcontrollers (8051, PIC, ARM), oscilloscopes, and logic circuits.
            </p>
          </div>

          {/* Certification */}
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-primary)",
              boxShadow: "var(--shadow-tactile-sm)",
              padding: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Award size={18} color="var(--accent-primary)" />
              <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600 }}>
                VERIFIED CREDENTIAL
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "0.35rem" }}>
              Salesforce Administrator
            </h3>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.85rem", color: "var(--ink-secondary)", marginBottom: "0.75rem" }}>
              Salesforce Certified Administrator
            </div>
            <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.82rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
              Platform configuration, security models, user management, and Flow automation.
            </p>
          </div>
        </div>

        {/* Section Footer Link */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href="/education" className="btn-tactile-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <span>VIEW COMPLETE EDUCATION DETAILS</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
