import type { Facility } from "./facility.ts";

export interface ChargingStation extends Facility {
    power: number; // in kW
    available: boolean;
    enabled: boolean;
}