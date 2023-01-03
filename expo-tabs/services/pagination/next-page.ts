import { log } from "utils";
import { Display } from "components/components.interface";
import { Snippet } from "services/data/data.interface";
import { getSnippet } from "services/data";
import { FONT_LARGE, FONT_NORMAL, relativeLineHeight } from "styles/text";

export function nextPage(
    snippets: Snippet[],
    currentSnippetId: number,
    height: number,
    width: number
): Snippet[] {
    const log_level = 0;

    log(log_level, "=>nextPage", "");
    log(log_level, "currentSnippetId", currentSnippetId);
    log(log_level, "snippets", snippets, true);
    const result: Snippet[] = [];
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
    log(log_level, "lines available", Math.round(linesAvailable));
    log(log_level, "chars Per Line", Math.round(charsPerLine));

    const arrayLen = snippets.length;
    const snippetSlice: Snippet[] = [];

    //snippets.slice(currentSnippetId,end);
    for (let i = 0; i < arrayLen; i++)
        if (snippets[i].snippetId === currentSnippetId)
            for (let j = i; j < arrayLen; j++) snippetSlice.push(snippets[j]);
    log(log_level, "snippetSlice", snippetSlice, true);
    for (const s of snippetSlice) {
        log(log_level, "remaining", Math.round(charsRemaining));
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
                        )} lines, ${Math.round(
                            charsPerLine * linesConsumedImage
                        )} chars`,
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
                        `Heading ${
                            s.snippetId
                        } took ${linesConsumedHeading.toFixed(
                            2
                        )} lines, ${Math.round(
                            charsPerLine * linesConsumedHeading
                        )} chars`,
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
                    log(
                        log_level,
                        `Paragraph ${s.snippetId} took ${Math.round(
                            len
                        )} chars`,
                        ""
                    );
                }
                break;
        }
    }
    log(
        log_level,
        "result",
        result.reduce((a, i) => a + i.snippetId + ",", ""),
        true
    );
    if (result[result.length - 1].snippetType === "HE") result.pop();
    //remove orphaned heading. Remove last snippet if it is a heading.
    log(log_level, "<=nextPage", "");

    return result;
}
