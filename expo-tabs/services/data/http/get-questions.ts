import { API_URL } from "../../../utils/constants";
import { Question } from "../data.interface";

async function getQuestionsAPI(snippets: number[]): Promise<[Question]> {
  const params = snippets.join(",");
  const response = await fetch(`${API_URL}/questions?${params}`);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const result = await response.json();

  return Promise.resolve(result);
}

export { getQuestionsAPI as getQuestions };
