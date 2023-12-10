import { Router} from "express";
import {transferMoneyController} from "../controller/transferMoneyController.js";
import {createTransaction, getAccountState, saveTransaction} from "../adapters/transactionIO.js";
import {TransferMoneyDependencies, transferMoneyWorkflow} from "../application/TransferMoneyWorkflow.js";


const router = Router();

const transferMoneyDependencies: TransferMoneyDependencies = {
    saveTransaction,
    createTransaction,
    getAccountState
}
// DEPENDENCY INJECTION
router.post("/transfer-money", transferMoneyController(transferMoneyWorkflow(transferMoneyDependencies)));

export default router;