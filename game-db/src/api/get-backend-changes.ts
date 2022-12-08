import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dbFilename } from "./config";
import { log } from "../../utils/log";

export async function getBackendChanges() {
  const db = await open({
    filename: dbFilename,
    mode: sqlite3.OPEN_READWRITE,
    driver: sqlite3.Database,
  });
  const snippetRows = await db.all("select * from snippet");
  const questionRows = await db.all("select * from question");
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
  return JSON.stringify(
    {
      changes: changes,
      timestamp: Date.now(),
    },
    null,
    2
  );
  */
  return {
    changes: changes,
    timestamp: Date.now(),
  };
}
