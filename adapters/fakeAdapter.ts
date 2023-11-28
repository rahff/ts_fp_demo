import {Adapter} from "./adapter.js";

export const fakeAdapter: Adapter = async (id: number) => 15 + id;