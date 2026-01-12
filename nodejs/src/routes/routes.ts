import { Router } from "express";
import { 
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
    .get(getHome)
    .post(postHome);

router.route('/map')
    .get(getMap)
    .post(postMap);

export default router;
