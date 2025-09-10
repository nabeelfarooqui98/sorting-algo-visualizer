import type { Step } from './types';

function cloneArray(input: number[]): number[] {
  return input.slice();
}

export function* bubbleGenerator(arr: number[]): Generator<Step> {
  const working: number[] = cloneArray(arr);
  const n: number = working.length;
  let swappedInPass: boolean;

  for (let i = 0; i < n - 1; i++) {
    swappedInPass = false;
    for (let j = 0; j < n - 1 - i; j++) {
      yield { type: 'compare', i: j, j: j + 1, arr: cloneArray(working) };
      if (working[j] > working[j + 1]) {
        const temp: number = working[j];
        working[j] = working[j + 1];
        working[j + 1] = temp;
        swappedInPass = true;
        yield { type: 'swap', i: j, j: j + 1, arr: cloneArray(working) };
      }
    }
    if (!swappedInPass) {
      break;
    }
  }

  yield { type: 'done', arr: cloneArray(working) };
}

export const Bubble = {
  name: 'Bubble',
  generate: bubbleGenerator,
};


