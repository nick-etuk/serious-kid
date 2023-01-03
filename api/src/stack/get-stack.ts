import { log } from "../utils/log";
import { getQuestions } from "../questions/get-questions";
import { getSnippets } from "../snippets/get-snippets";
import { getAnswers } from "../answers/get-answers";

export async function getStack(subjectId: string) {
    const snippetRows = await getSnippets(subjectId);
    const questionRows = await getQuestions(subjectId);
    const answerRows = await getAnswers(subjectId);
    return {
        snippets: snippetRows,
        questions: questionRows,
        answers: answerRows,
    };
}
