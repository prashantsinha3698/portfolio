interface StatusBadgeProps {
  status: string;
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const display = (label || status).toUpperCase();
  const isLive = display.includes("LIVE") || display.includes("ACTIVE");
  return (
    <span
      className="font-pixel"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        padding: "0.2rem 0.55rem",
        background: isLive ? "var(--accent-subtle)" : "var(--bg-surface-subtle)",
        color: isLive ? "var(--accent-primary)" : "var(--ink-secondary)",
        border: `1px solid ${isLive ? "var(--accent-primary)" : "var(--border-subtle)"}`,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: isLive ? "var(--accent-primary)" : "var(--ink-muted)",
          display: "inline-block",
        }}
      />
      <span>{status.toUpperCase()}</span>
    </span>
  );
}
