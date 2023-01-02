import { isEmpty } from "lodash";
import { log, wordCount } from "../../utils";
import {
  DIFFICULTY,
  DISPLAYABLE,
  STAGE_MAX_STEPS,
  STEP_MAX_WORDS,
} from "../../utils/constants";
import { nextSnippet, Step, topicDifficulty } from ".";
import { Stage } from "./journey.interface";
import { Snippet } from "../data";
import { Student } from "../student";

export function buildStages(
  snippetTable: Snippet[],
  student: Student
): Stage[] {
  log(0, "=>buildStages", "");
  /*
Max 5 steps per stage.
*/
  const MAX_STAGES = 8;
  const stages: Stage[] = [];

  /*
  interface Subject {
    [key: string]: string;
    partitionStepsBy: String;
  }
  */
  const subject = [
    {
      subjectId: "GEOG",
      partitionStepsBy: "W",
    },
    {
      subjectId: "OLIV",
      partitionStepsBy: "S",
    },
  ];

  const rank = [
    {
      rankId: "1",
      wordsPerStep: 80,
      snippetsPerStep: 1,
    },
    {
      rankId: "2",
      wordsPerStep: 80,
      snippetsPerStep: 2,
    },
  ];

  const partitionStepsBy =
    subject.find((s) => s.subjectId === student.currentSubjectId)
      ?.partitionStepsBy ?? "W";
  const studentRank = rank.find((s) => s.rankId === student.rankId);

  const wordsPerStep = studentRank?.wordsPerStep ?? 80;
  const snippetsPerStep = studentRank?.snippetsPerStep ?? 1;

  log(0, "partitionStepsBy", partitionStepsBy);
  log(0, "wordsPerStep", wordsPerStep);
  log(0, "snippetsPerStep", snippetsPerStep);

  let stageCount = 0;
  let steps: Step[] = [];

  let stepCount = 0;
  let stepWordCount = 0;
  let stepSnippetCount = 0;
  let snippetIds: number[] = [];
  let stepSnippetIndex = 0;

  function stepBoundary(
    partitionStepsBy: string,
    stepWordCount: number,
    wordsPerStep: number,
    stepSnippetCount: number,
    snippetsPerStep: number,
    snippetType: string,
    snippetId: number
  ): boolean {
    const tmp =
      partitionStepsBy === "W"
        ? stepWordCount > wordsPerStep
        : stepSnippetCount > snippetsPerStep;
    if (
      tmp ||
      (snippetType === "T" && stepSnippetCount !== 1) ||
      (snippetType === "HE" && topicDifficulty(snippetId) === DIFFICULTY.hard)
    )
      return true;
    return false;
  }

  for (const s of snippetTable) {
    //using a for loop assumes (incorrectly) that snippetTable is sequentially ordered by snippet id. Won't always be so.
    stepWordCount += wordCount(s.descr);
    stepSnippetCount += 1;

    log(0, "stepWordCount", stepWordCount);
    if (
      stepBoundary(
        partitionStepsBy,
        stepWordCount,
        wordsPerStep,
        stepSnippetCount,
        snippetsPerStep,
        s.snippetType,
        s.snippetId
      )
    ) {
      log(0, "step", stepCount);
      log(0, "snippets", snippetIds);
      steps.push({
        stepNum: stepCount,
        start: snippetIds[0],
        end: snippetIds[snippetIds.length - 1],
        //currentSnippetId: 1,
        snippetIds: snippetIds,
      });
      stepCount += 1;
      stepWordCount = 0;
      snippetIds = [];
      stepSnippetIndex = 0;

      if (stepCount === STAGE_MAX_STEPS) {
        log(0, "stage", stageCount);
        log(0, "steps", steps);
        stages.push({
          stageId: stageCount,
          steps: steps,
        });
        stageCount += 1;
        stepCount = 0;
      }
    }
    snippetIds.push(s.snippetId);
  }
  log(0, "<=buildStages", "");
  return stages;
}
