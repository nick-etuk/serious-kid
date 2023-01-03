import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dbFilename } from "../config";
import { log } from "../utils/log";

export async function getDictionary(subjectId: string) {
    /*
    
    */
    const result = [];
    const db = await open({
        filename: dbFilename,
        mode: sqlite3.OPEN_READWRITE,
        driver: sqlite3.Database,
    });

    const sql = `select * from dictionary where subject_id=?`;
    const rows = await db.all(sql, [subjectId]);
    result.push(rows);

    await db.close();
    return result;
}
