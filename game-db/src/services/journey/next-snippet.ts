import { snippet } from "../data";
import { snippetDb } from "../data/snippet-json";

function nextSnippet(current: number): snippet | undefined {
  const currentID = snippetDb[current].id;
  return snippetDb.find((x) => x.id === currentID + 1);
}
