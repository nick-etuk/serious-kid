import { Student } from "services/student";

export function getNextGame(student: Student) {
    const games = ["MULTI", "INPUT"];
    //return games[Math.floor(Math.random() * games.length)];
    return "MULTI";
}
