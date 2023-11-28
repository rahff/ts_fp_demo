import { Router} from "express";
import {controller_factory} from "../controller/main_controller.js";
import {computation} from "../core/computation.js";
import {secondaryAdapter} from "../adapters/adapter.js";
import {useCaseFactory} from "../core/useCase.js";


const router = Router();
router.get("*", controller_factory(useCaseFactory(secondaryAdapter, computation)));

export default router