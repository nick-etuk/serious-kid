import { Collection, Model, Q } from "@nozbe/watermelondb";
import { log } from "../../utils";
import { Snippet } from "./data.interface";
import { snippetDb } from "./snippet-json";
import { database } from "./watermelon-db";
import SnippetDbClass from "./watermelon-db/model/snippet-db-class";

async function zlistSnippets(start: number, end: number): Promise<Snippet[]> {
  return await listSnippetsJson(start, end);
}

async function listSnippetsJson(
  start: number,
  end: number
): Promise<Snippet[]> {
  return snippetDb.filter((s) => s.snippetId >= start && s.snippetId <= end);
}

async function listSnippetsDB(start: number, end: number): Promise<Snippet[]> {
  const result = await database.collections
    .get("snippet")
    .query(Q.where("snippet_id", Q.between(start, end)))
    .fetch();

  const x = await Promise.resolve(result);
  //log(0, "db snippets:", x, true);
  x.forEach((a) => console.log(a));
  return x as unknown as Snippet[];
}

async function listSnippetsDB2(start: number, end: number): Promise<Snippet[]> {
  const x = new SnippetDbClass();
  const result = x.list();

  //log(0, "db snippets v2:", result, true);
  return result as unknown as Snippet[];
}

async function listSnippetsDB3(
  start: number,
  end: number
): Promise<Collection<Model>> {
  const collection = database.collections.get("snippet");
  const snippets = await collection.find("1");

  //log(0, "db snippets v2:", result, true);
  return await Promise.resolve(snippets);
}
export { listSnippetsJson as listSnippets, listSnippetsDB, listSnippetsDB3 };
