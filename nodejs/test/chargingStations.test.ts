import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.ts';
import { BASE_PATH, loginAdminBody } from './login.test.ts';
import type { AddChargingStationDTO, UpdateChargingStationDTO } from '../src/zod_schemas/chargingStationsSchemas.ts';
import type { LatitudeLongitudeDTO, NearChargingStationsDTO } from '../src/zod_schemas/locationSchemas.ts';

describe("Charging stations tests", () => {
    const CHARGING_STATIONS_PATH = 'charging-stations';
    const STATUS_CODE_OK = 200;
    const STATUS_CODE_CREATED = 201;
    let token: string = "";
    let chargingStationId: string = "";
    const chargingStationBody: AddChargingStationDTO = {
        power: 2000,
        location: {
            type: "Point",
            coordinates: [ 100, 45 ]
        }
    }

    beforeEach(async () => {
        const res = await request(app)
            .post(`${BASE_PATH}/login`)
            .send(loginAdminBody);
        token = res.body.token;
    });

    it('it should add a charging station', async () => {
        const res = await request(app)
            .post(`${BASE_PATH}/${CHARGING_STATIONS_PATH}`)
            .set("Authorization", token)
            .send(chargingStationBody);
        chargingStationId = res.body._id;
        assert.equal(res.status, STATUS_CODE_CREATED);
        assert.ok(["power", "available", "enabled", "location"].every(property => property in res.body));
        assert.equal(res.body.power, chargingStationBody.power);
        assert.ok(res.body.available);
    });

    describe('Get charging station by ID', () => {
        it('it should successfully get a charging station', async () => {
            const res = await request(app)
                .get(`${BASE_PATH}/${CHARGING_STATIONS_PATH}/${chargingStationId}`)
                .set("Authorization", token)
                .send();
            assert.equal(res.status, STATUS_CODE_OK);
            assert.equal(res.body._id, chargingStationId);
            assert.equal(res.body.power, chargingStationBody.power);
            assert.notStrictEqual(res.body.location, chargingStationBody.location);
        });

        it('it should fail to get a charging station', async () => {
            const res = await request(app)
                .get(`${BASE_PATH}/${CHARGING_STATIONS_PATH}/22`)
                .set("Authorization", token)
                .send();
            assert.notEqual(res.status, STATUS_CODE_OK);
        });
    })

    describe('Get charging stations by location', () => {
        it('it should get all charging stations within an area', async () => {
            const nearQuery: NearChargingStationsDTO = { lng: 105, lat: 45, radius: 900000 };
            const res = await request(app)
                .get(`${BASE_PATH}/${CHARGING_STATIONS_PATH}/near`)
                .set("Authorization", token)
                .query(nearQuery)
                .send();
            assert.equal(res.status, STATUS_CODE_OK);
        });

        it('it should get the closest charging station', async () => {
            const closestQuery: LatitudeLongitudeDTO = { lng: 100, lat: 40 };
            const res = await request(app)
                .get(`${BASE_PATH}/${CHARGING_STATIONS_PATH}/closest`)
                .set("Authorization", token)
                .query(closestQuery)
                .send();
            console.log("Response: " + JSON.stringify(res));
            assert.equal(res.status, STATUS_CODE_OK);
            assert.equal(res.body._id, chargingStationId);
            assert.equal(res.body.power, chargingStationBody.power);
            assert.notStrictEqual(res.body.location, chargingStationBody.location);
        });
    })

    describe('Update charging station by ID', () => {
        it('it should successfully update a charging station', async () => {
            const updateBody: UpdateChargingStationDTO = { power: 1500, available: false };
            const res = await request(app)
                .put(`${BASE_PATH}/${CHARGING_STATIONS_PATH}/${chargingStationId}`)
                .set("Authorization", token)
                .send(updateBody);
            assert.equal(res.status, STATUS_CODE_OK);
            assert.equal(res.body._id, chargingStationId);
            assert.equal(res.body.power, updateBody.power);
            assert.equal(res.body.available, updateBody.available);
            assert.ok(res.body.enabled);
            assert.notStrictEqual(res.body.location, chargingStationBody.location);
        });

        it('it should fail to update a charging station', async () => {
            const res1 = await request(app)
                .put(`${BASE_PATH}/${CHARGING_STATIONS_PATH}/${chargingStationId}`)
                .set("Authorization", token)
                .send({ power: "1500" });
            const res2 = await request(app)
                .put(`${BASE_PATH}/${CHARGING_STATIONS_PATH}/22`)
                .set("Authorization", token)
                .send({ enabled: true });
            assert.notEqual(res1.status, STATUS_CODE_OK);
            assert.notEqual(res2.status, STATUS_CODE_OK);
        });
    })
});
