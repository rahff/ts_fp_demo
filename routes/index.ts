import { Router} from "express";
import {transferMoneyController} from "../controller/transferMoneyController.js";
import {createTransaction, getAccountState, saveTransaction} from "../adapters/transactionIO.js";
import {TransferMoneyDependencies, transferMoneyWorkflow} from "../application/TransferMoneyWorkflow.js";
import {transferMoney} from "../core/transferMoney.js";


const router = Router();

const transferMoneyDependencies: TransferMoneyDependencies = {
    saveTransaction,
    createTransaction,
    getAccountState
}
// DEPENDENCY INJECTION
router.post("/transfer-money", transferMoneyController(
    transferMoneyWorkflow(transferMoneyDependencies),
    transferMoney));

export default router;