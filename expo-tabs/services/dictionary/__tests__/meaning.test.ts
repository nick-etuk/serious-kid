import { meaning } from "../meaning";

describe("Dictionary", () => {
  test("Meaning", () => {
    const expected =
      "A source of nourishment, such as food, that can be metabolized by an organism to give energy and build tissue. Providing nourishment. ";
    const actual = meaning("nutrient");
    expect(actual).toStrictEqual(expected);
  });
});
