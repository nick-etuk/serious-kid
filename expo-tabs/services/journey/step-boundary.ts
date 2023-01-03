import { DIFFICULTY } from "utils/constants";
import { topicDifficulty } from "./topic-difficulty";

export function stepBoundary(
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
