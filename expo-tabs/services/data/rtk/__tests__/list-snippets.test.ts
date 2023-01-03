import { log } from "utils";
import { listSnippets } from "services/data/list-snippets";
import { snippetTable } from "services/data/files/snippet-table";

describe("List snippets watermelon db", () => {
  test("List snippets 1 to 3", async () => {
    const expected = snippetTable.slice(1 - 1, 3 - 1);
    const actual = await listSnippets(1, 3);
    expect(actual).toStrictEqual(expected);
  });

  test("List snippets 3 to 6", async () => {
    const expected = snippetTable.slice(3 - 1, 3 + 1);
    const actual = await listSnippets(3, 6);
    expect(actual).toStrictEqual(expected);
  });
});
