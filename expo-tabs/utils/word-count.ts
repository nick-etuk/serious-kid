import { result } from "lodash";
import { log } from ".";

export function wordCount(str: string | undefined): number {
  //log(0, "Counting words in ", str, true);
  if (!str) return 0;
  if (str.indexOf(" ") === -1) return 1;
  const result = str.split(" ").filter(function (n) {
    return n != "";
  }).length;
  //log(0, "<=wordCount ", result, true);
  return result;
}
