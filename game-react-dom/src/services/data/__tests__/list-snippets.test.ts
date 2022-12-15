import { log } from "../../../utils/log";
import { listSnippets } from "../list-snippets";
import { snippetDb } from "../snippet-db";

describe("List snippets", () => {
  test("List snippets 0 to 2", () => {
    const expected = snippetDb.slice(0, 2 + 1);
    const actual = listSnippets(0, 2);
    expect(actual).toStrictEqual(expected);
  });
});
