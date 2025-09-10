# Sorting Visualizer (Phase 1)

Vite + React + TypeScript app that visualizes Bubble Sort.

## How to run

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

Open the URL shown in the terminal.

## Features implemented

- Bubble Sort visualization using vertical bars
- Controls: Play/Pause, Step, Shuffle, Array Size slider (5–200), Speed slider (30–800ms)
- Highlights current compared/swapped indices
- Live stats: comparisons and swaps
- Status line of current action (Comparing, Swapping, Sorted)
- Smooth animations with CSS transitions
- Performs smoothly for ~20–150 bars

## Controls

- Play/Pause: Start or stop the sorting animation
- Step: Advance exactly one algorithm step
- Shuffle: Generate a new random array of the current size
- Size: Adjust number of bars and reshuffle immediately
- Speed: Adjust delay between steps in milliseconds
