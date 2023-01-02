import { buildStages } from "..";
import { log } from "utils";
import { snippetTable } from "../services/data/http/snippet-table";
import { Student } from "../services/student";

const expected = [
  {
    stageId: 0,
    steps: [
      {
        stepNum: 1,
        start: 1,
        end: 11,
        currentSnippetId: 1,
        snippetIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
      {
        stepNum: 2,
        start: 12,
        end: 15,
        currentSnippetId: 1,
        snippetIds: [12, 13, 14, 15],
      },
      {
        stepNum: 3,
        start: 16,
        end: 22,
        currentSnippetId: 1,
        snippetIds: [16, 17, 18, 19, 20, 21, 22],
      },
    ],
  },
];

const student: Student = {
  studentId: 1,
  currentSubjectId: "GEOG",
  rankId: "1",
};
describe("Build Stages", () => {
  test("Geography unit 1", async () => {
    const snippets = await snippetTable("GEOG");
    log(0, "snippets", snippets, true);
    const stages = buildStages(snippets, student);
    const actual = stages.slice(1);
    log(0, "actual", actual, true);
    expect(actual).toStrictEqual(expected);
  });
});
