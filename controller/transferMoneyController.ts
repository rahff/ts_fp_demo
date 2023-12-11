import {Request, Response} from "express";
import {TransferMoney} from "../core/transferMoney.js";
import {TransfertMoneyPipeline} from "../application/TransferMoneyWorkflow.js";
import {matchOk} from "../lib/types.js";


type Controller = (req: Request, res: Response) => void;

export type MoneyTransferRequest = {customerAccountId: string, destinationAccountId: string, amount: number};

//CREATE CONTROLLER WITH USE CASE PIPELINE
export const transferMoneyController = (pipeline: TransfertMoneyPipeline, transferMoney: TransferMoney): Controller => {
    return async (req: Request, res: Response) => {
        const request: MoneyTransferRequest = {...req.body};
        const result = await pipeline(transferMoney, request);
        if(matchOk(result)) return res.status(201).json({result: result.tag})
        else return res.status(403).json({reject: result.value});
    }
}

