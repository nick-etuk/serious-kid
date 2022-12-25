import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dbFilename } from "../config";
import { log } from "../utils/log";

export async function getQuestions() {
  const db = await open({
    filename: dbFilename,
    mode: sqlite3.OPEN_READWRITE,
    driver: sqlite3.Database,
  });
  
  const rows = await db.all("select subject_id as subjectID, topic_id as topicID, snippet_id as snippetId, question_id as questionId, question_type as questionType from question");
  return rows;
}
