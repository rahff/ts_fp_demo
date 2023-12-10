import {AccountState, TransactionAccepted} from "../core/model.js";
import * as crypto from "crypto";

export type GetAccountState = (accountId: string) => Promise<AccountState>;
export const getAccountState: GetAccountState = async (accountId: string) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({id: accountId, balance: 9658.25}), 90);
    })
}

export type SaveTransaction = (event: TransactionAccepted) => Promise<void>;
export const saveTransaction: SaveTransaction = async (event) => {}

export type CreateTransaction = () => Promise<string>;
export const createTransaction: CreateTransaction = async () => crypto.randomUUID().toString();