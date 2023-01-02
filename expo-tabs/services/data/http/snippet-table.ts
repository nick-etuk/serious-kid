import { API_URL } from "utils/constants";
import { Snippet } from "services/data.interface";
import fetch from "cross-fetch";

async function zsnippetTable(): Promise<[Snippet]> {
  const response = await fetch(`${API_URL}/snippets`);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const result = await response.json();
  return Promise.resolve(result.body);
}

export async function snippetTable(subjectId: string) {
  const response = await fetch(`${API_URL}/snippets?subject_id=?`);
  if (!response.ok) throw new Error(await response.text());
  const result = await response.json();
  return result.body;
  //return [];
}
