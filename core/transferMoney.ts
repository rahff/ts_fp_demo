import {transactionAccepted, transactionRejected, TransferMoneyCommand, TransfertMoneyResult} from "./model.js";
import {err, ok} from "../lib/types.js";


export type TransferMoney = (command: TransferMoneyCommand) => TransfertMoneyResult

// HIGH ALGORITHMIC COMPLEXITY
export const transferMoney: TransferMoney = (command: TransferMoneyCommand): TransfertMoneyResult => {
    if (command.accountState.balance >= command.amount){
        return ok(transactionAccepted(
            command.transactionId,
            command.accountState.id,
            command.toAccount,
            command.amount))
    }
    return err(transactionRejected("insufficient balance"));
}

