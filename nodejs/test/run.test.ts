import { after } from "node:test";
import { worker } from "../src/controllers/rechargeWorker.ts";
import { rechargeQueue } from "../src/controllers/rechargeController.ts";
import mongoose from "mongoose";
import { io } from "../src/socket.ts";
import { server } from "../src/server.ts";
import './login.test.ts';
import './user.test.ts';
import './chargingStations.test.ts';
import './cars.test.ts';
import './location.test.ts';
import './llm.test.ts';
import './recharge.test.ts';

after(async () => {
    await worker.close();
    await rechargeQueue.close();
    await mongoose.connection.close();
    await io.close(() => server.close());
});
