import { Router } from "express";
import { verifyLogin, verifyAdminRole, getUser } from "../controllers/userController.ts";
import * as loginController from "../controllers/loginController.ts";
import * as chargingStationsController from "../controllers/chargingStationsController.ts";
import * as carsController from "../controllers/carsController.ts";
import * as locationController from "../controllers/locationController.ts";
import * as rechargingController from "../controllers/rechargeController.ts";

const router = Router();

router.post('/login', loginController.login);
router.get('/user', verifyLogin, getUser);

router.route('/charging-stations')
    .get(verifyLogin, chargingStationsController.listChargingStations)
    .post(verifyLogin, verifyAdminRole, chargingStationsController.addChargingStation);

router.get('/location/resolve', verifyLogin, locationController.resolveAddressToCoordinates);
router.get('/location/reverse', verifyLogin, locationController.reverseCoordinatesToAddress);
router.get('/charging-stations/near', verifyLogin, chargingStationsController.getNearbyChargingStations);
router.get('/charging-stations/closest', verifyLogin, chargingStationsController.getClosestChargingStation);

router.route('/charging-stations/:id')
    .get(verifyLogin, chargingStationsController.getChargingStation)
    .put(verifyLogin, verifyAdminRole, chargingStationsController.updateChargingStation)
    .delete(verifyLogin, verifyAdminRole, chargingStationsController.removeChargingStation)

router.route('/charging-stations/:id/start-recharge').post(verifyLogin, rechargingController.startRecharge);
router.route('/charging-stations/:id/stop-recharge').post(verifyLogin, rechargingController.stopRecharge);

router.route('/cars')
    .get(verifyLogin, carsController.readUserCars)
    .post(verifyLogin, carsController.addUserCar);

router.route('/cars/:id')
    .get(verifyLogin, carsController.readCar)
    .put(verifyLogin, carsController.updateCar)
    .delete(verifyLogin, carsController.deleteCar);

export default router;
