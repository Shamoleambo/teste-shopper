import { Driver } from "../model/driver";

export class TaxiRide {
    calculateValue(driver: Driver, distance: number) {
        return driver.ratio * (distance / 1000)
    }
}