export class User{
    constructor(
        public id: number,
        public name: string,
        public nick: string,
        public password: string,
        public email: string,
        public description: string,
        public role: string,
        public createdAt: string,
        public imageToUpload: any   // Antes userImage
    ){}
}