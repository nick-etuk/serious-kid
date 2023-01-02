import { log } from "../../../../utils";
import { snippetTable } from "../../index";

describe("Snippet table", () => {
  test("Snippet table", async () => {
    const expected = {
      snippetId: 1,
      snippetType: "T",
      descr: "Volcanoes",
    };

    const actual = await snippetTable();
    log(0, "actual", actual[0], true);

    expect(actual[0]).toStrictEqual(expected);
  });
});
