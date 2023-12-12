import {transactionApproved, transactionRejected, TransferMoneyCommand, TransfertMoneyResult} from "./model.js";
import {err, ok} from "../lib/types.js";


export type ApproveTransaction = (command: TransferMoneyCommand) => TransfertMoneyResult

// HIGH ALGORITHMIC COMPLEXITY
export const approve_transaction: ApproveTransaction =
    (command: TransferMoneyCommand): TransfertMoneyResult => {
    const {balance} = command.accountState;
    if (sufficientBalance(balance, command.amount)){
        return ok(transactionApproved(
            command.transactionId,
            command.accountState.id,
            command.toAccount,
            command.amount)
        );
    }
    return err(transactionRejected("insufficient balance"));
}

const sufficientBalance =
    (accountBalance: number, amount: number): boolean => accountBalance >= amount;