import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.ts';
import { BASE_PATH, login, loginAdminBody, loginUserBody } from './login.test.ts';
import type { AddChargingStationDTO } from '../src/zod_schemas/chargingStationsSchemas.ts';

const addChargingStation1Body: AddChargingStationDTO = {
    power: 110,
    location: {
        type: "Point",
        coordinates: [ 12.236000, 44.1475470 ]
    }
}

const addChargingStation2Body: AddChargingStationDTO = {
    power: 50,
    location: {
        type: "Point",
        coordinates: [ 12.236008, 44.1475460 ]
    }
}

const addChargingStation3Body: AddChargingStationDTO = {
    power: 22,
    location: {
        type: "Point",
        coordinates: [ 12.3, 44.2 ]
    }
}

describe("LLM tests", () => {
    let token: string = "";

    before(async () => {
        const res = await login(loginUserBody);
        token = res.body.token;
        await deleteAndInsertChargingStations();
    });

    it('it should get the correct nearest charging stations (no filters)', async () => {
        const res = await llmSearch(token, "Find charging stations near Via dell'Università in Cesena");
        assert.equal(res.status, 200);
        assert.equal(res.body.length, 2);
    });

    it('it should get the correct closest charging station (no filters)', async () => {
        const res = await llmSearch(token, "Find the closest charging station to Via dell'Università in Cesena");
        assert.equal(res.status, 200);
        assert.ok("_id" in res.body);
        assert.ok("power" in res.body);
        assert.ok("location" in res.body);
    });

    it('it should get the correct nearest charging stations using filters', async () => {
        const minPower = 100;
        const res = await llmSearch(
            token,
            `Find charging stations near Via dell'Università in Cesena with power graeter than ${minPower} kW`
        );
        assert.equal(res.status, 200);
        assert.equal(res.body.length, 1);
        assert.ok(res.body[0].power >= minPower);
    });

    it('it should get the correct closest charging station using filters', async () => {
        const minPower = 100;
        const res = await llmSearch(
            token,
            `Find the closest charging station to Via dell'Università in Cesena with power greter than ${minPower} kW`
        );
        assert.equal(res.status, 200);
        assert.ok("_id" in res.body);
        assert.ok("power" in res.body);
        assert.ok("location" in res.body);
        assert.ok(res.body.power >= minPower);
    });
});

async function llmSearch(token: string, query: string) {
    return await request(app)
        .post(`${BASE_PATH}/llm/search`)
        .set("Authorization", token)
        .query({ q: query });
}

async function deleteAndInsertChargingStations() {
    const res = await login(loginAdminBody);
    const token = res.body.token;
    await deleteAllChargingStations(token);
    await insertChargingStation(token, addChargingStation1Body);
    await insertChargingStation(token, addChargingStation2Body);
    await insertChargingStation(token, addChargingStation3Body);
}

async function deleteAllChargingStations(token: string) {
    const res = await request(app)
        .get(`${BASE_PATH}/charging-stations`)
        .set("Authorization", token);
    const chargingStations = res.body;
    for (const chargingStation of chargingStations) {
        await request(app)
            .delete(`${BASE_PATH}/charging-stations/${chargingStation._id}`)
            .set("Authorization", token);
    }
}

async function insertChargingStation(token: string, body: AddChargingStationDTO) {
    await request(app)
        .post(`${BASE_PATH}/charging-stations`)
        .set("Authorization", token)
        .send(body);
}
