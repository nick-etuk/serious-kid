import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dbFilename } from "../config";
import { log } from "../utils/log";

export async function saveChangesToBackend(changes: any) {
  log(1, "front-end data changes:", changes, true);
}
