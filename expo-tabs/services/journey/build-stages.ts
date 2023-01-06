import { log, wordCount } from "utils";
import { DISPLAYABLE, STAGE_MAX_STEPS, WORD_BOUNDARIES } from "utils/constants";
import { Step, Stage, splitWords } from "services/journey";
import { Answer, Question, Snippet } from "services/data";
import { Student } from "services/student";
import { stepBoundary } from "./step-boundary";
import { Dictionary } from "services/dictionary";

export function buildStages(
    snippetTable: Snippet[],
    questionTable: Question[],
    answerTable: Answer[],
    dictionaryTable: Dictionary[],
    student: Student
): Stage[] {
    const logLevel = 0;
    log(logLevel, "=>buildStages", "");
    log(logLevel, "dictionaryTable", dictionaryTable, true);
    /*
        Max 5 steps per stage.
        */
    const TERM_STAGES = 8;
    const stages: Stage[] = [];

    /*
    interface Subject {
        [key: string]: string;
        partitionStepsBy: String;
    }
    */
    const subject = [
        {
            subjectId: "GEOG",
            partitionStepsBy: "W",
        },
        {
            subjectId: "OLIV",
            partitionStepsBy: "S",
        },
    ];

    const rank = [
        {
            rankId: "1",
            wordsPerStep: 80,
            snippetsPerStep: 1,
        },
        {
            rankId: "2",
            wordsPerStep: 80,
            snippetsPerStep: 2,
        },
    ];

    const partitionStepsBy =
        subject.find((s) => s.subjectId === student.currentSubjectId)
            ?.partitionStepsBy ?? "W";
    const studentRank = rank.find((s) => s.rankId === student.rankId);

    const wordsPerStep = studentRank?.wordsPerStep ?? 80;
    const snippetsPerStep = studentRank?.snippetsPerStep ?? 1;

    log(logLevel, "partitionStepsBy", partitionStepsBy);
    if (partitionStepsBy === "W") log(logLevel, "wordsPerStep", wordsPerStep);
    if (partitionStepsBy === "S")
        log(logLevel, "snippetsPerStep", snippetsPerStep);

    let stageCount = 0;
    let steps: Step[] = [];

    let stepCount = 0;
    let stepWordCount = 0;
    let stepSnippetCount = 0;
    let snippets: Snippet[] = [];
    let dictionary: Dictionary[] = [];
    let snippetIds: number[] = [];
    let questions: Question[] = [];
    let answers: Answer[] = [];
    let stepSnippetIndex = 0;

    for (const s of snippetTable) {
        //using a for loop assumes (incorrectly) that snippetTable is sequentially ordered by snippet id. Won't always be so.
        if (!DISPLAYABLE.includes(s.snippetType)) continue;

        snippets.push(s);
        snippetIds.push(s.snippetId);
        const distinctWords = splitWords(s.descr);
        for (const word of distinctWords) {
            const match = dictionaryTable.find((dict) => dict.word === word);
            if (match) dictionary.push(match);
        }

        stepWordCount += wordCount(s.descr);
        stepSnippetCount += 1;

        if (partitionStepsBy === "W")
            log(logLevel, "stepWordCount", stepWordCount);
        if (
            stepBoundary(
                partitionStepsBy,
                stepWordCount,
                wordsPerStep,
                stepSnippetCount,
                snippetsPerStep,
                s.snippetType,
                s.snippetId
            )
        ) {
            const questions = questionTable.filter((q) =>
                snippetIds.includes(q.snippetId)
            );
            const answers: Answer[] = [];
            for (const q of questions)
                for (const a of answerTable)
                    if (
                        a.snippetId === q.snippetId &&
                        a.questionId === q.questionId
                    )
                        answers.push(a);
            steps.push({
                stepNum: stepCount,
                start: snippets[0].snippetId,
                end: snippets[snippets.length - 1].snippetId,
                //currentSnippetId: 1,
                snippets,
                questions,
                answers,
                dictionary,
            });
            stepCount += 1;
            stepWordCount = 0;
            snippets = [];
            snippetIds = [];
            stepSnippetIndex = 0;
            dictionary = [];

            if (stepCount === STAGE_MAX_STEPS) {
                log(logLevel, "stage", stageCount);
                log(logLevel, "steps", steps);
                stages.push({
                    stageId: stageCount,
                    start: 0,
                    end: STAGE_MAX_STEPS - 1,
                    steps: steps,
                });
                stageCount += 1;
                stepCount = 0;
                steps = [];
            }
        }
        if (stageCount === TERM_STAGES) break;
    }
    log(logLevel, "Stages", stages);
    log(logLevel, "<=buildStages", "");
    return stages;
}
