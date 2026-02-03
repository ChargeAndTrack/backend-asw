import type { Car } from './car.ts';
import { carSchema } from './car.ts';
import mongoose, { Types } from 'mongoose';

export interface User {
    username: string;
    password: string;
    role: Role;
    cars: Car[];
}

export const Roles = {
    "Admin": 'ADMIN',
    "BaseUser": 'BASE_USER'
} as const;

export type Role = (typeof Roles)[keyof typeof Roles]

const userSchema = new mongoose.Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    cars: { type: [carSchema], default: [] }
});

export const userModel = mongoose.model('User', userSchema, 'users');

export const UpdateCarMethod = {
    "Set": '$set',
    "Unset": '$unset',
    "Inc": '$inc'
} as const;

export type UpdateCarMethod = (typeof UpdateCarMethod)[keyof typeof UpdateCarMethod]

export const updateCarLogic = async (
    userId: mongoose.Types.ObjectId,
    carId: string | undefined,
    method: UpdateCarMethod,
    updates: any
): Promise<User | null> => await userModel.findOneAndUpdate(
        { _id: userId, "cars._id": carId },
        { [method]: updates },
        { new: true, runValidators: true }
    ).select({ cars: { $elemMatch: { _id: carId } } })
    .lean<User>();

export const getUserCars = async (userId: Types.ObjectId): Promise<User | null> => {
    return await userModel.findById(userId).select("cars");
}

export const getUserCar = async ( userId: Types.ObjectId, carId: string | undefined): Promise<User | null> => {
    return await userModel.findOne(
        { _id: userId, "cars._id": carId },
        { cars: { $elemMatch: { _id: carId } } }
    );
}