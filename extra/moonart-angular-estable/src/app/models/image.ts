export class Image{
    constructor(
        public id: number,
        public user_id: number,
        public url: string,
        public name: string,
        public description: string,
        public status: string,
        public nsfw: number,
        public epilepsy: number,
        public createdAt: any,
        public updatedAt: any,
        public rights: string,
        public tags: string,
        public imageToUpload: any
    ){}
}