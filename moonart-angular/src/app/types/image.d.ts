export interface Image {
    // [key: string]: any
    id?: number;
    url: string,
    description: string,
    name?: string,
    user: {
        image: string,
        nick: string,
    },
    status: string,
    createdAt?: Date,
    updatedAt?: Date,
    formattedDescription?: string,
    interactions?: {
        likes: number,
        favs: number,
        shares: number,
    },
}

export interface UserImage {
    like: boolean,
    fav: boolean,
    share: boolean,
}