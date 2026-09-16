import type { Language, Lesson } from "../types";
import { t } from "../i18n";
export default function MeaningMap({
  lesson,
  lang,
  selected,
  onSelect,
  position,
}: {
  lesson: Lesson;
  lang: Language;
  selected: string;
  onSelect: (s: string) => void;
  position?: { x: number; y: number };
}) {
  const focus = lesson.words.find((w) => w.text === selected)!;
  const x = (v: number) => 42 + v * 23.6;
  const y = (v: number) => 249 - v * 20;
  const points = lesson.words.map((w) => ({
    x: x(w.text === selected && position ? position.x : w.x),
    y: y(w.text === selected && position ? position.y : w.y),
  }));
  const occupied: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  }[] = [];
  const labels = lesson.words.map((w, i) => {
    const text =
      Array.from(w.text).slice(0, 18).join("") +
      (Array.from(w.text).length > 18 ? "…" : "");
    const width = Math.min(145, Math.max(26, Array.from(text).length * 8));
    const p = points[i];
    const candidates = [
      [0, -20],
      [0, 32],
      [-28, -30],
      [28, -30],
      [0, -50],
      [-55, 5],
      [55, 5],
      [0, 52],
      [0, -70],
    ]
      .map(([dx, dy]) => {
        const cx = Math.max(
          42 + width / 2,
          Math.min(310 - width / 2, p.x + dx),
        );
        const cy = Math.max(24, Math.min(237, p.y + dy));
        const box = {
          left: cx - width / 2,
          top: cy - 17,
          right: cx + width / 2,
          bottom: cy + 4,
        };
        const overlaps = occupied.filter(
          (b) =>
            box.left < b.right + 5 &&
            box.right > b.left - 5 &&
            box.top < b.bottom + 5 &&
            box.bottom > b.top - 5,
        ).length;
        const dots = points.filter(
          (pt) =>
            pt.x + 12 > box.left &&
            pt.x - 12 < box.right &&
            pt.y + 12 > box.top &&
            pt.y - 12 < box.bottom,
        ).length;
        return {
          cx,
          cy,
          box,
          penalty:
            (overlaps + dots) * 1000 + Math.abs(cx - p.x) + Math.abs(cy - p.y),
        };
      })
      .sort((a, b) => a.penalty - b.penalty);
    const best = candidates[0];
    occupied.push(best.box);
    return { text, dx: best.cx - p.x, dy: best.cy - p.y };
  });
  return (
    <div className="map-wrap">
      <div className="axis-label">
        ↑ {lesson.dimensions[1][lang === "ml" ? "name_ml" : "name_en"]}
      </div>
      <svg
        viewBox="0 0 320 288"
        className="meaning-map"
        aria-label={t(lang, "coordinate")}
        role="group"
      >
        <defs>
          <marker
            id="map-arrow"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0 0L6 3L0 6" fill="#47714b" />
          </marker>
        </defs>
        {[0, 2, 4, 6, 8, 10].map((n) => (
          <g key={n}>
            <path
              d={`M42 ${y(n)}H278M${x(n)} 49V249`}
              stroke="var(--line)"
              strokeDasharray="2 5"
            />
            <text x="24" y={y(n) + 5} className="axis-number">
              {n}
            </text>
            <text x={x(n)} y="276" textAnchor="middle" className="axis-number">
              {n}
            </text>
          </g>
        ))}
        <path d="M42 42V249H287" fill="none" stroke="var(--muted)" />
        {position && (
          <path
            d={`M${x(focus.x)} ${y(focus.y)}L${x(position.x)} ${y(position.y)}`}
            stroke="#47714b"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            markerEnd="url(#map-arrow)"
          />
        )}
        {lesson.words.map((w, i) => (
          <g
            key={w.text}
            role="button"
            tabIndex={0}
            aria-label={`${w.text}: ${w.x}, ${w.y}`}
            aria-pressed={selected === w.text}
            onClick={() => onSelect(w.text)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(w.text);
              }
            }}
            className={`map-node tone-${i % 5}`}
            style={{
              transform: `translate(${x(w.text === selected && position ? position.x : w.x)}px,${y(w.text === selected && position ? position.y : w.y)}px)`,
            }}
          >
            <rect x="-24" y="-24" width="48" height="48" fill="transparent" />
            <circle
              r={selected === w.text ? 12 : 8}
              fill="currentColor"
              stroke="var(--ink)"
              strokeWidth={selected === w.text ? 2 : 0}
            />
            <text
              y={labels[i].dy}
              x={labels[i].dx}
              textAnchor="middle"
              fill="var(--ink)"
              fontSize="16"
              fontWeight="600"
            >
              {labels[i].text}
            </text>
          </g>
        ))}
      </svg>
      <div className="axis-label axis-x">
        {lesson.dimensions[0][lang === "ml" ? "name_ml" : "name_en"]} →
      </div>
    </div>
  );
}
