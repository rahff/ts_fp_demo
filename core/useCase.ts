import {Adapter} from "../adapters/adapter.js";
import {Computation} from "./computation.js";

export type Result = {result: number}
export type UseCase = (input: number) => Promise<Result>
export const useCaseFactory = (getState: Adapter, core_function: Computation): UseCase => {
    return async (input: number) => {
        const applicationState = await getState(input);
        return {result : core_function(applicationState)}
    }
}

