//import { log } from "../../../../utils";
import { snippetDb } from "../../data/snippet-json";
import { Step } from "../../journey";
import { nextLap } from "../next-lap";

let snippets = snippetDb.slice(1 - 1, 10);
let questions = snippets.filter((s) => s.questions).flatMap((s) => s.questions);

const step1: Step = {
  stepNum: 0,
  currentSnippetId: 1,
  start: 1,
  end: 10,
  snippets: snippets,
  questions: questions,
};

snippets = snippetDb.slice(11 - 1, 14);
questions = snippets.filter((s) => s.questions).flatMap((s) => s.questions);

const step2: Step = {
  stepNum: 1,
  currentSnippetId: 1,
  start: 11,
  end: 14,
  snippets: snippets,
  questions: questions,
};

snippets = snippetDb.slice(15 - 1, 21);
questions = snippets.filter((s) => s.questions).flatMap((s) => s.questions);

const step3: Step = {
  stepNum: 2,
  currentSnippetId: 1,
  start: 15,
  end: 21,
  snippets: snippets,
  questions: questions,
};

const lap = nextLap(0, 80);

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
