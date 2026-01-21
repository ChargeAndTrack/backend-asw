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

    it('it should get a user', async () => {
        const res = await request(app)
            .get(`${BASE_PATH}/user`)
            .set("Authorization", token);
        assert.equal(res.status, 200);
    });

    it("it should fail without a token when verifying the login", async () => {
        const res = await request(app).get(`${BASE_PATH}/user`);
        assert.equal(res.status, 400);
        assert.equal(
            String(res.body.message).trim().toLowerCase(),
            String("Authorization required").trim().toLowerCase()
        );
    })
});
