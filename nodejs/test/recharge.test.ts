import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.ts';
import { BASE_PATH, login, loginAdminBody } from './login.test.ts';
import type { AddChargingStationDTO } from '../src/zod_schemas/chargingStationsSchemas.ts';
import { chargingStationsPostRequest, chargingStationsPutRequest } from './chargingStations.test.ts';

const START_RECHARGE_PATH = 'start-recharge';
const STOP_RECHARGE_PATH = 'stop-recharge';

describe("Recharge tests", () => {
    const STATUS_CODE_OK = 200;
    const STATUS_CODE_BAD_REQUEST = 400;
    const STATUS_CODE_NOT_FOUND = 404;
    let token: string = "";
    let chargingStationId: string = "";
    let carId: string = "";

    before(async () => {
        const res = await login(loginAdminBody);
        token = res.body.token;
        const chargingStationBody: AddChargingStationDTO = {
            power: 2000,
            location: {
                type: "Point",
                coordinates: [ 100, 45 ]
            }
        }
        const car = await request(app)
            .post(`${BASE_PATH}/cars`)
            .set("Authorization", token)
            .send({ plate: "AB123FZ", maxBattery: 800 });
        carId = car.body._id;
        const chargingStation = await chargingStationsPostRequest(token, undefined, chargingStationBody);
        chargingStationId = chargingStation.body._id;
    });

    describe('Start a recharge in a charging station', () => {
        it('it should start a recharge successfully', async () => {
            const res = await startRechargeRequest(token, `${chargingStationId}`, carId);
            assert.equal(res.status, STATUS_CODE_OK);
        });

        it('it should fail to start a recharge in an unavailable charging station', async () => {
            await chargingStationsPutRequest(token, `${chargingStationId}`, { available: false });
            const res = await startRechargeRequest(token, `${chargingStationId}`, carId);
            assert.equal(res.status, STATUS_CODE_BAD_REQUEST);
        });
    })

    describe('Stop a recharge in a charging station', () => {
        it('it should stop a recharge successfully', async () => {
            await startRechargeRequest(token, `${chargingStationId}`, carId);
            const res = await stopRechargeRequest(token, `${chargingStationId}`, carId);
            assert.equal(res.status, STATUS_CODE_OK);
        });

        it('it should fail to stop a recharge if the charging station is not charging', async () => {
            const res = await stopRechargeRequest(token, `${chargingStationId}`, carId);
            assert.equal(res.status, STATUS_CODE_BAD_REQUEST);
        });
    })
});

async function startRechargeRequest(token: string, chargingStationId: string, carId: string) {
    return await chargingStationsPostRequest(
        token,
        `${chargingStationId}/${START_RECHARGE_PATH}`,
        { carId }
    );
}

async function stopRechargeRequest(token: string, chargingStationId: string, carId: string) {
    return await chargingStationsPostRequest(
        token,
        `${chargingStationId}/${STOP_RECHARGE_PATH}`,
        { carId }
    );
}
