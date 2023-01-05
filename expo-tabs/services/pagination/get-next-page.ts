import { Snippet } from "services/data";
import { log } from "utils";
import { nextPage } from "./next-page";
import { nextPageResult } from "./pagination.interface";

export function getPage(
    snippets: Snippet[],
    current: number,
    stepStart: number,
    height: number,
    width: number
): nextPageResult {
    const c = current < stepStart ? stepStart : current;
    const result = nextPage(snippets, c, height, width);

    return {
        snippets: result,
        lastSnippetId: result[result.length - 1].snippetId,
    };
}
