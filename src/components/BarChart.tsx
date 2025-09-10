import { memo, useMemo } from 'react';
import '../styles/bars.css';

export interface BarChartProps {
  data: number[];
  highlight: { i: number | null; j: number | null };
}

function BarChartImpl({ data, highlight }: BarChartProps) {
  const maxVal = useMemo(() => (data.length ? Math.max(...data) : 1), [data]);
  return (
    <div className="bars-container" role="list" aria-label="Bar chart">
      {data.map((value, idx) => {
        const heightPct = (value / maxVal) * 100;
        const isHighlighted = idx === highlight.i || idx === highlight.j;
        const className = isHighlighted ? 'bar bar-highlight' : 'bar';
        return (
          <div
            key={idx}
            role="listitem"
            className={className}
            style={{ height: `${heightPct}%` }}
            title={`${value}`}
          />
        );
      })}
    </div>
  );
}

export const BarChart = memo(BarChartImpl);


