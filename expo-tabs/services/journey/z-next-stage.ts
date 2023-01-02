import { isEmpty } from "lodash";
import { wordCount } from "utils";
import { DIFFICULTY, STAGE_MAX_STEPS, STEP_MAX_WORDS } from "utils/constants";
import { Question, Snippet } from "services/data/data.interface";
import { nextSnippet, refineQuestions, Step, topicDifficulty } from ".";

export function nextStage(
  currentSnippetId: number,
  maxWords: number = STEP_MAX_WORDS
): Step[] {
  /*
    Returns a list of Steps that constitute a stage.
    Max 5 steps per stage.
    *to-do: Do not cross over into a new topic.
    */
  /*
  const stage: Step[] = [];
  let stepCount = 0;
  let s = nextSnippet(currentSnippetId);
  if (!s) return stage;

  while (stepCount < STAGE_MAX_STEPS) {
    let stepWordCount = 0;
    const snippetIds = [0];
    let questions: Question[] = [];
    stepWordCount += wordCount(s?.descr);

    let snippetIndex = 0;
    while (s && stepWordCount < maxWords) {
      if (s.snippetType == "T" && snippetIndex !== 0) break; //step should not cross into the next topic
      if (
        s.snippetType == "HE" &&
        topicDifficulty(s.snippetId) === DIFFICULTY.hard
      )
        break; //break up steps by heading if the current topic is hard

      snippets.push(s);
      s = nextSnippet(s.snippetId);
      if (!s) break;
      stepWordCount += wordCount(s.descr);
    }

    if (isEmpty(snippets)) break;

    stage.push({
      stepNum: stepCount,
      start: snippets[0].snippetId,
      end: snippets[snippets.length - 1].snippetId,
      currentSnippetId: 1,
      snippets: snippets,
      questions: questions,
    });

    stepCount += 1;
  }
  return stage;
  */
  return [];
}
