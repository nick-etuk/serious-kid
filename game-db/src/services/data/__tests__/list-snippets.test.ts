import { log } from "../../../../utils/log";
import { listSnippets } from "../list-snippets";
import { snippetDb } from "../snippet-json";
//import Snippet from "../watermelon-db/model/snippet";

describe("List snippets watermelon db", () => {
  test("List snippets 1 to 3", () => {
    const expected = snippetDb.slice(1 - 1, 3 - 1);
    const actual = listSnippets(1, 3);
    expect(actual).toStrictEqual(expected);
  });

  test("List snippets 3 to 6", () => {
    const expected = snippetDb.slice(3 - 1, 3 + 1);
    const actual = listSnippets(3, 6);
    expect(actual).toStrictEqual(expected);
  });
});
