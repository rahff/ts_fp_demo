import {ApproveTransaction} from "../core/transferMoney.js";
import {TransferMoneyCommand, TransfertMoneyResult} from "../core/model.js";
import {MoneyTransferRequest} from "../controller/transferMoneyController.js";
import {matchOk} from "../lib/types.js";
import {TransferMoneyDependencies, TransferMoneyWorkflow, TransfertMoneyPipeline} from "./types.js";


// IMPERATIVE SHELL
export const transferMoneyWorkflow: TransferMoneyWorkflow =
    (_: TransferMoneyDependencies, commandHandler: ApproveTransaction): TransfertMoneyPipeline => {
    return async (request: MoneyTransferRequest): Promise<TransfertMoneyResult> => {
        const command: TransferMoneyCommand = await makeTransferMoneyCommand(_, request); //IO GET STATE
        const result: TransfertMoneyResult = commandHandler(command); // PURE CORE_LOGIC MAKE DECISION
        if(matchOk(result)) await _.saveTransaction(result.value); // SIDE_EFFECT
        return result; // RETURN TO CONTROLLER
    }
}
const makeTransferMoneyCommand =
    async (_: TransferMoneyDependencies, request: MoneyTransferRequest): Promise<TransferMoneyCommand> => {
    const transactionId = await _.createTransaction();
    const accountState = await _.getAccountState(request.customerAccountId);
   return  {
        transactionId,
        accountState,
        amount: request.amount,
        toAccount: request.destinationAccountId
    };
}