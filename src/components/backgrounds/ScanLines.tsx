/**
 * ScanLines — subtle horizontal drift lines that create a data-stream effect.
 * Uses CSS animation only (no GSAP needed).
 * Intended for dark sections (e.g. FinalCta).
 */
export function ScanLines() {
  // 8 evenly spaced lines at ~60px intervals, low opacity
  const lines = Array.from({ length: 8 }, (_, i) => ({
    top: `${i * 60}px`,
    opacity: 0.02 + (i % 3) * 0.015, // alternates between 0.02–0.05
    delay: `${i * -3.75}s`,           // stagger start so lines are spread across the 30s cycle
  }))

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <style>{`
        @keyframes scan-drift {
          0%   { transform: translateY(0); }
          100% { transform: translateY(480px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .scan-line { animation: none !important; }
        }
      `}</style>

      {lines.map((line, i) => (
        <div
          key={i}
          className="scan-line absolute left-0 right-0 h-px bg-white"
          style={{
            top: line.top,
            opacity: line.opacity,
            animation: `scan-drift 30s ${line.delay} linear infinite`,
          }}
        />
      ))}
    </div>
  )
}
