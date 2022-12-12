import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dbFilename } from "../config";
import { log } from "../utils/log";

export async function getBackendChanges() {
  const db = await open({
    filename: dbFilename,
    mode: sqlite3.OPEN_READWRITE,
    driver: sqlite3.Database,
  });
  const snippetRows = await db.all("select snippet_id as id, * from snippet");
  const questionRows = await db.all(
    "select snippet_id+'_'+seq as id, * from question"
  );
  const changes = {
    snippet: {
      created: snippetRows,
      updated: [],
      deleted: [],
    },
    question: {
      created: questionRows,
      updated: [],
      deleted: [],
    },
  };
  /*
  const result = JSON.stringify(
    {
      changes: changes,
      timestamp: Date.now(),
    },
    null,
    2
  );
  //log(0, "=>getBackendChanges.changes:", result, true);
  return result;
  */
  return {
    changes: changes,
    timestamp: Date.now(),
  };
}
