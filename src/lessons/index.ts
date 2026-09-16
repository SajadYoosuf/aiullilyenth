import ml from "./malayalam.json";
import bats from "./bat.json";
import type { Lesson } from "../types";
export const demos = [ml, ...bats] as Lesson[];
