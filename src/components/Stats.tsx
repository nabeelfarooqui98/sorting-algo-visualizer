import { memo } from 'react';

export interface StatsProps {
  comparisons: number;
  swaps: number;
  status: string;
}

function StatsImpl({ comparisons, swaps, status }: StatsProps) {
  return (
    <div className="stats" aria-live="polite">
      <span>Comparisons: {comparisons}</span>
      <span> | </span>
      <span>Swaps: {swaps}</span>
      <span> | </span>
      <span>Status: {status}</span>
    </div>
  );
}

export const Stats = memo(StatsImpl);


