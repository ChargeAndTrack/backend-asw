import type { Facility } from "./facility.ts";

export interface Place {
    x: number;
    y: number;
    facility: Facility;
}