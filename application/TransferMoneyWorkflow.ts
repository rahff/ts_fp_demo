import {CreateTransaction, GetAccountState, saveTransaction, SaveTransaction} from "../adapters/transactionIO.js";
import {TransferMoney} from "../core/transferMoney.js";
import {TransferMoneyCommand, TransfertMoneyResult} from "../core/model.js";
import {MoneyTransferRequest} from "../controller/transferMoneyController.js";
import {matchOk} from "../lib/types.js";

export type TransferMoneyDependencies = {
    getAccountState: GetAccountState,
    saveTransaction: SaveTransaction,
    createTransaction: CreateTransaction
}
export type TransferMoneyWorkflow = (_: TransferMoneyDependencies) => TransfertMoneyPipeline

export type TransfertMoneyPipeline = (commandHandler: TransferMoney, request: MoneyTransferRequest) => Promise<TransfertMoneyResult>
// IMPERATIVE SHELL
export const transferMoneyWorkflow: TransferMoneyWorkflow = (_: TransferMoneyDependencies): TransfertMoneyPipeline => {
    return async (commandHandler: TransferMoney, request: MoneyTransferRequest): Promise<TransfertMoneyResult> => {
        const command: TransferMoneyCommand = await makeTransferMoneyCommand(_, request); //IO GET STATE
        const result: TransfertMoneyResult = commandHandler(command); // PURE CORE_LOGIC MAKE DECISION
        if(matchOk(result)) await saveTransaction(result.value); // SIDE_EFFECT
        return result; // RETURN TO CONTROLLER
    }
}
const makeTransferMoneyCommand = async (_: TransferMoneyDependencies, request: MoneyTransferRequest): Promise<TransferMoneyCommand> => {
    const transactionId = await _.createTransaction();
    const accountState = await _.getAccountState(request.customerAccountId);
   return  {
        transactionId,
        accountState,
        amount: request.amount,
        toAccount: request.destinationAccountId
    };
}