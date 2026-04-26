import { Router, type IRouter } from "express";
import healthRouter from "./health";
import sozlerRouter from "./sozler";
import prayersRouter from "./prayers";

const router: IRouter = Router();

router.use(healthRouter);
router.use(sozlerRouter);
router.use(prayersRouter);

export default router;
