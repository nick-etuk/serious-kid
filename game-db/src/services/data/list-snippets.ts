import { Q } from "@nozbe/watermelondb";
import { log } from "../../../utils/log";
import { snippet } from "./data.interface";
import { snippetDb } from "./snippet-json";
import { database } from "./watermelon-db";

export function listSnippets(start: number, end: number): snippet[] {
  return listSnippetsJson(start, end);
}

function listSnippetsJson(start: number, end: number): snippet[] {
  return snippetDb.filter((s) => s.id >= start && s.id <= end);
}

async function listSnippetsDB(start: number, end: number): snippet[] {
  const result = await database
    .get("snippet")
    .query(Q.where("snippet_id", Q.between(start, end)))
    .fetch();

  log(0, "db snippets:", result, true);
  return result;
}
