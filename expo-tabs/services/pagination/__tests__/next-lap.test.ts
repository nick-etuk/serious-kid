//import { log } from "utils";
import { snippetTable } from "services/data/files/snippet-table";
import { Step } from "services/journey";
import { nextStage } from "services/journey/z-next-stage";

let snippets = snippetTable.slice(1 - 1, 10);
let questions = snippets.filter((s) => s.questions).flatMap((s) => s.questions);

const step1: Step = {
  stepNum: 0,
  start: 1,
  end: 10,
  snippetIds: snippets,
};

snippets = snippetTable.slice(11 - 1, 14);
questions = snippets.filter((s) => s.questions).flatMap((s) => s.questions);

const step2: Step = {
  stepNum: 1,
  start: 11,
  end: 14,
  snippetIds: snippets,
};

snippets = snippetTable.slice(15 - 1, 21);
questions = snippets.filter((s) => s.questions).flatMap((s) => s.questions);

const step3: Step = {
  stepNum: 2,
  start: 15,
  end: 21,
  snippetIds: snippets,
};

const lap = nextStage(0, 80);

describe("Next lap", () => {
  test("Step one", () => {
    expect(lap[0]).toStrictEqual(step1);
  });

  test("Step two", () => {
    expect(lap[1]).toStrictEqual(step2);
  });

  test("All steps", () => {
    expect(lap).toStrictEqual([step1, step2, step3]);
  });
});
