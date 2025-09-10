import { memo } from 'react';

export interface ControlsProps {
  playing: boolean;
  onPlayPause: () => void;
  onStep: () => void;
  onShuffle: () => void;
  size: number;
  onSizeChange: (n: number) => void;
  speedMs: number;
  onSpeedChange: (n: number) => void;
}

function ControlsImpl({
  playing,
  onPlayPause,
  onStep,
  onShuffle,
  size,
  onSizeChange,
  speedMs,
  onSpeedChange,
}: ControlsProps) {
  return (
    <div className="toolbar">
      <button onClick={onPlayPause} aria-label={playing ? 'Pause' : 'Play'}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={onStep} aria-label="Step">Step ▷|</button>
      <button onClick={onShuffle} aria-label="Shuffle">Shuffle</button>
      <div className="spacer" />
      <label>
        Size: {size}
        <input
          type="range"
          min={5}
          max={200}
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
        />
      </label>
      <label>
        Speed: {speedMs}ms
        <input
          type="range"
          min={30}
          max={800}
          step={10}
          value={speedMs}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
        />
      </label>
    </div>
  );
}

export const Controls = memo(ControlsImpl);


