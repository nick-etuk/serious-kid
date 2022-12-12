import { log } from "../../../../utils";
import { snippetDb } from "../../data/snippet-json";
import { nextPage } from "../next-page";

const display = {
  chars: 300,
};

describe("Next page", () => {
  test("Next page", () => {
    const expected = snippetDb.slice(0, 6);
    log(0, "expected:", expected, true);

    const actual = nextPage(1, snippetDb, display);
    log(0, "actual:", actual, true);

    expect(actual).toStrictEqual(expected);
  });
});
