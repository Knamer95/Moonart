export interface Image {
    // [key: string]: any
    id?: number;
    url: string,
    description: string,
    user: {
        image: string,
        nick: string,
    },
    status: string,
}