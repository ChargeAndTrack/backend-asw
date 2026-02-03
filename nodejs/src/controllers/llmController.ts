import type { Request, Response } from "express";
import config from "../config/config.ts";
import { z } from "zod";
import { llmResponseSchema, type LlmResponseSchema } from "../zod_schemas/llmSchemas.ts";
import { getClosestCS, getNearbyCS } from "./chargingStationsController.ts";
import { resolveAddress } from "./locationController.ts";
import type { LatitudeLongitudeDTO } from "../zod_schemas/locationSchemas.ts";
import type { Role } from "../models/user.ts";

const NUM_ATTEMPTS = 2;
const HF_SECRET = config.hfSecret;
const HF_URL = new URL("https://router.huggingface.co/v1/chat/completions");
const HF_MODEL = "Qwen/Qwen2.5-7B-Instruct:together";
const PROMPT = 'You are a charging stations query parser. You have to return ONLY a valid JSON following this schema: '
    + '{ "intent": "NEAR" or "CLOSEST", "address": string, "filters"?: { "minPowerKw"?: number } }  '
    + 'Meanings: NEAR = searching multiple charging stations, '
    + 'CLOSEST = searching the closest charging station';

// POST /llm/search
export const search = async (req: Request, res: Response): Promise<Response> => {
    console.log("search");
    const parsedQuery = await z.object({q: z.string().min(5)}).safeParseAsync(req.query);
    if (!parsedQuery.success) {
        return res.status(400).json({ message: "Invalid request data" });
    }
    try {
        for (let attempt = 1; attempt <= NUM_ATTEMPTS; attempt++) {
            console.log("Attempt ", attempt);
            const response = await callLlm(parsedQuery.data.q);
            console.log("Llm raw response: " + response);
            const jsonResponse = JSON.parse(response);
            const parsedResponse = await llmResponseSchema.safeParseAsync(jsonResponse);
            if (parsedResponse.success) {
                return await makeRequest(res, req.user.role as Role, parsedResponse.data);
            }
        }
        return res.status(500).json({ message: "Invalid LLM response" });
    } catch (err) {
        console.log("Error:", err);
        return res.sendStatus(500);
    }
};

async function callLlm(userQuery: string): Promise<string> {
    const response = await fetch(HF_URL, {
        headers: {
            Authorization: `Bearer ${HF_SECRET}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            messages: [
                { role: "system", content: PROMPT },
                { role: "user", content: userQuery }
            ],
            model: HF_MODEL,
            temperature: 0,
            max_tokens: 300
        })
    });
    if (!response.ok) {
        console.log("LLM error: ", response.status);
        throw new Error("LLM error");
    }
    const data = await response.json();
    return data.choices[0].message.content;
}

const DEFAULT_RADIUS = 5000;

async function makeRequest(res: Response, role: Role, data: LlmResponseSchema): Promise<Response> {
    const location: LatitudeLongitudeDTO = await resolveAddress(data.address);
    console.log("Location: lat " + location.lat + " lng " + location.lng);
    switch (data.intent) {
        case "NEAR":
            const stations = await getNearbyCS(
                role,
                { lat: location.lat, lng: location.lng, radius: DEFAULT_RADIUS },
                data.filters
            );
            return res.status(200).json(stations);
        case "CLOSEST":
            const chargingStations = await getClosestCS(role, location, data.filters);
            if (chargingStations.length === 0) {
                return res.status(404).json({ message: "No charging stations found" });
            }
            return res.status(200).json(chargingStations[0]);
    }
}
