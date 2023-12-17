import {ApproveTransaction} from "../core/transferMoney.js";
import {transferMoneyCommand, TransferMoneyCommand, TransfertMoneyResult} from "../core/model.js";
import {MoneyTransferRequest} from "../controller/transferMoneyController.js";
import {matchOk} from "../lib/types.js";
import {TransferMoneyDependencies, TransferMoneyWorkflow, TransfertMoneyPipeline} from "./types.js";


export const transferMoneyWorkflow: TransferMoneyWorkflow =
    (_: TransferMoneyDependencies, commandHandler: ApproveTransaction): TransfertMoneyPipeline => {
    return async (request: MoneyTransferRequest): Promise<TransfertMoneyResult> => {
        const command: TransferMoneyCommand = await makeTransferMoneyCommand(_, request);
        const result: TransfertMoneyResult = commandHandler(command);
        if(matchOk(result)) await _.saveTransaction(result.value);
        return result;
    }
}
const makeTransferMoneyCommand =
    async (_: TransferMoneyDependencies, request: MoneyTransferRequest): Promise<TransferMoneyCommand> => {
        const [transactionId, accountState]
            = await Promise.all([
            _.createTransaction(),
            _.getAccountState(request.customerAccountId)
        ]);
   return transferMoneyCommand(
        transactionId,
        accountState,
        request.amount,
        request.destinationAccountId
    );
}