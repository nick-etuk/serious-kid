import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dbFilename } from "../config";
import { log } from "../utils/log";

export async function getQuestionsBySnippet(snippets_str: string) {
  /*
    Fetch children of snippets
    Fetch questions of those snippets + questions of snippets.
    */
  const result = [];
  const db = await open({
    filename: dbFilename,
    mode: sqlite3.OPEN_READWRITE,
    driver: sqlite3.Database,
  });

  const sql = `
    select snippet_id, seq, descr 
    from question q
    where q.level_id='HS'
    and q.subject_id='GEOG'
    and q.snippet_id in (${snippets_str})
    or snippet_id in (select child_id from snippet_child
    where parent_id = q.snippet_id)
    `;
  const questionRows = await db.all(sql);
  const answerSql = `
  select answer_seq, descr 
  from answer a
  where a.level_id = ?
  and a.subject_id = ?
  and a.snippet_id = ?
  and a.question_seq = ?
  `;
  for (const questionRow of questionRows) {
    const answerRows = await db.all(sql);
    result.push({
      question: questionRow,
      answers: answerRows,
    });
  }
  await db.close();
  return result;
}
