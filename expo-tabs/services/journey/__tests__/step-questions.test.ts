//import { log } from "../../../utils";
import { snippetTable } from "../../data/http/snippet-table";
import { Student } from "../../student";
import { buildStages } from "../build-stages";
import { stepQuestions } from "../step-questions";
const expected = [
  {
    snippetId: 5,
    questionSeq: 1,
    questionType: "T",
    descr: "who was Vulcan?",
    answers: [
      {
        answerSeq: 1,
        descr: "the Roman god of fire",
      },
      {
        answerSeq: 2,
        descr: "a greek god",
      },
      {
        answerSeq: 3,
        descr: "or a type of tyre",
      },
    ],
  },
];

const student: Student = {
  studentId: 1,
  currentSubjectId: "GEOG",
  rankId: "1",
};

describe("Get step questions", () => {
  test("Geography step 1 questions", async () => {
    const snippets = await snippetTable("GEOG");
    const stages = buildStages(snippets, student);
    const actual = stepQuestions(stages[0].steps[0]);
    expect(actual).toStrictEqual(expected);
  });
});
