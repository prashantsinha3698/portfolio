interface SectionLabelProps {
  number: string;
  label?: string;
  title?: string;
}

export default function SectionLabel({ number, label, title }: SectionLabelProps) {
  const text = (label || title || "").toUpperCase();

  return (
    <div
      className="font-mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        color: "var(--accent-primary)",
        marginBottom: "0.75rem",
      }}
    >
      <span style={{ width: 7, height: 7, background: "var(--accent-primary)", display: "inline-block" }} />
      <span>
        {number} {"//"} {text}
      </span>
    </div>
  );
}
