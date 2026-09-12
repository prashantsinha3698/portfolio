interface TechTagProps {
  label: string;
}

export default function TechTag({ label }: TechTagProps) {
  return (
    <span
      className="font-pixel"
      style={{
        fontSize: "0.78rem",
        padding: "0.22rem 0.55rem",
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        color: "var(--ink-secondary)",
        fontWeight: 500,
        whiteSpace: "nowrap",
        letterSpacing: "0.04em",
      }}
    >
      {label ?? ""}
    </span>
  );
}
