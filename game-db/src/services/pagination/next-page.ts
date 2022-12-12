import { Display } from "../../app.interface";
import { Snippet } from "../data/data.interface";

export function nextPage(
  currentSnippetId: number,
  snippets: Snippet[],
  display: Display
): Snippet[] {
  const result: Snippet[] = [];
  let charCount = 0;
  for (let i = 0; i < snippets.length; i++) {
    if (snippets[i].snippetId === currentSnippetId) {
      for (let j = i; j < snippets.length; j++) {
        const s = snippets[j];
        const len = s.descr.length;
        if (charCount + len > display.chars) break;
        result.push(s);
        charCount += len;
      }
    }
  }
  if (result[result.length - 1].snippetType === "HE") result.pop(); //remove orphaned heading. Reove last snippet if it is a heading.
  return result;
}
