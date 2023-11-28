import * as crypto from "crypto";

export type Adapter = (id: number) => Promise<number>

export const secondaryAdapter: Adapter = async (id: number) => id + crypto.randomInt(10)