import {AccountState, TransactionAccepted} from "../core/model.js";
import * as crypto from "crypto";

export type GetAccountState = (accountId: string) => Promise<AccountState>;
export const getAccountState: GetAccountState = async (accountId: string) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({id: accountId, balance: 9658.25}), 10);
    })
}

export type SaveTransaction = (event: TransactionAccepted) => Promise<void>;
export const saveTransaction: SaveTransaction = async (event) => {
    return new Promise((resolve) => setTimeout(()=> resolve(), 10))
}

export type CreateTransaction = () => Promise<string>;
export const createTransaction: CreateTransaction = async () => {
    return new Promise((resolve) => setTimeout(()=> resolve(crypto.randomUUID().toString()), 10))
};