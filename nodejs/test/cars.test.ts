import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.ts';
import { BASE_PATH, loginUserBody } from './login.test.ts';
import type { AddCarDTO, UpdateCarDTO } from '../src/zod_schemas/carsSchemas.ts';

const addCar1Body: AddCarDTO = { plate: "AB123YZ", maxBattery: 20 };
const addCar2Body: AddCarDTO = { plate: "CD123YZ", maxBattery: 40 };
const addCar3Body: AddCarDTO = { plate: "EF123YZ", maxBattery: 75 };

describe("Cars tests", () => {
    let token: string = "";

    beforeEach(async () => {
        const res = await request(app)
            .post(`${BASE_PATH}/login`)
            .send(loginUserBody);
        token = res.body.token;
        await deleteAllUserCars(token);
    });

    it('Get cars', async () => {
        await insertCars(token);
        const res = await request(app)
            .get(`${BASE_PATH}/cars`)
            .set("Authorization", token);
        assert.equal(res.status, 200);
        assert.equal(res.body.cars.length, 3);
    });

    it('Add car', async () => {
        const res = await insertCar(token, addCar1Body);
        assert.equal(res.status, 201);
        assert.equal(res.body.plate, addCar1Body.plate);
        assert.equal(res.body.maxBattery, addCar1Body.maxBattery);
    });

    it('Get car', async () => {
        const insertResponse = await insertCar(token, addCar1Body);
        const getResponse = await request(app)
            .get(`${BASE_PATH}/cars/${insertResponse.body._id}`)
            .set("Authorization", token);
        assert.equal(getResponse.status, 200);
        assert.equal(getResponse.body.plate, addCar1Body.plate);
        assert.equal(getResponse.body.maxBattery, addCar1Body.maxBattery);
    });

    it('Put car', async () => {
        const insertResponse = await insertCar(token, addCar1Body);
        const putBody: UpdateCarDTO = { maxBattery: 40 };
        const putResponse = await request(app)
            .put(`${BASE_PATH}/cars/${insertResponse.body._id}`)
            .set("Authorization", token)
            .send(putBody);
        assert.equal(putResponse.status, 200);
        assert.equal(putResponse.body.maxBattery, putBody.maxBattery);
    });

    it('Delete car', async () => {
        const insertResponse = await insertCar(token, addCar1Body);
        const deleteResponse = await request(app)
            .delete(`${BASE_PATH}/cars/${insertResponse.body._id}`)
            .set("Authorization", token);
        assert.equal(deleteResponse.status, 200);
        assert.equal(deleteResponse.body.cars.length, 0);
        const getResponse = await request(app)
            .get(`${BASE_PATH}/cars/${insertResponse.body._id}`)
            .set("Authorization", token);
        assert.equal(getResponse.status, 404);
    });
});

async function deleteAllUserCars(token: string) {
    const res = await request(app)
        .get(`${BASE_PATH}/cars`)
        .set("Authorization", token);
    const cars = res.body.cars;
    for (const car of cars) {
        await request(app)
            .delete(`${BASE_PATH}/cars/${car._id}`)
            .set("Authorization", token);
    }
}

async function insertCar(token: string, body: AddCarDTO) {
    return await request(app)
        .post(`${BASE_PATH}/cars`)
        .set("Authorization", token)
        .send(body)
}

async function insertCars(token: string): Promise<void> {
    await insertCar(token, addCar1Body);
    await insertCar(token, addCar2Body);
    await insertCar(token, addCar3Body);
}
