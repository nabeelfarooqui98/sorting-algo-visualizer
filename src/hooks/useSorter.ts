import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Step } from '../algorithms/types';

export interface HighlightIndices {
  i: number | null;
  j: number | null;
}

export interface UseSorterResult {
  array: number[];
  highlight: HighlightIndices;
  playing: boolean;
  setPlaying: (v: boolean) => void;
  speedMs: number;
  setSpeedMs: (n: number) => void;
  comparisons: number;
  swaps: number;
  stepOnce: () => void;
  reset: (newArr: number[]) => void;
  status: string;
}

export function useSorter(
  stepGenFactory: (a: number[]) => Generator<Step>,
  baseArray: number[],
  initialSpeedMs: number = 150,
): UseSorterResult {
  const [array, setArray] = useState<number[]>(() => baseArray.slice());
  const [highlight, setHighlight] = useState<HighlightIndices>({ i: null, j: null });
  const [playing, setPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(initialSpeedMs);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [status, setStatus] = useState<string>('Ready');

  const genRef = useRef<Generator<Step> | null>(null);
  const timerRef = useRef<number | null>(null);
  const inTickRef = useRef<boolean>(false);

  const ensureGenerator = useCallback(() => {
    if (!genRef.current) {
      genRef.current = stepGenFactory(array);
    }
  }, [array, stepGenFactory]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    clearTimer();
    setPlaying(false);
  }, [clearTimer]);

  const handleStep = useCallback(() => {
    ensureGenerator();
    const gen = genRef.current;
    if (!gen) {
      return;
    }
    const next = gen.next();
    if (next.done || !next.value) {
      setHighlight({ i: null, j: null });
      setStatus('Sorted');
      stop();
      return;
    }
    const step = next.value;
    if (step.type === 'compare') {
      setHighlight({ i: step.i, j: step.j });
      setStatus(`Comparing i=${step.i} and j=${step.j}`);
      setComparisons((c) => c + 1);
    } else if (step.type === 'swap') {
      setArray(step.arr.slice());
      setHighlight({ i: step.i, j: step.j });
      setStatus(`Swapping ${step.arr[step.i]} and ${step.arr[step.j]}`);
      setSwaps((s) => s + 1);
    } else if (step.type === 'done') {
      setArray(step.arr.slice());
      setHighlight({ i: null, j: null });
      setStatus('Sorted');
      stop();
    }
  }, [ensureGenerator, stop]);

  const stepOnce = useCallback(() => {
    handleStep();
  }, [handleStep]);

  const tick = useCallback(() => {
    if (inTickRef.current) {
      return;
    }
    inTickRef.current = true;
    try {
      handleStep();
      if (playing) {
        clearTimer();
        timerRef.current = window.setTimeout(() => {
          inTickRef.current = false;
          tick();
        }, Math.max(0, speedMs));
      } else {
        clearTimer();
        inTickRef.current = false;
      }
    } finally {
      // no-op
    }
  }, [clearTimer, handleStep, playing, speedMs]);

  useEffect(() => {
    if (playing) {
      tick();
    }
    return () => {
      clearTimer();
      inTickRef.current = false;
    };
  }, [playing, speedMs, tick, clearTimer]);

  const reset = useCallback((newArr: number[]) => {
    clearTimer();
    genRef.current = null;
    setArray(newArr.slice());
    setHighlight({ i: null, j: null });
    setComparisons(0);
    setSwaps(0);
    setStatus('Ready');
    setPlaying(false);
  }, [clearTimer]);

  useEffect(() => {
    // When baseArray reference changes (e.g., shuffle/size change), reset
    reset(baseArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseArray]);

  return useMemo(
    () => ({
      array,
      highlight,
      playing,
      setPlaying: (v: boolean) => {
        if (v && inTickRef.current) {
          return;
        }
        setPlaying(v);
        if (v) {
          ensureGenerator();
        }
      },
      speedMs,
      setSpeedMs,
      comparisons,
      swaps,
      stepOnce,
      reset,
      status,
    }),
    [array, highlight, playing, speedMs, comparisons, swaps, stepOnce, reset, status, ensureGenerator],
  );
}


