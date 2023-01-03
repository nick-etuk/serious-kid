import { log } from "utils";
import { snippetTable } from "services/data";

describe("Snippet table", () => {
  test("Snippet table", async () => {
    const expected = {
      snippetId: 1,
      snippetType: "T",
      descr: "Volcanoes",
    };

    const actual = await snippetTable("GEOG");
    log(0, "actual", actual[0], true);

    expect(actual[0]).toStrictEqual(expected);
  });
});
