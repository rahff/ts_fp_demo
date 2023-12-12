import { Router} from "express";
import {transferMoneyController} from "../controller/transferMoneyController.js";
import {createTransaction, getAccountState, saveTransaction} from "../adapters/transactionIO.js";
import {transferMoneyWorkflow} from "../application/TransferMoneyWorkflow.js";
import {approve_transaction} from "../core/transferMoney.js";
import {TransferMoneyDependencies} from "../application/types.js";


const router = Router();

const transferMoneyDependencies: TransferMoneyDependencies = {
    saveTransaction,
    createTransaction,
    getAccountState
}
// DEPENDENCY INJECTION
router.post("/transfer-money",
    transferMoneyController(
        transferMoneyWorkflow(transferMoneyDependencies, approve_transaction)
    )
);

export default router;