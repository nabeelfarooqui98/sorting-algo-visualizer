export type Step =
  | { type: 'compare'; i: number; j: number; arr: number[] }
  | { type: 'swap'; i: number; j: number; arr: number[] }
  | { type: 'done'; arr: number[] };

export interface Algo {
  name: string;
  generate: (arr: number[]) => Generator<Step>;
}


