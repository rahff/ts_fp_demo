import {Request, Response} from "express";

import {UseCase} from "../core/useCase.js";

type Controller = (req: Request, res: Response) => void
export const controller_factory = (useCase: UseCase): Controller => {
    return async (req: Request, res: Response) => {
        const input = req.url.length;
        const result = await useCase(input);
        res.json(result);
    }
}

