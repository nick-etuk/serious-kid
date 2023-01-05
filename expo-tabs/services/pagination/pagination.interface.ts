import { Snippet } from "services/data";

interface nextPageResult {
    snippets: Snippet[];
    lastSnippetId: number;
}

export type { nextPageResult };
