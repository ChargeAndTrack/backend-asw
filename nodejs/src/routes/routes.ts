import { Router } from "express";
import * as controller from "../controllers/controller.ts";
import * as loginController from "../controllers/loginController.ts";
import * as chargingStationsController from "../controllers/chargingStationsController.ts";
import * as carsController from "../controllers/carsController.ts";
import * as rechargingController from "../controllers/rechargeController.ts";

const router = Router();

router.route('/login')
    .post(loginController.login);

router.route('/home')
    .get(controller.verifyLogin, controller.getHome)
    .post(controller.postHome);

router.route('/map')
    .get(controller.verifyLogin, controller.verifyAdminRole, controller.getMap)
    .post(controller.postMap);

router.route('/charging-stations')
    .get(controller.verifyLogin, chargingStationsController.listChargingStations)
    .post(controller.verifyLogin, controller.verifyAdminRole, chargingStationsController.addChargingStation);

router.route('/charging-stations/:id')
    .get(controller.verifyLogin, chargingStationsController.getChargingStation)
    .put(controller.verifyLogin, controller.verifyAdminRole, chargingStationsController.updateChargingStation)
    .delete(controller.verifyLogin, controller.verifyAdminRole, chargingStationsController.removeChargingStation)

router.route('/charging-stations/:id/start-recharge')
    .post(controller.verifyLogin, rechargingController.startRecharge);

router.route('/cars')
    .get(controller.verifyLogin, carsController.readUserCars)
    .post(controller.verifyLogin, carsController.addUserCar);

router.route('/cars/:id')
    .get(controller.verifyLogin, carsController.readCar)
    .put(controller.verifyLogin, carsController.updateCar)
    .delete(controller.verifyLogin, carsController.deleteCar);

export default router;
