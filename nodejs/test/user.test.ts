import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.ts';
import { BASE_PATH, loginAdminBody } from './login.test.ts';

describe("User tests", () => {
    let token: string = "";

    beforeEach(async () => {
        const res = await request(app)
            .post(`${BASE_PATH}/login`)
            .send(loginAdminBody);
        token = res.body.token;
    });

    it('Get user', async () => {
        const res = await request(app)
            .get(`${BASE_PATH}/user`)
            .set("Authorization", token);
        assert.equal(res.status, 200);
    });
});
