import { Router } from "express";
import * as controller from "../controllers/controller.ts";
import * as loginController from "../controllers/loginController.ts";
import * as chargingStationsController from "../controllers/chargingStationsController.ts";

const router = Router();

router.route('/login')
    .post(loginController.login);

router.route('/home')
    .get(controller.verifyLogin, controller.getHome)
    .post(controller.postHome);

router.route('/map')
    .get(controller.verifyLogin, controller.verifyAdminRole, controller.getMap)
    .post(controller.postMap);

router.route('/chargingStations')
    .get(controller.verifyLogin, chargingStationsController.listChargingStations)
    .post(controller.verifyLogin, controller.verifyAdminRole, chargingStationsController.addChargingStation);

router.route('/chargingStations/:id')
    .get(controller.verifyLogin, chargingStationsController.getChargingStation)
    .put(controller.verifyLogin, controller.verifyAdminRole, chargingStationsController.updateChargingStation)
    .delete(controller.verifyLogin, controller.verifyAdminRole, chargingStationsController.deleteChargingStation)

export default router;
