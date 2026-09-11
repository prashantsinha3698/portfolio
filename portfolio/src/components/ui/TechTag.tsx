interface TechTagProps {
  label: string;
}

export default function TechTag({ label }: TechTagProps) {
  return (
    <span
      className="font-mono"
      style={{
        fontSize: "0.72rem",
        padding: "0.22rem 0.5rem",
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        color: "var(--ink-secondary)",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
