import type { Car } from './car.ts';
import mongoose from 'mongoose';

export interface User {
    username: string;
    password: string;
    role: Role;
    cars?: Car[];
}

export const Role = {
    "Admin": 'ADMIN',
    "BaseUser": 'BASE_USER'
} as const;

export type Role = (typeof Role)[keyof typeof Role]

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});

export const userModel = mongoose.model('User', userSchema);
