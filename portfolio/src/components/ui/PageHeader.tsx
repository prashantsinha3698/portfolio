interface PageHeaderProps {
  number?: string;
  sectionNumber?: string;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  category?: string;
}

export default function PageHeader({
  number,
  sectionNumber,
  title,
  subtitle,
  description,
  badge,
  category,
}: PageHeaderProps) {
  const displayNum = number || sectionNumber || "01";
  const displaySubtitle = subtitle || description || "";
  const displayBadge = badge || category;

  return (
    <div
      style={{
        padding: "3.5rem 0 2.5rem",
        borderBottom: "1px solid var(--border-primary)",
        background: "var(--bg-surface-subtle)",
        marginBottom: "3.5rem",
      }}
    >
      <div className="container">
        <div
          className="font-mono page-header-meta"
          style={{
            fontSize: "0.75rem",
            color: "var(--accent-primary)",
            fontWeight: 600,
            letterSpacing: "0.1em",
            marginBottom: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: 7, height: 7, background: "var(--accent-primary)", display: "inline-block" }} />
            <span>{displayNum} / {title.toUpperCase()}</span>
          </div>
          {displayBadge && (
            <span
              className="page-header-badge"
              style={{
                fontSize: "0.68rem",
                color: "var(--ink-muted)",
                border: "1px solid var(--border-subtle)",
                padding: "0.15rem 0.5rem",
                background: "var(--bg-surface)",
                display: "inline-block",
              }}
            >
              {displayBadge}
            </span>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "2rem",
            alignItems: "flex-end",
          }}
          className="page-header-grid"
        >
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "var(--ink-primary)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "1.02rem",
              color: "var(--ink-secondary)",
              lineHeight: 1.65,
              maxWidth: "520px",
            }}
          >
            {displaySubtitle}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .page-header-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
        @media (max-width: 768px) {
          .page-header-meta {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.45rem !important;
            margin-bottom: 1rem !important;
          }
          .page-header-badge {
            font-size: 0.62rem !important;
            padding: 0.15rem 0.45rem !important;
            letter-spacing: 0.04em !important;
          }
        }
      `}</style>
    </div>
  );
}
