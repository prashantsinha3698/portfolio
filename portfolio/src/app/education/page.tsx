"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import PageHeader from "@/components/ui/PageHeader";
import { GraduationCap, Award, Cpu, BookOpen, Layers, CheckCircle2, ChevronRight, Trophy } from "lucide-react";

interface LabCourse {
  semester: number;
  session: string;
  code: string;
  name: string;
  marks: string;
  grade: string;
  credits: number;
  ects: number;
  category: "Electronics" | "Microprocessors & VLSI" | "Communications" | "Computing & Projects";
  description: string;
}

const ACADEMIC_LABS: LabCourse[] = [
  // Semester 1
  { semester: 1, session: "2015-2016", code: "300121(11)", name: "Applied Chemistry (Lab)", marks: "53 / 60", grade: "A", credits: 1, ects: 1.12, category: "Computing & Projects", description: "Volumetric analysis, water hardness determination, and experimental chemical testing." },
  { semester: 1, session: "2015-2016", code: "300126(24)", name: "Elements of Electrical Engineering (Lab)", marks: "49 / 60", grade: "B+", credits: 1, ects: 1.12, category: "Electronics", description: "Verification of Kirchhoff's laws, superposition theorem, and single-phase AC circuit analysis." },
  { semester: 1, session: "2015-2016", code: "300124(37)", name: "Workshop Practice", marks: "47 / 60", grade: "B+", credits: 2, ects: 2.24, category: "Computing & Projects", description: "Fitting, carpentry, sheet metal work, welding, and machine tool practice." },

  // Semester 2
  { semester: 2, session: "2015-2016", code: "300228(15)", name: "Applied Physics (Lab)", marks: "48 / 60", grade: "B+", credits: 1, ects: 1.12, category: "Electronics", description: "Spectrometer optics, semiconductor bandgap estimation, and interference measurements." },
  { semester: 2, session: "2015-2016", code: "300229(37)", name: "Mechanical Engineering (Lab)", marks: "54 / 60", grade: "A+", credits: 1, ects: 1.12, category: "Computing & Projects", description: "Heat engines, mechanical testing instruments, and kinematic mechanism verification." },
  { semester: 2, session: "2015-2016", code: "300221(46)", name: "Communication Skill (Lab)", marks: "53 / 60", grade: "A", credits: 2, ects: 2.24, category: "Computing & Projects", description: "Language lab phonetics, technical presentation, and structured documentation writing." },

  // Semester 3
  { semester: 3, session: "Nov-Dec 2016", code: "328361(28)", name: "Electronic Devices and Circuits (Lab)", marks: "52 / 60", grade: "A", credits: 2, ects: 2.24, category: "Electronics", description: "BJT, JFET, and MOSFET characteristic curve tracing, frequency response, and rectifier circuits." },
  { semester: 3, session: "Nov-Dec 2016", code: "328362(28)", name: "Industrial Instrumentation (Lab)", marks: "52 / 60", grade: "A", credits: 2, ects: 2.24, category: "Electronics", description: "LVDT displacement calibration, thermocouple and strain gauge testing, and AC bridge measurements." },
  { semester: 3, session: "Nov-Dec 2016", code: "328363(28)", name: "Digital Logic Design (Lab)", marks: "51 / 60", grade: "A", credits: 2, ects: 2.24, category: "Microprocessors & VLSI", description: "Implementation of full adders, multiplexers, decoders, flip-flop registers, and digital counters." },
  { semester: 3, session: "Nov-Dec 2016", code: "328364(28)", name: "Electronics Workshop (Lab)", marks: "51 / 60", grade: "A", credits: 1, ects: 1.12, category: "Electronics", description: "PCB schematic design, chemical etching, hardware component soldering, and continuity diagnostics." },

  // Semester 4
  { semester: 4, session: "Apr-May 2017", code: "328461(28)", name: "Numerical Analysis Using C (Lab)", marks: "47 / 60", grade: "B+", credits: 2, ects: 2.24, category: "Computing & Projects", description: "C programming implementations of Newton-Raphson, Gauss elimination, and Runge-Kutta numerical solvers." },
  { semester: 4, session: "Apr-May 2017", code: "328462(28)", name: "Analog Communication (Lab)", marks: "55 / 60", grade: "A+", credits: 2, ects: 2.24, category: "Communications", description: "Hardware generation and detection of Amplitude (DSB/SSB), Frequency, and Phase modulation signals." },
  { semester: 4, session: "Apr-May 2017", code: "328463(28)", name: "Analog Electronics (Lab)", marks: "57 / 60", grade: "A+", credits: 2, ects: 2.24, category: "Electronics", description: "Multistage RC-coupled amplifiers, push-pull power stages, and feedback oscillator circuits." },
  { semester: 4, session: "Apr-May 2017", code: "328464(28)", name: "Microprocessor and Interfaces (Lab)", marks: "47 / 60", grade: "B+", credits: 1, ects: 1.12, category: "Microprocessors & VLSI", description: "Intel 8085 microprocessor assembly programming, 8255 PPI chip interfacing, and DAC waveform generation." },

  // Semester 5
  { semester: 5, session: "Nov-Dec 2017", code: "328561(28)", name: "Linear Integrated Circuits & Applications Lab", marks: "52 / 60", grade: "A", credits: 2, ects: 2.24, category: "Electronics", description: "Operational amplifier IC 741 circuits, active filters, Schmitt triggers, and 555 timer multivibrators." },
  { semester: 5, session: "Nov-Dec 2017", code: "328562(28)", name: "Data Structures and Programming with C++ Lab", marks: "57 / 60", grade: "A+", credits: 2, ects: 2.24, category: "Computing & Projects", description: "Linked list implementation, binary search trees, stacks, queues, and object-oriented algorithms in C++." },
  { semester: 5, session: "Nov-Dec 2017", code: "328563(28)", name: "Digital Communication Lab", marks: "57 / 60", grade: "A+", credits: 2, ects: 2.24, category: "Communications", description: "Pulse Code Modulation (PCM), Delta Modulation, ASK, FSK, and BPSK digital carrier modulation kits." },
  { semester: 5, session: "Nov-Dec 2017", code: "328564(28)", name: "Advanced Microprocessor and Interfacing Lab", marks: "56 / 60", grade: "A+", credits: 2, ects: 2.24, category: "Microprocessors & VLSI", description: "Intel 8086 16-bit assembly language programming, string instructions, and memory segment configuration." },

  // Semester 6
  { semester: 6, session: "Apr-May 2018", code: "328661(28)", name: "Digital Signal Processing Lab", marks: "56 / 60", grade: "A+", credits: 1, ects: 1.12, category: "Communications", description: "MATLAB algorithmic signal processing: DFT, FFT calculations, FIR windowing, and IIR Chebyshev filter design." },
  { semester: 6, session: "Apr-May 2018", code: "328662(28)", name: "Electronic Circuit Design Lab", marks: "57 / 60", grade: "A+", credits: 2, ects: 2.24, category: "Electronics", description: "SPICE EDA simulation and breadboard validation of tuned RF amplifiers and voltage regulator topologies." },
  { semester: 6, session: "Apr-May 2018", code: "328663(28)", name: "Microcontroller & Embedded Systems Lab", marks: "54 / 60", grade: "A+", credits: 2, ects: 2.24, category: "Microprocessors & VLSI", description: "Embedded C programming for 8051 and ARM architectures: timer interrupts, serial UART, and LCD displays." },
  { semester: 6, session: "Apr-May 2018", code: "328664(28)", name: "VLSI Design Lab", marks: "57 / 60", grade: "A+", credits: 2, ects: 2.24, category: "Microprocessors & VLSI", description: "VHDL and Verilog RTL digital design, behavioral testbench verification, and FPGA circuit synthesis." },

  // Semester 7
  { semester: 7, session: "Nov-Dec 2018", code: "328761(28)", name: "Microwave Communication and Engineering Lab", marks: "51 / 60", grade: "A", credits: 2, ects: 2.24, category: "Communications", description: "Klystron bench measurements, Gunn diode oscillator characteristics, VSWR, and waveguide radiation patterns." },
  { semester: 7, session: "Nov-Dec 2018", code: "328762(28)", name: "Computer Networks Lab", marks: "55 / 60", grade: "A+", credits: 2, ects: 2.24, category: "Communications", description: "Network packet inspection using Wireshark, socket programming, CRC error detection, and routing simulations." },
  { semester: 7, session: "Nov-Dec 2018", code: "328763(28)", name: "Advance Communication Lab", marks: "52 / 60", grade: "A", credits: 2, ects: 2.24, category: "Communications", description: "Fiber optic link budget testing, numerical aperture evaluation, connector losses, and satellite telemetry." },
  { semester: 7, session: "Nov-Dec 2018", code: "328764(28)", name: "Minor Project", marks: "126 / 140", grade: "A+", credits: 2, ects: 2.24, category: "Computing & Projects", description: "Hardware telemetry prototype: design, circuit fabrication, embedded microchip firmware, and viva defense." },

  // Semester 8
  { semester: 8, session: "Apr-May 2019", code: "328861(28)", name: "Optical Communication Lab", marks: "53 / 60", grade: "A", credits: 2, ects: 2.24, category: "Communications", description: "Laser diode source characterization, photodetector sensitivity, optical time domain measurements, and WDM." },
  { semester: 8, session: "Apr-May 2019", code: "328862(28)", name: "Digital Circuit Simulation Lab", marks: "58 / 60", grade: "A+", credits: 2, ects: 2.24, category: "Microprocessors & VLSI", description: "Logic synthesis, propagation delay simulation, and glitch analysis of complex digital sequential state machines." },
  { semester: 8, session: "Apr-May 2019", code: "328863(28)", name: "Power Electronics Lab", marks: "59 / 60", grade: "A+", credits: 2, ects: 2.24, category: "Electronics", description: "SCR and TRIAC gate triggering circuits, phase-controlled converters, and DC-DC switched-mode power supplies." },
  { semester: 8, session: "Apr-May 2019", code: "328864(28)", name: "Major Project Lab", marks: "168 / 180", grade: "A+", credits: 3, ects: 3.36, category: "Computing & Projects", description: "Comprehensive final year engineering capstone build: hardware architecture, systems firmware, validation, and faculty panel defense." },
];

const LAB_CATEGORIES = [
  "ALL PRACTICAL LABS",
  "Microprocessors & VLSI",
  "Communications",
  "Electronics",
  "Computing & Projects",
] as const;

type LabCategoryType = typeof LAB_CATEGORIES[number];

export default function EducationPage() {
  const [selectedCategory, setSelectedCategory] = useState<LabCategoryType>("ALL PRACTICAL LABS");

  const filteredLabs = selectedCategory === "ALL PRACTICAL LABS"
    ? ACADEMIC_LABS
    : ACADEMIC_LABS.filter((lab) => lab.category === selectedCategory);

  return (
    <div style={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", background: "var(--bg-canvas)", color: "var(--ink-primary)" }}>
      <Navigation />

      <main style={{ flex: 1, width: "100%", maxWidth: "100%", padding: "3rem clamp(1.25rem, 4vw, 4.5rem) 6rem" }}>
        
        <PageHeader
          sectionNumber="04"
          category="FORMAL EDUCATION AND CREDENTIALS"
          title="Education"
          description="Formal engineering foundation, complete transcript laboratory coursework, vocational technical training, certifications, and achievements."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem", width: "100%" }}>
          
          {/* 01 / DEGREE */}
          <section className="education-section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
              <SectionLabel number="01" label="DEGREE" />
              <span className="font-mono" style={{ fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 700 }}>
                2015 - 2019 | GRADUATED
              </span>
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3.5vw, 2.4rem)", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "0.4rem" }}>
              Bachelor of Engineering in Electronics & Telecommunication
            </h2>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "var(--accent-primary)", fontWeight: 600, marginBottom: "0.5rem" }}>
              New Government Engineering College, Raipur (C.G.)
            </div>
            <div className="font-mono" style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", marginBottom: "1.5rem" }}>
              Affiliating University: Chhattisgarh Swami Vivekananda Technical University (CSVTU), Bhilai
            </div>

            {/* Official Academic Transcript Metrics Strip */}
            <div className="education-metrics-strip">
              <div>
                <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", textTransform: "uppercase" }}>FINAL CPI</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)" }}>7.62</div>
                <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-green)", fontWeight: 600 }}>FIRST DIVISION</div>
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", textTransform: "uppercase" }}>CUMULATIVE MARKS</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)" }}>4641 / 6800</div>
                <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)" }}>68.25% Aggregate</div>
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", textTransform: "uppercase" }}>CSVTU CREDITS</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)" }}>247 Credits</div>
                <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)" }}>8 Semesters Completed</div>
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", textTransform: "uppercase" }}>ECTS EQUIVALENCE</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)" }}>240.0 ECTS</div>
                <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)" }}>European Standard Match</div>
              </div>
            </div>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.98rem", color: "var(--ink-secondary)", lineHeight: 1.75, maxWidth: 960 }}>
              Four-year formal engineering degree covering signals, digital circuit synthesis, microprocessors, control systems, and communication protocols. The program provided a solid foundation in how physical hardware constraints, memory architecture, and low-level communication function before shifting focus toward enterprise software development, data pipelines, and systems architecture.
            </p>
          </section>

          {/* 02 / CERTIFICATIONS & PLATFORM CREDENTIALS */}
          <section className="education-section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
              <SectionLabel number="02" label="CREDENTIALS & CERTIFICATIONS" />
              <span className="font-mono" style={{ fontSize: "0.82rem", color: "var(--accent-green)", fontWeight: 700 }}>
                SALESFORCE VERIFIED
              </span>
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "0.4rem" }}>
              Salesforce Certifications & Platform Credentials
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, maxWidth: 960, marginBottom: "1.75rem" }}>
              Industry credentials and verified platform badges demonstrating hands-on configuration, business requirements analysis, and programmatic Apex development.
            </p>

            <div className="education-certs-grid">
              
              <div className="education-card" style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <Award size={18} color="var(--accent-primary)" />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "var(--ink-primary)" }}>
                    Salesforce Certified Administrator
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--accent-green)", fontWeight: 700, marginBottom: "0.5rem" }}>
                  CERTIFIED | CREDENTIAL ID: 22807661
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                  Verified capability in user management, security architecture (OWD, profiles, permission sets), standard and custom objects, record-triggered automation via Flow, and operational platform configuration.
                </p>
              </div>

              <div className="education-card" style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <Award size={18} color="var(--accent-primary)" />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "var(--ink-primary)" }}>
                    Salesforce Certified Business Analyst
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--accent-green)", fontWeight: 700, marginBottom: "0.5rem" }}>
                  CERTIFIED
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                  Covers enterprise discovery, business process mapping, requirements elicitation, user story definition, acceptance criteria, and UAT coordination.
                </p>
              </div>

              <div className="education-card" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <Award size={18} color="var(--ink-muted)" />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "var(--ink-primary)" }}>
                    Salesforce Platform Developer I (PD1)
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--accent-yellow)", fontWeight: 700, marginBottom: "0.5rem" }}>
                  IN PROGRESS
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                  Programmatic development covering Apex object-oriented fundamentals, SOQL and SOSL queries, trigger design patterns, and asynchronous execution limits.
                </p>
              </div>

            </div>

            {/* Trailhead Ranger Subheading Badge Strip — kept with Salesforce certifications */}
            <div
              style={{
                border: "1px solid var(--border-primary)",
                background: "var(--bg-surface)",
                padding: "1.25rem 1.75rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--accent-yellow)",
                    color: "var(--ink-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--border-primary)",
                    fontWeight: 700,
                  }}
                >
                  <Award size={20} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.08rem", color: "var(--ink-primary)" }}>
                      Trailhead Ranger
                    </span>
                    <span className="font-mono" style={{ fontSize: "0.7rem", background: "var(--bg-surface-subtle)", border: "1px solid var(--border-subtle)", padding: "0.15rem 0.45rem", fontWeight: 700, color: "var(--accent-primary)" }}>
                      SALESFORCE PLATFORM RANK
                    </span>
                  </div>
                  <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--ink-muted)", marginTop: "0.15rem" }}>
                    Official Salesforce Trailhead recognition earned through 100+ module completions, hands-on challenges, and superbadges.
                  </div>
                </div>
              </div>

              <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--accent-green)", fontWeight: 700, background: "var(--bg-surface-subtle)", padding: "0.35rem 0.75rem", border: "1px solid var(--border-subtle)" }}>
                VERIFIED STATUS
              </div>
            </div>
          </section>

          {/* 03 / TECHNICAL TRAINING */}
          <section className="education-section">
            <div style={{ marginBottom: "1rem" }}>
              <SectionLabel number="03" label="TECHNICAL TRAINING" />
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "1.5rem" }}>
              Vocational & Industrial Technical Training
            </h2>

            <div className="education-training-grid">
              
              <div className="education-card" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <Cpu size={18} color="var(--accent-primary)" />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem", color: "var(--ink-primary)" }}>
                    Certified IoT Professional
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.78rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.25rem" }}>
                  TechnoScripts, Pune | ISO 9001:2015 Certified
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--ink-muted)", marginBottom: "0.85rem" }}>
                  July 2018 - August 2018 | 1-Month Intensive Internship Training (Rated 'Excellent')
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.65 }}>
                  Selected through an internship process to work under senior engineers in the Embedded Development Department. Focused on microcontroller programming (ARM, Arduino), sensor integration, automated data acquisition, and IoT communication protocols including MQTT, HTTP, and WebSockets.
                </p>
              </div>

              <div className="education-card" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <BookOpen size={18} color="var(--accent-primary)" />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem", color: "var(--ink-primary)" }}>
                    VLSI Design (VHDL)
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.78rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.25rem" }}>
                  Success Gate | ISO 9001:2008 Certified
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--ink-muted)", marginBottom: "0.85rem" }}>
                  May 2017 - July 2017 | 45-Day Intensive Training Program
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.65 }}>
                  Intensive training program focused on digital logic design, combinational and sequential circuit synthesis, finite state machines, and hardware verification using VHDL. Built and simulated functional models for real-world systems including traffic light controllers and elevator logic.
                </p>
              </div>

            </div>
          </section>

          {/* 04 / COLLEGE & CAMPUS LEADERSHIP RECOGNITIONS */}
          <section className="education-section">
            <div style={{ marginBottom: "1rem" }}>
              <SectionLabel number="04" label="CAMPUS RECOGNITION" />
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "0.5rem" }}>
              College Honors & Formal Recognition
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, maxWidth: 960, marginBottom: "1.75rem" }}>
              Formal letters of appreciation and student leadership service milestones awarded during engineering tenure at Government Engineering College, Raipur.
            </p>

            <div className="education-honors-grid">
              
              <div className="education-card" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <Trophy size={18} color="var(--accent-yellow)" />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink-primary)" }}>
                    First-Ever GEC Alumni Meet
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.5rem" }}>
                  LETTER OF APPRECIATION
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                  Letter of Appreciation for leading the student organizing team for the first-ever Government Engineering College Raipur Alumni Meet.
                </p>
              </div>

              <div className="education-card" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <Trophy size={18} color="var(--accent-yellow)" />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink-primary)" }}>
                    Aayam Cultural Fest
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.5rem" }}>
                  LETTER OF APPRECIATION
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                  Letter of Appreciation for leading sports management operations during the annual Aayam Cultural Fest.
                </p>
              </div>

              <div className="education-card" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <Trophy size={18} color="var(--accent-yellow)" />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink-primary)" }}>
                    Aavesh Tech Fest
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.5rem" }}>
                  LETTER OF APPRECIATION
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                  Letter of Appreciation for videography direction and technical media coverage at the Aavesh Tech Fest.
                </p>
              </div>

            </div>
          </section>

          {/* 05 / HARDWARE & PRACTICAL ENGINEERING LABS */}
          <section className="education-section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "0.75rem" }}>
              <div>
                <SectionLabel number="05" label="TRANSCRIPT RECORD" />
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--ink-primary)", marginTop: "0.25rem", marginBottom: "0.4rem" }}>
                  Practical Engineering Laboratory Coursework
                </h2>
              </div>
              <span className="font-mono" style={{ fontSize: "0.78rem", color: "var(--ink-muted)", background: "var(--bg-surface-subtle)", padding: "0.35rem 0.75rem", border: "1px solid var(--border-subtle)" }}>
                30 OFFICIAL LABS RECORDED
              </span>
            </div>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, maxWidth: 960, marginBottom: "2rem" }}>
              Verified semester-by-semester laboratory courses completed at Government Engineering College, Raipur under CSVTU. Includes exact course codes, practical marks obtained, grades, and academic credits.
            </p>

            {/* Category Filter Buttons */}
            <div className="font-mono" style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "2rem", fontSize: "0.74rem" }}>
              {LAB_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
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
                    {cat}
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
                        SEM 0{lab.semester} // {lab.session}
                      </span>
                      <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--ink-muted)", border: "1px solid var(--border-subtle)", padding: "0.15rem 0.4rem" }}>
                        {lab.code}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink-primary)", lineHeight: 1.35, marginBottom: "0.5rem" }}>
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
                      <span style={{ color: "var(--ink-muted)" }}>MARKS: </span>
                      <span style={{ fontWeight: 700, color: "var(--ink-primary)" }}>{lab.marks}</span>
                    </div>
                    <div>
                      <span style={{ color: "var(--ink-muted)" }}>GRADE: </span>
                      <span style={{ fontWeight: 700, color: "var(--accent-primary)" }}>{lab.grade}</span>
                    </div>
                    <div style={{ color: "var(--ink-muted)" }}>
                      {lab.credits} Credits ({lab.ects} ECTS)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action Row */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <Link href="/skills" className="btn-tactile-primary">
              VIEW TECHNICAL SKILLS
            </Link>
            <Link href="/experience" className="btn-tactile-secondary">
              VIEW WORK EXPERIENCE
            </Link>
          </div>

        </div>
      </main>

      <Footer />

      <style>{`
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
