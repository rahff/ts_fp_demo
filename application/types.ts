import {CreateTransaction, GetAccountState, SaveTransaction} from "../adapters/transactionIO.js";
import {MoneyTransferRequest} from "../controller/transferMoneyController.js";
import {TransfertMoneyResult} from "../core/model.js";
import {TransferMoney} from "../core/transferMoney.js";

export type TransferMoneyDependencies = {
    getAccountState: GetAccountState,
    saveTransaction: SaveTransaction,
    createTransaction: CreateTransaction
}
export type TransfertMoneyPipeline = (request: MoneyTransferRequest) => Promise<TransfertMoneyResult>

export type TransferMoneyWorkflow = (_: TransferMoneyDependencies, commandHandler: TransferMoney) => TransfertMoneyPipeline