import type { Car } from './car.ts';

export interface User {
    username: string;
    password: string;
    cars?: Car[];
}

export enum Role {
    Admin = 'ADMIN',
    BaseUser = 'BASE_USER'
}