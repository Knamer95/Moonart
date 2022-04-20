export type Languages = "spanish" | "english";

export interface LanguageStruct {
  english: {
    [key: string]: {
      [key: string]: string | null;
    };
  };
  spanish: {
    [key: string]: {
      [key: string]: string | null;
    };
  };
}

export type Themes =
  | "red"
  | "green"
  | "blue"
  | "violet"
  | "orange"
  | "yellow"
  | "light"
  | "zoe";

export interface Config {
  nightMode: boolean;
  navBarAlwaysOnTop: boolean;
  scroll: boolean;
  nsfw: boolean;
  epilepsy: boolean;
  color: Themes;
  lang: 1 | 2;
  share: boolean;
  feed: number;
}

export type AlertType = "success" | "error" | "idle";

export interface Alert {
  ref?: number;
  type: AlertType;
  message: string;
  position: number;
}
