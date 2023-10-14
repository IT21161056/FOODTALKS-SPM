import { atom } from "jotai";

const alanAtom = atom(null);
const command = atom("");
const data = atom("");
const user = atom(null);

export { alanAtom, command, data, user };
