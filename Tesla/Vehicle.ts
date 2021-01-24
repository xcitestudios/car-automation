import { VehicleState } from "./VehicleState";

export interface Vehicle {
    displayName: string,
    id: number,
    optionCodes: Array<string>
    state: VehicleState,
    vehicleId: number,
    vin: string,
}