import {Request, Response} from "express";
import {transferMoney} from "../core/transferMoney.js";
import {TransfertMoneyPipeline} from "../application/TransferMoneyWorkflow.js";
import {matchOk} from "../lib/types.js";


type Controller = (req: Request, res: Response) => void;

export type MoneyTransferRequest = {customerAccountId: string, destinationAccountId: string, amount: number};

//CREATE CONTROLLER WITH USE CASE PIPELINE
export const transferMoneyController = (pipeline: TransfertMoneyPipeline): Controller => {
    return async (req: Request, res: Response) => {
        const request: MoneyTransferRequest = {...req.body};
        console.log(request)
        const result = await pipeline(transferMoney, request);
        if(matchOk(result)) return res.status(201).json({result: result.tag})
        else return res.status(403).json({reject: result.value});
    }
}

