import express,{Request,Response,Router} from "express"
import authMiddleware from "../middleware/authCheck";
import * as accountController from "../controllers/accountController"

const router:Router = express.Router();

router.get("/balance", authMiddleware, accountController.getAccountBalance);
router.post("/transfer", authMiddleware, accountController.accountBalanceTransfer);
export default router;

