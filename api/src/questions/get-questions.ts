import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dbFilename } from "../config";
import { log } from "../utils/log";

export async function getQuestions(subjectId: string) {
    const db = await open({
        filename: dbFilename,
        mode: sqlite3.OPEN_READWRITE,
        driver: sqlite3.Database,
    });

    const sql = `
    select subject_id as subjectID,
    snippet_id as snippetId, question_id as questionId, 
    question_type as questionType, descr 
    from question 
    where subject_id=?
  `;
    const rows = await db.all(sql, [subjectId]);
    return rows;
}
