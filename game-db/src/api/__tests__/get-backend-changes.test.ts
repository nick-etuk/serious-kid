import { log } from "../../../utils/log";
import { getBackendChanges } from "../get-backend-changes";

describe("Get backend changes", () => {
  test("Get backend changes", async () => {
    const expected = [""];
    const actual = await getBackendChanges();
    log(0, "backend changes:", actual, true);
    expect(actual).toStrictEqual(expected);
  });
});
