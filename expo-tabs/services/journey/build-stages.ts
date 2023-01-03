import { log, wordCount } from "utils";
import { DISPLAYABLE, STAGE_MAX_STEPS } from "utils/constants";
import { Step, Stage } from "services/journey";
import { Answer, Question, Snippet } from "services/data";
import { Student } from "services/student";
import { stepBoundary } from "./step-boundary";

export function buildStages(
    snippetTable: Snippet[],
    questionTable: Question[],
    answerTable: Answer[],
    student: Student
): Stage[] {
    const log_level = 0;
    log(log_level, "=>buildStages", "");
    /*
        Max 5 steps per stage.
        */
    const MAX_STAGES = 8;
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

    log(log_level, "partitionStepsBy", partitionStepsBy);
    if (partitionStepsBy === "W") log(log_level, "wordsPerStep", wordsPerStep);
    if (partitionStepsBy === "S")
        log(log_level, "snippetsPerStep", snippetsPerStep);

    let stageCount = 0;
    let steps: Step[] = [];

    let stepCount = 0;
    let stepWordCount = 0;
    let stepSnippetCount = 0;
    let snippets: Snippet[] = [];
    let snippetIds: number[] = [];
    let questions: Question[] = [];
    let answers: Answer[] = [];
    let stepSnippetIndex = 0;

    for (const s of snippetTable) {
        //using a for loop assumes (incorrectly) that snippetTable is sequentially ordered by snippet id. Won't always be so.
        if (!DISPLAYABLE.includes(s.snippetType)) continue;
        stepWordCount += wordCount(s.descr);
        stepSnippetCount += 1;

        if (partitionStepsBy === "W")
            log(log_level, "stepWordCount", stepWordCount);
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
            const answers = answerTable.filter((a) =>
                snippetIds.includes(a.snippetId)
            );
            steps.push({
                stepNum: stepCount,
                start: snippets[0].snippetId,
                end: snippets[snippets.length - 1].snippetId,
                //currentSnippetId: 1,
                snippets,
                questions,
                answers,
            });
            stepCount += 1;
            stepWordCount = 0;
            snippets = [];
            stepSnippetIndex = 0;

            if (stepCount === STAGE_MAX_STEPS) {
                log(log_level, "stage", stageCount);
                log(log_level, "steps", steps);
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
        snippets.push(s);
        snippetIds.push(s.snippetId);
    }
    log(log_level, "<=buildStages", "");
    return stages;
}
