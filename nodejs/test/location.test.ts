import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.ts';
import { BASE_PATH, login, loginUserBody } from './login.test.ts';

describe("Location tests", () => {
    let token: string = "";

    beforeEach(async () => {
        const res = await login(loginUserBody);
        token = res.body.token;
    });

    it('it should get the coordinates corresponding to the given address', async () => {
        const res = await request(app)
            .get(`${BASE_PATH}/location/resolve`)
            .set("Authorization", token)
            .query({ q: "Via dell'Università, Cesena" });
        assert.equal(res.status, 200);
        assert.ok("latitude" in res.body);
        assert.ok("longitude" in res.body);
    });

    it('it should get the address corresponding to the given coordinates', async () => {
        const res = await request(app)
            .get(`${BASE_PATH}/location/reverse`)
            .set("Authorization", token)
            .query({ lat: 44.1475459, lng: 12.236007 });
        assert.equal(res.status, 200);
        assert.ok("address" in res.body);
    });
});
