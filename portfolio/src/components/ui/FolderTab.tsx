"use client";

import React from "react";

interface FolderTabProps {
  active: boolean;
  number: string;
  title: string;
  onClick?: () => void;
  id?: string;
  controls?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function FolderTab({
  active,
  number,
  title,
  onClick,
  id,
  controls,
  className = "",
  style = {},
}: FolderTabProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      type="button"
      role={onClick ? "tab" : undefined}
      id={id}
      aria-controls={controls}
      aria-selected={onClick ? active : undefined}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`folder-trapezium-tab ${active ? "active" : ""} ${className ?? ""}`.trim()}
      style={{
        position: "relative",
        background: "transparent",
        border: "none",
        padding: "0.65rem 2.2rem 0.65rem",
        cursor: onClick ? "pointer" : "default",
        fontFamily: "var(--font-mono)",
        fontSize: "0.78rem",
        fontWeight: 700,
        letterSpacing: "0.04em",
        outline: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: active ? "var(--ink-primary)" : hovered ? "var(--ink-primary)" : "var(--ink-muted)",
        zIndex: active ? 4 : hovered ? 2 : 1,
        marginBottom: "-1px",
        transition: "color var(--motion-fast)",
        userSelect: "none",
        ...style,
      }}
    >
      {/* SVG Trapezium Background & Precision Border */}
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          zIndex: -1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {/* Filled Background */}
        <path
          d="M 0 40 L 10 3 Q 12 0 16 0 L 84 0 Q 88 0 90 3 L 100 40 Z"
          fill={
            active
              ? "var(--bg-surface)"
              : hovered
              ? "var(--bg-surface)"
              : "var(--bg-surface-subtle)"
          }
          style={{ transition: "fill var(--motion-fast)" }}
        />

        {/* Outline Stroke */}
        {active ? (
          // Active: Stroke only on left, top, and right (open bottom to merge seamlessly with the card)
          <path
            d="M 0 40 L 10 3 Q 12 0 16 0 L 84 0 Q 88 0 90 3 L 100 40"
            fill="none"
            stroke="var(--border-primary)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        ) : (
          // Inactive: Closed stroke with bottom border resting on card's top edge
          <path
            d="M 0 40 L 10 3 Q 12 0 16 0 L 84 0 Q 88 0 90 3 L 100 40 Z"
            fill="none"
            stroke={hovered ? "var(--border-primary)" : "var(--border-subtle)"}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transition: "stroke var(--motion-fast)" }}
          />
        )}
      </svg>

      {/* Tab Text Label */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span style={{ color: active ? "var(--accent-primary)" : "inherit" }}>{number}</span>
        <span style={{ color: "var(--ink-muted)" }}>{"//"}</span>
        <span>{title}</span>
      </span>
    </button>
  );
}
