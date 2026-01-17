const ONE_PERCENT_CHANGE: number = 0.01;
const convert_hours_into_ms = (hours: number): number => (hours * 60 * 60 * 1000);

export const calculateTimeForOnePercent = (
    chargingStationPower: number, 
    batteryCapacity: number
): number => {
    const timeInHours = (batteryCapacity * ONE_PERCENT_CHANGE) / chargingStationPower;
    return Math.floor(convert_hours_into_ms(timeInHours));
};
