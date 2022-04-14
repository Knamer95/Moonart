export type Roles = 'role_user' | 'role_mod' | 'role_admin';

export interface Identity {
    sub: number;
    name: string;
    password?: string;
    nick: string;
    email: string;
    role: Roles;
    description: string;
    image: string;
    iat: number;
    exp: number;
}