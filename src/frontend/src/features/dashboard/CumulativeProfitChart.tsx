import type { RoundResult } from '@/backend';

interface CumulativeProfitChartProps {
  rounds: RoundResult[];
}

export default function CumulativeProfitChart({ rounds }: CumulativeProfitChartProps) {
  if (rounds.length === 0) return null;

  const maxProfit = Math.max(
    ...rounds.map(r => Math.max(Number(r.cumulativeA), Number(r.cumulativeB)))
  );
  const chartHeight = 300;
  const chartWidth = 800;
  const padding = { top: 20, right: 40, bottom: 40, left: 60 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  const xScale = (round: number) => padding.left + (round / rounds.length) * plotWidth;
  const yScale = (profit: number) => padding.top + plotHeight - (profit / maxProfit) * plotHeight;

  const pointsA = rounds.map(r => ({
    x: xScale(Number(r.round)),
    y: yScale(Number(r.cumulativeA)),
  }));

  const pointsB = rounds.map(r => ({
    x: xScale(Number(r.round)),
    y: yScale(Number(r.cumulativeB)),
  }));

  const pathA = `M ${pointsA.map(p => `${p.x},${p.y}`).join(' L ')}`;
  const pathB = `M ${pointsB.map(p => `${p.x},${p.y}`).join(' L ')}`;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
          const y = padding.top + plotHeight * (1 - fraction);
          return (
            <g key={fraction}>
              <line
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.1"
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="currentColor"
                opacity="0.6"
              >
                {Math.round(maxProfit * fraction)}
              </text>
            </g>
          );
        })}

        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={chartHeight - padding.bottom}
          stroke="currentColor"
          strokeOpacity="0.3"
        />
        <line
          x1={padding.left}
          y1={chartHeight - padding.bottom}
          x2={chartWidth - padding.right}
          y2={chartHeight - padding.bottom}
          stroke="currentColor"
          strokeOpacity="0.3"
        />

        {/* Lines */}
        <path
          d={pathA}
          fill="none"
          stroke="oklch(var(--chart-1))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={pathB}
          fill="none"
          stroke="oklch(var(--chart-2))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {pointsA.map((point, i) => (
          <circle
            key={`a-${i}`}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="oklch(var(--chart-1))"
          />
        ))}
        {pointsB.map((point, i) => (
          <circle
            key={`b-${i}`}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="oklch(var(--chart-2))"
          />
        ))}

        {/* Labels */}
        <text
          x={padding.left - 10}
          y={padding.top - 5}
          textAnchor="end"
          fontSize="12"
          fontWeight="600"
          fill="currentColor"
        >
          Profit
        </text>
        <text
          x={chartWidth - padding.right}
          y={chartHeight - padding.bottom + 25}
          textAnchor="end"
          fontSize="12"
          fontWeight="600"
          fill="currentColor"
        >
          Round
        </text>

        {/* Legend */}
        <g transform={`translate(${chartWidth - padding.right - 120}, ${padding.top})`}>
          <rect x="0" y="0" width="15" height="3" fill="oklch(var(--chart-1))" />
          <text x="20" y="5" fontSize="12" fill="currentColor">Firm A</text>
          <rect x="0" y="15" width="15" height="3" fill="oklch(var(--chart-2))" />
          <text x="20" y="20" fontSize="12" fill="currentColor">Firm B</text>
        </g>
      </svg>
    </div>
  );
}
