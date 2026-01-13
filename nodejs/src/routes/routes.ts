import { Router } from "express";
import { 
    verifyLogin,
    verifyAdminRole,
    login,
    getHome,
    postHome,
    getMap,
    postMap
} from "../controllers/controller.ts";

const router = Router();

router.route('/login')
    .post(login);

router.route('/home')
    .get(verifyLogin, getHome)
    .post(postHome);

router.route('/map')
    .get(verifyLogin, verifyAdminRole, getMap)
    .post(postMap);

export default router;
