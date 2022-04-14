
export type Languages = 'spanish' | 'english'

export interface Language {
    lang: Languages;
    attributes: {
        [key: string]: string | null;
    }
}

export type Themes = "red" | "green" | "blue" | "violet" | "orange" | "yellow" | "light" | "zoe"

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

export interface Alert {
    ref: number;
    type: string;
    message: string;
    position: number;
}
