import { log } from "../../utils";
import { Display } from "../../app.interface";
import { Snippet } from "../data/data.interface";
import { getSnippet } from "../data";

export function nextPage(
  currentSnippetId: number,
  snippetIds: number[],
  display: Display
): Snippet[] {
  log(0, "=>nextPage", "");
  log(0, "currentSnippetId", currentSnippetId);
  log(0, "snippets", snippetIds.join(","));
  const result: Snippet[] = [];
  let charCount = 0;
  for (let i = 0; i < snippetIds.length; i++) {
    if (snippetIds[i] === currentSnippetId) {
      for (let j = i; j < snippetIds.length; j++) {
        const s = getSnippet(snippetIds[j]);
        if (s) {
          const len = s.descr.length;
          if (charCount + len > display.chars) break;
          result.push(s);
          charCount += len;
        }
      }
    }
  }
  //log(0, "result", result.reduce((a, i) => a + i.snippetId + ",", ""));
  if (result[result.length - 1].snippetType === "HE") result.pop(); //remove orphaned heading. Reove last snippet if it is a heading.
  //log(0, "<=nextPage", "");

  return result;
}
