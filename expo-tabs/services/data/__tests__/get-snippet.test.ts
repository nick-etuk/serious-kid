import { getSnippet } from "services/data/get-snippet";

describe("Get snippet by ID", () => {
  test("Get snippet number two", () => {
    const expected = {
      id: 2,
      type: "P",
      content: `The word “volcano” comes from the Roman name “Vulcan”.
                  "But who was Vulcan?" you might ask. He was the Roman god of fire!`,
    };

    const actual = getSnippet(2);
    expect(actual).toStrictEqual(expected);
  });
});
