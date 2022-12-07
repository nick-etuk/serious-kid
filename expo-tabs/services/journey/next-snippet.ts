import { snippet } from "../data";
import { snippetDb } from "../data/snippet-db";

function nextSnippet(current: number): snippet | undefined {
    const currentID = snippetDb[current].id;
    return snippetDb.find(x => x.id === (currentID + 1));
}