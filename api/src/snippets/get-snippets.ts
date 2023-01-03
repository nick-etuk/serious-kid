import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dbFilename } from "../config";
import { log } from "../utils/log";

export async function getSnippets(subjectId: string) {
    const db = await open({
        filename: dbFilename,
        mode: sqlite3.OPEN_READWRITE,
        driver: sqlite3.Database,
    });
    const sql = `
        select subject_id as subjectID, topic_id as topicID, 
        snippet_id as snippetId, snippet_type as snippetType, 
        descrlong as descr 
        from snippet
        where subject_id=?
    `;

    const snippetRows = await db.all(sql, [subjectId]);
    return snippetRows;
}
