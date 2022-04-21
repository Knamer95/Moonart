export type Languages = "spanish" | "english";

export interface LanguageStruct {
    english: LanguageStructItem;
    spanish: LanguageStructItem;
}

export interface LanguageStructItem {
    [key: string]: {
        [key: string]: string | null;
    };
}

export type Themes =
    | "zoe"
    | "light"
    | "monster"
    | "energy"
    | "red"
    | "green"
    | "blue"
    | "violet"
    | "orange";

export interface Config {
    nightMode: boolean;
    navBarAlwaysOnTop: boolean;
    scroll: boolean;
    nsfw: boolean;
    epilepsy: boolean;
    color: Themes;
    lang: number | Languages;
    share: boolean;
    feed: number;
}

export type AlertType = "success" | "error" | "idle";

export interface TypeMode {
    containerMode: "day-container" | "night-container";
    navbarMode: "navbar-day" | "navbar-night";
    dataMode: "day-bg" | "night-bg";
}

export interface Alert {
    ref?: number;
    type: AlertType;
    message: string;
    position: number;
}
