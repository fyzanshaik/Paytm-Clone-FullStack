import express,{Request,Response,Router} from "express"
import authMiddleware from "../middleware/authCheck";
import * as userController from "../controllers/userController"
import * as authController from "../controllers/authController"

const router:Router = express.Router();

router.post('/user/signup', authController.signup);
router.post('/user/signin', authController.signin);
router.put('/user/updateUser', authMiddleware, userController.updateUser);
router.get('/user/username',authMiddleware,userController.getUserName)
router.get('/user/bulk', authMiddleware,userController.getAllUsers);
router.get('/user/',authMiddleware ,userController.getUserWithFilter);

export default router;
