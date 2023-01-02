import { log } from "utils";

export interface Fragment {
  seq: number;
  type: string;
  descr: string;
}

export function fragments(input: string, tags: string[]): Fragment[] {
  let fragment_num = 0;
  let remainder = input;
  const fragments = [];

  let proceed = true;
  while (remainder && proceed) {
    for (const word of tags) {
      proceed = false;
      const pos = remainder.indexOf(word);
      if (pos === -1) continue;
      fragment_num += 1;
      let fragment = {
        seq: fragment_num,
        type: "P",
        descr: remainder.slice(0, pos),
      };
      //log(0, fragment["descr"]);
      fragments.push(fragment);

      fragment_num += 1;
      fragment = {
        seq: fragment_num,
        type: "L",
        descr: word,
      };
      //log(0, fragment["descr"]);
      fragments.push(fragment);

      remainder = remainder.slice(pos + word.length);
      //log(0, remainder);
    }
  }
  if (remainder) fragment_num += 1;
  const fragment = {
    seq: fragment_num,
    type: "P",
    descr: remainder,
  };
  fragments.push(fragment);

  //log(0, "fragments", fragments, true);
  return fragments;
}
