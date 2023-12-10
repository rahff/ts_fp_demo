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

export const transactionAccepted = (transactionId: string,
                                    debitedAccountId: string,
                                    creditedAccountId: string,
                                    amount: number): TransactionAccepted => (
                                        {transactionId, debitedAccountId, creditedAccountId, amount}
                                    )
export const transactionRejected = (reason: string): TransactionRejected => ({reason})

export type TransactionAccepted = {
    transactionId: string,
    debitedAccountId: string,
    creditedAccountId: string,
    amount: number
}


export type TransactionRejected = {
    reason: string
}

export type TransfertMoneyResult = Result<TransactionAccepted, TransactionRejected>