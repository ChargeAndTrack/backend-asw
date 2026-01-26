import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.ts';
import type { LoginDTO } from '../src/zod_schemas/loginSchemas.ts';

export const BASE_PATH = '/api/v1';
export const loginAdminBody: LoginDTO = { username: "admin", password: "admin1234" };
export const loginUserBody: LoginDTO = { username: "user1", password: "user11234" };

export async function login(body: LoginDTO) {
    return await request(app)
        .post(`${BASE_PATH}/login`)
        .send(body);
}

describe("Login tests", () => {
    it("it should perform the login", async () => {
        const res = await login(loginAdminBody);
        assert.equal(res.status, 200);
        assert.ok("role" in res.body);
        assert.ok("token" in res.body);
    });
});
