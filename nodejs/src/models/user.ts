import type { Car } from './car.ts';
import { carSchema } from './car.ts';
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

const userSchema = new mongoose.Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    cars: { type: [carSchema], default: function () {
        if (this.role === 'BASE_USER') {
            return [];
        }
        return undefined;
    }}
});

export const userModel = mongoose.model('User', userSchema);
