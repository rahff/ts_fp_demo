export type Result<T, R> = Ok<T> | Err<R>;

export type Ok<T> = {
    tag: "Ok",
    value: T
}
export type Err<T> = {
    tag: "Err",
    value: T
}

export const matchOk = <T, R>(result: Result<T, R>): result is Ok<T> => {
    return result.tag === "Ok";
}

export const ok = <T>(value: T): Ok<T> => ({tag: "Ok", value});
export const err = <T>(value: T): Err<T> => ({tag: "Err", value});