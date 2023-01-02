import { API_URL } from "../../../utils/constants";
import { Snippet } from "../data.interface";
import fetch from "cross-fetch";

export async function questionTable() {
  const response = await fetch(`${API_URL}/questions`);
  if (!response.ok) throw new Error(await response.text());
  const result = await response.json();
  return result.body;
}
