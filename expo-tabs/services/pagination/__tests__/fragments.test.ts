import { log } from "utils";
import { Fragment, fragments } from "../fragments";

describe("Fragments", () => {
  test("Content 1", () => {
    const text =
      "That means that around one in 20 people live in an area at risk of volcanic activity. Volcanoes can produce rich, fertile land. Over time, lava and ash break down to produce nutrient-rich soil, great for growing crops! That's why some people like to set up home on the slopes of a volcano.";
    const expected: Fragment[] = [
      {
        descr:
          "That means that around one in 20 people live in an area at risk of volcanic activity. Volcanoes can produce rich, ",
        seq: 1,
        type: "P",
      },
      { descr: "fertile", seq: 2, type: "L" },
      { descr: " land. Over time, ", seq: 3, type: "P" },
      { descr: "lava", seq: 4, type: "L" },
      { descr: " and ash break down to produce ", seq: 5, type: "P" },
      { descr: "nutrient", seq: 6, type: "L" },
      {
        descr:
          "-rich soil, great for growing crops! That's why some people like to set up home on the slopes of a volcano.",
        seq: 7,
        type: "P",
      },
    ];

    const actual = fragments(text, ["fertile", "lava", "nutrient"]);
    log(0, "actual:", actual, true);
    expect(actual).toStrictEqual(expected);
  });
});
