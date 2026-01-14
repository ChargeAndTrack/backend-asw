import { Router } from "express";
import * as controller from "../controllers/controller.ts";
import * as loginController from "../controllers/loginController.ts";

const router = Router();

router.route('/login')
    .post(loginController.login);

router.route('/home')
    .get(controller.verifyLogin, controller.getHome)
    .post(controller.postHome);

router.route('/map')
    .get(controller.verifyLogin, controller.verifyAdminRole, controller.getMap)
    .post(controller.postMap);

export default router;
