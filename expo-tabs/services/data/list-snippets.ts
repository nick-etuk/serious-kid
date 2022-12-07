import { snippet } from "./data.interface";
import { snippetDb } from "./snippet-db";

import { Q } from "@nozbe/watermelondb";
import { log } from "../../utils/log";
import { database } from "./index";

export function listSnippets(start: number, end: number): snippet[] {
  return listSnippetsDB(start, end);
}

function listSnippetsJson(start: number, end: number): snippet[] {
  return snippetDb.slice(start, end + 1);
}

async function listSnippetsDB(start: number, end: number): snippet[] {
  const result = await database
    .get("snippet")
    .query(Q.where("snippet_id", Q.between(start, end)))
    .fetch();

  log(0, "db snippets:", result);
  return result;
}
