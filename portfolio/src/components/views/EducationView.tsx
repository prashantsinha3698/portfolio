"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import PageHeader from "@/components/ui/PageHeader";
import { Award, Cpu, BookOpen, Trophy } from "lucide-react";
import { getTranslation, Locale } from "@/locales";

interface EducationViewProps {
  locale: Locale;
}

export default function EducationView({ locale }: EducationViewProps) {
  const t = getTranslation(locale);
  const ed = t.educationPage;
  const isDe = locale === "de";

  const labCategories = [
    { id: "ALL", label: isDe ? "ALLE PRAKTIKA" : "ALL PRACTICAL LABS" },
    { id: "Microprocessors & VLSI", label: "Microprocessors & VLSI" },
    { id: "Communications", label: "Communications" },
    { id: "Electronics", label: "Electronics" },
    { id: "Computing & Projects", label: isDe ? "Informatik & Projekte" : "Computing & Projects" },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredLabs = selectedCategory === "ALL"
    ? ed.labsSection.labs
    : ed.labsSection.labs.filter((lab) => lab.category === selectedCategory);

  return (
    <div style={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", background: "var(--bg-canvas)", color: "var(--ink-primary)" }}>
      <Navigation />

      <main style={{ flex: 1, width: "100%", maxWidth: "100%", padding: "3rem clamp(1.25rem, 4vw, 4.5rem) 6rem" }}>
        
        <PageHeader
          sectionNumber={ed.headerNumber}
          category={ed.headerCategory}
          title={ed.headerTitle}
          description={ed.headerDescription}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem", width: "100%" }}>
          
          {/* 01 / DEGREE */}
          <section className="education-section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
              <SectionLabel number="01" label={isDe ? "STUDIENABSCHLUSS" : "DEGREE"} />
              <span className="font-mono" style={{ fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 700 }}>
                {isDe ? "2015 - 2019 | ABSCHLUSS" : "2015 - 2019 | GRADUATED"}
              </span>
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 2.6rem)", fontWeight: 400, letterSpacing: "0.02em", color: "var(--ink-primary)", marginBottom: "0.4rem" }}>
              {isDe
                ? "Bachelor of Engineering (B.E.) in Elektronik & Telekommunikation"
                : "Bachelor of Engineering in Electronics & Telecommunication"}
            </h2>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "var(--accent-primary)", fontWeight: 600, marginBottom: "0.5rem" }}>
              New Government Engineering College, Raipur (C.G.)
            </div>
            <div className="font-mono" style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", marginBottom: "1.5rem" }}>
              {isDe
                ? "Zugehörige Universität: Chhattisgarh Swami Vivekananda Technical University (CSVTU), Bhilai"
                : "Affiliating University: Chhattisgarh Swami Vivekananda Technical University (CSVTU), Bhilai"}
            </div>

            {/* Official Academic Transcript Metrics Strip */}
            <div className="education-metrics-strip">
              <div>
                <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", textTransform: "uppercase" }}>
                  {isDe ? "ABSCHLUSS-CPI" : "FINAL CPI"}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", fontWeight: 400, letterSpacing: "0.02em", color: "var(--ink-primary)" }}>7.62</div>
                <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-green)", fontWeight: 600 }}>
                  {isDe ? "ERSTE DIVISION (FIRST CLASS)" : "FIRST DIVISION"}
                </div>
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", textTransform: "uppercase" }}>
                  {isDe ? "GESAMTPUNKTE" : "CUMULATIVE MARKS"}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", fontWeight: 400, letterSpacing: "0.02em", color: "var(--ink-primary)" }}>4641 / 6800</div>
                <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)" }}>
                  {isDe ? "68,25% Gesamtdurchschnitt" : "68.25% Aggregate"}
                </div>
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", textTransform: "uppercase" }}>
                  {isDe ? "CSVTU CREDITS" : "CSVTU CREDITS"}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", fontWeight: 400, letterSpacing: "0.02em", color: "var(--ink-primary)" }}>247 Credits</div>
                <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)" }}>
                  {isDe ? "8 Fachsemester abgeschlossen" : "8 Semesters Completed"}
                </div>
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", textTransform: "uppercase" }}>
                  {isDe ? "ECTS-ÄQUIVALENZ" : "ECTS EQUIVALENCE"}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", fontWeight: 400, letterSpacing: "0.02em", color: "var(--ink-primary)" }}>240.0 ECTS</div>
                <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)" }}>
                  {isDe ? "Europäische Standardentsprechung" : "European Standard Match"}
                </div>
              </div>
            </div>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.98rem", color: "var(--ink-secondary)", lineHeight: 1.75, maxWidth: 960 }}>
              {isDe
                ? "Vierjähriges technisches Hochschulstudium mit den Schwerpunkten Signaltheorie, digitale Schaltungssynthese, Mikroprozessoren, Regelungstechnik und Kommunikationsprotokolle. Die fundierte Ausbildung in physikalischen Hardwaregrenzen, Speicherarchitekturen und hardwarenaher Kommunikation schuf eine solide Basis für meinen späteren Schwerpunkt auf Enterprise-Softwareentwicklung, Datenpipelines und verteilte Systemarchitekturen."
                : "Four-year formal engineering degree covering signals, digital circuit synthesis, microprocessors, control systems, and communication protocols. The program provided a solid foundation in how physical hardware constraints, memory architecture, and low-level communication function before shifting focus toward enterprise software development, data pipelines, and systems architecture."}
            </p>
          </section>

          {/* 02 / CERTIFICATIONS & PLATFORM CREDENTIALS */}
          <section className="education-section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
              <SectionLabel number="02" label={isDe ? "ZERTIFIKATE & QUALIFIKATIONEN" : "CREDENTIALS & CERTIFICATIONS"} />
              <span className="font-mono" style={{ fontSize: "0.82rem", color: "var(--accent-green)", fontWeight: 700 }}>
                {isDe ? "VON SALESFORCE VERIFIZIERT" : "SALESFORCE VERIFIED"}
              </span>
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.3rem)", fontWeight: 400, letterSpacing: "0.02em", color: "var(--ink-primary)", marginBottom: "0.4rem" }}>
              {isDe ? "Salesforce-Zertifizierungen & Plattformnachweise" : "Salesforce Certifications & Platform Credentials"}
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, maxWidth: 960, marginBottom: "1.75rem" }}>
              {isDe
                ? "Branchenweit anerkannte Nachweise und verifizierte Plattform-Badges für deklarative Konfiguration, Anforderungsanalyse und programmatische Apex-Entwicklung."
                : "Industry credentials and verified platform badges demonstrating hands-on configuration, business requirements analysis, and programmatic Apex development."}
            </p>

            <div className="education-certs-grid">
              
              <div className="education-card" style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <Award size={18} color="var(--accent-primary)" />
                  <span className="font-display" style={{ fontWeight: 400, fontSize: "1.25rem", letterSpacing: "0.03em", color: "var(--ink-primary)" }}>
                    Salesforce Certified Administrator
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--accent-green)", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {isDe ? "ZERTIFIZIERT | ZERTIFIKATS-ID: 22807661" : "CERTIFIED | CREDENTIAL ID: 22807661"}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                  {isDe
                    ? "Verifizierte Kompetenz in Benutzermanagement, Sicherheitsarchitektur (OWD, Profile, Berechtigungssätze), Standard- und benutzerdefinierten Objekten, Flow-Automatisierung und operativer Plattformadministration."
                    : "Verified capability in user management, security architecture (OWD, profiles, permission sets), standard and custom objects, record-triggered automation via Flow, and operational platform configuration."}
                </p>
              </div>

              <div className="education-card" style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <Award size={18} color="var(--accent-primary)" />
                  <span className="font-display" style={{ fontWeight: 400, fontSize: "1.25rem", letterSpacing: "0.03em", color: "var(--ink-primary)" }}>
                    Salesforce Certified Business Analyst
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--accent-green)", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {isDe ? "ZERTIFIZIERT" : "CERTIFIED"}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                  {isDe
                    ? "Umfasst Geschäftsanforderungsanalyse, Prozessmodellierung, User-Story-Definition, Festlegung von Akzeptanzkriterien und Koordination von Benutzerakzeptanztests (UAT)."
                    : "Covers enterprise discovery, business process mapping, requirements elicitation, user story definition, acceptance criteria, and UAT coordination."}
                </p>
              </div>

              <div className="education-card" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <Award size={18} color="var(--ink-muted)" />
                  <span className="font-display" style={{ fontWeight: 400, fontSize: "1.25rem", letterSpacing: "0.03em", color: "var(--ink-primary)" }}>
                    Salesforce Platform Developer I (PD1)
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--accent-yellow)", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {isDe ? "IN VORBEREITUNG" : "IN PROGRESS"}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                  {isDe
                    ? "Programmatische Entwicklung: objektorientiertes Apex, SOQL- und SOSL-Abfragen, Entwurfsmuster für Trigger und Management asynchroner Ausführungsgrenzen."
                    : "Programmatic development covering Apex object-oriented fundamentals, SOQL and SOSL queries, trigger design patterns, and asynchronous execution limits."}
                </p>
              </div>

            </div>

            {/* Trailhead Ranger Subheading Badge Strip */}
            <div
              className="trailhead-ranger-bar"
              style={{
                border: "1px solid var(--border-primary)",
                background: "var(--bg-surface)",
                padding: "1.25rem 1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <div className="trailhead-ranger-left" style={{ display: "flex", alignItems: "center", gap: "0.85rem", flex: "1 1 260px" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    minWidth: 40,
                    minHeight: 40,
                    flexShrink: 0,
                    background: "var(--accent-yellow)",
                    color: "var(--ink-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--border-primary)",
                    fontWeight: 700,
                  }}
                >
                  <Award size={22} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.2rem" }}>
                    <span className="font-display" style={{ fontWeight: 400, fontSize: "1.25rem", letterSpacing: "0.03em", color: "var(--ink-primary)" }}>
                      Trailhead Ranger
                    </span>
                    <span className="font-pixel" style={{ fontSize: "0.72rem", background: "var(--bg-surface-subtle)", border: "1px solid var(--border-subtle)", padding: "0.15rem 0.45rem", fontWeight: 700, color: "var(--accent-primary)" }}>
                      {isDe ? "SALESFORCE PLATTFORM-RANG" : "SALESFORCE PLATFORM RANK"}
                    </span>
                  </div>
                  <div className="font-mono" style={{ fontSize: "0.78rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
                    {isDe
                      ? "Offizielle Salesforce Trailhead-Auszeichnung, erlangt durch 100+ absolvierte Module, praktische Programmieraufgaben und Superbadges."
                      : "Official Salesforce Trailhead recognition earned through 100+ module completions, hands-on challenges, and superbadges."}
                  </div>
                </div>
              </div>

              <div className="font-pixel trailhead-verified-badge" style={{ fontSize: "0.74rem", color: "var(--accent-green)", fontWeight: 700, background: "var(--bg-surface-subtle)", padding: "0.35rem 0.75rem", border: "1px solid var(--border-subtle)", whiteSpace: "nowrap" }}>
                {isDe ? "STATUS: VERIFIZIERT" : "VERIFIED STATUS"}
              </div>
            </div>
          </section>

          {/* 03 / TECHNICAL TRAINING */}
          <section className="education-section">
            <div style={{ marginBottom: "1rem" }}>
              <SectionLabel number="03" label={isDe ? "BERUFLICHE WEITERBILDUNG" : "TECHNICAL TRAINING"} />
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.3rem)", fontWeight: 400, letterSpacing: "0.02em", color: "var(--ink-primary)", marginBottom: "1.5rem" }}>
              {isDe ? "Fachspezifische & industrielle Praxistrainings" : "Vocational & Industrial Technical Training"}
            </h2>

            <div className="education-training-grid">
              
              <div className="education-card" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <Cpu size={18} color="var(--accent-primary)" />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.03em", fontSize: "1.3rem", color: "var(--ink-primary)" }}>
                    Certified IoT Professional
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.78rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.25rem" }}>
                  TechnoScripts, Pune | ISO 9001:2015 Certified
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--ink-muted)", marginBottom: "0.85rem" }}>
                  {isDe ? "Juli 2018 - August 2018 | 1-monatiges Intensivpraktikum (Bewertung 'Exzellent')" : "July 2018 - August 2018 | 1-Month Intensive Internship Training (Rated 'Excellent')"}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.65 }}>
                  {isDe
                    ? "Praktische Mitarbeit unter Anleitung von Senior Engineers im Bereich Embedded Systems. Schwerpunkte: Mikrocontroller-Programmierung (ARM, Arduino), Sensorintegration, automatisierte Datenerfassung und IoT-Übertragungsprotokolle (MQTT, HTTP, WebSockets)."
                    : "Selected through an internship process to work under senior engineers in the Embedded Development Department. Focused on microcontroller programming (ARM, Arduino), sensor integration, automated data acquisition, and IoT communication protocols including MQTT, HTTP, and WebSockets."}
                </p>
              </div>

              <div className="education-card" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <BookOpen size={18} color="var(--accent-primary)" />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.03em", fontSize: "1.3rem", color: "var(--ink-primary)" }}>
                    VLSI Design (VHDL)
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.78rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.25rem" }}>
                  Success Gate | ISO 9001:2008 Certified
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--ink-muted)", marginBottom: "0.85rem" }}>
                  {isDe ? "Mai 2017 - Juli 2017 | 45-tägiges Intensivprogramm" : "May 2017 - July 2017 | 45-Day Intensive Training Program"}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.65 }}>
                  {isDe
                    ? "Intensives Trainingsprogramm für digitalen Logikentwurf, kombinatorische und sequentielle Schaltungssynthese, Zustandsautomaten (FSM) und Hardwareverifikation mittels VHDL. Simulation realer Systeme einschließlich Ampelsteuerungen und Aufzugsteuerungen."
                    : "Intensive training program focused on digital logic design, combinational and sequential circuit synthesis, finite state machines, and hardware verification using VHDL. Built and simulated functional models for real-world systems including traffic light controllers and elevator logic."}
                </p>
              </div>

            </div>
          </section>

          {/* 04 / COLLEGE & CAMPUS LEADERSHIP RECOGNITIONS */}
          <section className="education-section">
            <div style={{ marginBottom: "1rem" }}>
              <SectionLabel number="04" label={isDe ? "CAMPUS-ENGAGEMENT" : "CAMPUS RECOGNITION"} />
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.3rem)", fontWeight: 400, letterSpacing: "0.02em", color: "var(--ink-primary)", marginBottom: "0.5rem" }}>
              {isDe ? "Akademische Auszeichnungen & studentische Führung" : "College Honors & Formal Recognition"}
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, maxWidth: 960, marginBottom: "1.75rem" }}>
              {isDe
                ? "Offizielle Anerkennungsschreiben und Führungsmeilensteine während des Studiums am New Government Engineering College, Raipur."
                : "Formal letters of appreciation and student leadership service milestones awarded during engineering tenure at New Government Engineering College, Raipur."}
            </p>

            <div className="education-honors-grid">
              
              <div className="education-card" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <Trophy size={18} color="var(--accent-yellow)" />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.03em", fontSize: "1.25rem", color: "var(--ink-primary)" }}>
                    {isDe ? "Erstes GEC-Alumni-Treffen" : "First-Ever GEC Alumni Meet"}
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {isDe ? "ANERKENNUNGSSCHREIBEN" : "LETTER OF APPRECIATION"}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                  {isDe
                    ? "Anerkennungsschreiben der Hochschulleitung für die Leitung des studentischen Organisationsteams beim ersten Alumni-Treffen des New Government Engineering College Raipur."
                    : "Letter of Appreciation for leading the student organizing team for the first-ever New Government Engineering College Raipur Alumni Meet."}
                </p>
              </div>

              <div className="education-card" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <Trophy size={18} color="var(--accent-yellow)" />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.03em", fontSize: "1.25rem", color: "var(--ink-primary)" }}>
                    Aayam Kulturfestival
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {isDe ? "ANERKENNUNGSSCHREIBEN" : "LETTER OF APPRECIATION"}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                  {isDe
                    ? "Anerkennungsschreiben für die Leitung des Sport- und Veranstaltungsmanagements beim jährlichen Hochschulkulturfestival Aayam."
                    : "Letter of Appreciation for leading sports management operations during the annual Aayam Cultural Fest."}
                </p>
              </div>

              <div className="education-card" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <Trophy size={18} color="var(--accent-yellow)" />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.03em", fontSize: "1.25rem", color: "var(--ink-primary)" }}>
                    Aavesh Technik-Festival
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {isDe ? "ANERKENNUNGSSCHREIBEN" : "LETTER OF APPRECIATION"}
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                  {isDe
                    ? "Anerkennungsschreiben für technische Medienberichterstattung und Videoregie während des Aavesh Tech Fest."
                    : "Letter of Appreciation for videography direction and technical media coverage at the Aavesh Tech Fest."}
                </p>
              </div>

            </div>
          </section>

          {/* 05 / HARDWARE & PRACTICAL ENGINEERING LABS */}
          <section className="education-section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "0.75rem" }}>
              <div>
                <SectionLabel number="05" label={isDe ? "NOTEN- & PRAKTIKASPIEGEL" : "TRANSCRIPT RECORD"} />
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.3rem)", fontWeight: 400, letterSpacing: "0.02em", color: "var(--ink-primary)", marginTop: "0.25rem", marginBottom: "0.4rem" }}>
                  {isDe ? "Praktische Ingenieurlaboratorien & Versuchskurse" : "Practical Engineering Laboratory Coursework"}
                </h2>
              </div>
              <span className="font-mono" style={{ fontSize: "0.78rem", color: "var(--ink-muted)", background: "var(--bg-surface-subtle)", padding: "0.35rem 0.75rem", border: "1px solid var(--border-subtle)" }}>
                {isDe ? "28 OFFIZIELLE PRAKTIKA DOKUMENTIERT" : "28 OFFICIAL LABS RECORDED"}
              </span>
            </div>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, maxWidth: 960, marginBottom: "2rem" }}>
              {isDe
                ? "Verifizierte Labor- und Praktikumskurse nach Semestern geordnet, abgeschlossen am New Government Engineering College Raipur (CSVTU). Beinhaltet exakte Kursnummern, erzielte Prüfungsnoten, Notenwerte und akademische Leistungspunkte."
                : "Verified semester-by-semester laboratory courses completed at New Government Engineering College, Raipur under CSVTU. Includes exact course codes, practical marks obtained, grades, and academic credits."}
            </p>

            {/* Category Filter Buttons */}
            <div className="font-mono" style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "2rem", fontSize: "0.74rem" }}>
              {labCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: "0.4rem 0.85rem",
                      border: "1px solid var(--border-primary)",
                      background: isSelected ? "var(--ink-primary)" : "var(--bg-surface)",
                      color: isSelected ? "var(--bg-canvas)" : "var(--ink-secondary)",
                      fontWeight: 700,
                      boxShadow: isSelected ? "2px 2px 0 var(--border-primary)" : "none",
                      transition: "all var(--motion-fast)",
                      cursor: "pointer",
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Practical Labs Grid */}
            <div className="education-labs-grid">
              {filteredLabs.map((lab, index) => (
                <div
                  key={`${lab.code}-${index}`}
                  className="education-card"
                  style={{
                    background: "var(--bg-surface-subtle)",
                    border: "1px solid var(--border-subtle)",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                    transition: "border-color var(--motion-fast)",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 700 }}>
                        SEM 0{lab.semester} {"//"} {lab.session}
                      </span>
                      <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--ink-muted)", border: "1px solid var(--border-subtle)", padding: "0.15rem 0.4rem" }}>
                        {lab.code}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400, letterSpacing: "0.03em", color: "var(--ink-primary)", lineHeight: 1.35, marginBottom: "0.5rem" }}>
                      {lab.name}
                    </h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                      {lab.description}
                    </p>
                  </div>

                  <div
                    className="font-mono"
                    style={{
                      borderTop: "1px solid var(--border-subtle)",
                      paddingTop: "0.65rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "0.75rem",
                    }}
                  >
                    <div>
                      <span style={{ color: "var(--ink-muted)" }}>{isDe ? "PUNKTE: " : "MARKS: "}</span>
                      <span style={{ fontWeight: 700, color: "var(--ink-primary)" }}>{lab.marks}</span>
                    </div>
                    <div>
                      <span style={{ color: "var(--ink-muted)" }}>{isDe ? "NOTE: " : "GRADE: "}</span>
                      <span style={{ fontWeight: 700, color: "var(--accent-primary)" }}>{lab.grade}</span>
                    </div>
                    <div style={{ color: "var(--ink-muted)" }}>
                      {lab.credits} {isDe ? "Credits" : "Credits"} ({lab.ects} ECTS)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action Row */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <Link href={isDe ? "/de/skills" : "/skills"} className="btn-tactile-primary">
              {isDe ? "TECHNISCHE KOMPETENZEN ANSEHEN" : "VIEW TECHNICAL SKILLS"}
            </Link>
            <Link href={isDe ? "/de/experience" : "/experience"} className="btn-tactile-secondary">
              {isDe ? "BERUFLICHEN WERDEGANG ANSEHEN" : "VIEW WORK EXPERIENCE"}
            </Link>
          </div>

        </div>
      </main>

      <Footer locale={locale} />

      <style suppressHydrationWarning>{`
        .education-section {
          border: 1px solid var(--border-primary);
          background: var(--bg-surface);
          padding: 2.75rem 2.25rem;
          box-shadow: var(--shadow-tactile);
          width: 100%;
          box-sizing: border-box;
        }
        .education-metrics-strip {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
          gap: 1rem;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 1.25rem;
          margin-bottom: 1.75rem;
          box-sizing: border-box;
        }
        .education-certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: 1.5rem;
          margin-bottom: 1.75rem;
          width: 100%;
          box-sizing: border-box;
        }
        .education-training-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
          gap: 1.75rem;
          width: 100%;
          box-sizing: border-box;
        }
        .education-honors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }
        .education-labs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
          gap: 1.25rem;
          width: 100%;
          box-sizing: border-box;
        }
        .education-card {
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          word-break: break-word;
        }

        @media (max-width: 768px) {
          main {
            padding: 2rem 0.85rem 4rem !important;
          }
          .education-section {
            padding: 1.35rem 0.95rem !important;
          }
          .education-metrics-strip {
            grid-template-columns: 1fr 1fr !important;
            gap: 0.75rem !important;
            padding: 0.85rem !important;
          }
          .education-certs-grid,
          .education-training-grid,
          .education-honors-grid,
          .education-labs-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .education-card {
            padding: 1.15rem 0.95rem !important;
          }
          .trailhead-ranger-bar {
            padding: 1.15rem 1rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.85rem !important;
          }
          .trailhead-ranger-left {
            width: 100% !important;
            align-items: flex-start !important;
          }
          .trailhead-verified-badge {
            align-self: flex-start !important;
          }
        }

        @media (max-width: 440px) {
          .education-metrics-strip {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
