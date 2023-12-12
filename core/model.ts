import {Result} from "../lib/types.js";


export type AccountState = {
    id: string,
    balance: number
}

export type TransferMoneyCommand = {
    transactionId: string,
    accountState: AccountState,
    amount: number,
    toAccount: string
}

export const transactionApproved = (transactionId: string,
                                    debitedAccountId: string,
                                    creditedAccountId: string,
                                    amount: number): TransactionApproved => (
                                        {transactionId, debitedAccountId, creditedAccountId, amount}
                                    )
export const transactionRejected = (reason: string): TransactionRejected => ({reason})

export type TransactionApproved = {
    transactionId: string,
    debitedAccountId: string,
    creditedAccountId: string,
    amount: number
}


export type TransactionRejected = {
    reason: string
}

export type TransfertMoneyResult = Result<TransactionApproved, TransactionRejected>