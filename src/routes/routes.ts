import { Router } from "express";
import { 
    login,
    getHome,
    postHome,
    getMap,
    postMap
} from "../controllers/controller.ts";

const router = Router();

router.post('/login', login);
router.get('/home', getHome);
router.post('/home', postHome);
router.get('/map', getMap);
router.post('/map', postMap);

export default router;
