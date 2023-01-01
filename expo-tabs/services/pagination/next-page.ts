import { log } from "../../utils";
import { Display } from "../../app.interface";
import { Snippet } from "../data/data.interface";
import { getSnippet } from "../data";
import { FONT_LARGE, FONT_NORMAL, relativeLineHeight } from "../../styles/main";

export function nextPage(
  snippets: Snippet[],
  currentSnippetId: number,
  snippetIds: number[],
  height: number,
  width: number
): Snippet[] {
  log(0, "=>nextPage", "");
  log(0, "currentSnippetId", currentSnippetId);
  //log(0, "snippets", snippetIds.join(","));
  const result: Snippet[] = [];
  const displayable = ["P", "T", "HE"];
  const HORIZONTAL_MARGINS = 200 * 2;
  //const MAX_WIDTH = 800 - HORIZONTAL_MARGINS;
  const MAX_WIDTH = 800;
  const VERTICAL_MARGINS = 250;
  const IMAGE_HEIGHT = 200;

  let charCount = 0;
  let currentHeight = height - VERTICAL_MARGINS;
  let currentWidth = width > MAX_WIDTH ? MAX_WIDTH : width;
  const linesAvailable =
    currentHeight / (FONT_NORMAL + relativeLineHeight(FONT_NORMAL));
  const linesConsumedHeading = FONT_LARGE / FONT_NORMAL;
  //const linesConsumedImage = IMAGE_HEIGHT / FONT_NORMAL;
  const linesConsumedImage = 3;
  const charsPerLine = currentWidth / FONT_NORMAL;
  let charsRemaining = charsPerLine * linesAvailable;
  log(0, "lines available", Math.round(linesAvailable));
  log(0, "chars Per Line", Math.round(charsPerLine));

  const arrayLen = snippets.length;
  const stepSnippets: Snippet[] = [];

  //snippets.slice(currentSnippetId,end);
  for (let i = 0; i < arrayLen; i++)
    if (snippets[i].snippetId === currentSnippetId)
      for (let j = i; j < arrayLen; j++) stepSnippets.push(snippets[j]);

  for (const s of stepSnippets) {
    log(0, "remaining", Math.round(charsRemaining));
    if (charsRemaining <= 0) break;
    switch (s.snippetType) {
      case "I":
        {
          //currentHeight -= IMAGE_HEIGHT;
          charsRemaining -= linesConsumedImage * charsPerLine;
          log(
            0,
            `Image ${s.snippetId} took ${linesConsumedImage.toFixed(
              2
            )} lines, ${Math.round(charsPerLine * linesConsumedImage)} chars`,
            ""
          );
          if (charsRemaining >= 0) result.push(s);
        }
        break;

      case "HE":
      case "T":
        {
          charsRemaining -= linesConsumedHeading * charsPerLine;
          log(
            0,
            `Heading ${s.snippetId} took ${linesConsumedHeading.toFixed(
              2
            )} lines, ${Math.round(charsPerLine * linesConsumedHeading)} chars`,
            ""
          );
          if (charsRemaining >= 0) result.push(s);
        }
        break;
      case "P":
        {
          const len = s.descr.length;
          charsRemaining -= len;
          if (charsRemaining >= 0) result.push(s);
          log(0, `Paragraph ${s.snippetId} took ${Math.round(len)} chars`, "");
        }
        break;
    }
  }
  //log(0, "result", result.reduce((a, i) => a + i.snippetId + ",", ""));
  if (result[result.length - 1].snippetType === "HE") result.pop();
  //remove orphaned heading. Remove last snippet if it is a heading.
  log(0, "<=nextPage", "");

  return result;
}
