import { isEmpty } from "lodash";
import { wordCount } from "../../../utils";
import { LAP_MAX_STEPS, STEP_MAX_WORDS } from "../../../utils/constants";
import { Question, Snippet } from "../data/data.interface";
import { nextSnippet, refineQuestions, Step } from "../journey";

export function nextLap(
  currentSnippetId: number,
  maxWords: number = STEP_MAX_WORDS
): Step[] {
  /*
  Returns a list of Steps that constitute a lap.
  Max 5 steps per lap.
  *to-do: Do not cross over into a new topic.
  */
  const result: Step[] = [];
  let stepCount = 0;
  let s = nextSnippet(currentSnippetId);
  if (!s) return result;

  while (stepCount < LAP_MAX_STEPS) {
    let stepWordCount = 0;
    const snippets: Snippet[] = [];
    let questions: Question[] = [];
    stepWordCount += wordCount(s?.descr);

    while (s && stepWordCount < maxWords) {
      snippets.push(s);
      s = nextSnippet(s.snippetId);
      if (!s) break;
      stepWordCount += wordCount(s.descr);
    }

    questions = snippets.filter((s) => s.questions).flatMap((s) => s.questions);
    questions = refineQuestions(questions);

    if (isEmpty(snippets)) break;

    result.push({
      stepNum: stepCount,
      start: snippets[0].snippetId,
      end: snippets[snippets.length - 1].snippetId,
      currentSnippetId: 1,
      snippets: snippets,
      questions: questions,
    });

    stepCount += 1;
  }
  return result;
}
