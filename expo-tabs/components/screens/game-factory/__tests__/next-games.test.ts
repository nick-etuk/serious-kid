import { log } from "utils";
import { getNextGame } from "../next-game";
import { student } from "services/student";

describe("Next game", () => {
    test("Next game", () => {
        for (let i = 1; i <= 10; i++) {
            const actual = getNextGame(student);
            log(1, "Next game", actual, true);
        }
        //expect(actual).toStrictEqual(expected);
    });
});
