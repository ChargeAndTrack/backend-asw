import { Router } from "express";
import { verifyLogin, verifyAdminRole, getUser } from "../controllers/userController.ts";
import * as loginController from "../controllers/loginController.ts";
import * as chargingStationsController from "../controllers/chargingStationsController.ts";
import * as carsController from "../controllers/carsController.ts";
import * as locationController from "../controllers/locationController.ts";

const router = Router();

router.post('/login', loginController.login);
router.get('/user', verifyLogin, getUser);

router.route('/chargingStations')
    .get(verifyLogin, chargingStationsController.listChargingStations)
    .post(verifyLogin, verifyAdminRole, chargingStationsController.addChargingStation);

router.get('/location/resolve', verifyLogin, locationController.resolveAddressToCoordinates);
router.get('/location/reverse', verifyLogin, locationController.reverseCoordinatesToAddress);
router.get('/charging-stations/near', verifyLogin, chargingStationsController.getNearbyChargingStations);
router.get('/charging-stations/closest', verifyLogin, chargingStationsController.getClosestChargingStation);

router.route('/chargingStations/:id')
    .get(verifyLogin, chargingStationsController.getChargingStation)
    .put(verifyLogin, verifyAdminRole, chargingStationsController.updateChargingStation)
    .delete(verifyLogin, verifyAdminRole, chargingStationsController.removeChargingStation)

router.route('/cars')
    .get(verifyLogin, carsController.readUserCars)
    .post(verifyLogin, carsController.addUserCar);

router.route('/cars/:id')
    .get(verifyLogin, carsController.readCar)
    .put(verifyLogin, carsController.updateCar)
    .delete(verifyLogin, carsController.deleteCar);

export default router;
