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
  id: string;
  address: string;
  name?: string;
};

export type DrawRound = {
  id: string;
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

export type Giveaway = {
  id: string;
  title: string;
  description: string | undefined | null;
  active: boolean;
  providers: string[];
  criteria: EntryCriteria[];
  draws: string[];
};

export type EntryCriteria = {
  type: string;
  parameter: string;
  value: number | number[] | undefined | null;
};
