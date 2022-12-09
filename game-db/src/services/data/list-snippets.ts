import { Q } from "@nozbe/watermelondb";
import { log } from "../../../utils/log";
import { Snippet } from "./data.interface";
import { snippetDb } from "./snippet-json";
import { database } from "./watermelon-db";
import SnippetDbClass from "./watermelon-db/model/snippet-db-class";

export async function listSnippets(
  start: number,
  end: number
): Promise<Snippet[]> {
  return await listSnippetsJson(start, end);
}

function listSnippetsJson(start: number, end: number): Snippet[] {
  return snippetDb.filter((s) => s.id >= start && s.id <= end);
}

async function listSnippetsDB(start: number, end: number): Promise<Snippet[]> {
  const result = await database
    .get("snippet")
    .query(Q.where("snippet_id", Q.between(start, end)))
    .fetch();

  const x = result as unknown as Snippet[];
  log(0, "db snippets:", x, true);
  return x;
}

async function listSnippetsDB2(start: number, end: number): Promise<Snippet[]> {
  const x = new SnippetDbClass();
  const result = x.list();

  log(0, "db snippets v2:", result, true);
  return result as unknown as Snippet[];
}
