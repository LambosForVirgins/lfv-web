export interface SubmissionEntry {
  id: string;
  name: string;
  sex: 0 | 1;
}

export enum DrawStatus {
  Closed = 0,
  Pending = 1,
  Open = 2,
}

export type DrawLog = {
  timeStamp: number;
  sender: string;
  hash: string;
};

export type DrawEntry = {
  address: string;
  name?: string;
};

export type DrawRound = {
  drawNumber: number;
  timeOpens: number;
  timeCloses: number;
  timeDraws: number;
  seed: string;
  winner: number | null;
  status: DrawStatus;
  entries: DrawEntry[];
  logs: DrawLog[];
};
