import { log } from "utils";
import { snippetTable } from "../services/data/files/snippet-table";
import { nextPage } from "../next-page";

const display = {
  chars: 300,
};

describe("Next page", () => {
  test("Next page", () => {
    const expected = snippetTable.slice(0, 6);
    log(0, "expected:", expected, true);

    const actual = nextPage(1, snippetTable, display);
    log(0, "actual:", actual, true);

    expect(actual).toStrictEqual(expected);
  });
});
