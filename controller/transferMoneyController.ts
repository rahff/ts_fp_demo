import {Request, Response} from "express";
import {TransferMoney} from "../core/transferMoney.js";
import {TransfertMoneyPipeline} from "../application/TransferMoneyWorkflow.js";
import {matchOk} from "../lib/types.js";


type Controller = (req: Request, res: Response) => Promise<void>;

export type MoneyTransferRequest = {customerAccountId: string, destinationAccountId: string, amount: number};

//CREATE CONTROLLER WITH USE CASE PIPELINE
export const transferMoneyController = (useCase: TransfertMoneyPipeline): Controller => {
    return async (req: Request, res: Response): Promise<void> => {
        const request: MoneyTransferRequest = {...req.body};
        const result = await useCase(request);
        if(matchOk(result)) res.status(201).json({result: result.tag});
        else res.status(403).json({reject: result.value});
    }
}

